type FormatPriceParams = { priceFrom: boolean };
export const formatPrice = (
  price: number,
  params: FormatPriceParams = { priceFrom: false },
) => {
  if (price === 0) return "Бесплатно";
  return (
    (params.priceFrom ? "от " : "") +
    new Intl.NumberFormat("ru-RU").format(price) +
    " ₽"
  );
};
