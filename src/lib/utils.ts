import { products, type Product } from "@/data/products";

export const WHATSAPP_NUMBER = "5521979372510";

export interface CartPricingItem {
  productId?: string;
  price: number;
  quantity: number;
  promoQty?: number;
  promoPrice?: number;
  promoLabel?: string;
}

export function getCartItemUnitPrice(item: CartPricingItem): number {
  const catalogProduct = item.productId
    ? products.find((product) => product.id === item.productId)
    : undefined;
  return catalogProduct?.price ?? item.price;
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

/** Calcula o total efetivo considerando promoção de quantidade. */
export function calcEffectiveTotal(product: Product, qty: number): number {
  return calcCartItemSubtotal({
    price: product.price,
    quantity: qty,
    promoQty: product.promoQty,
    promoPrice: product.promoPrice,
  });
}

export function calcCartItemSubtotal(item: CartPricingItem): number {
  const catalogProduct = item.productId
    ? products.find((product) => product.id === item.productId)
    : undefined;
  const price = getCartItemUnitPrice(item);
  const promoQty = item.promoQty ?? catalogProduct?.promoQty;
  const promoPrice = item.promoPrice ?? catalogProduct?.promoPrice;

  if (promoQty && promoPrice && item.quantity >= promoQty) {
    const packs = Math.floor(item.quantity / promoQty);
    const singles = item.quantity % promoQty;
    return packs * promoPrice + singles * price;
  }
  return price * item.quantity;
}

export function getCartItemPromoNote(item: CartPricingItem): string | undefined {
  const catalogProduct = item.productId
    ? products.find((product) => product.id === item.productId)
    : undefined;
  const promoQty = item.promoQty ?? catalogProduct?.promoQty;
  const promoPrice = item.promoPrice ?? catalogProduct?.promoPrice;
  const promoLabel = item.promoLabel ?? catalogProduct?.promoLabel;

  if (!promoQty || !promoPrice || item.quantity < promoQty) {
    return undefined;
  }
  return promoLabel ?? `promoção: ${promoQty} por ${formatCurrency(promoPrice)}`;
}

export function generateWhatsAppMessage(
  items: Array<{
    productId?: string;
    name: string;
    size?: string;
    color?: string;
    quantity: number;
    price: number;         // preço base unitário
    promoQty?: number;
    promoPrice?: number;
    promoLabel?: string;
  }>
): string {
  const lines = ["Olá! Quero fazer este pedido na Paulo Guimarães Store:\n"];

  let total = 0;
  for (const item of items) {
    const subtotal = calcCartItemSubtotal(item);
    const promoNote = getCartItemPromoNote(item);
    lines.push(`Produto: ${item.name}`);
    if (item.color) lines.push(`Cor: ${item.color}`);
    if (item.size) lines.push(`Tamanho: ${item.size}`);
    lines.push(`Quantidade: ${item.quantity}`);
    if (promoNote) {
      lines.push(`Valor: ${formatCurrency(subtotal)} (${promoNote})`);
    } else if (item.quantity > 1) {
      lines.push(`Valor: ${formatCurrency(subtotal)} (${item.quantity} x ${formatCurrency(getCartItemUnitPrice(item))})`);
    } else {
      lines.push(`Valor: ${formatCurrency(subtotal)}`);
    }
    lines.push("");
    total += subtotal;
  }

  lines.push(`Total: ${formatCurrency(total)}`);
  lines.push("");
  lines.push("Aguardo as informações para pagamento.");

  return lines.join("\n");
}

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
