export interface Product {
  id: number;
  categoryId: "industrial" | "household" | "cosmetics" | "private-label";
  image: string;
  volume: string;
}

export const productsData: Product[] = [
  { id: 1, categoryId: "industrial", image: "/images/product-1.png", volume: "5-200 л" },
  { id: 2, categoryId: "industrial", image: "/images/product-2.png", volume: "20-200 л" },
  { id: 3, categoryId: "industrial", image: "/images/product-3.png", volume: "5-50 л" },
  { id: 4, categoryId: "household", image: "/images/product-4.png", volume: "0.5-5 л" },
  { id: 5, categoryId: "household", image: "/images/product-1.png", volume: "1-5 л" },
  { id: 6, categoryId: "household", image: "/images/product-2.png", volume: "0.5-5 л" },
  { id: 7, categoryId: "cosmetics", image: "/images/products/shampoo-left.png", volume: "250-1000 мл" },
  { id: 8, categoryId: "cosmetics", image: "/images/products/soap-right.png", volume: "250-1000 мл" },
  { id: 9, categoryId: "cosmetics", image: "/images/products/bottle-left.png", volume: "300-5000 мл" },
  { id: 10, categoryId: "private-label", image: "/images/product-3.png", volume: "Від 1000 од." },
  { id: 11, categoryId: "private-label", image: "/images/product-4.png", volume: "Від 500 од." },
  { id: 12, categoryId: "private-label", image: "/images/product-1.png", volume: "Від 200 л" },
];

export function getProductById(id: number): Product | undefined {
  return productsData.find((p) => p.id === id);
}

export function getRelatedProducts(product: Product, count = 3): Product[] {
  return productsData
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, count)
    .concat(
      productsData
        .filter((p) => p.categoryId !== product.categoryId && p.id !== product.id)
    )
    .slice(0, count);
}
