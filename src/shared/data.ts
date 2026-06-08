// Shared domain + a fake async API used identically by all three implementations.
export interface Product {
  id: string
  name: string
  price: number
}

const CATALOG: Product[] = [
  { id: 'p1', name: 'Coffee', price: 4 },
  { id: 'p2', name: 'Bagel', price: 3 },
  { id: 'p3', name: 'Juice', price: 5 },
]

// Pretend network request so every engine has to handle async + loading state.
export function fetchProducts(): Promise<Product[]> {
  return new Promise((resolve) => setTimeout(() => resolve(CATALOG), 600))
}
