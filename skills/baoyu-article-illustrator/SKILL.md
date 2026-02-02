---
name: baoyu-article-illustrator
description: Analyzes article structure, identifies positions requiring visual aids, generates illustrations with Type × Style two-dimension approach. Use when user asks to "illustrate article", "add images", "generate images for article", or "为文章配图".
---

# Article Illustrator

Analyze articles, identify illustration positions, generate images with Type × Style consistency.

## Two Dimensions

| Dimension | Controls | Examples |
|-----------|----------|----------|
| **Type** | Information structure, layout | infographic, scene, flowchart, comparison, framework, timeline |
| **Style** | Visual aesthetics, mood | notion, warm, minimal, blueprint, watercolor, elegant |

Type × Style can be freely combined. Example: `--type infographic --style blueprint`

## Type Gallery

| Type | Best For |
|------|----------|
| `infographic` | Data, metrics, technical articles |
| `scene` | Narratives, personal stories, emotional content |
| `flowchart` | Tutorials, workflows, processes |
| `comparison` | Side-by-side, before/after, options |
| `framework` | Methodologies, models, architecture |
| `timeline` | History, progress, evolution |

## Style Gallery

| Style | Best For |
|-------|----------|
| `notion` (Default) | Knowledge sharing, SaaS, productivity |
| `elegant` | Business, thought leadership |
| `warm` | Personal growth, lifestyle, education |
| `minimal` | Philosophy, core concepts |
| `blueprint` | Architecture, system design |
| `watercolor` | Lifestyle, travel, creative |
| `editorial` | Tech explainers, journalism |
| `scientific` | Academic, technical research |

Full styles: [references/styles.md](references/styles.md)

## Auto Selection

| Content Signals | Type | Style |
|-----------------|------|-------|
| API, metrics, data, numbers | infographic | blueprint, notion |
| Story, emotion, journey | scene | warm, watercolor |
| How-to, steps, workflow | flowchart | notion, minimal |
| vs, pros/cons, before/after | comparison | notion, elegant |
| Framework, model, architecture | framework | blueprint, notion |
| History, timeline, progress | timeline | elegant, warm |

## Workflow

Copy this checklist and track progress:

```
Progress:
- [ ] Step 1: Pre-check
  - [ ] 1.5 Check preferences (EXTEND.md) ⛔ BLOCKING
    - [ ] Found → load preferences → continue
    - [ ] Not found → run first-time setup → MUST complete before other steps
  - [ ] 1.0 Reference images ⚠️ (if provided)
    - [ ] File path given → saved to references/ ✓
    - [ ] No path → asked user OR extracted verbally
  - [ ] 1.2-1.4 Config questions (1 AskUserQuestion, max 4 Qs)
- [ ] Step 2: Setup & Analyze
- [ ] Step 3: Confirm Settings (1 AskUserQuestion, max 4 Qs)
  - [ ] Q1: Type ⚠️
  - [ ] Q2: Density ⚠️ MUST ASK
  - [ ] Q3: Style ⚠️
- [ ] Step 4: Generate Outline
- [ ] Step 5: Generate Images
  - [ ] 5.1 Prompts created (references in frontmatter ONLY if files exist)
  - [ ] 5.3 References verified before generation
- [ ] Step 6: Finalize
```

---

### Step 1: Pre-check

**1.0 Detect & Save Reference Images** ⚠️ REQUIRED if images provided

Check if user provided reference images. Handle based on input type:

| Input Type | Action |
|------------|--------|
| Image file path provided | Copy to `references/` subdirectory → can use `--ref` |
| Image in conversation (no path) | **ASK user for file path** with AskUserQuestion |
| User can't provide path | Extract style/palette verbally → append to prompts (NO frontmatter references) |

**CRITICAL**: Only add `references` to prompt frontmatter if files are ACTUALLY SAVED to `references/` directory.

**If user provides file path**:
1. Copy to `references/NN-ref-{slug}.png`
2. Create description: `references/NN-ref-{slug}.md`
3. Verify files exist before proceeding

