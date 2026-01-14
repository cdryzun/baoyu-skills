# baoyu-skills

English | [中文](./README.zh.md)

Skills shared by Baoyu for improving daily work efficiency with Claude Code.

## Prerequisites

- Node.js environment installed
- Ability to run `npx bun` commands

## Installation

### Register as Plugin Marketplace

Run the following command in Claude Code:

```bash
/plugin marketplace add jimliu/baoyu-skills
```

### Install Skills

**Option 1: Via Browse UI**

1. Select **Browse and install plugins**
2. Select **baoyu-skills**
3. Select **content-skills**
4. Select **Install now**

**Option 2: Direct Install**

```bash
/plugin install content-skills@baoyu-skills
```

## Available Skills

### gemini-web

Interacts with Gemini Web to generate text and images.

**Text Generation:**

```bash
/gemini-web "Hello, Gemini"
/gemini-web --prompt "Explain quantum computing"
```

**Image Generation:**

```bash
/gemini-web --prompt "A cute cat" --image cat.png
/gemini-web --promptfiles system.md content.md --image out.png
```

### xhs-images

Xiaohongshu (RedNote) infographic series generator. Breaks down content into 1-10 cartoon-style infographics with **Style × Layout** two-dimensional system.

```bash
# Auto-select style and layout
/xhs-images posts/ai-future/article.md

# Specify style
/xhs-images posts/ai-future/article.md --style notion

# Specify layout
/xhs-images posts/ai-future/article.md --layout dense

# Combine style and layout
/xhs-images posts/ai-future/article.md --style tech --layout list

# Direct content input
/xhs-images 今日星座运势
```

**Styles** (visual aesthetics): `cute` (default), `fresh`, `tech`, `warm`, `bold`, `minimal`, `retro`, `pop`, `notion`

**Layouts** (information density):
| Layout | Density | Best for |
|--------|---------|----------|
| `sparse` | 1-2 pts | Covers, quotes |
| `balanced` | 3-4 pts | Regular content |
| `dense` | 5-8 pts | Knowledge cards, cheat sheets |
| `list` | 4-7 items | Checklists, rankings |
| `comparison` | 2 sides | Before/after, pros/cons |
| `flow` | 3-6 steps | Processes, timelines |

### cover-image

Generate hand-drawn style cover images for articles with multiple style options.

```bash
# From markdown file (auto-select style)
/cover-image path/to/article.md

# Specify a style
/cover-image path/to/article.md --style tech
/cover-image path/to/article.md --style warm

# Without title text
/cover-image path/to/article.md --no-title
```

Available styles: `elegant` (default), `tech`, `warm`, `bold`, `minimal`, `playful`, `nature`, `retro`

### slide-deck

Generate professional slide deck images from content. Creates comprehensive outlines with style instructions, then generates individual slide images.

```bash
# From markdown file
/slide-deck path/to/article.md

# With style and audience
/slide-deck path/to/article.md --style corporate
/slide-deck path/to/article.md --audience executives

# Outline only (no image generation)
/slide-deck path/to/article.md --outline-only

# With language
/slide-deck path/to/article.md --lang zh
```

Available styles: `editorial` (default), `corporate`, `technical`, `playful`, `minimal`, `storytelling`, `warm`, `retro-flat`, `notion`

### post-to-wechat

Post content to WeChat Official Account (微信公众号). Two modes available:

**Image-Text (图文)** - Multiple images with short title/content:

```bash
/post-to-wechat 图文 --markdown article.md --images ./photos/
/post-to-wechat 图文 --markdown article.md --image img1.png --image img2.png --image img3.png
/post-to-wechat 图文 --title "标题" --content "内容" --image img1.png --submit
```

**Article (文章)** - Full markdown/HTML with rich formatting:

```bash
/post-to-wechat 文章 --markdown article.md
/post-to-wechat 文章 --markdown article.md --theme grace
/post-to-wechat 文章 --html article.html
```

Prerequisites: Google Chrome installed. First run requires QR code login (session preserved).

## Disclaimer

### gemini-web

This skill uses the Gemini Web API (reverse-engineered).

**Warning:** This project uses unofficial API access via browser cookies. Use at your own risk.

- First run opens Chrome to authenticate with Google
- Cookies are cached for subsequent runs
- No guarantees on API stability or availability

## License

MIT
