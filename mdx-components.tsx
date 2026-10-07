import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { slugify, textOf } from "@/lib/slug";

/** Section heading with a stable id for the table of contents and deep links. */
export function H2({ children, id }: { children?: ReactNode; id?: string }) {
  return <h2 id={id ?? slugify(textOf(children))}>{children}</h2>;
}

function A({ href = "", children, ...rest }: ComponentProps<"a">) {
  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} {...rest}>
      {children}
    </a>
  );
}

function Table(props: ComponentProps<"table">) {
  return (
    <div className="table-wrap">
      <table {...props} />
    </div>
  );
}

const components: MDXComponents = {
  h2: H2,
  a: A,
  table: Table,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
