export function calculateFinalPrice(product) {
  if (product.discount_percent && product.discount_percent > 0) {
    return {
      finalPrice: Math.round(
        product.mrp * (1 - product.discount_percent / 100)
      ),
      discount: product.discount_percent
    };
  }

  return {
    finalPrice: product.price,
    discount: 0
  };
}
