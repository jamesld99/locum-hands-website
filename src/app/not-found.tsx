import { Container, ButtonLink } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="py-24 text-center sm:py-32">
      <p className="text-sm font-semibold uppercase tracking-wider text-teal-600">
        404
      </p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-navy-900 sm:text-5xl">
        Page not found
      </h1>
      <p className="mx-auto mt-4 max-w-md text-lg text-navy-600">
        Sorry, we couldn&apos;t find the page you were looking for. It may have moved
        or no longer exists.
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <ButtonLink href="/" variant="primary">
          Back to home
        </ButtonLink>
        <ButtonLink href="/blog" variant="outline">
          Visit the blog
        </ButtonLink>
      </div>
    </Container>
  );
}
