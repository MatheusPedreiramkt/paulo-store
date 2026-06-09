import type { Metadata } from "next";
import { products } from "@/data/products";
import ProductPageClient from "./ProductPageClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return {};
  return {
    title: product.metaTitle ?? `${product.name} | Paulo Guimarães Store`,
    description: product.metaDescription ?? product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  return <ProductPageClient slug={slug} />;
}