**If user can't provide path** (extracted verbally):
1. Analyze image visually, extract: colors, style, composition
2. Create `references/extracted-style.md` with extracted info
3. DO NOT add `references` to prompt frontmatter
4. Instead, append extracted style/colors directly to prompt text

**Description File Format** (only when file saved):
```yaml
---
ref_id: NN
filename: NN-ref-{slug}.png
---
[User's description or auto-generated description]
```

**Verification** (only for saved files):
```
Reference Images Saved:
- 01-ref-{slug}.png ✓ (can use --ref)
- 02-ref-{slug}.png ✓ (can use --ref)
```

**Or for extracted style**:
```
Reference Style Extracted (no file):
- Colors: #E8756D coral, #7ECFC0 mint...
- Style: minimal flat vector, clean lines...
→ Will append to prompt text (not --ref)
```

---

**1.1 Determine Input Type**

| Input | Output Directory | Next |
|-------|------------------|------|
| File path | Ask user (1.2) | → 1.2 |
| Pasted content | `illustrations/{topic-slug}/` | → 1.4 |

**Backup rule for pasted content**: If `source.md` exists in target directory, rename to `source-backup-YYYYMMDD-HHMMSS.md` before saving.

**1.2-1.4 Configuration** (file path input only)

Check preferences and existing state, then ask ALL needed questions in ONE AskUserQuestion call (max 4 questions).

**Questions to include** (skip if preference exists or not applicable):

| Question | When to Ask | Options |
|----------|-------------|---------|
| Output directory | No `default_output_dir` in EXTEND.md | `{article-dir}/`, `{article-dir}/imgs/` (Recommended), `{article-dir}/illustrations/`, `illustrations/{topic-slug}/` |
| Existing images | Target dir has `.png/.jpg/.webp` files | `supplement`, `overwrite`, `regenerate` |
| Article update | Always (file path input) | `update`, `copy` |

**Preference Values** (if configured, skip asking):

| `default_output_dir` | Path |
|----------------------|------|
| `same-dir` | `{article-dir}/` |
| `imgs-subdir` | `{article-dir}/imgs/` |
| `illustrations-subdir` | `{article-dir}/illustrations/` |
| `independent` | `illustrations/{topic-slug}/` |

**1.5 Load Preferences (EXTEND.md) ⛔ BLOCKING**

**CRITICAL**: If EXTEND.md not found, MUST complete first-time setup before ANY other questions or steps. Do NOT proceed to reference images, do NOT ask about content, do NOT ask about type/style — ONLY complete the preferences setup first.

```bash
test -f .baoyu-skills/baoyu-article-illustrator/EXTEND.md && echo "project"
test -f "$HOME/.baoyu-skills/baoyu-article-illustrator/EXTEND.md" && echo "user"
```

| Result | Action |
|--------|--------|
| Found | Read, parse, display summary → Continue |
| Not found | ⛔ **BLOCKING**: Run first-time setup ONLY ([references/config/first-time-setup.md](references/config/first-time-setup.md)) → Complete and save EXTEND.md → Then continue |

**Supports**: Watermark | Preferred type/style | Custom styles | Language | Output directory

---

### Step 2: Setup & Analyze

**2.1 Analyze Content**

| Analysis | Description |
|----------|-------------|
| Content type | Technical / Tutorial / Methodology / Narrative |
| Core arguments | 2-5 main points to visualize |
| Visual opportunities | Positions where illustrations add value |
| Recommended type | Based on content signals |
| Recommended density | Based on length and complexity |

**2.2 Extract Core Arguments**

- Main thesis
- Key concepts reader needs
- Comparisons/contrasts
- Framework/model proposed

**CRITICAL**: If article uses metaphors (e.g., "电锯切西瓜"), do NOT illustrate literally. Visualize the **underlying concept**.

**2.3 Identify Positions**

**Illustrate**:
- Core arguments (REQUIRED)
- Abstract concepts
- Data comparisons
- Processes, workflows

