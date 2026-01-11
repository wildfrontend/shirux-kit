/**
 * 簡化版 Git 分析
 * 只提取基本的 commit 資訊用於時數估算
 */

import { simpleGit } from 'simple-git';
import type { CommitInfo } from './hour-estimator.js';

/**
 * 驗證 commit range 格式
 */
function validateCommitRange(range: string): void {
  if (!range || typeof range !== 'string') {
    throw new Error('Commit range 為必填參數');
  }

  const trimmed = range.trim();
  if (trimmed.length === 0) {
    throw new Error('Commit range 不可為空');
  }

  const validPatterns = [
    /^[a-f0-9]{7,40}$/i,                           // 單一 commit hash
    /^[a-f0-9]{7,40}\.\.[a-f0-9]{7,40}$/i,         // hash..hash
    /^[a-f0-9]{7,40}[\^~]\d*\.\.[a-f0-9]{7,40}$/i, // hash^..hash
    /^HEAD~\d+\.\.HEAD$/i,                          // HEAD~N..HEAD
    /^HEAD\^\d*\.\.HEAD$/i,                         // HEAD^N..HEAD
    /^[\w\-/]+\.\.[\w\-/]+$/,                       // branch..branch
    /^[\w\-/]+$/,                                   // 單一 branch
  ];

  const isValid = validPatterns.some(pattern => pattern.test(trimmed));
  if (!isValid) {
    throw new Error(
      `無效的 commit range 格式: "${range}"。` +
      '支援格式: HEAD~N..HEAD, abc123..def456, branch1..branch2'
    );
  }
}

/**
 * 取得簡化的 commit 資訊
 */
export async function getSimpleCommits(
  range: string,
  author?: string,
  gitRoot?: string
): Promise<CommitInfo[]> {
  validateCommitRange(range);

  const git = simpleGit(gitRoot || process.cwd());
  const SEP = '\x1e'; // ASCII Record Separator

  // 第一次掃描：取得檔案路徑
  const statusArgs = [
    'log',
    '--name-status',
    '--date=iso-strict',
    `--pretty=format:%H${SEP}%an${SEP}%ad${SEP}%s`,
  ];
  if (author) {
    statusArgs.push(`--author=${author}`);
  }
  statusArgs.push(range);

  const statusRaw = await git.raw(statusArgs);
  const statusLines = statusRaw.split('\n');

  const commitFilePaths = new Map<string, string[]>();
  let currentHash: string | null = null;

  for (const line of statusLines) {
    if (!line.trim()) continue;
    if (line.includes(SEP)) {
      const parts = line.split(SEP);
      currentHash = parts[0] || '';
      if (!commitFilePaths.has(currentHash)) {
        commitFilePaths.set(currentHash, []);
      }
    } else if (currentHash) {
      const paths = commitFilePaths.get(currentHash)!;
      const match = line.match(/^([AMDRC])\d*\t(.+?)(?:\t(.+))?$/);
      if (match) {
        const file1 = match[2];
        const file2 = match[3];
        if (file1) paths.push(file1);
        if (file2) paths.push(file2);
      }
    }
  }

  // 第二次掃描：取得行數統計
  const numstatArgs = [
    'log',
    '--numstat',
    '--date=iso-strict',
    `--pretty=format:%H${SEP}%an${SEP}%ad${SEP}%s`,
  ];
  if (author) {
    numstatArgs.push(`--author=${author}`);
  }
  numstatArgs.push(range);

  const numstatRaw = await git.raw(numstatArgs);
  const numstatLines = numstatRaw.split('\n');

  const commits: CommitInfo[] = [];
  let current: CommitInfo | null = null;

  for (const line of numstatLines) {
    if (!line.trim()) continue;
    if (line.includes(SEP)) {
      const parts = line.split(SEP);
      const hash = parts[0] || '';
      const message = parts[3] || '';
      const filePaths = commitFilePaths.get(hash) || [];

      current = {
        hash,
        message,
        files: 0,
        insertions: 0,
        deletions: 0,
        filePaths,
      };
      commits.push(current);
    } else if (current) {
      const parts = line.split('\t');
      if (parts.length >= 3) {
        const insertions = Number(parts[0]) || 0;
        const deletions = Number(parts[1]) || 0;
        current.insertions += insertions;
        current.deletions += deletions;
        current.files += 1;
      }
    }
  }

  return commits;
}

/**
 * 取得指定日期範圍的 commits
 */
export async function getCommitsByDateRange(
  startDate: string,
  endDate: string,
  author?: string,
  gitRoot?: string
): Promise<CommitInfo[]> {
  const git = simpleGit(gitRoot || process.cwd());
  const SEP = '\x1e';

  // 使用 --since 和 --until 來篩選日期範圍
  const args = [
    'log',
    '--numstat',
    '--date=iso-strict',
    `--pretty=format:%H${SEP}%an${SEP}%ad${SEP}%s`,
    `--since=${startDate}`,
    `--until=${endDate} 23:59:59`,
  ];
  if (author) {
    args.push(`--author=${author}`);
  }

  const raw = await git.raw(args);
  const lines = raw.split('\n');

  const commits: CommitInfo[] = [];
  let current: CommitInfo | null = null;

  for (const line of lines) {
    if (!line.trim()) continue;
    if (line.includes(SEP)) {
      const parts = line.split(SEP);
      const hash = parts[0] || '';
      const message = parts[3] || '';

      current = {
        hash,
        message,
        files: 0,
        insertions: 0,
        deletions: 0,
      };
      commits.push(current);
    } else if (current) {
      const parts = line.split('\t');
      if (parts.length >= 3) {
        const insertions = Number(parts[0]) || 0;
        const deletions = Number(parts[1]) || 0;
        current.insertions += insertions;
        current.deletions += deletions;
        current.files += 1;
      }
    }
  }

  return commits;
}
