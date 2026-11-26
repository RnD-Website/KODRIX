import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { pages, pageBySlug } from "@/data/pages";
import PageTemplate from "@/components/PageTemplate";

export const dynamicParams = false;
export function generateStaticParams() { return pages.map((p) => ({ slug: p.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = pageBySlug((await params).slug);
  return p ? { title: `${p.nav} — KODRIX`, description: p.lede } : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const p = pageBySlug((await params).slug);
  if (!p) notFound();
  return <PageTemplate page={p} />;
}
