import { describe, expect, it } from 'vitest';
import { product } from '@/lib/product';

describe('Oferta do e-book', () => {
  it('usa o ticket estimado de R$ 24,90', () => {
    expect(product.price).toBe(24.9);
  });
  it('oferece 200 receitas', () => {
    expect(product.recipeCount).toBe(200);
  });
});