export default function currencyFormat(number, currency = "USD") {
  if (!isNaN(number)) {
    return new Intl.NumberFormat('ru-RU', {
      style: "currency",
      //maximumSignificantDigits: 1,
      currency
    }).format(number);
  }
  return number;
}
