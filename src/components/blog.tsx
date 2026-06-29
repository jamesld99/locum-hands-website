import Link from "next/link";
import {
  type ContentBlock,
  type Post,
  formatDate,
  getCategoryBySlug,
  tagToSlug,
} from "@/lib/blog";
import { InlineLink } from "./sections";

export function PostCard({ post }: { post: Post }) {
  const category = getCategoryBySlug(post.categorySlug);
  return (
    <article className="flex flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-600">
        {category && (
          <Link href={`/blog/category/${category.slug}`} className="hover:text-teal-700">
            {category.name}
          </Link>
        )}
        <span aria-hidden="true" className="text-navy-300">
          •
        </span>
        <span className="text-navy-400">{post.readingTime} min read</span>
      </div>
      <h2 className="mt-3 text-xl font-bold text-navy-900">
        <Link href={`/blog/${post.slug}`} className="hover:text-teal-700">
          {post.title}
        </Link>
      </h2>
      <p className="mt-2 flex-1 text-sm text-navy-600">{post.description}</p>
      <div className="mt-4 flex items-center justify-between">
        <time dateTime={post.date} className="text-xs text-navy-400">
          {formatDate(post.date)}
        </time>
        <InlineLink href={`/blog/${post.slug}`}>Read</InlineLink>
      </div>
    </article>
  );
}

export function TagList({ tags }: { tags: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li key={tag}>
          <Link
            href={`/blog/tag/${tagToSlug(tag)}`}
            className="inline-block rounded-full bg-navy-50 px-3 py-1 text-xs font-medium text-navy-700 hover:bg-teal-50 hover:text-teal-700"
          >
            #{tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function PostBody({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h2":
            return (
              <h2 key={i} className="mt-10 text-2xl font-bold tracking-tight text-navy-900">
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} className="mt-6 text-xl font-bold text-navy-900">
                {block.text}
              </h3>
            );
          case "p":
            return (
              <p key={i} className="text-lg leading-relaxed text-navy-700">
                {block.text}
              </p>
            );
          case "ul":
            return (
              <ul key={i} className="space-y-2 pl-1">
                {block.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-3 text-lg text-navy-700">
                    <span className="mt-2.5 h-2 w-2 flex-none rounded-full bg-teal-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );
          case "quote":
            return (
              <blockquote
                key={i}
                className="border-l-4 border-teal-400 bg-teal-50/60 py-3 pl-5 pr-4 text-lg font-medium italic text-navy-800"
              >
                {block.text}
              </blockquote>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
