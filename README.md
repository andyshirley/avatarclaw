# AvatarClaw — AI 伴侣平台

AvatarClaw 是一个基于 AI 的虚拟伴侣平台，用户可以选择不同性格和职业背景的 AI 角色进行对话。本项目严格还原了 Figma 设计稿，支持桌面端与移动端响应式布局。

---

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | React 19 + Vite 7 |
| 路由 | Wouter 3 |
| 样式 | Tailwind CSS 4 |
| 组件库 | Radix UI / shadcn/ui |
| 动画 | Framer Motion 12 |
| 语言 | TypeScript 5.6 |
| 包管理 | pnpm |

> **注意**：当前使用 React + Vite 静态模板构建，而非 package.json 中原始指定的 Next.js 框架。如需迁移至 Next.js，请参考下方说明。

---

## 项目结构

```
avatarclaw/
├── client/
│   ├── index.html              # HTML 入口，引入字体
│   ├── public/                 # 静态配置文件（favicon 等）
│   └── src/
│       ├── components/
│       │   ├── Toolbar.tsx     # Safari 风格顶部工具栏
│       │   └── ui/             # shadcn/ui 基础组件
│       ├── contexts/
│       │   └── ThemeContext.tsx # 主题上下文（暗色模式）
│       ├── lib/
│       │   └── characters.ts   # AI 角色数据（6 位角色）
│       ├── pages/
│       │   ├── Home.tsx        # 首页（角色展示 + 品牌区域）
│       │   ├── Chat.tsx        # 聊天页面
│       │   └── NotFound.tsx    # 404 页面
│       ├── App.tsx             # 路由配置
│       ├── index.css           # 全局样式 + 设计 Token
│       └── main.tsx            # React 入口
├── server/
│   └── index.ts                # Express 静态文件服务
├── package.json
└── README.md
```

---

## 设计系统

本项目基于 Figma 设计稿还原，核心设计语言如下：

**色彩**

| Token | 值 | 用途 |
|-------|----|------|
| 背景色 | `#0C0F12` | 页面主背景 |
| 卡片背景 | `#191C1F` | 角色卡片底色 |
| 主文字 | `#FFFFFF` | 标题、正文 |
| 次要文字 | `rgba(255,255,255,0.55)` | 副标题、描述 |
| 在线状态 | `#4ADE80` | 绿色在线指示器 |

**特效**：左侧品牌区域使用 conic-gradient 模拟彩色棱镜光束效果，与 Figma 设计稿保持一致。

**字体**：优先使用系统中文字体 `PingFang SC`，回退至 `Noto Sans SC`、`Microsoft YaHei`。

---

## 页面说明

### 首页 `/`

- **桌面端**：左侧品牌区域（38%）+ 右侧角色展示区（62%）
  - 左侧：品牌名、副标题、"即刻开聊"按钮、"滑动选择角色"链接、彩色棱镜背景光效
  - 右侧：当前选中角色大图 + 角色信息面板（职业/姓名/描述）+ 底部缩略图横向滑动条
- **移动端**：顶部品牌头部 + 2 列角色卡片网格

### 聊天页 `/chat/:id`

- **桌面端**：左侧角色全身大图（40%）+ 右侧聊天界面（60%）
- **移动端**：顶部角色信息栏 + 消息列表 + 底部输入框
- 支持发送消息，AI 模拟回复（含打字动画指示器）

---

## AI 角色列表

| ID | 姓名 | 职业 |
|----|------|------|
| `xiaoya` | 晓雅 | 瑜伽老师 |
| `xiaoyu` | 小宇 | 宇宙研究 |
| `xiaohuang` | 小黄 | 美食鉴赏 |
| `xiaomi` | 小米 | 历史研究 |
| `puyandan` | 蒲衍丹 | 霸道总裁 |
| `suyue` | 苏玥 | 星秀主播 |

---

## 本地开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 预览生产构建
pnpm preview
```

开发服务器默认运行在 `http://localhost:3000`。

---

## 后续扩展建议

1. **接入真实 AI 接口**：将 `Chat.tsx` 中的模拟回复替换为实际 LLM API（OpenAI / Claude / 国内大模型），实现真正的 AI 对话
2. **用户系统**：添加登录/注册功能，保存对话历史和角色好感度数据
3. **迁移至 Next.js**：如需 SSR/SSG、SEO 优化或 API Routes，可将项目迁移至 Next.js 14+ App Router 架构

---

## 设计参考

Figma 设计稿：[AI 伴伴需求汇总](https://www.figma.com/design/tS9TnNOfm1BoelhQUUuwm3/AI-%E4%BC%B4%E4%BC%B4%E9%9C%80%E6%B1%82%E6%B1%87%E6%80%BB)
