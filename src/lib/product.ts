export const product = {
  name: '200 Sobremesas Zero Açúcar',
  recipeCount: 200,
  price: 24.9,
  currency: 'BRL',
  checkoutUrl: '',
} as const;

export function formatPrice(price: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
}