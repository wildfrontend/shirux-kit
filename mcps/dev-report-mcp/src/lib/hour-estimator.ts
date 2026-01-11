/**
 * 時數估算邏輯
 * 基準：時薪 800 TWD 的前端工程師
 */

export interface CommitInfo {
  hash: string;
  message: string;
  files: number;
  insertions: number;
  deletions: number;
  filePaths?: string[];
}

export interface HourEstimate {
  hash: string;
  message: string;
  files: number;
  insertions: number;
  deletions: number;
  hours: number;
  reason: string;
}

/**
 * 估算單個 commit 的工時
 */
export function estimateCommitHours(commit: CommitInfo): HourEstimate {
  const { hash, message, files, insertions, deletions, filePaths } = commit;
  const lines = insertions + deletions;

  let hours: number;
  let reason: string;

  // 基礎估算（基於規模）
  if (files === 1 && lines <= 10) {
    hours = 0.1; // 6 分鐘
    reason = '微小改動';
  } else if (files <= 2 && lines <= 50) {
    hours = 0.25; // 15 分鐘
    reason = '小型修改';
  } else if (files <= 5 && lines <= 150) {
    hours = 0.5; // 30 分鐘
    reason = '中型功能';
  } else if (files <= 10 && lines <= 300) {
    hours = 1.0; // 1 小時
    reason = '較大功能';
  } else if (files <= 20 && lines <= 500) {
    hours = 1.5; // 1.5 小時
    reason = '大型功能';
  } else {
    hours = 2.0; // 2 小時+
    reason = '超大型變更';
  }

  // 加成：重構/架構相關
  if (/refactor|重構|migrate|遷移|架構/i.test(message)) {
    hours *= 1.3;
    reason += ' + 重構';
  }

  // 加成：新功能開發
  if (/^feat|新增|add\s/i.test(message)) {
    hours *= 1.2;
    reason += ' + 新功能';
  }

  // 折扣：純刪除或清理
  if (deletions > insertions * 2 && /clean|remove|delete|移除|清理/i.test(message)) {
    hours *= 0.7;
    reason += ' (清理折扣)';
  }

  // 折扣：文件/樣式調整
  if (filePaths) {
    const docFiles = filePaths.filter(f =>
      /\.(md|txt|json|yaml|yml)$/i.test(f) ||
      /readme|changelog|license/i.test(f)
    ).length;

    const styleFiles = filePaths.filter(f =>
      /\.(css|scss|less|styl)$/i.test(f)
    ).length;

    if (docFiles === files) {
      hours *= 0.5;
      reason += ' (文件)';
    } else if (styleFiles === files) {
      hours *= 0.8;
      reason += ' (樣式)';
    }
  }

  // 上限：單個 commit 最多 4 小時
  hours = Math.min(hours, 4);

  // 四捨五入到小數點後一位
  hours = Math.round(hours * 10) / 10;

  return {
    hash: hash.slice(0, 7),
    message: message.split('\n')[0]!.slice(0, 60),
    files,
    insertions,
    deletions,
    hours,
    reason,
  };
}

/**
 * 估算多個 commits 的總工時
 */
export function estimateTotalHours(commits: CommitInfo[]): {
  estimates: HourEstimate[];
  totalHours: number;
} {
  const estimates = commits.map(estimateCommitHours);
  const totalHours = Math.round(
    estimates.reduce((sum, e) => sum + e.hours, 0) * 10
  ) / 10;

  return { estimates, totalHours };
}

/**
 * 從 estimates 產生 markdown 表格
 */
export function generateHoursTable(estimates: HourEstimate[], totalHours: number): string {
  const rows = estimates.map(e =>
    `| ${e.hash} | ${e.message} | ${e.hours} |`
  );

  return `| Commit | 描述 | 估時 (h) |
|--------|------|----------|
${rows.join('\n')}
| **總計** | | **${totalHours}** |`;
}

/**
 * 從 commit messages 產生工作項目列表
 */
export function generateWorkItems(commits: CommitInfo[]): string[] {
  const items: string[] = [];
  const seen = new Set<string>();

  for (const commit of commits) {
    const msg = commit.message.split('\n')[0]!.trim();

    // 移除 commit type prefix (feat:, fix:, etc.)
    const cleanMsg = msg.replace(/^(feat|fix|chore|refactor|docs|style|test|perf|ci|build)(\(.+?\))?:\s*/i, '');

    // 避免重複
    const key = cleanMsg.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);

    items.push(cleanMsg);
  }

  return items;
}