**Do NOT Illustrate**:
- Metaphors literally
- Decorative scenes
- Generic illustrations

**2.4 Analyze Reference Images** (if provided in Step 1.0)

For each reference image:

| Analysis | Description |
|----------|-------------|
| Visual characteristics | Style, colors, composition |
| Content/subject | What the reference depicts |
| Suitable positions | Which sections match this reference |
| Style match | Which illustration types/styles align |
| Usage recommendation | `direct` / `style` / `palette` |

| Usage | When to Use |
|-------|-------------|
| `direct` | Reference matches desired output closely |
| `style` | Extract visual style characteristics only |
| `palette` | Extract color scheme only |

---

### Step 3: Confirm Settings ⚠️

**Do NOT skip.** Use ONE AskUserQuestion call with max 4 questions. **Q1, Q2, Q3 are ALL REQUIRED.**

**Q1: Illustration Type** ⚠️ REQUIRED
- [Recommended based on analysis] (Recommended)
- infographic / scene / flowchart / comparison / framework / timeline / mixed

**Q2: Density** ⚠️ REQUIRED - DO NOT SKIP
- minimal (1-2) - Core concepts only
- balanced (3-5) - Major sections
- per-section - At least 1 per section/chapter (Recommended)
- rich (6+) - Comprehensive coverage

**Q3: Style** ⚠️ REQUIRED (ALWAYS ask, even with preferred_style in EXTEND.md)

If EXTEND.md has `preferred_style`:
- [Custom style name + brief description] (Recommended)
- [Top compatible built-in style 1]
- [Top compatible built-in style 2]
- [Top compatible built-in style 3]

If no `preferred_style`:
- [Best compatible from matrix] (Recommended)
- [Other ✓✓ style 1]
- [Other ✓✓ style 2]
- [Other ✓ style]

Style selection based on Type × Style compatibility matrix (references/styles.md).
Full specs: `references/styles/<style>.md`

**Q4** (only if source ≠ user language):
- Language: Source / User language

**Display Reference Usage** (if references detected in Step 1.0):

When presenting outline preview to user, show reference assignments:

```
Reference Images:
| Ref | Filename | Recommended Usage |
|-----|----------|-------------------|
| 01 | 01-ref-diagram.png | direct → Illustration 1, 3 |
| 02 | 02-ref-chart.png | palette → Illustration 2 |
```

---

### Step 4: Generate Outline

Save as `outline.md`:

```yaml
---
type: infographic
density: balanced
style: blueprint
image_count: 4
references:                    # Only if references provided
  - ref_id: 01
    filename: 01-ref-diagram.png
    description: "Technical diagram showing system architecture"
  - ref_id: 02
    filename: 02-ref-chart.png
    description: "Color chart with brand palette"
---

## Illustration 1

**Position**: [section] / [paragraph]
**Purpose**: [why this helps]
**Visual Content**: [what to show]
**Type Application**: [how type applies]
**References**: [01]                    # Optional: list ref_ids used
**Reference Usage**: direct             # direct | style | palette
**Filename**: 01-infographic-concept-name.png

## Illustration 2
...
```

**Requirements**:
- Each position justified by content needs
- Type applied consistently
- Style reflected in descriptions
- Count matches density
- References assigned based on Step 2.4 analysis

---

### Step 5: Generate Images

**5.1 Create Prompts**

Follow [references/prompt-construction.md](references/prompt-construction.md). Save to `prompts/illustration-{slug}.md`.
- **Backup rule**: If prompt file exists, rename to `prompts/illustration-{slug}-backup-YYYYMMDD-HHMMSS.md`

**CRITICAL - References in Frontmatter**:
- Only add `references` field if files ACTUALLY EXIST in `references/` directory
- If style/palette was extracted verbally (no file), append info to prompt BODY instead
- Before writing frontmatter, verify: `test -f references/NN-ref-{slug}.png`

**5.2 Select Generation Skill**

Check available skills. If multiple, ask user.

