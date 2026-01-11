/**
 * 日期工具函數
 */

/**
 * 取得指定日期所屬的週範圍（週一到週日）
 */
export function getWeekRange(date: Date | string): { start: string; end: string } {
  const d = typeof date === 'string' ? new Date(date) : date;

  // 取得當前是星期幾 (0=週日, 1=週一, ..., 6=週六)
  const dayOfWeek = d.getDay();

  // 計算週一 (如果是週日，往前 6 天；否則往前 dayOfWeek - 1 天)
  const monday = new Date(d);
  const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  monday.setDate(d.getDate() - daysToMonday);

  // 計算週日 (週一 + 6 天)
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  return {
    start: formatDate(monday),
    end: formatDate(sunday),
  };
}

/**
 * 取得本週的週範圍
 */
export function getCurrentWeekRange(): { start: string; end: string } {
  return getWeekRange(new Date());
}

/**
 * 格式化日期為 YYYY-MM-DD
 */
export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * 解析日期字串
 */
export function parseDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split('-').map(Number);
  if (!year || !month || !day) {
    throw new Error(`Invalid date format: ${dateStr}. Expected YYYY-MM-DD`);
  }
  return new Date(year, month - 1, day);
}

/**
 * 驗證日期格式 (YYYY-MM-DD)
 */
export function validateDateFormat(date: string): void {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(date)) {
    throw new Error(`Invalid date format: ${date}. Expected YYYY-MM-DD`);
  }

  // 驗證日期有效性
  const parsed = parseDate(date);
  if (formatDate(parsed) !== date) {
    throw new Error(`Invalid date: ${date}`);
  }
}

/**
 * 檢查日期是否在指定週範圍內
 */
export function isDateInWeek(
  date: string,
  weekStart: string,
  weekEnd: string
): boolean {
  const d = parseDate(date);
  const start = parseDate(weekStart);
  const end = parseDate(weekEnd);
  return d >= start && d <= end;
}

/**
 * 產生週報標題
 */
export function getWeeklyTitle(startDate: string, endDate: string): string {
  return `${startDate} ~ ${endDate}`;
}

/**
 * 從週報標題解析日期範圍
 */
export function parseWeeklyTitle(title: string): { start: string; end: string } | null {
  const match = title.match(/^(\d{4}-\d{2}-\d{2})\s*~\s*(\d{4}-\d{2}-\d{2})/);
  if (!match) return null;
  return { start: match[1]!, end: match[2]! };
}
