# File Ops Plus

Obsidian 文件操作增强插件，为文件管理器、标签页、编辑器提供自定义右键菜单。

> An Obsidian plugin that enhances context menus for the file explorer, tab headers, and editor.

## 功能概览 / Feature Overview

### 文件管理器右键菜单 / File Explorer Context Menu

![文件管理器右键菜单 / File Explorer Context Menu](screenshots/file-menu.png)

- **打开方式**：新标签页 / 新窗口 / 默认应用 / 外部编辑器 / 资源管理器中显示
- **文件操作**：重命名（行内编辑）/ 创建副本 / 置顶 / 删除（脉冲倒计时确认）
- **复制链接**：绝对路径 / 相对路径 / wikilink / Markdown 链接
- **批量操作**：复制到系统剪贴板 / 文件上移（移到上一级目录）/ 移动到…（两步式选择目标文件夹）
- **颜色标记**：8 色标签 + 加粗，文件名着色显示
- **新建**：行内新建文件 / 文件夹
- **启用/关闭编辑器增强菜单**：快捷开关

> - **Open with**: New tab / new window / default app / external editor / reveal in explorer
> - **File ops**: Rename (inline) / duplicate / pin / delete (pulse countdown confirmation)
> - **Copy link**: Absolute path / relative path / wikilink / Markdown link
> - **Batch ops**: Copy to clipboard / move up (to parent folder) / move to… (two-step target selection)
> - **Color tag**: 8-color labels + bold, file name colored display
> - **Create**: Inline new file / folder
> - **Enable/disable editor enhanced menu**: Quick toggle

### 标签页右键菜单 / Tab Header Context Menu

- 关闭 / 关闭其他 / 关闭右侧 / 全部关闭
- 锁定 / 取消锁定
- 阅读/源码切换、左右分屏、上下分屏、新窗口
- 默认应用打开、外部编辑器、资源管理器
- 局部图、反链、出链、大纲
- 重命名、创建副本、置顶
- 绝对路径 / 相对路径 / wikilink / MD 链接
- 查找、替换、导出 PDF
- 颜色标记、删除

> - Close / close others / close right / close all
> - Pin / unpin
> - Reading/source toggle, split vertical, split horizontal, new window
> - Default app, external editor, reveal in explorer
> - Local graph, backlinks, outgoing links, outline
> - Rename, duplicate, pin
> - Absolute path / relative path / wikilink / MD link
> - Find, replace, export PDF
> - Color tag, delete

### 编辑器右键菜单 / Editor Context Menu

![编辑器右键菜单 / Editor Context Menu](screenshots/editor-menu.png)

在 Markdown 源码模式下拦截右键，展示分组化图标菜单：

> Intercepts right-click in Markdown source mode to show a grouped icon menu:

- **链接**：新增链接、外部链接、查找
- **格式**：加粗、倾斜、删除线、高亮、代码、数学、注释、清除格式
- **段落**：无序列表、有序列表、任务列表、H1-H6、正文、引用
- **插入**：脚注、表格、分隔线、代码块、数学块
- **替换**：移除加粗/倾斜/删除线/高亮/行内代码、链接留文本/URL、wiki 留文本、去 HTML 标签、合并空行、去行首空白、全角转半角
- **高亮**：8 色 mark 高亮（黄红绿蓝粉橙紫青）
- **更多**（`...`）：展开 Obsidian 原生菜单
- **设置**（⚙）：打开设置面板

> - **Link**: Insert link, embed, find
> - **Format**: Bold, italic, strikethrough, highlight, code, math, comment, clear formatting
> - **Paragraph**: Bullet list, numbered list, checklist, H1-H6, normal text, quote
> - **Insert**: Footnote, table, horizontal rule, code block, math block
> - **Replace**: Remove bold/italic/strikethrough/highlight/inline code, link to text/URL, wiki to text, strip HTML, merge blank lines, trim leading space, fullwidth to half
> - **Highlight**: 8-color mark highlight (yellow/red/green/blue/pink/orange/purple/cyan)
> - **More** (`...`): Expand Obsidian native menu
> - **Settings** (⚙): Open settings panel

### 设置面板 / Settings Panel

![设置面板 / Settings Panel](screenshots/settings-panel.png)

- 左侧实时预览区，右侧配置区
- 启用/关闭增强菜单
- 显示/隐藏分组标题
- 分组增删、选项增删
- 每个选项可配置：图标（lucide 名 / SVG 代码 / 纯文字）、名称、类型（cmd / regex / custom）
- cmd 类型：填写 Obsidian 命令 ID
- regex 类型：填写正则、替换、标志
- custom 类型：预设转换（toggleHeading1-6 / toggleChecklist / toggleParagraph / toggleCodeblock / toggleMathblock / fullwidthToHalf）
- 分组配色：6 种预设色 + 自定义背景/文字色值
- 选项级配色可覆盖分组配色
- 面板可拖动、可调整大小，位置和尺寸持久化

> - Left: live preview area; right: configuration area
> - Enable/disable enhanced menu
> - Show/hide group labels
> - Add/remove groups and options
> - Each option: icon (lucide name / SVG code / plain text), label, type (cmd / regex / custom)
> - cmd: enter Obsidian command ID
> - regex: enter pattern, replacement, flags
> - custom: preset transforms (toggleHeading1-6 / toggleChecklist / toggleParagraph / toggleCodeblock / toggleMathblock / fullwidthToHalf)
> - Group colors: 6 presets + custom background/foreground hex values
> - Per-option color overrides group color
> - Panel is draggable, resizable; position and size are persisted

### 其他功能 / Other Features

- **外部编辑器**：自动检测 VS Code / Typora / Notepad++ / Sublime Text，无默认时弹输入框手动指定路径
- **国际化**：根据 `moment.locale()` 自动切换中/英文
- **置顶**：CSS order 排序，不移动 DOM，兼容 React 虚拟 DOM
- **删除**：单个文件用 7 秒脉冲倒计时按钮，多文件弹确认对话框，支持撤销恢复

> - **External editor**: Auto-detects VS Code / Typora / Notepad++ / Sublime Text; prompts for path if none found
> - **i18n**: Auto-switches Chinese/English based on `moment.locale()`
> - **Pin**: CSS order sorting, no DOM movement, compatible with React virtual DOM
> - **Delete**: 7-second pulse countdown button for single file, confirmation dialog for multiple files, with undo

## 安装 / Installation

将 `main.js`、`manifest.json`、`styles.css` 放入 `.obsidian/plugins/file-ops-plus/` 目录，在 Obsidian 设置 → 第三方插件中启用。

> Place `main.js`, `manifest.json`, `styles.css` into `.obsidian/plugins/file-ops-plus/`, then enable in Obsidian Settings → Community Plugins.

## 命令面板 / Command Palette

- `Editor Context Menu Settings` — 打开编辑器右键菜单设置面板（可在增强菜单关闭后重新启用）

> - `Editor Context Menu Settings` — Open the editor context menu settings panel (can re-enable after disabling the enhanced menu)

## 兼容性 / Compatibility

- 最低 Obsidian 版本：1.2.7
- 仅桌面端
- Windows 原生菜单不支持的 DOM 操作已用自定义菜单替代

> - Minimum Obsidian version: 1.2.7
> - Desktop only
> - Windows native menu DOM limitations handled with custom menu replacement
