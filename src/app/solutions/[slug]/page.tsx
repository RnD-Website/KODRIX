import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { solutions } from "@/data/solutions";
import LandingPage from "@/components/pages/LandingPage";

export const dynamicParams = false;
export function generateStaticParams() { return solutions.map((s) => ({ slug: s.slug })); }
const find = async (p: Promise<{ slug: string }>) => { const { slug } = await p; return solutions.find((s) => s.slug === slug); };
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const d = await find(params); return d ? { title: `${d.label} — KODRIX`, description: d.lede } : {};
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const d = await find(params); if (!d) notFound();
  return <LandingPage d={d} back="/solutions" />;
}
