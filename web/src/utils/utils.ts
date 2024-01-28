import { IIntervalResult } from './types/interfaces';

/**
 * 將數字字串轉換成字串，並在整數部分加上千分位。
 * @param {string} input - 要格式化的數字字串。
 * @returns {string} - 格式化後的字串。
 */
export function addComma(input: string): string {

  // 判斷是否包含小數點
  const hasDecimal = input.includes('.');
  // 過濾逗號
  const filteredInput = input.replace(/,/g, '');

  // 分離整數和小數部分
  const [integerPart, decimalPart] = filteredInput.split('.');

  const formattedIntegerPart = integerPart.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');

  const result = hasDecimal ? `${formattedIntegerPart}.${decimalPart}` : formattedIntegerPart;
  return result;
}

/**
 * 根據輸入的區間計算重疊和不包含在輸入區間中的數字區間。
 * @param intervals - 以 [start, end] 表示的區間陣列。
 * @param minRange - 最小範圍值（預設為 0）。
 * @param maxRange - 最大範圍值（預設為 20）。
 * @returns 包含重疊和不包含在輸入區間中的數字區間的物件。
 */
export function getNumberIntervals(
  intervals: number[][],
  minRange: number = 0,
  maxRange: number = 20,
): IIntervalResult {
  intervals.sort((a, b) => a[0] - b[0]);

  const overlapIntervals: number[][] = [];
  const notIncludeIntervals: number[][] = [];

  let previousEnd = intervals[0][1];

  if (intervals[0][0] > minRange) {
    notIncludeIntervals.push([minRange, intervals[0][0] - 1]);
  }

  for (let i = 1; i < intervals.length; i++) {
    // find overlapIntervals
    const [currentStart, currentEnd] = intervals[i];
    const previousInterval = intervals[i - 1];

    if (hasOverlap(intervals[i], previousInterval)) {
      const [overlapStart, overlapEnd] = calculateOverlap(intervals[i], previousInterval);

      if (overlapIntervals.length > 0) {
        const lastOverlap = overlapIntervals[overlapIntervals.length - 1];

        if (canMerge(lastOverlap, overlapStart, overlapEnd)) {
          lastOverlap[1] = Math.max(lastOverlap[1], overlapEnd);
        } else if (isIntervalOutsideLastOverlap(lastOverlap, overlapStart)) {
          overlapIntervals.push([overlapStart, overlapEnd]);
        }
      } else {
        overlapIntervals.push([overlapStart, overlapEnd]);
      }
    }

    // find notIncludeIntervals
    notIncludeIntervals.push(...findNotIncludeIntervals(currentStart, previousEnd, maxRange));

    if (currentEnd > previousEnd) {
      previousEnd = Math.min(currentEnd, maxRange);
    }
  }

  // check notIncludeIntervals at last time
  if (previousEnd < maxRange) {
    notIncludeIntervals.push([previousEnd + 1, maxRange]);
  }

  return { overlap: overlapIntervals, notInclude: notIncludeIntervals };
}

function hasOverlap(interval1: number[], interval2: number[]): boolean {
  return interval1[0] <= interval2[1];
}

function calculateOverlap(interval1: number[], interval2: number[]): number[] {
  const overlapStart = Math.max(interval2[0], interval1[0]);
  const overlapEnd = Math.min(interval2[1], interval1[1]);
  return [overlapStart, overlapEnd];
}

function canMerge(lastOverlap: number[], overlapStart: number, overlapEnd: number): boolean {
  return lastOverlap[1] >= overlapStart && lastOverlap[1] < overlapEnd;
}

function isIntervalOutsideLastOverlap(lastOverlap: number[], overlapStart: number): boolean {
  return lastOverlap[1] < overlapStart;
}

function findNotIncludeIntervals(
  currentStart: number,
  previousEnd: number,
  maxRange: number,
): number[][] {
  const notIncludeIntervals: number[][] = [];
  
  if (currentStart > previousEnd +1) {
    notIncludeIntervals.push([previousEnd + 1, Math.min(currentStart - 1, maxRange)]);
  }

  return notIncludeIntervals;
}
