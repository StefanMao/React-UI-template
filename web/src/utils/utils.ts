/**
 * 將數字轉換成字串，並在整數部分加上千分位。
 * @param {number} number - 要格式化的數字。
 * @returns {string} - 格式化後的字串。
 */
export function addComma(number: number): string {
  if (typeof number !== 'number' || Number.isNaN(number)) {
    throw new Error('Invalid input. Please provide a valid number.');
  }

  const [integerPart, decimalPart] = number.toString().split('.');

  const formattedIntegerPart = integerPart.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');

  const result = decimalPart ? `${formattedIntegerPart}.${decimalPart}` : formattedIntegerPart;

  return result;
}
