import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { ourStoryDraft } from "../content/our-story-draft";
import sitemap from "../app/sitemap";
import nextConfig from "../../next.config";
import { practicePricingWording, professionalPayWording } from "./copy";
import { faqGroups } from "./faqs";
import { posts } from "./blog";
import { guides } from "./guides";
import { articleSchema, localBusinessSchema, organizationSchema } from "./schema";
import { buildNotFoundMetadata } from "./seo";
import { siteConfig } from "./site";

describe("content and SEO regressions", () => {
  it("uses the approved pay and pricing wording", () => {
    const answers = faqGroups.flatMap((group) => group.faqs.map((faq) => faq.answer));
    assert.ok(answers.includes(professionalPayWording));
    assert.ok(answers.includes(practicePricingWording));
    assert.equal(answers.some((answer) => /\bVAT\b/.test(answer)), false);
    assert.equal(answers.some((answer) => answer.includes("registered in London")), false);
    const combined = [...posts.flatMap(textOfPost), ...guides.flatMap(textOfGuide), ...answers].join("\n");
    assert.equal(/£14|£22|£30|£45|premium rates/i.test(combined), false);
  });

  it("omits generated lastModified dates and keeps article URLs", () => {
    const entries = sitemap();
    const home = entries.find((entry) => entry.url.endsWith("/"));
    const tags = entries.filter((entry) => entry.url.includes("/blog/tag/"));
    const post = entries.find((entry) => entry.url.endsWith("/blog/dental-nurse-locum-jobs-uk-guide"));
    assert.equal(home?.lastModified, undefined);
    assert.ok(tags.every((entry) => entry.lastModified === undefined));
    assert.ok(post?.lastModified instanceof Date);
    assert.ok(entries.some((entry) => entry.url.endsWith("/privacy")));
    assert.ok(entries.some((entry) => entry.url.endsWith("/blog/category/for-professionals")));
  });

  it("keeps the www canonical, redirects and a noindex 404", async () => {
    assert.equal(siteConfig.url, "https://www.locumhands.co.uk");
    const redirects = await nextConfig.redirects?.();
    assert.ok(redirects);
    assert.deepEqual(
      redirects.map((redirect) => [redirect.source, redirect.destination]),
      [
        ["/for-professionals", "/professionals"],
        ["/for-practices", "/practices"],
      ],
    );
    const notFound = buildNotFoundMetadata();
    const robots = notFound.robots;
    assert.equal(typeof robots === "object" && robots !== null && "index" in robots ? robots.index : undefined, false);
  });

  it("aligns organisation data with the registered office and avoids JobPosting", () => {
    const organisation = organizationSchema();
    const business = localBusinessSchema();
    const article = articleSchema({
      title: "Example",
      description: "Example",
      slug: "example",
      date: "2026-06-02",
      author: "Locum Hands Team",
    });
    assert.equal(organisation.address.streetAddress, "Flat A, 615 Wolseley Road");
    assert.equal(organisation.address.addressLocality, "Plymouth");
    assert.equal(organisation.identifier.value, "17310093");
    assert.equal(organisation.founder.name, "Liset Hernandez");
    assert.equal("streetAddress" in business.address, false);
    assert.equal(article.author["@type"], "Organization");
    assert.equal(article.author.name, "Locum Hands Team");
    const serialised = JSON.stringify([organisation, business, article]);
    assert.equal(serialised.includes("JobPosting"), false);
    assert.equal(serialised.includes("London"), false);
  });

  it("keeps the unapproved Our Story draft off the public About page", () => {
    const about = readFileSync(new URL("../app/about/page.tsx", import.meta.url), "utf8");
    assert.equal(about.includes("our-story-draft"), false);
    assert.equal(about.includes("Our story"), false);
    assert.equal(about.includes("Meet Liset"), true);
    assert.equal(ourStoryDraft.paragraphs.length, 3);
    assert.match(ourStoryDraft.paragraphs[0] ?? "", /started with a simple idea/);
    assert.equal(about.includes("started with a simple idea"), false);
  });

  it("publishes the approved enquiry privacy process and no ICO registration", () => {
    const privacy = readFileSync(new URL("../app/privacy/page.tsx", import.meta.url), "utf8");
    const forms = ["ContactForm.tsx", "PracticeForm.tsx", "ProfessionalForm.tsx"]
      .map((name) => readFileSync(new URL(`../components/forms/${name}`, import.meta.url), "utf8"))
      .join("\n");
    const dataAnswer = faqGroups.flatMap((group) => group.faqs).find((faq) => faq.question === "How is my data handled?");
    assert.ok(dataAnswer);
    assert.match(privacy, /legitimate interests/);
    assert.match(privacy, /up to six months/);
    assert.match(privacy, /Liset Hernandez/);
    assert.match(privacy, /James Lloyd-Davies/);
    assert.match(privacy, /inbox message is the enquiry/);
    assert.equal(privacy.includes("database record"), false);
    assert.equal(privacy.includes("Still to be confirmed"), false);
    assert.equal(privacy.includes("ICO"), false);
    assert.match(dataAnswer.answer, /up to six months/);
    assert.match(dataAnswer.answer, /inbox message is the enquiry/);
    assert.equal(dataAnswer.answer.includes("database"), false);
    assert.equal(dataAnswer.answer.includes("still need to be confirmed"), false);
    assert.equal(forms.includes("I am happy"), false);
    assert.match(forms, /I have read the/);
  });

  it("uses Liset's name only on the dental nurse articles", () => {
    const nurse = posts.find((post) => post.slug === "dental-nurse-locum-jobs-uk-guide");
    const explained = posts.find((post) => post.slug === "dental-locum-nursing-explained");
    const hygienist = posts.find((post) => post.slug === "hygienist-locum-work-uk");
    assert.ok(nurse);
    assert.equal(nurse.author, "Liset Hernandez");
    assert.equal(explained?.author, "Liset Hernandez");
    assert.equal(hygienist?.author, "Locum Hands Team");
    const schema = articleSchema(nurse);
    assert.equal(schema.author["@type"], "Person");
    assert.equal(schema.author.name, "Liset Hernandez");
  });
});

function textOfPost(post: (typeof posts)[number]) {
  return post.body.map((block) => ("text" in block ? block.text : "items" in block ? block.items.join(" ") : ""));
}

function textOfGuide(guide: (typeof guides)[number]) {
  return guide.body.map((block) => ("text" in block ? block.text : "items" in block ? block.items.join(" ") : ""));
}
