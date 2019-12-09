export default function currencyFormat(number, currency = "RUB") {
  if (!isNaN(number)) {
    return new Intl.NumberFormat('ru-RU', {
      style: "currency",
      //maximumSignificantDigits: 1,
      currency
    }).format(number);
  }
  return number;
}
