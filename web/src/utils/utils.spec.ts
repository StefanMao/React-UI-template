import { addComma, getNumberIntervals } from './utils';

describe('addComma function', () => {
  // 測試 0
  it('should format zero without commas', () => {
    expect(addComma('0')).toBe('0');
  });

  // 測試正數
  it('should format positive number with commas', () => {
    expect(addComma('12')).toBe('12');
    expect(addComma('1234')).toBe('1,234');
    expect(addComma('1234567')).toBe('1,234,567');
    expect(addComma('12345678')).toBe('12,345,678');
    expect(addComma('123456789')).toBe('123,456,789');
    expect(addComma('1123456789')).toBe('1,123,456,789');
  });

  // 測試負數
  it('should format negative number with commas', () => {
    expect(addComma('-12')).toBe('-12');
    expect(addComma('-1234')).toBe('-1,234');
    expect(addComma('-1234567')).toBe('-1,234,567');
    expect(addComma('-12345678')).toBe('-12,345,678');
    expect(addComma('-123456789')).toBe('-123,456,789');
    expect(addComma('-1123456789')).toBe('-1,123,456,789');
  });

  // 小數點前沒有整數部分
  it('should format decimal without leading integer part with commas', () => {
    expect(addComma('0.123')).toBe('0.123');
  });

  // 測試小數後多位
  it('should format decimal number with commas', () => {
    expect(addComma('12345.6789')).toBe('12,345.6789');
    expect(addComma('-12345.6789')).toBe('-12,345.6789');
    expect(addComma('10000000.123456')).toBe('10,000,000.123456');
    expect(addComma('-10000000.123456')).toBe('-10,000,000.123456');
    expect(addComma('1000000.0000123456')).toBe('1,000,000.0000123456');
    expect(addComma('-1000000.0000123456')).toBe('-1,000,000.0000123456');
  });

  // 測試非數字的輸入
  it('should throw error for non-numeric input', () => {
    expect(() => addComma('abc')).toThrowError('Invalid input. Please provide a valid number string.');
  });
});

describe('getNumberIntervals', () => {
  it('should correctly identify overlapping intervals', () => {
    const inputIntervals = [[6, 11], [5, 8], [17, 20], [7, 7], [14, 17]];
    const result = getNumberIntervals(inputIntervals);

    expect(result.overlap).toEqual([[6, 8], [17, 17]]);
    expect(result.notInclude).toEqual([[0, 4], [12, 13]]);
  });

  it('should correctly identify non-overlapping intervals', () => {
    const inputIntervals = [[1, 5]];
    const result = getNumberIntervals(inputIntervals);

    expect(result.overlap).toEqual([]);
    expect(result.notInclude).toEqual([[0, 0], [6, 20]]);
  });

  it('should correctly identify all intervals overlapping', () => {
    const inputIntervals = [[1, 2], [2, 6], [3, 6], [4, 6], [1, 20]];
    const result = getNumberIntervals(inputIntervals);
    console.log('result', result);
  
    expect(result.overlap).toEqual([[1,6]]);
    expect(result.notInclude).toEqual([[0,0]]);
  });

  it('should correctly identify all intervals being the same', () => {
    const inputIntervals = [[3, 3], [3, 3], [3, 3]];
    const result = getNumberIntervals(inputIntervals);

    expect(result.overlap).toEqual([[3, 3]]);
    expect(result.notInclude).toEqual([[0, 2], [4, 20]]);
  });
})