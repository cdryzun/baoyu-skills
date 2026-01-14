# baoyu-skills

[English](./README.md) | 中文

宝玉分享的 Claude Code 技能集，提升日常工作效率。

## 前置要求

- 已安装 Node.js 环境
- 能够运行 `npx bun` 命令

## 安装

### 注册插件市场

在 Claude Code 中运行：

```bash
/plugin marketplace add jimliu/baoyu-skills
```

### 安装技能

**方式一：通过浏览界面**

1. 选择 **Browse and install plugins**
2. 选择 **baoyu-skills**
3. 选择 **content-skills**
4. 选择 **Install now**

**方式二：直接安装**

```bash
/plugin install content-skills@baoyu-skills
```

## 可用技能

### gemini-web

与 Gemini Web 交互，生成文本和图片。

**文本生成：**

```bash
/gemini-web "你好，Gemini"
/gemini-web --prompt "解释量子计算"
```

**图片生成：**

```bash
/gemini-web --prompt "一只可爱的猫" --image cat.png
/gemini-web --promptfiles system.md content.md --image out.png
```

### xhs-images

小红书信息图系列生成器。将内容拆解为 1-10 张卡通风格信息图，支持 **风格 × 布局** 二维系统。

```bash
# 自动选择风格和布局
/xhs-images posts/ai-future/article.md

# 指定风格
/xhs-images posts/ai-future/article.md --style notion

# 指定布局
/xhs-images posts/ai-future/article.md --layout dense

# 组合风格和布局
/xhs-images posts/ai-future/article.md --style tech --layout list

# 直接输入内容
/xhs-images 今日星座运势
```

**风格**（视觉美学）：`cute`（默认）、`fresh`、`tech`、`warm`、`bold`、`minimal`、`retro`、`pop`、`notion`

**布局**（信息密度）：
| 布局 | 密度 | 适用场景 |
|------|------|----------|
| `sparse` | 1-2 点 | 封面、金句 |
| `balanced` | 3-4 点 | 常规内容 |
| `dense` | 5-8 点 | 知识卡片、干货总结 |
| `list` | 4-7 项 | 清单、排行 |
| `comparison` | 双栏 | 对比、优劣 |
| `flow` | 3-6 步 | 流程、时间线 |

### cover-image

为文章生成手绘风格封面图，支持多种风格选项。

```bash
# 从 markdown 文件生成（自动选择风格）
/cover-image path/to/article.md

# 指定风格
/cover-image path/to/article.md --style tech
/cover-image path/to/article.md --style warm

# 不包含标题文字
/cover-image path/to/article.md --no-title
```

可用风格：`elegant`（默认）、`tech`、`warm`、`bold`、`minimal`、`playful`、`nature`、`retro`

### slide-deck

从内容生成专业的幻灯片图片。先创建包含样式说明的完整大纲，然后逐页生成幻灯片图片。

```bash
# 从 markdown 文件生成
/slide-deck path/to/article.md

# 指定风格和受众
/slide-deck path/to/article.md --style corporate
/slide-deck path/to/article.md --audience executives

# 仅生成大纲（不生成图片）
/slide-deck path/to/article.md --outline-only

# 指定语言
/slide-deck path/to/article.md --lang zh
```

可用风格：`editorial`（默认）、`corporate`、`technical`、`playful`、`minimal`、`storytelling`、`warm`、`retro-flat`、`notion`

### post-to-wechat

发布内容到微信公众号，支持两种模式：

**图文模式** - 多图配短标题和正文：

```bash
/post-to-wechat 图文 --markdown article.md --images ./photos/
/post-to-wechat 图文 --markdown article.md --image img1.png --image img2.png --image img3.png
/post-to-wechat 图文 --title "标题" --content "内容" --image img1.png --submit
```

**文章模式** - 完整 markdown/HTML 富文本格式：

```bash
/post-to-wechat 文章 --markdown article.md
/post-to-wechat 文章 --markdown article.md --theme grace
/post-to-wechat 文章 --html article.html
```

前置要求：已安装 Google Chrome，首次运行需扫码登录（登录状态会保存）

## 免责声明

### gemini-web

此技能使用 Gemini Web API（逆向工程）。

**警告：** 本项目通过浏览器 cookies 使用非官方 API。使用风险自负。

- 首次运行会打开 Chrome 进行 Google 身份验证
- Cookies 会被缓存供后续使用
- 不保证 API 的稳定性或可用性

## 许可证

MIT