**5.3 Process References** ⚠️ REQUIRED if references saved in Step 1.0

**DO NOT SKIP if user provided reference images.** For each illustration with references:

1. **VERIFY files exist first**:
   ```bash
   test -f references/NN-ref-{slug}.png && echo "exists" || echo "MISSING"
   ```
   - If file MISSING but in frontmatter → ERROR, fix frontmatter or remove references field
   - If file exists → proceed with processing

2. Read prompt frontmatter for reference info
3. Process based on usage type:

| Usage | Action | Example |
|-------|--------|---------|
| `direct` | Add reference path to `--ref` parameter | `--ref references/01-ref-brand.png` |
| `style` | Analyze reference, append style traits to prompt | "Style: clean lines, gradient backgrounds..." |
| `palette` | Extract colors from reference, append to prompt | "Colors: #E8756D coral, #7ECFC0 mint..." |

3. Check image generation skill capability:

| Skill Supports `--ref` | Action |
|------------------------|--------|
| Yes (e.g., baoyu-image-gen with Google) | Pass reference images via `--ref` |
| No | Convert to text description, append to prompt |

**Verification**: Before generating, confirm reference processing:
```
Reference Processing:
- Illustration 1: using 01-ref-brand.png (direct) ✓
- Illustration 2: extracted palette from 02-ref-style.png ✓
```

**5.4 Apply Watermark** (if enabled)

Add: `Include a subtle watermark "[content]" at [position].`

**5.5 Generate**

1. For each illustration:
   - **Backup rule**: If image file exists, rename to `NN-{type}-{slug}-backup-YYYYMMDD-HHMMSS.png`
   - If references with `direct` usage: include `--ref` parameter
   - Generate image
2. After each: "Generated X/N"
3. On failure: retry once, then log and continue

---

### Step 6: Finalize

**6.1 Update Article**

Insert after corresponding paragraph:
```markdown
![description](illustrations/{slug}/NN-{type}-{slug}.png)
```

Alt text: concise description in article's language.

**6.2 Output Summary**

```
Article Illustration Complete!

Article: [path]
Type: [type] | Density: [level] | Style: [style]
Location: [directory]
Images: X/N generated

Positions:
- 01-xxx.png → After "[Section]"
- 02-yyy.png → After "[Section]"

[If failures]
Failed:
- NN-zzz.png: [reason]
```

---

## Output Directory

```
illustrations/{topic-slug}/
├── source-{slug}.{ext}
├── references/                    # Only if references provided
│   ├── 01-ref-{slug}.png
│   ├── 01-ref-{slug}.md           # Description file (optional)
│   └── ...
├── outline.md
├── prompts/
│   └── illustration-{slug}.md
└── NN-{type}-{slug}.png
```

**Slug**: 2-4 word topic in kebab-case.
**Conflict**: Append `-YYYYMMDD-HHMMSS` if exists.

## Modification

| Action | Steps |
|--------|-------|
| **Edit** | **Update prompt file FIRST** → Regenerate → Update reference |
| **Add** | Identify position → Create prompt → Generate → Update outline → Insert |
| **Delete** | Delete files → Remove reference → Update outline |

**IMPORTANT**: When updating illustrations, ALWAYS update the prompt file (`prompts/illustration-{slug}.md`) FIRST before regenerating. This ensures:
1. Changes are documented and reproducible
2. The prompt reflects the new requirements
3. Future regeneration uses the correct prompt

## References

| File | Content |
|------|---------|
| [references/usage.md](references/usage.md) | Command syntax and options |
| [references/styles.md](references/styles.md) | Style gallery & compatibility |
| [references/prompt-construction.md](references/prompt-construction.md) | Prompt templates |
| `references/styles/<style>.md` | Full style specifications |
| `references/config/preferences-schema.md` | EXTEND.md schema |
| `references/config/first-time-setup.md` | First-time setup flow |

## Extension Support

Custom configurations via EXTEND.md. See **Step 1.5** for paths and supported options.
