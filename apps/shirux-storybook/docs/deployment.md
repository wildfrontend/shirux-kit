# Ruxelu Storybook 部署文档

## 概述

本文档描述如何将 Ruxelu Storybook 应用部署到 Firebase Hosting。

## 项目信息

- **项目名称**: shirux-storybook
- **Firebase 项目**: shirux-storybook
- **部署平台**: Firebase Hosting + Firebase Functions
- **构建工具**: Next.js (静态导出模式)
- **包管理器**: pnpm

## 前置要求

### 1. 安装依赖

确保已安装以下工具：

- Node.js 20+
- pnpm
- Firebase CLI

```bash
# 安装 Firebase CLI（如果尚未安装）
npm install -g firebase-tools
```

### 2. Firebase 认证

首次部署需要登录 Firebase：

```bash
firebase login
```

**重要提示**：
- 登录的 Google 账号必须是 Firebase 项目 `shirux-storybook` 的成员
- 如果无法部署，请联系项目管理员添加你的账号到项目中
- 需要的最小权限角色：`Firebase Hosting Admin` 或 `Editor`

#### 如何查看/添加项目成员（项目管理员操作）

1. 访问 [Firebase Console - IAM 设置](https://console.firebase.google.com/project/shirux-storybook/settings/iam)
2. 点击 "添加成员"
3. 输入成员的 Google 账号邮箱
4. 分配角色（建议使用 `Firebase Hosting Admin` 用于部署）
5. 保存

### 3. 项目依赖

在项目根目录安装所有依赖：

```bash
pnpm install
```

## 部署流程

### 快速部署

在 `apps/elu-storybook` 目录下运行：

```bash
pnpm run deploy
```

这个命令会自动执行以下步骤：
1. 构建 Next.js 应用（静态导出）
2. 将构建输出复制到部署目录
3. 部署到 Firebase Hosting

### 分步部署

如果需要分步执行，可以使用以下命令：

#### 1. 构建应用

```bash
pnpm run build
```

这会在 `out/` 目录生成静态文件。

#### 2. 复制构建输出

```bash
cp -r out deploy/out
```

#### 3. 部署到 Firebase

```bash
cd deploy
firebase deploy --only hosting
```

## 部署配置

### Next.js 配置

应用使用静态导出模式（参见 `next.config.ts`）：

```typescript
{
  output: 'export',
  // ...
}
```

### Firebase 配置

配置文件位于 `deploy/firebase.json`：

- **静态文件目录**: `out/`
- **重写规则**:
  - `/api/**` → Firebase Functions
  - `**` → `/index.html` (SPA 模式)
- **缓存策略**:
  - 图片资源: 1 年缓存
  - JS/CSS: 1 年缓存

### 工作区配置

`pnpm-workspace.yaml` 配置：

```yaml
packages:
  - "apps/*"
  - "packages/*"
  - "configs/*"
```

注意：`deploy/functions` 不包含在工作区中，以避免 pnpm 部署冲突。

## 环境变量

环境变量在 `configs/env.ts` 中配置。确保所有必需的环境变量都已正确设置。

## Firebase Functions

如果需要部署 Firebase Functions：

```bash
cd deploy
firebase deploy --only functions
```

Functions 配置：
- **运行时**: Node.js 20
- **源代码**: `deploy/functions/`
- **Codebase**: default

## 常见问题

### 1. "No project was selected for deployment" 错误

确保使用 `pnpm run deploy` 而不是 `pnpm deploy`。

### 2. "outside of project directory" 错误

确保 `firebase.json` 中的 `public` 路径设置为 `out`，而不是 `../out`。

### 3. TypeScript 编译错误

检查 `deploy/functions/src/` 中的 TypeScript 代码，确保所有依赖都已正确安装。

### 4. 构建失败

清理构建缓存并重试：

```bash
rm -rf .next out
pnpm run build
```

## 部署验证

部署成功后，访问以下 URL 验证：

- **托管 URL**: https://shirux-storybook.web.app
- **自定义域名**: （如果已配置）

检查项：
1. 页面正常加载
2. 静态资源（图片、CSS、JS）正确加载
3. API 路由正常工作
4. 缓存头正确设置

## 回滚

如果需要回滚到之前的版本：

```bash
firebase hosting:rollback
```

## CI/CD 集成

如果需要在 CI/CD 中自动部署，可以使用 Firebase CI Token 或 Service Account：

### 方法 1: 使用 CI Token（推荐用于简单场景）

1. 在本地生成 token（需要项目权限）：
   ```bash
   firebase login:ci
   ```
   这会生成一个 token，复制保存

2. 在 CI/CD 平台中设置环境变量 `FIREBASE_TOKEN`

3. 在 CI 中使用 token 部署：
   ```bash
   firebase deploy --token "$FIREBASE_TOKEN"
   ```

### 方法 2: 使用 Service Account（推荐用于生产环境）

1. 在 [Google Cloud Console](https://console.cloud.google.com/iam-admin/serviceaccounts) 创建 Service Account
2. 下载 JSON 密钥文件
3. 在 CI 中设置：
   ```bash
   export GOOGLE_APPLICATION_CREDENTIALS="/path/to/service-account-key.json"
   firebase deploy
   ```

**注意**：Token 和 Service Account 密钥都很敏感，请妥善保管，不要提交到代码仓库。

## 监控和日志

查看部署日志：

```bash
firebase functions:log
```

查看托管分析：
访问 [Firebase Console](https://console.firebase.google.com/project/shirux-storybook/hosting)

## 联系方式

如有问题，请联系开发团队或查看 Firebase 文档：
- [Firebase Hosting 文档](https://firebase.google.com/docs/hosting)
- [Next.js 静态导出](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
