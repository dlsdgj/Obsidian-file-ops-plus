"use strict";

const { Plugin, TFile, TFolder, FileSystemAdapter, Notice, Modal, Menu, getIcon } = require("obsidian");
const moment = window.moment;

const _isZh = () => moment.locale().startsWith("zh");
const I18N_EN = {
    "蓝": "Blue", "紫": "Purple", "绿": "Green", "橙": "Orange", "红": "Red", "灰": "Gray",
    "粉": "Pink", "青": "Cyan", "黄": "Yellow",
    "链接": "Link", "新增链接": "Insert Link", "外部链接": "Embed", "查找": "Find",
    "格式": "Format", "加粗": "Bold", "倾斜": "Italic", "删除线": "Strikethrough",
    "高亮": "Highlight", "代码": "Code", "数学": "Math", "注释": "Comment", "清除格式": "Clear Formatting",
    "段落": "Paragraph", "无序列表": "Bullet List", "有序列表": "Numbered List", "任务列表": "Checklist",
    "正文": "Normal Text", "引用": "Quote", "插入": "Insert",
    "脚注": "Footnote", "表格": "Table", "分隔线": "Horizontal Rule", "代码块": "Code Block", "数学块": "Math Block",
    "替换": "Replace", "移除加粗": "Remove Bold", "移除倾斜": "Remove Italic", "移除删除线": "Remove Strikethrough",
    "移除高亮": "Remove Highlight", "移除行内代码": "Remove Inline Code",
    "链接留文本": "Link to Text", "链接留URL": "Link to URL", "wiki留文本": "Wiki to Text",
    "去HTML标签": "Strip HTML", "合并空行": "Merge Blank Lines", "去行首空白": "Trim Leading Space",
    "全角转半角": "Fullwidth to Half",
    "剪贴板": "Clipboard", "剪切": "Cut", "复制": "Copy", "粘贴": "Paste", "纯文本粘贴": "Paste Plain", "全选": "Select All",
    "原生菜单": "Native Menu", "设置": "Settings",
    "编辑器右键菜单设置": "Editor Context Menu Settings", "恢复默认": "Reset to Default",
    "实时预览": "Live Preview", "启用增强菜单（关闭则用原生右键）": "Enable enhanced menu (disable for native menu)",
    "显示分组标题": "Show group labels", "删除组": "Delete Group",
    "添加选项": "Add Option", "添加分组": "Add Group",
    "图标": "Icon", "名称": "Name", "类型": "Type", "操作": "Action", "背景": "BG", "文字": "FG",
    "关闭编辑器增强菜单": "Disable Editor Enhanced Menu", "启用编辑器增强菜单": "Enable Editor Enhanced Menu",
    "已启用编辑器增强菜单": "Editor enhanced menu enabled", "已关闭编辑器增强菜单": "Editor enhanced menu disabled",
    "已关闭增强菜单。重新启用：命令面板(Ctrl+P)搜「编辑器右键菜单设置」": "Enhanced menu disabled. Re-enable via Command Palette (Ctrl+P) search \"Editor Context Menu Settings\"",
    "关闭": "Close", "关闭其他": "Close Others", "关闭右侧": "Close to Right", "全部关闭": "Close All",
    "取消锁定": "Unpin", "锁定": "Pin", "阅读/源码": "Reading/Source",
    "左右分屏": "Split Vertical", "上下分屏": "Split Horizontal", "新窗口": "New Window",
    "默认应用": "Default App", "外部编辑器": "External Editor", "资源管理器": "Reveal in Explorer",
    "局部图": "Local Graph", "反链": "Backlinks", "出链": "Outgoing Links", "大纲": "Outline",
    "重命名": "Rename", "取消置顶": "Unpin", "置顶": "Pin", "创建副本": "Duplicate",
    "绝对路径": "Absolute Path", "相对路径": "Relative Path", "md链接": "MD Link", "wikilink": "Wikilink",
    "导出PDF": "Export PDF", "删除": "Delete", "新标签页": "New Tab",
    "新建文件夹": "New Folder", "新建文件": "New File",
    "无法获取编辑器": "Cannot get editor", "请先选中文本": "Please select text first",
    "正则错误：": "Regex error: ", "未知转换：": "Unknown transform: ",
    "命令不存在：": "Command not found: ",
    "输入编辑器路径": "Enter editor path", "打开": "Open",
    "如 C:\\Program Files\\Microsoft VS Code\\Code.exe": "e.g. C:\\Program Files\\Microsoft VS Code\\Code.exe",
    "不支持此环境": "Environment not supported", "打开失败：": "Open failed: ",
    "已用 ": "Opened with ", " 打开": "",
    "已取消移动": "Move cancelled", "无法关闭此面板": "Cannot close this pane",
    "移动至新窗口": "Move to new window", "局部关系图": "Local graph", "反向链接": "Backlinks", "出链": "Outgoing links",
    "图标/svg/文字": "Icon/SVG/Text", "命令ID，如 editor:toggle-bold": "Command ID, e.g. editor:toggle-bold",
    "正则": "Regex", "替换 \\n=换行": "Replace \\n=newline", "标志": "Flags",
    "转换名，如 fullwidthToHalf": "Transform name, e.g. fullwidthToHalf",
    "lucide 图标名 / 粘贴 <svg> 代码 / 任意文字（识别不到则按文字显示）": "Lucide icon name / paste <svg> code / any text (shown as text if not found)",
    "tile 鼠标悬停时显示的提示文字": "Tooltip text on hover",
    "cmd=执行命令  regex=正则替换选中文本  custom=预设转换": "cmd=execute command  regex=regex replace selection  custom=preset transform",
    "拖动调整大小": "Drag to resize", "拖动调整面板宽高，分组自动重排": "Drag to resize panel, groups auto-reflow",
    "文件上移": "Move Up", "移动到…": "Move to…",
    "删除 ": "Delete ", " 个": " file(s)",
    "重命名失败：": "Rename failed: ", "创建失败：": "Create failed: ",
    "新文件夹": "New Folder", "新笔记": "New Note",
    "无法在新窗口打开：": "Cannot open in new window: ", "无法打开：": "Cannot open: ",
    "无法打开资源管理器：": "Cannot reveal in explorer: ",
    "已复制 [[wikilink]]": "Copied [[wikilink]]", "已复制 Markdown 链接": "Copied Markdown link",
    " 副本.": " copy.", " 副本 ": " copy ",
    "已创建副本：": "Duplicate created: ", "创建副本失败：": "Duplicate failed: ",
    "上移完成：成功 ": "Move up done: ", "，失败 ": ", failed ",
    "移动模式：点击目标文件夹移动 ": "Move mode: click target folder to move ",
    "（Esc 取消）": " (Esc to cancel)",
    "移动完成：成功 ": "Move done: ", " 到 ": " to ", "根目录": "root",
    "新选项": "New Option", "新分组": "New Group",
    "+ 添加选项": "+ Add Option", "+ 添加分组": "+ Add Group",
    "删除该选项": "Delete this option",
    "阅读视图": "Reading View", "导出": "Export",
    "已删除 ": "Deleted ", " 项": " item(s)",
    "确认删除": "Confirm Delete", "确定要删除 ": "Delete ",
    " 个文件吗？": " files?", "取消": "Cancel",
    "撤销删除": "Undo Delete", "已恢复 ": "Restored ", "恢复失败": "Restore failed",
    "已复制路径": "Path copied", "已复制绝对路径": "Absolute path copied",
    "已复制相对路径": "Relative path copied",
    "已取消置顶": "Unpinned", "已置顶": "Pinned",
    "当前环境不支持": "Environment not supported",
    "已复制 ": "Copied ", "已复制：": "Copied: ", "复制失败：": "Copy failed: ",
    " 个文件": " files",
};
const t = (zh) => _isZh() ? zh : (I18N_EN[zh] || zh);

const MOVE_MODE_BODY_CLASS = "file-ops-plus-move-mode";

const GROUP_COLORS = {
    accent: { label: t("蓝"), bg: "#E6F1FB", fg: "#0C447C" },
    pro: { label: t("紫"), bg: "#EEEDFE", fg: "#3C3489" },
    success: { label: t("绿"), bg: "#EAF3DE", fg: "#27500A" },
    warning: { label: t("橙"), bg: "#FAEEDA", fg: "#854F0B" },
    regex: { label: t("红"), bg: "#FDE8E0", fg: "#B23A1A" },
    neutral: { label: t("灰"), bg: "var(--background-primary)", fg: "var(--text-muted)" },
};

function autoContrast(color) {
    if (!color || !color.startsWith("#") || color.length < 7) return "var(--text-normal)";
    const r = parseInt(color.substr(1, 2), 16), g = parseInt(color.substr(3, 2), 16), b = parseInt(color.substr(5, 2), 16);
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.55 ? "#1a1a1a" : "#fff";
}

const CUSTOM_TRANSFORMS = {
    fullwidthToHalf: (s) => s.replace(/[，。；：！？]/g, (c) => ({ "，": ",", "。": ".", "；": ";", "：": ":", "！": "!", "？": "?" }[c])),
    toggleChecklist: (s) => s ? s.split("\n").map(l => "- [ ] " + l.replace(/^(\s*)[-*]\s*(\[[ xX]\]\s*)?/, "$1")).join("\n") : "- [ ] ",
    toggleHeading1: (s) => s ? s.split("\n").map(l => "# " + l.replace(/^#+\s*/, "")).join("\n") : "# ",
    toggleHeading2: (s) => s ? s.split("\n").map(l => "## " + l.replace(/^#+\s*/, "")).join("\n") : "## ",
    toggleHeading3: (s) => s ? s.split("\n").map(l => "### " + l.replace(/^#+\s*/, "")).join("\n") : "### ",
    toggleHeading4: (s) => s ? s.split("\n").map(l => "#### " + l.replace(/^#+\s*/, "")).join("\n") : "#### ",
    toggleHeading5: (s) => s ? s.split("\n").map(l => "##### " + l.replace(/^#+\s*/, "")).join("\n") : "##### ",
    toggleHeading6: (s) => s ? s.split("\n").map(l => "###### " + l.replace(/^#+\s*/, "")).join("\n") : "###### ",
    toggleParagraph: (s) => s ? s.split("\n").map(l => l.replace(/^#{1,6}\s*/, "").replace(/^[-*+]\s*\[[ xX]\]\s*/, "").replace(/^[-*+]\s+/, "").replace(/^>\s*/, "")).join("\n") : "",
    toggleCodeblock: (s) => s ? "```\n" + s + "\n```" : "```\n\n```",
    toggleMathblock: (s) => s ? "$$\n" + s + "\n$$" : "$$\n\n$$",
};

const EDITOR_MENU_CSS = `
.fop-em-panel{position:fixed;z-index:9999;background:var(--background-secondary);border:1px solid var(--background-modifier-border);border-radius:10px;padding:10px;box-shadow:0 4px 16px rgba(0,0,0,.2);font-size:var(--font-ui-small);box-sizing:border-box;}
.fop-em-row{display:flex;flex-direction:column;gap:6px;}
.fop-em-group-label{font-size:10px;margin-bottom:4px;padding-left:2px;}
.fop-em-grid{display:flex;flex-wrap:wrap;gap:3px;}
.fop-em-tile{min-width:var(--fop-tile-sz,28px);height:var(--fop-tile-sz,28px);display:flex;align-items:center;justify-content:center;border-radius:6px;cursor:pointer;font-size:calc(var(--fop-tile-sz,28px)*0.42);overflow:visible;padding:0 4px;box-sizing:border-box;}
.fop-em-tile svg{width:calc(var(--fop-tile-sz,28px)*0.58);height:calc(var(--fop-tile-sz,28px)*0.58);}
.fop-em-resize{position:absolute;right:0;bottom:0;width:14px;height:14px;cursor:nwse-resize;opacity:.35;background:linear-gradient(135deg,transparent 45%,currentColor 46%,currentColor 54%,transparent 55%);}
.fop-em-resize:hover{opacity:.7;}
.fop-em-tile:hover{filter:brightness(.92);}
.fop-em-tile[data-c="accent"]{background:#E6F1FB;color:#0C447C;}
.fop-em-tile[data-c="pro"]{background:#EEEDFE;color:#3C3489;}
.fop-em-tile[data-c="success"]{background:#EAF3DE;color:#27500A;}
.fop-em-tile[data-c="warning"]{background:#FAEEDA;color:#854F0B;}
.fop-em-tile[data-c="regex"]{background:#FDE8E0;color:#B23A1A;}
.fop-em-tile[data-c="neutral"]{background:var(--background-primary);color:var(--text-muted);border:0.5px solid var(--background-modifier-border);}
@media(prefers-color-scheme:dark){
.fop-em-tile[data-c="accent"]{background:#0C447C;color:#B5D4F4;}
.fop-em-tile[data-c="pro"]{background:#3C3489;color:#CECBF6;}
.fop-em-tile[data-c="success"]{background:#27500A;color:#C0DD97;}
.fop-em-tile[data-c="warning"]{background:#854F0B;color:#FAC775;}
.fop-em-tile[data-c="regex"]{background:#5A1A0A;color:#F0B09A;}
}
`;

const DEFAULT_EDITOR_MENU = {
    enabled: true,
    showGroupLabels: true,
    groups: [
        { id: "link", label: t("链接"), color: "accent", items: [
            { icon: "link", label: t("新增链接"), type: "cmd", cmd: "editor:insert-link" },
            { icon: "external-link", label: t("外部链接"), type: "cmd", cmd: "editor:insert-embed" },
            { icon: "search", label: t("查找"), type: "cmd", cmd: "editor:open-search" },

        ]},
        { id: "format", label: t("格式"), color: "pro", items: [
            { icon: "bold", label: t("加粗"), type: "cmd", cmd: "editor:toggle-bold" },
            { icon: "italic", label: t("倾斜"), type: "cmd", cmd: "editor:toggle-italics" },
            { icon: "strikethrough", label: t("删除线"), type: "cmd", cmd: "editor:toggle-strikethrough" },
            { icon: "highlighter", label: t("高亮"), type: "cmd", cmd: "editor:toggle-highlight" },
            { icon: "code", label: t("代码"), type: "cmd", cmd: "editor:toggle-code" },
            { icon: "square-sigma", label: t("数学"), type: "cmd", cmd: "editor:toggle-inline-math" },
            { icon: "message-square", label: t("注释"), type: "cmd", cmd: "editor:toggle-comments" },
            { icon: "remove-formatting", label: t("清除格式"), type: "cmd", cmd: "editor:clear-formatting" },
        ]},
        { id: "paragraph", label: t("段落"), color: "success", items: [
            { icon: "list", label: t("无序列表"), type: "cmd", cmd: "editor:toggle-bullet-list" },
            { icon: "list-ordered", label: t("有序列表"), type: "cmd", cmd: "editor:toggle-numbered-list" },
            { icon: "list-checks", label: t("任务列表"), type: "custom", custom: "toggleChecklist" },
            { icon: "heading-1", label: "H1", type: "custom", custom: "toggleHeading1" },
            { icon: "heading-2", label: "H2", type: "custom", custom: "toggleHeading2" },
            { icon: "heading-3", label: "H3", type: "custom", custom: "toggleHeading3" },
            { icon: "heading-4", label: "H4", type: "custom", custom: "toggleHeading4" },
            { icon: "heading-5", label: "H5", type: "custom", custom: "toggleHeading5" },
            { icon: "heading-6", label: "H6", type: "custom", custom: "toggleHeading6" },
            { icon: "align-left", label: t("正文"), type: "custom", custom: "toggleParagraph" },
            { icon: "quote", label: t("引用"), type: "cmd", cmd: "editor:toggle-blockquote" },
        ]},
        { id: "insert", label: t("插入"), color: "warning", items: [
            { icon: "footprints", label: t("脚注"), type: "cmd", cmd: "editor:insert-footnote" },
            { icon: "table", label: t("表格"), type: "cmd", cmd: "editor:insert-table" },
            { icon: "square-minus", label: t("分隔线"), type: "cmd", cmd: "editor:insert-horizontal-rule" },
            { icon: "code", label: t("代码块"), type: "custom", custom: "toggleCodeblock" },
            { icon: "square-sigma", label: t("数学块"), type: "custom", custom: "toggleMathblock" },
        ]},
        { id: "regex", label: t("替换"), color: "regex", items: [
            { icon: "remove-formatting", label: t("移除加粗"), type: "regex", pattern: "\\*\\*(.+?)\\*\\*", replacement: "$1", flags: "g" },
            { icon: "remove-formatting", label: t("移除倾斜"), type: "regex", pattern: "\\*([^*]+)\\*", replacement: "$1", flags: "g" },
            { icon: "remove-formatting", label: t("移除删除线"), type: "regex", pattern: "~~(.+?)~~", replacement: "$1", flags: "g" },
            { icon: "remove-formatting", label: t("移除高亮"), type: "regex", pattern: "==(.+?)==", replacement: "$1", flags: "g" },
            { icon: "remove-formatting", label: t("移除行内代码"), type: "regex", pattern: "`([^`]+)`", replacement: "$1", flags: "g" },
            { icon: "unlink", label: t("链接留文本"), type: "regex", pattern: "\\[([^\\]]+)\\]\\([^)]+\\)", replacement: "$1", flags: "g" },
            { icon: "external-link", label: t("链接留URL"), type: "regex", pattern: "\\[([^\\]]+)\\]\\(([^)]+)\\)", replacement: "$2", flags: "g" },
            { icon: "unlink", label: t("wiki留文本"), type: "regex", pattern: "\\[\\[([^\\]|]+)(\\|[^\\]]+)?\\]\\]", replacement: "$1", flags: "g" },
            { icon: "code", label: t("去HTML标签"), type: "regex", pattern: "<[^>]+>", replacement: "", flags: "g" },
            { icon: "squircle", label: t("合并空行"), type: "regex", pattern: "\\n{3,}", replacement: "\\n\\n", flags: "g" },
            { icon: "align-left", label: t("去行首空白"), type: "regex", pattern: "^[ \\t]+", replacement: "", flags: "gm" },
            { icon: "case-sensitive", label: t("全角转半角"), type: "custom", custom: "fullwidthToHalf" },
        ]},
        { id: "mark", label: t("高亮"), color: "warning", items: [
            { icon: "highlighter", label: t("黄"), type: "regex", pattern: '([\\s\\S]+)', replacement: '<mark style="background:#FFF3A3">$1</mark>', flags: "", color: "#FFF3A3|#5a4a00" },
            { icon: "highlighter", label: t("红"), type: "regex", pattern: '([\\s\\S]+)', replacement: '<mark style="background:#FFB3B3">$1</mark>', flags: "", color: "#FFB3B3|#7a0000" },
            { icon: "highlighter", label: t("绿"), type: "regex", pattern: '([\\s\\S]+)', replacement: '<mark style="background:#B3FFB3">$1</mark>', flags: "", color: "#B3FFB3|#006600" },
            { icon: "highlighter", label: t("蓝"), type: "regex", pattern: '([\\s\\S]+)', replacement: '<mark style="background:#B3D9FF">$1</mark>', flags: "", color: "#B3D9FF|#003a7a" },
            { icon: "highlighter", label: t("粉"), type: "regex", pattern: '([\\s\\S]+)', replacement: '<mark style="background:#FFB3D9">$1</mark>', flags: "", color: "#FFB3D9|#7a0033" },
            { icon: "highlighter", label: t("橙"), type: "regex", pattern: '([\\s\\S]+)', replacement: '<mark style="background:#FFD9B3">$1</mark>', flags: "", color: "#FFD9B3|#7a4500" },
            { icon: "highlighter", label: t("紫"), type: "regex", pattern: '([\\s\\S]+)', replacement: '<mark style="background:#D9B3FF">$1</mark>', flags: "", color: "#D9B3FF|#3a0066" },
            { icon: "highlighter", label: t("青"), type: "regex", pattern: '([\\s\\S]+)', replacement: '<mark style="background:#B3FFFF">$1</mark>', flags: "", color: "#B3FFFF|#006666" },
        ]},
        { id: "clipboard", label: t("剪贴板"), color: "neutral", items: [
            { icon: "scissors", label: t("剪切"), type: "cmd", cmd: "editor:cut" },
            { icon: "copy", label: t("复制"), type: "cmd", cmd: "editor:copy" },
            { icon: "clipboard", label: t("粘贴"), type: "cmd", cmd: "editor:paste" },
            { icon: "clipboard-list", label: t("纯文本粘贴"), type: "cmd", cmd: "editor:paste-plain" },
            { icon: "check-line", label: t("全选"), type: "cmd", cmd: "editor:select-all" },
        ]},
    ],
};


class FileOpsPlusPlugin extends Plugin {
    constructor(app, manifest) {
        super(app, manifest);
        this.contextMenuHandler = null;
        this.moveClickHandler = null;
        this.moveKeyHandler = null;
        this.moveNotice = null;
    }

    async onload() {
        const data = (await this.loadData()) || {};
        if (data.colors) {
            this.colorMap = data.colors;
            this.pinSet = new Set(data.pins || []);
            this.boldSet = new Set(data.bolds || []);
        } else {
            this.colorMap = data;
            this.pinSet = new Set();
            this.boldSet = new Set();
        }
        this.editorMenuConfig = data.editorMenu ? data.editorMenu : JSON.parse(JSON.stringify(DEFAULT_EDITOR_MENU));
        if (data.editorMenu) {
            if (this.editorMenuConfig.showGroupLabels === undefined) this.editorMenuConfig.showGroupLabels = true;
            const existingIds = (this.editorMenuConfig.groups || []).map(g => g.id);
            const removed = this.editorMenuConfig.removedDefaults || [];
            for (const dg of DEFAULT_EDITOR_MENU.groups) {
                if (!existingIds.includes(dg.id) && !removed.includes(dg.id)) this.editorMenuConfig.groups.push(JSON.parse(JSON.stringify(dg)));
            }
            let needSave = false;
            for (const grp of this.editorMenuConfig.groups) {
                if (!grp.items) continue;
                const dg = DEFAULT_EDITOR_MENU.groups.find(g => g.id === grp.id);
                if (!dg) continue;
                for (const item of grp.items) {
                    const di = dg.items.find(i => i.label === item.label);
                    if (!di) continue;
                    if (item.type !== di.type || (item.type === "cmd" && di.type === "cmd" && item.cmd !== di.cmd)) {
                        item.type = di.type; item.custom = di.custom; item.cmd = di.cmd; needSave = true;
                    }
                }
            }
            if (needSave) this.saveEditorMenuConfig();
        }
        if (!document.getElementById("fop-em-style")) {
            const s = document.createElement("style");
            s.id = "fop-em-style";
            s.textContent = EDITOR_MENU_CSS;
            document.head.appendChild(s);
        }
        this.contextMenuHandler = (evt) => this.onContextMenu(evt);
        document.addEventListener("contextmenu", this.contextMenuHandler, { capture: true });
        this.colorInterval = window.setInterval(() => this.applyColors(), 500);
        this.applyColors();
        this.registerEvent(this.app.workspace.on("active-leaf-change", (leaf) => this.onActiveLeafChange(leaf)));

        this.addCommand({
            id: "open-editor-menu-settings",
            name: t("编辑器右键菜单设置"),
            callback: () => this.openEditorMenuSettings(),
        });

    }

    onunload() {
        if (this.contextMenuHandler) {
            document.removeEventListener("contextmenu", this.contextMenuHandler, { capture: true });
        }
        if (this.colorInterval) window.clearInterval(this.colorInterval);
        if (this.revealTimer) clearTimeout(this.revealTimer);
        this.cancelMoveMode();
    }

    onContextMenu(evt) {
        const tabHeader = evt.target.closest(".workspace-tab-header");
        if (tabHeader) {
            evt.preventDefault();
            evt.stopPropagation();
            this.showTabMenu(evt.clientX, evt.clientY, tabHeader);
            return;
        }
        const editorEl = evt.target.closest(".cm-editor, .markdown-source-view");
        if (editorEl) {
            if (this._skipEditorMenu) { this._skipEditorMenu = false; return; }
            if (!this.editorMenuConfig || this.editorMenuConfig.enabled === false) return;
            const leaf = this.app.workspace.activeLeaf;
            const view = leaf && leaf.view;
            if (view && view.getViewType && view.getViewType() === "markdown" && view.editor) {
                evt.preventDefault();
                evt.stopPropagation();
                this.showEditorMenu(evt.clientX, evt.clientY, view);
                return;
            }
        }
        const fileEl = evt.target.closest(".nav-file-title, .nav-folder-title");
        if (!fileEl) return;
        evt.preventDefault();
        evt.stopPropagation();

        const path = fileEl.getAttribute("data-path");
        const file = this.app.vault.getAbstractFileByPath(path);
        if (!file) return;

        let selectedFiles = [];
        const selectedEls = document.querySelectorAll(".nav-file-title.is-selected");
        if (selectedEls.length > 1) {
            selectedFiles = Array.from(selectedEls)
                .map((el) => this.app.vault.getAbstractFileByPath(el.getAttribute("data-path")))
                .filter((f) => f instanceof TFile);
        }
        if (selectedFiles.length === 0 && file instanceof TFile) {
            selectedFiles = [file];
        }
        this.showCustomMenu(evt.clientX, evt.clientY, file, selectedFiles);
    }

    showTabMenu(x, y, tabHeader) {
        const leafId = tabHeader.getAttribute("data-leaf-id");
        let leaf = null;
        if (leafId && typeof this.app.workspace.getLeafById === "function") {
            leaf = this.app.workspace.getLeafById(leafId);
        }
        if (!leaf) leaf = this.app.workspace.activeLeaf;
        let file = null;
        if (leaf) {
            file = leaf.file || (leaf.view && leaf.view.file) || null;
        }
        if (!file) {
            const titleEl = tabHeader.querySelector(".workspace-tab-header-inner-title");
            if (titleEl) {
                const name = titleEl.textContent.replace(/\.md$/, "");
                const files = this.app.vault.getMarkdownFiles().filter((f) => f.basename === name);
                if (files.length > 0) file = files[0];
            }
        }

        const existing = document.querySelector(".file-ops-plus-menu");
        if (existing) existing.remove();

        const menu = document.createElement("div");
        menu.className = "file-ops-plus-menu";
        menu.style.cssText =
            "position:fixed;left:" + x + "px;top:" + y + "px;" +
            "background:var(--background-secondary);" +
            "border:1px solid var(--background-modifier-border);" +
            "border-radius:8px;padding:4px;z-index:9999;" +
            "box-shadow:0 4px 16px rgba(0,0,0,0.2);" +
            "font-size:var(--font-ui-small);";

        const addRow = (items, accent) => {
            const row = document.createElement("div");
            row.style.cssText = "display:flex;gap:2px;" +
                (accent ? "padding:3px;background:var(--background-primary);border:1px solid var(--background-modifier-border);border-radius:5px;margin:2px 0;" : "");
            for (const item of items) {
                const btn = document.createElement("div");
                btn.style.cssText =
                    "padding:6px 8px;border-radius:4px;cursor:pointer;text-align:center;" +
                    "white-space:nowrap;" +
                    (accent
                        ? "color:var(--interactive-accent);font-size:var(--font-ui-smaller);"
                        : "color:var(--text-normal);");
                if (item.danger) btn.style.color = "var(--text-error)";
                btn.textContent = item.title;
                btn.addEventListener("mouseenter", () => (btn.style.background = "var(--background-modifier-hover)"));
                btn.addEventListener("mouseleave", () => (btn.style.background = "transparent"));
                if (item.inline) {
                    btn.addEventListener("click", () => item.fn(menu, row));
                } else {
                    btn.addEventListener("click", () => { menu.remove(); item.fn(); });
                }
                row.appendChild(btn);
            }
            menu.appendChild(row);
            return row;
        };

        const isPinned = leaf && leaf.pinned;
        const safeDetach = (l) => {
            if (!l || !l.view) return;
            const vt = l.view.getViewType ? l.view.getViewType() : "";
            if (vt === "file-explorer" || vt === "sidebar" || vt === "backlink" || vt === "tag") {
                new Notice(t("无法关闭此面板"));
                return;
            }
            l.detach();
        };
        addRow([
            { title: t("关闭"), fn: () => safeDetach(leaf) },
            { title: t("关闭其他"), fn: () => this.closeOtherTabs(leaf) },
            { title: t("关闭右侧"), fn: () => this.closeRightTabs(leaf) },
            { title: t("全部关闭"), fn: () => this.closeAllTabs(leaf) },
            { title: isPinned ? t("取消锁定") : t("锁定"), fn: () => leaf.setPinned(!isPinned) },
        ]);

        addRow([
            { title: t("阅读/源码"), fn: () => this.execOnLeaf(leaf, ["markdown:toggle-preview", "obsidian:toggle-preview"], t("阅读视图")) },
            { title: t("左右分屏"), fn: () => this.execOnLeaf(leaf, ["workspace:split-vertical"], t("左右分屏")) },
            { title: t("上下分屏"), fn: () => this.execOnLeaf(leaf, ["workspace:split-horizontal"], t("上下分屏")) },
            { title: t("新窗口"), fn: () => this.execOnLeaf(leaf, ["workspace:move-to-new-window"], t("移动至新窗口")) },
        ]);

        if (file instanceof TFile) {
            addRow([
                { title: t("默认应用"), fn: () => this.openWithDefaultApp(file) },
                { title: t("外部编辑器"), fn: () => this.openWithExternalEditor(file) },
                { title: t("资源管理器"), fn: () => this.revealInExplorer(file) },
            ]);

            addRow([
                { title: t("局部图"), fn: () => this.execOnLeaf(leaf, ["graph:open-local", "graph:open"], t("局部关系图")) },
                { title: t("反链"), fn: () => this.execOnLeaf(leaf, ["backlink:open", "backlink:open-tab"], t("反向链接")) },
                { title: t("出链"), fn: () => this.execOnLeaf(leaf, ["outgoing-link:open", "outgoing-link:open-tab", "outgoing-links:open"], t("出链")) },

                { title: t("大纲"), fn: () => this.execOnLeaf(leaf, ["outline:open", "outline:open-tab"], t("大纲")) },
            ]);

            const renameItem = { title: t("重命名"), inline: true, fn: (m, r) => this.renameInline(m, r, file) };
            const pinTitle = this.pinSet.has(file.path) ? t("取消置顶") : t("置顶");
            addRow([
                renameItem,
                { title: t("创建副本"), fn: () => this.createDuplicate(file) },
                { title: pinTitle, fn: () => this.togglePin(file) },
            ]);

            addRow([
                { title: t("绝对路径"), fn: () => this.copyAbsolutePath([file]) },
                { title: t("相对路径"), fn: () => this.copyRelativePath([file]) },
                { title: "wikilink", fn: () => this.copyAsWikilink(file) },
                { title: t("md链接"), fn: () => this.copyAsMarkdownLink(file) },
            ]);

            addRow([
                { title: t("查找"), fn: () => this.execOnLeaf(leaf, ["editor:open-search", "editor:find"], t("查找")) },
                { title: t("替换"), fn: () => this.execOnLeaf(leaf, ["editor:open-replace", "editor:replace"], t("替换")) },
                { title: t("导出PDF"), fn: () => this.execOnLeaf(leaf, ["markdown:export-pdf", "obsidian:export-pdf"], t("导出")) },
            ]);

            this.addColorRow(menu, file);

            addRow([
                { title: t("删除"), fn: () => this.deleteFiles([file]), danger: true },
            ]);
        }

        document.body.appendChild(menu);

        const rect = menu.getBoundingClientRect();
        if (x + rect.width > window.innerWidth - 10) menu.style.left = window.innerWidth - rect.width - 10 + "px";
        if (y + rect.height > window.innerHeight - 10) menu.style.top = window.innerHeight - rect.height - 10 + "px";

        const closeHandler = (e) => {
            if (!menu.contains(e.target)) { menu.remove(); cleanup(); }
        };
        const escHandler = (e) => {
            if (e.key === "Escape") {
                if (e.target.tagName === "INPUT") return;
                menu.remove(); cleanup();
            }
        };
        const cleanup = () => {
            document.removeEventListener("mousedown", closeHandler, true);
            document.removeEventListener("keydown", escHandler, true);
        };
        setTimeout(() => {
            document.addEventListener("mousedown", closeHandler, true);
            document.addEventListener("keydown", escHandler, true);
        }, 0);
    }

    closeOtherTabs(leaf) {
        if (!leaf) return;
        const group = leaf.parent;
        const leaves = this.app.workspace.getLeavesOfType("markdown");
        for (const l of leaves) {
            if (l !== leaf && l.parent === group && !l.pinned) l.detach();
        }
    }

    closeRightTabs(leaf) {
        if (!leaf) return;
        const group = leaf.parent;
        const leaves = this.app.workspace.getLeavesOfType("markdown").filter((l) => l.parent === group);
        const idx = leaves.indexOf(leaf);
        if (idx < 0) return;
        for (let i = leaves.length - 1; i > idx; i--) {
            if (!leaves[i].pinned) leaves[i].detach();
        }
    }

    closeAllTabs(leaf) {
        if (!leaf) return;
        const group = leaf.parent;
        const leaves = this.app.workspace.getLeavesOfType("markdown");
        for (const l of leaves) {
            if (l.parent === group && !l.pinned) l.detach();
        }
    }

    execOnLeaf(leaf, cmdIds, nameKeyword) {
        if (!leaf) return;
        this.app.workspace.setActiveLeaf(leaf, false);
        const cmds = this.app.commands.commands;
        const ids = Array.isArray(cmdIds) ? cmdIds : [cmdIds];
        for (const id of ids) {
            if (cmds[id]) {
                this.app.commands.executeCommandById(id);
                return;
            }
        }
        if (nameKeyword) {
            const match = Object.values(cmds).find((c) => c.name && c.name.includes(nameKeyword));
            if (match) this.app.commands.executeCommandById(match.id);
        }
    }

    onActiveLeafChange(leaf) {
        if (this.revealTimer) clearTimeout(this.revealTimer);
        if (!leaf) return;
        const file = leaf.file || (leaf.view && leaf.view.file) || null;
        if (!file || !(file instanceof TFile)) return;
        const path = file.path;
        if (this.lastRevealedPath === path) return;
        this.lastRevealedPath = path;
        this.revealTimer = setTimeout(() => this.revealFileByPath(path), 300);
    }

    revealFileByPath(path) {
        const file = this.app.vault.getAbstractFileByPath(path);
        if (!file || !(file instanceof TFile)) return;
        const explorers = this.app.workspace.getLeavesOfType("file-explorer");
        if (explorers.length === 0) return;
        for (const explorer of explorers) {
            const view = explorer.view;
            if (view && typeof view.revealFile === "function") {
                try { view.revealFile(file); } catch (e) {}
            }
        }
        const cmds = this.app.commands.commands;
        const revealCmd = cmds["file-explorer:reveal-active-file"] || cmds["obsidian:reveal-active-file"];
        if (revealCmd) {
            try { this.app.commands.executeCommandById(revealCmd.id); } catch (e) {}
        }
        const titleEl = document.querySelector('.nav-file-title[data-path="' + path.replace(/"/g, '\\"') + '"]');
        if (titleEl) titleEl.scrollIntoView({ block: "center", behavior: "smooth" });
    }


    showCustomMenu(x, y, file, files) {
        const existing = document.querySelector(".file-ops-plus-menu");
        if (existing) existing.remove();

        const menu = document.createElement("div");
        menu.className = "file-ops-plus-menu";
        menu.style.cssText =
            "position:fixed;left:" + x + "px;top:" + y + "px;" +
            "background:var(--background-secondary);" +
            "border:1px solid var(--background-modifier-border);" +
            "border-radius:8px;padding:4px;z-index:9999;" +
            "box-shadow:0 4px 16px rgba(0,0,0,0.2);" +
            "font-size:var(--font-ui-small);";

        const isFile = file instanceof TFile;
        const multi = files.length > 1;
        const allTargets = files.length > 0 ? files : [file];

        const addRow = (items, accent) => {
            const row = document.createElement("div");
            row.style.cssText = "display:flex;gap:2px;" +
                (accent ? "padding:3px;background:var(--background-primary);border:1px solid var(--background-modifier-border);border-radius:5px;margin:2px 0;" : "");
            for (const item of items) {
                const btn = document.createElement("div");
                btn.style.cssText =
                    "padding:6px 8px;border-radius:4px;cursor:pointer;text-align:center;" +
                    "white-space:nowrap;" +
                    (accent
                        ? "color:var(--interactive-accent);font-size:var(--font-ui-smaller);"
                        : "color:var(--text-normal);");
                if (item.danger) btn.style.color = "var(--text-error)";
                btn.textContent = item.title;
                btn.addEventListener("mouseenter", () => (btn.style.background = "var(--background-modifier-hover)"));
                btn.addEventListener("mouseleave", () => (btn.style.background = "transparent"));
                if (item.inline) {
                    btn.addEventListener("click", () => item.fn(menu, row));
                } else {
                    btn.addEventListener("click", () => { menu.remove(); item.fn(); });
                }
                row.appendChild(btn);
            }
            menu.appendChild(row);
            return row;
        };

        const renameItem = { title: t("重命名"), inline: true, fn: (m, r) => this.renameInline(m, r, file) };
        const pinTitle = this.pinSet.has(file.path) ? t("取消置顶") : t("置顶");
        const pinItem = { title: pinTitle, fn: () => this.togglePin(file) };
        const revealItem = { title: t("资源管理器"), fn: () => this.revealInExplorer(file) };
        const editorItem = { title: t("外部编辑器"), fn: () => this.openWithExternalEditor(file) };
        const wikilinkItem = { title: "wikilink", fn: () => this.copyAsWikilink(file) };
        const mdLinkItem = { title: t("md链接"), fn: () => this.copyAsMarkdownLink(file) };

        if (isFile && !multi) {
            addRow([
                { title: t("新标签页"), fn: () => this.app.workspace.getLeaf().openFile(file) },
                { title: t("新窗口"), fn: () => this.openInNewWindow(file) },
                { title: t("默认应用"), fn: () => this.openWithDefaultApp(file) },
                editorItem,
                revealItem,
            ]);
            addRow([
                renameItem,
                { title: t("创建副本"), fn: () => this.createDuplicate(file) },
                pinItem,
            ]);
            addRow([
                { title: t("绝对路径"), fn: () => this.copyAbsolutePath(allTargets) },
                { title: t("相对路径"), fn: () => this.copyRelativePath(allTargets) },
                wikilinkItem,
                mdLinkItem,
            ]);
        } else if (!multi) {
            const newFolderItem = { title: t("新建文件夹"), inline: true, fn: (m, r) => this.createInline(m, r, file, true) };
            const newFileItem = { title: t("新建文件"), inline: true, fn: (m, r) => this.createInline(m, r, file, false) };
            addRow([newFolderItem, newFileItem]);
            addRow([
                renameItem,
                pinItem,
                revealItem,
            ]);
            addRow([
                { title: t("绝对路径"), fn: () => this.copyAbsolutePath(allTargets) },
                { title: t("相对路径"), fn: () => this.copyRelativePath(allTargets) },
                wikilinkItem,
                mdLinkItem,
            ]);
        } else {
            addRow([
                { title: t("绝对路径"), fn: () => this.copyAbsolutePath(allTargets) },
                { title: t("相对路径"), fn: () => this.copyRelativePath(allTargets) },
            ]);
        }

        if (isFile && files.length > 0) {
            addRow([
                { title: t("复制"), fn: () => this.copyFilesToClipboard(files) },
                { title: t("文件上移"), fn: () => this.moveFilesUp(files) },
                { title: t("移动到…"), fn: () => this.startMoveMode(files) },
            ], true);
        }

        if (!multi) {
            this.addColorRow(menu, file);
        }

        addRow([
            { title: multi ? t("删除 ") + files.length + t(" 个") : t("删除"), fn: () => this.deleteFiles(allTargets), danger: true },
            { title: this.editorMenuConfig.enabled !== false ? t("关闭编辑器增强菜单") : t("启用编辑器增强菜单"), fn: () => { this.editorMenuConfig.enabled = this.editorMenuConfig.enabled === false; this.saveEditorMenuConfig(); new Notice(this.editorMenuConfig.enabled ? t("已启用编辑器增强菜单") : t("已关闭编辑器增强菜单")); } },
        ]);

        document.body.appendChild(menu);

        const rect = menu.getBoundingClientRect();
        if (x + rect.width > window.innerWidth - 10) menu.style.left = window.innerWidth - rect.width - 10 + "px";
        if (y + rect.height > window.innerHeight - 10) menu.style.top = window.innerHeight - rect.height - 10 + "px";

        const closeHandler = (e) => {
            if (!menu.contains(e.target)) { menu.remove(); cleanup(); }
        };
        const escHandler = (e) => {
            if (e.key === "Escape") {
                if (e.target.tagName === "INPUT") return;
                menu.remove(); cleanup();
            }
        };
        const cleanup = () => {
            document.removeEventListener("mousedown", closeHandler, true);
            document.removeEventListener("keydown", escHandler, true);
        };
        setTimeout(() => {
            document.addEventListener("mousedown", closeHandler, true);
            document.addEventListener("keydown", escHandler, true);
        }, 0);
    }

    renameInline(menu, row, file) {
        const inputRow = document.createElement("div");
        inputRow.style.cssText =
            "display:flex;gap:4px;padding:4px;align-items:center;" +
            "background:var(--background-primary);" +
            "border:1px solid var(--interactive-accent);border-radius:5px;margin:2px 0;";

        const input = document.createElement("input");
        input.type = "text";
        input.value = file.name;
        input.style.cssText =
            "flex:1;min-width:140px;padding:4px 6px;" +
            "border:1px solid var(--background-modifier-border);border-radius:4px;" +
            "background:var(--background-primary);color:var(--text-normal);" +
            "font-size:var(--font-ui-small);";
        inputRow.appendChild(input);

        const okBtn = document.createElement("div");
        okBtn.textContent = "✓";
        okBtn.style.cssText =
            "padding:4px 10px;border-radius:4px;cursor:pointer;" +
            "color:var(--interactive-accent);white-space:nowrap;font-weight:bold;";
        okBtn.addEventListener("mouseenter", () => (okBtn.style.background = "var(--background-modifier-hover)"));
        okBtn.addEventListener("mouseleave", () => (okBtn.style.background = "transparent"));
        inputRow.appendChild(okBtn);

        menu.insertBefore(inputRow, row);
        input.focus();
        input.select();

        const doRename = async () => {
            const newName = input.value;
            if (!newName || newName === file.name) { inputRow.remove(); return; }
            const parent = file.parent;
            const newPath = parent && parent.path ? parent.path + "/" + newName : newName;
            try { await this.app.fileManager.renameFile(file, newPath); }
            catch (e) { new Notice(t("重命名失败：") + e.message); }
            menu.remove();
        };

        okBtn.onclick = doRename;
        input.onkeydown = (e) => {
            if (e.key === "Enter") doRename();
            if (e.key === "Escape") inputRow.remove();
        };
    }


    createInline(menu, row, parentFolder, isFolder) {
        const inputRow = document.createElement("div");
        inputRow.style.cssText =
            "display:flex;gap:4px;padding:4px;align-items:center;" +
            "background:var(--background-primary);" +
            "border:1px solid var(--interactive-accent);border-radius:5px;margin:2px 0;";

        const input = document.createElement("input");
        input.type = "text";
        input.value = isFolder ? t("新文件夹") : t("新笔记");
        input.style.cssText =
            "flex:1;min-width:140px;padding:4px 6px;" +
            "border:1px solid var(--background-modifier-border);border-radius:4px;" +
            "background:var(--background-primary);color:var(--text-normal);" +
            "font-size:var(--font-ui-small);";
        inputRow.appendChild(input);

        const okBtn = document.createElement("div");
        okBtn.textContent = "✓";
        okBtn.style.cssText =
            "padding:4px 10px;border-radius:4px;cursor:pointer;" +
            "color:var(--interactive-accent);white-space:nowrap;font-weight:bold;";
        okBtn.addEventListener("mouseenter", () => (okBtn.style.background = "var(--background-modifier-hover)"));
        okBtn.addEventListener("mouseleave", () => (okBtn.style.background = "transparent"));
        inputRow.appendChild(okBtn);

        menu.insertBefore(inputRow, row);
        input.focus();
        input.select();

        const doCreate = async () => {
            const name = input.value.trim();
            if (!name) { inputRow.remove(); return; }
            const basePath = parentFolder && parentFolder.path ? parentFolder.path + "/" : "";
            const fullPath = basePath + name + (isFolder ? "" : (name.includes(".") ? "" : ".md"));
            try {
                if (isFolder) {
                    await this.app.vault.createFolder(fullPath);
                } else {
                    await this.app.vault.create(fullPath, "");
                    const newFile = this.app.vault.getAbstractFileByPath(fullPath);
                    if (newFile) this.app.workspace.getLeaf().openFile(newFile);
                }
            } catch (e) { new Notice(t("创建失败：") + e.message); }
            menu.remove();
        };

        okBtn.onclick = doCreate;
        input.onkeydown = (e) => {
            if (e.key === "Enter") doCreate();
            if (e.key === "Escape") inputRow.remove();
        };
    }

    openInNewWindow(file) {
        try {
            const leaf = this.app.workspace.openPopoutLeaf();
            leaf.openFile(file);
        } catch (e) {
            new Notice(t("无法在新窗口打开：") + e.message);
        }
    }

    openWithDefaultApp(file) {
        const adapter = this.app.vault.adapter;
        if (!(adapter instanceof FileSystemAdapter)) { new Notice(t("不支持此环境")); return; }
        try {
            const { shell } = require("electron");
            shell.openPath(adapter.getFullPath(file.path));
        } catch (e) {
            new Notice(t("无法打开：") + e.message);
        }
    }

    openWithExternalEditor(file) {
        const adapter = this.app.vault.adapter;
        if (!(adapter instanceof FileSystemAdapter)) { new Notice(t("不支持此环境")); return; }
        const fullPath = adapter.getFullPath(file.path);
        const editor = this.findEditor();
        if (editor) { this.spawnEditor(editor, fullPath); return; }
        const savedPath = this.editorMenuConfig.customEditorPath || "";
        if (savedPath) { this.spawnEditor({ cmd: savedPath, name: savedPath, shell: false }, fullPath); return; }
        const modal = new Modal(this.app);
        modal.titleEl.setText(t("输入编辑器路径"));
        const input = modal.contentEl.createEl("input", { type: "text", attr: { style: "width:300px;padding:6px;margin:8px 0;box-sizing:border-box;", placeholder: t("如 C:\\Program Files\\Microsoft VS Code\\Code.exe") } });
        const btnRow = modal.contentEl.createEl("div", { attr: { style: "text-align:right;margin-top:8px;" } });
        const btn = btnRow.createEl("button", { text: t("打开"), cls: "mod-cta" });
        const doOpen = () => { const p = input.value.trim(); if (!p) return; modal.close(); this.editorMenuConfig.customEditorPath = p; this.saveEditorMenuConfig(); this.spawnEditor({ cmd: p, name: p, shell: false }, fullPath); };
        btn.onclick = doOpen;
        input.addEventListener("keydown", (e) => { if (e.key === "Enter") doOpen(); });
        modal.open();
        setTimeout(() => input.focus(), 50);
    }

    spawnEditor(editor, fullPath) {
        try {
            const { spawn } = require("child_process");
            const child = spawn(editor.cmd, [fullPath], { detached: true, stdio: "ignore", shell: editor.shell });
            child.on("error", (e) => new Notice(t("打开失败：") + e.message));
            child.unref();
            new Notice(t("已用 ") + editor.name + t(" 打开"));
        } catch (e) {
            new Notice(t("打开失败：") + e.message);
        }
    }

    findEditor() {
        const { execSync } = require("child_process");
        const path = require("path");
        const fs = require("fs");
        if (process.env.EDITOR) {
            return { cmd: process.env.EDITOR, name: process.env.EDITOR, shell: true };
        }
        const cmds = ["code", "code-insiders", "subl", "atom"];
        for (const cmd of cmds) {
            try {
                const checkCmd = process.platform === "win32" ? "where " + cmd : "which " + cmd;
                execSync(checkCmd, { stdio: "ignore" });
                return { cmd, name: cmd, shell: true };
            } catch (e) {}
        }
        if (process.platform === "win32") {
            const candidates = [
                { p: path.join(process.env.LOCALAPPDATA || "", "Programs", "Microsoft VS Code", "Code.exe"), n: "VSCode" },
                { p: path.join(process.env.ProgramFiles || "", "Microsoft VS Code", "Code.exe"), n: "VSCode" },
                { p: path.join(process.env["ProgramFiles(x86)"] || "", "Microsoft VS Code", "Code.exe"), n: "VSCode" },
                { p: path.join(process.env.LOCALAPPDATA || "", "Programs", "Microsoft VS Code Insiders", "Code - Insiders.exe"), n: "VSCode Insiders" },
                { p: path.join(process.env.ProgramFiles || "", "Sublime Text", "sublime_text.exe"), n: "Sublime Text" },
                { p: path.join(process.env.ProgramFiles || "", "Notepad++", "notepad++.exe"), n: "Notepad++" },
            ];
            for (const c of candidates) {
                try { if (c.p && fs.existsSync(c.p)) return { cmd: c.p, name: c.n, shell: false }; } catch (e) {}
            }
        }
        return null;
    }

    revealInExplorer(file) {
        const adapter = this.app.vault.adapter;
        if (!(adapter instanceof FileSystemAdapter)) { new Notice(t("不支持此环境")); return; }
        try {
            const { shell } = require("electron");
            shell.showItemInFolder(adapter.getFullPath(file.path));
        } catch (e) {
            new Notice(t("无法打开资源管理器：") + e.message);
        }
    }

    copyAsWikilink(file) {
        const name = file.basename || file.name;
        navigator.clipboard.writeText("[[" + name + "]]").then(() => new Notice(t("已复制 [[wikilink]]")));
    }

    copyAsMarkdownLink(file) {
        const name = file.basename || file.name;
        navigator.clipboard.writeText("[" + name + "](" + file.path + ")").then(() => new Notice(t("已复制 Markdown 链接")));
    }

    async createDuplicate(file) {
        try {
            const content = await this.app.vault.read(file);
            const ext = file.extension;
            const baseName = file.basename;
            const parent = file.parent;
            const prefix = parent && parent.path ? parent.path + "/" : "";
            let newName = baseName + t(" 副本.") + ext;
            let i = 1;
            while (this.app.vault.getAbstractFileByPath(prefix + newName)) {
                newName = baseName + t(" 副本 ") + i + "." + ext;
                i++;
            }
            await this.app.vault.create(prefix + newName, content);
            new Notice(t("已创建副本：") + newName);
        } catch (e) {
            new Notice(t("创建副本失败：") + e.message);
        }
    }

    async deleteFiles(files) {
        if (files.length > 1) {
            const ok = await this.confirmDelete(files.length);
            if (!ok) return;
        }
        const firstPath = files[0] && files[0].path;
        let rect = null;
        if (firstPath) {
            const titleEl = document.querySelector('.nav-file-title[data-path="' + firstPath.replace(/"/g, '\\"') + '"], .nav-folder-title[data-path="' + firstPath.replace(/"/g, '\\"') + '"]');
            if (titleEl) rect = titleEl.getBoundingClientRect();
        }

        const savedItems = [];
        for (const f of files) {
            if (f instanceof TFolder) {
                savedItems.push({ path: f.path, isFolder: true });
                const allFiles = this.app.vault.getFiles().filter((file) => file.path.startsWith(f.path + "/"));
                for (const file of allFiles) {
                    try {
                        const content = await this.app.vault.read(file);
                        savedItems.push({ path: file.path, content, isFolder: false });
                    } catch (e) { savedItems.push({ path: file.path, content: "", isFolder: false }); }
                }
            } else if (f instanceof TFile) {
                try {
                    const content = await this.app.vault.read(f);
                    savedItems.push({ path: f.path, content, isFolder: false });
                } catch (e) { savedItems.push({ path: f.path, content: "", isFolder: false }); }
            }
        }

        let n = 0;
        for (const f of files) {
            try { await this.app.vault.trash(f); n++; }
            catch (e) { console.error("file-ops-plus delete error:", e); }
        }
        new Notice(t("已删除 ") + n + t(" 项"));
        if (files.length === 1) this.showUndoDeleteButton(savedItems, rect);
    }

    confirmDelete(count) {
        return new Promise((resolve) => {
            const modal = new Modal(this.app);
            modal.titleEl.setText(t("确认删除"));
            const content = modal.contentEl;
            content.createEl("p", { text: t("确定要删除 ") + count + t(" 个文件吗？"), attr: { style: "margin:8px 0 16px;" } });
            const btnRow = content.createEl("div", { attr: { style: "display:flex;justify-content:flex-end;gap:8px;" } });
            const cancelBtn = btnRow.createEl("button", { text: t("取消") });
            const okBtn = btnRow.createEl("button", { text: t("删除"), cls: "mod-warning" });
            let done = false;
            const finish = (val) => { if (done) return; done = true; modal.close(); resolve(val); };
            cancelBtn.onclick = () => finish(false);
            okBtn.onclick = () => finish(true);
            modal.onClose = () => finish(false);
            modal.open();
        });
    }

    showUndoDeleteButton(savedItems, rect) {
        const existing = document.getElementById("file-ops-plus-undo-delete");
        if (existing) existing.remove();

        if (!document.getElementById("file-ops-plus-undo-style")) {
            const s = document.createElement("style");
            s.id = "file-ops-plus-undo-style";
            s.textContent = "@keyframes file-ops-plus-pulse{0%{transform:scale(1.2)}100%{transform:scale(1)}}";
            document.head.appendChild(s);
        }

        const btn = document.createElement("div");
        btn.id = "file-ops-plus-undo-delete";
        btn.title = t("撤销删除");
        const undoSize = 36;
        let posCss;
        if (rect) {
            const left = Math.min(rect.right - undoSize, window.innerWidth - undoSize - 8);
            const top = Math.max(rect.top + rect.height / 2 - undoSize / 2, 8);
            posCss = "left:" + left + "px;top:" + top + "px;";
        } else {
            posCss = "right:20px;bottom:80px;";
        }
        btn.style.cssText = "position:fixed;z-index:1300;cursor:pointer;transition:opacity 0.3s;" + posCss;

        const circle = document.createElement("div");
        let remaining = 7;
        circle.textContent = remaining;
        circle.style.cssText =
            "width:" + undoSize + "px;height:" + undoSize + "px;border-radius:50%;background:rgba(216,90,48,0.9);color:#4A1B0C;" +
            "display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:600;" +
            "animation:file-ops-plus-pulse 1s ease-out;box-shadow:0 4px 16px rgba(216,90,48,0.4);";
        btn.appendChild(circle);
        document.body.appendChild(btn);

        let restored = false;
        const timer = setInterval(() => {
            remaining--;
            if (restored) return;
            if (remaining <= 0) {
                clearInterval(timer);
                btn.style.opacity = "0";
                setTimeout(() => btn.remove(), 300);
                return;
            }
            circle.textContent = remaining;
            circle.style.animation = "none";
            void circle.offsetWidth;
            circle.style.animation = "file-ops-plus-pulse 1s ease-out";
        }, 1000);

        btn.addEventListener("click", async () => {
            if (restored) return;
            restored = true;
            clearInterval(timer);
            let restoredCount = 0;
            for (const item of savedItems) {
                if (this.app.vault.getAbstractFileByPath(item.path)) continue;
                try {
                    if (item.isFolder) {
                        await this.app.vault.createFolder(item.path);
                    } else {
                        await this.app.vault.create(item.path, item.content);
                    }
                    restoredCount++;
                } catch (e) { console.error("restore error:", e); }
            }
            new Notice(restoredCount > 0 ? t("已恢复 ") + restoredCount + t(" 项") : t("恢复失败"));
            btn.style.opacity = "0";
            setTimeout(() => btn.remove(), 300);
        });
    }

    copyPath(files) {
        const paths = files.map((f) => f.path).join("\n");
        navigator.clipboard.writeText(paths).then(() => new Notice(t("已复制路径")));
    }

    copyAbsolutePath(files) {
        const adapter = this.app.vault.adapter;
        if (!(adapter instanceof FileSystemAdapter)) { new Notice(t("不支持此环境")); return; }
        const paths = files.map((f) => adapter.getFullPath(f.path)).join("\n");
        navigator.clipboard.writeText(paths).then(() => new Notice(t("已复制绝对路径")));
    }

    copyRelativePath(files) {
        const paths = files.map((f) => f.path).join("\n");
        navigator.clipboard.writeText(paths).then(() => new Notice(t("已复制相对路径")));
    }

    addColorRow(menu, file) {
        const COLORS = [
            { c: "#e74c3c", n: t("红") },
            { c: "#e67e22", n: t("橙") },
            { c: "#f1c40f", n: t("黄") },
            { c: "#2ecc71", n: t("绿") },
            { c: "#1abc9c", n: t("青") },
            { c: "#3498db", n: t("蓝") },
            { c: "#9b59b6", n: t("紫") },
            { c: "#95a5a6", n: t("灰") },
        ];
        const row = document.createElement("div");
        row.style.cssText = "display:flex;gap:3px;padding:2px 4px;align-items:center;";

        const updateBoldVisual = (btn, active) => {
            btn.style.cssText =
                "width:18px;height:18px;border-radius:4px;cursor:pointer;" +
                "display:flex;align-items:center;justify-content:center;" +
                "font-size:12px;font-weight:bold;" +
                (active
                    ? "background:var(--interactive-accent);color:var(--text-on-accent);border:1px solid var(--interactive-accent);"
                    : "border:1px solid var(--background-modifier-border);color:var(--text-normal);");
        };
        const updateDotVisual = (dot, color, active) => {
            dot.style.cssText =
                "width:18px;height:18px;border-radius:50%;cursor:pointer;" +
                "background:" + color + ";" +
                (active ? "border:2px solid var(--text-accent);box-shadow:0 0 4px var(--text-accent);" : "border:1px solid var(--background-modifier-border);");
        };

        const isBold = this.boldSet.has(file.path);
        const boldBtn = document.createElement("div");
        boldBtn.textContent = "B";
        updateBoldVisual(boldBtn, isBold);
        boldBtn.title = t("加粗");
        boldBtn.addEventListener("click", async () => {
            await this.toggleBold(file);
            updateBoldVisual(boldBtn, this.boldSet.has(file.path));
        });
        row.appendChild(boldBtn);

        const current = this.colorMap[file.path];
        for (const color of COLORS) {
            const dot = document.createElement("div");
            updateDotVisual(dot, color.c, current === color.c);
            dot.title = color.n;
            dot.addEventListener("click", async () => {
                const now = this.colorMap[file.path];
                await this.setColor(file, now === color.c ? null : color.c);
                for (const d of row.querySelectorAll(".file-ops-plus-color-dot")) {
                    const c = d.getAttribute("data-color");
                    updateDotVisual(d, c, this.colorMap[file.path] === c);
                }
            });
            dot.className = "file-ops-plus-color-dot";
            dot.setAttribute("data-color", color.c);
            row.appendChild(dot);
        }

        menu.appendChild(row);
    }

    async setColor(file, color) {
        if (color) {
            this.colorMap[file.path] = color;
        } else {
            delete this.colorMap[file.path];
        }
        await this.saveData({ colors: this.colorMap, pins: Array.from(this.pinSet), bolds: Array.from(this.boldSet) });
        this.applyColors();
    }

    async togglePin(file) {
        if (this.pinSet.has(file.path)) {
            this.pinSet.delete(file.path);
            new Notice(t("已取消置顶"));
        } else {
            this.pinSet.add(file.path);
            new Notice(t("已置顶"));
        }
        await this.saveData({ colors: this.colorMap, pins: Array.from(this.pinSet), bolds: Array.from(this.boldSet) });
        this.applyColors();
    }

    async toggleBold(file, forceOff) {
        if (forceOff) {
            this.boldSet.delete(file.path);
        } else if (this.boldSet.has(file.path)) {
            this.boldSet.delete(file.path);
        } else {
            this.boldSet.add(file.path);
        }
        await this.saveData({ colors: this.colorMap, pins: Array.from(this.pinSet), bolds: Array.from(this.boldSet) });
        this.applyColors();
    }

    applyColors() {
        const titles = document.querySelectorAll(".nav-file-title, .nav-folder-title");
        for (const el of titles) {
            const path = el.getAttribute("data-path");
            if (!path) continue;
            const color = this.colorMap[path];
            const bold = this.boldSet.has(path);
            const content = el.querySelector(".nav-file-title-content, .nav-folder-title-content");
            if (color) {
                el.style.setProperty("color", color, "important");
                if (content) content.style.setProperty("color", color, "important");
            } else {
                el.style.removeProperty("color");
                if (content) content.style.removeProperty("color");
            }
            if (bold) {
                el.style.setProperty("font-weight", "bold", "important");
                if (content) content.style.setProperty("font-weight", "bold", "important");
            } else {
                el.style.removeProperty("font-weight");
                if (content) content.style.removeProperty("font-weight");
            }
        }
        this.applyPin();
    }

    applyPin() {
        if (!this.pinSet) return;
        const titles = document.querySelectorAll(".nav-file-title, .nav-folder-title");
        for (const title of titles) {
            const path = title.getAttribute("data-path");
            if (!path) continue;
            const item = title.closest(".nav-file, .nav-folder");
            if (!item) continue;
            if (this.pinSet.has(path)) {
                item.style.setProperty("order", "-999", "important");
                const container = item.parentElement;
                if (container) {
                    container.style.setProperty("display", "flex", "important");
                    container.style.setProperty("flex-direction", "column", "important");
                }
            } else {
                item.style.removeProperty("order");
            }
        }
    }

    async copyFilesToClipboard(files) {
        const adapter = this.app.vault.adapter;
        if (!(adapter instanceof FileSystemAdapter)) { new Notice(t("当前环境不支持")); return; }
        const fullPaths = files.map((f) => adapter.getFullPath(f.path));
        try {
            if (process.platform === "win32") await this.copyFilesWindows(fullPaths);
            else if (process.platform === "darwin") await this.copyFilesMac(fullPaths);
            else this.copyFilesLinux(fullPaths);
            new Notice(files.length > 1 ? t("已复制 ") + files.length + t(" 个文件") : t("已复制：") + files[0].name);
        } catch (e) {
            new Notice(t("复制失败：") + e.message);
        }
    }

    copyFilesWindows(filePaths) {
        return new Promise((resolve, reject) => {
            const { spawn } = require("child_process");
            const psArray = "@(" + filePaths.map((p) => "'" + p.replace(/'/g, "''") + "'").join(", ") + ")";
            const child = spawn("powershell", ["-NoProfile", "-NonInteractive", "-Command", "Set-Clipboard -LiteralPath " + psArray]);
            let stderr = "";
            child.stderr.on("data", (d) => (stderr += d.toString()));
            child.on("close", (code) => code === 0 ? resolve() : reject(new Error(stderr || "PS " + code)));
            child.on("error", reject);
        });
    }

    copyFilesMac(filePaths) {
        return new Promise((resolve, reject) => {
            const { exec } = require("child_process");
            const posixFiles = filePaths.map((p) => '(POSIX file "' + p.replace(/"/g, '\\"') + '")').join(", ");
            const script = "set the clipboard to {" + posixFiles + "}";
            exec("osascript -e '" + script.replace(/'/g, "'\\''") + "'", (err) => err ? reject(err) : resolve());
        });
    }

    copyFilesLinux(filePaths) {
        const { execSync } = require("child_process");
        execSync("xclip -selection clipboard -t text/uri-list", { input: filePaths.map((p) => "file://" + p).join("\n") + "\n" });
    }

    async moveFilesUp(files) {
        let success = 0, fail = 0;
        for (const file of files) {
            const parent = file.parent;
            if (!parent || !parent.parent) { fail++; continue; }
            const grandParent = parent.parent;
            const newPath = grandParent.path ? grandParent.path + "/" + file.name : file.name;
            if (newPath === file.path) { fail++; continue; }
            try { await this.app.fileManager.renameFile(file, newPath); success++; }
            catch (e) { fail++; console.error("moveUp error:", e); }
        }
        new Notice(t("上移完成：成功 ") + success + t(" 个") + (fail > 0 ? t("，失败 ") + fail + t(" 个") : ""));
    }

    startMoveMode(files) {
        if (this.moveClickHandler) this.cancelMoveMode();
        document.body.classList.add(MOVE_MODE_BODY_CLASS);
        const label = files.length > 1 ? files.length + t(" 个文件") : '"' + files[0].name + '"';
        this.moveNotice = new Notice(t("移动模式：点击目标文件夹移动 ") + label + t("（Esc 取消）"), 0);
        this.moveClickHandler = (evt) => {
            const target = evt.target;
            if (!(target instanceof HTMLElement)) return;
            const folderTitleEl = target.closest(".nav-folder-title");
            if (!folderTitleEl) return;
            evt.stopPropagation();
            evt.preventDefault();
            this.executeMove(files, folderTitleEl.getAttribute("data-path") || "");
        };
        this.moveKeyHandler = (evt) => {
            if (evt.key === "Escape") { this.cancelMoveMode(); new Notice(t("已取消移动")); }
        };
        document.addEventListener("click", this.moveClickHandler, { capture: true });
        document.addEventListener("keydown", this.moveKeyHandler, { capture: true });
    }

    async executeMove(files, targetFolderPath) {
        let success = 0, fail = 0;
        for (const file of files) {
            const newPath = targetFolderPath ? targetFolderPath + "/" + file.name : file.name;
            if (newPath === file.path || file.path.startsWith(newPath + "/")) { fail++; continue; }
            try { await this.app.fileManager.renameFile(file, newPath); success++; }
            catch (e) { fail++; console.error("move error:", e); }
        }
        new Notice(t("移动完成：成功 ") + success + t(" 个") + (fail > 0 ? t("，失败 ") + fail + t(" 个") : "") + t(" 到 ") + (targetFolderPath || t("根目录")));
        this.cancelMoveMode();
    }

    cancelMoveMode() {
        if (this.moveClickHandler) { document.removeEventListener("click", this.moveClickHandler, { capture: true }); this.moveClickHandler = null; }
        if (this.moveKeyHandler) { document.removeEventListener("keydown", this.moveKeyHandler, { capture: true }); this.moveKeyHandler = null; }
        if (this.moveNotice) { this.moveNotice.hide(); this.moveNotice = null; }
        document.body.classList.remove(MOVE_MODE_BODY_CLASS);
    }

    showEditorMenu(x, y, view) {
        if (!this.editorMenuConfig || this.editorMenuConfig.enabled === false) return;
        const existing = document.querySelector(".fop-em-panel");
        if (existing) existing.remove();

        const cfg = this.editorMenuConfig;
        const panel = document.createElement("div");
        panel.className = "fop-em-panel";
        const row = document.createElement("div");
        row.className = "fop-em-row";

        const makeTile = (iconName, color, title, onClick) => {
            const tile = document.createElement("div");
            tile.className = "fop-em-tile";
            const c = color || "neutral";
            if (GROUP_COLORS[c]) tile.dataset.c = c;
            else if (c.includes("|")) { const parts = c.split("|"); tile.style.background = parts[0]; tile.style.color = parts[1] || autoContrast(parts[0]); }
            else { tile.style.background = c; tile.style.color = autoContrast(c); }
            tile.title = title || "";
            const raw = iconName || "";
            if (raw.includes("<svg")) {
                tile.innerHTML = raw;
            } else {
                let ic = null;
                try { ic = getIcon(raw); } catch (e) {}
                if (ic) tile.appendChild(ic);
                else if (raw) {
                    tile.textContent = raw;
                    tile.style.whiteSpace = "nowrap";
                    tile.style.overflow = "visible";
                }
            }
            tile.addEventListener("click", onClick);
            return tile;
        };

        for (const grp of cfg.groups) {
            if (!grp.items || grp.items.length === 0) continue;
            const col = document.createElement("div");
            if (cfg.showGroupLabels !== false) {
                const label = document.createElement("div");
                label.className = "fop-em-group-label";
                label.textContent = grp.label || "";
                const gc = GROUP_COLORS[grp.color];
                if (gc) label.style.color = gc.fg;
                else if (grp.color && grp.color.includes("|")) label.style.color = grp.color.split("|")[1] || "var(--text-normal)";
                else if (grp.color) label.style.color = autoContrast(grp.color);
                else label.style.color = "var(--text-muted)";
                col.appendChild(label);
            }
            const grid = document.createElement("div");
            grid.className = "fop-em-grid";
            for (const item of grp.items) {
                grid.appendChild(makeTile(item.icon, item.color || grp.color, item.label || "", () => {
                    panel.remove(); this.execEditorItem(item, view);
                }));
            }
            col.appendChild(grid);
            row.appendChild(col);
        }

        const extraRow = document.createElement("div");
        extraRow.className = "fop-em-grid";
        extraRow.appendChild(makeTile("...", "neutral", t("原生菜单"), () => {
            panel.remove();
            this._skipEditorMenu = true;
            setTimeout(() => {
                const target = document.elementFromPoint(x, y);
                if (target) target.dispatchEvent(new MouseEvent("contextmenu", { clientX: x, clientY: y, bubbles: true, cancelable: true }));
            }, 0);
        }));
        extraRow.appendChild(makeTile("settings", "neutral", t("设置"), () => {
            panel.remove(); this.openEditorMenuSettings();
        }));
        row.appendChild(extraRow);

        panel.appendChild(row);
        if (cfg.panelWidth) panel.style.width = cfg.panelWidth + "px";
        if (cfg.panelHeight) { panel.style.height = cfg.panelHeight + "px"; panel.style.overflow = "auto"; }

        const handle = document.createElement("div");
        handle.className = "fop-em-resize";
        handle.title = t("拖动调整面板宽高，分组自动重排");
        panel.appendChild(handle);
        let dragging = false, sx = 0, sy = 0, sw = 0, sh = 0;
        handle.addEventListener("mousedown", (e) => {
            e.preventDefault(); e.stopPropagation();
            dragging = true; sx = e.clientX; sy = e.clientY;
            sw = panel.offsetWidth; sh = panel.offsetHeight;
            const onMove = (ev) => {
                if (!dragging) return;
                const nw = Math.max(180, Math.min(window.innerWidth - 20, sw + (ev.clientX - sx)));
                const nh = Math.max(80, Math.min(window.innerHeight - 20, sh + (ev.clientY - sy)));
                panel.style.width = nw + "px";
                panel.style.height = nh + "px";
                panel.style.overflow = "auto";
            };
            const onUp = () => {
                dragging = false;
                document.removeEventListener("mousemove", onMove);
                document.removeEventListener("mouseup", onUp);
                cfg.panelWidth = panel.offsetWidth;
                cfg.panelHeight = panel.offsetHeight;
                this.saveEditorMenuConfig();
            };
            document.addEventListener("mousemove", onMove);
            document.addEventListener("mouseup", onUp);
        });

        document.body.appendChild(panel);
        const rect = panel.getBoundingClientRect();
        panel.style.left = (x + rect.width > window.innerWidth - 10 ? window.innerWidth - rect.width - 10 : x) + "px";
        panel.style.top = (y + rect.height > window.innerHeight - 10 ? window.innerHeight - rect.height - 10 : y) + "px";

        const close = (e) => { if (!panel.contains(e.target)) { panel.remove(); cleanup(); } };
        const esc = (e) => { if (e.key === "Escape") { panel.remove(); cleanup(); } };
        const cleanup = () => {
            document.removeEventListener("mousedown", close, true);
            document.removeEventListener("keydown", esc, true);
        };
        setTimeout(() => {
            document.addEventListener("mousedown", close, true);
            document.addEventListener("keydown", esc, true);
        }, 0);
    }

    execEditorItem(item, view) {
        const editor = view.editor;
        if (!editor) { new Notice(t("无法获取编辑器")); return; }
        if (item.type === "cmd") {

            editor.focus();
            this.app.commands.executeCommandById(item.cmd);
        } else if (item.type === "regex") {
            const sel = editor.getSelection();
            if (!sel) { new Notice(t("请先选中文本")); return; }
            try {
                const re = new RegExp(item.pattern, item.flags || "g");
                const rep = (item.replacement || "").replace(/\\n/g, "\n").replace(/\\t/g, "\t");
                editor.replaceSelection(sel.replace(re, rep));
            } catch (e) { new Notice(t("正则错误：") + e.message); }
        } else if (item.type === "custom") {
            const fn = CUSTOM_TRANSFORMS[item.custom];
            if (!fn) { new Notice(t("未知转换：") + item.custom); return; }
            const sel = editor.getSelection();
            if (sel) {
                editor.replaceSelection(fn(sel));
            } else {
                const cursor = editor.getCursor();
                const line = editor.getLine(cursor.line);
                const result = fn(line);
                editor.replaceRange(result, { line: cursor.line, ch: 0 }, { line: cursor.line, ch: line.length });
            }
        }
    }

    async saveEditorMenuConfig() {
        const data = (await this.loadData()) || {};
        await this.saveData({
            colors: data.colors || this.colorMap,
            pins: data.pins || Array.from(this.pinSet),
            bolds: data.bolds || Array.from(this.boldSet),
            editorMenu: this.editorMenuConfig,
        });
    }

    openEditorMenuSettings() {
        const existing = document.querySelector(".fop-em-settings");
        if (existing) existing.remove();
        const cfg = this.editorMenuConfig;

        const panel = document.createElement("div");
        panel.className = "fop-em-settings";
        panel.style.cssText = "position:fixed;z-index:10000;background:var(--background-secondary);border:1px solid var(--background-modifier-border);border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,.3);display:flex;flex-direction:column;box-sizing:border-box;overflow:hidden;";
        const sw = cfg.settingsW || 700, sh = cfg.settingsH || Math.round(window.innerHeight * 0.7);
        panel.style.width = sw + "px";
        panel.style.height = sh + "px";
        panel.style.left = (cfg.settingsX != null ? cfg.settingsX : Math.max(10, (window.innerWidth - sw) / 2)) + "px";
        panel.style.top = (cfg.settingsY != null ? cfg.settingsY : Math.max(10, (window.innerHeight - sh) / 2)) + "px";

        const header = document.createElement("div");
        header.style.cssText = "display:flex;align-items:center;gap:8px;padding:8px 12px;cursor:grab;border-bottom:1px solid var(--background-modifier-border);";
        const ttl = document.createElement("div");
        ttl.textContent = t("编辑器右键菜单设置");
        ttl.style.fontWeight = "600";
        ttl.style.flex = "1";
        header.appendChild(ttl);
        const rsBtn = document.createElement("button");
        rsBtn.textContent = t("恢复默认");
        rsBtn.className = "mod-warning";
        rsBtn.style.cssText = "font-size:var(--font-ui-smaller);padding:2px 8px;cursor:pointer;";
        header.appendChild(rsBtn);
        const closeBtn = document.createElement("div");
        closeBtn.textContent = "✕";
        closeBtn.style.cssText = "cursor:pointer;padding:2px 8px;color:var(--text-muted);font-size:16px;";
        header.appendChild(closeBtn);
        panel.appendChild(header);

        const body = document.createElement("div");
        body.style.cssText = "flex:1;display:flex;gap:0;min-height:0;overflow:hidden;";

        const previewArea = document.createElement("div");
        previewArea.style.cssText = "width:260px;min-width:180px;max-width:420px;overflow:auto;padding:10px;border-right:1px solid var(--background-modifier-border);background:var(--background-primary);box-sizing:border-box;";
        body.appendChild(previewArea);

        const root = document.createElement("div");
        root.style.cssText = "flex:1;overflow:auto;padding:12px;min-height:0;";
        body.appendChild(root);

        panel.appendChild(body);

        const handle = document.createElement("div");
        handle.style.cssText = "position:absolute;right:0;bottom:0;width:16px;height:16px;cursor:nwse-resize;z-index:10;background:linear-gradient(135deg,transparent 50%,var(--text-muted) 50%);";
        handle.title = t("拖动调整大小");
        panel.appendChild(handle);
        document.body.appendChild(panel);

        let dragging = false, dgx = 0, dgy = 0;
        const onMove = (e) => { if (!dragging) return; panel.style.left = (e.clientX - dgx) + "px"; panel.style.top = (e.clientY - dgy) + "px"; };
        const onUp = () => { if (dragging) { dragging = false; header.style.cursor = "grab"; cfg.settingsX = parseInt(panel.style.left); cfg.settingsY = parseInt(panel.style.top); this.saveEditorMenuConfig(); } };
        document.addEventListener("mousemove", onMove);
        document.addEventListener("mouseup", onUp);
        header.addEventListener("mousedown", (e) => {
            if (e.target === closeBtn) return;
            dragging = true; dgx = e.clientX - panel.getBoundingClientRect().left; dgy = e.clientY - panel.getBoundingClientRect().top;
            header.style.cursor = "grabbing"; e.preventDefault();
        });
        const closePanel = () => { panel.remove(); document.removeEventListener("mousemove", onMove); document.removeEventListener("mouseup", onUp); document.removeEventListener("keydown", escH); };
        closeBtn.onclick = closePanel;
        const escH = (e) => { if (e.key === "Escape") closePanel(); };
        document.addEventListener("keydown", escH);

        let rz = false, rsx = 0, rsy = 0, rsw = 0, rsh = 0;
        handle.addEventListener("mousedown", (e) => {
            e.preventDefault(); e.stopPropagation();
            rz = true; rsx = e.clientX; rsy = e.clientY; rsw = panel.offsetWidth; rsh = panel.offsetHeight;
            const rm = (ev) => { if (!rz) return; panel.style.width = Math.max(440, rsw + (ev.clientX - rsx)) + "px"; panel.style.height = Math.max(300, rsh + (ev.clientY - rsy)) + "px"; };
            const ru = () => { rz = false; document.removeEventListener("mousemove", rm); document.removeEventListener("mouseup", ru); cfg.settingsW = panel.offsetWidth; cfg.settingsH = panel.offsetHeight; this.saveEditorMenuConfig(); };
            document.addEventListener("mousemove", rm); document.addEventListener("mouseup", ru);
        });


        const renderPreview = () => {
            previewArea.empty();
            const cfg = this.editorMenuConfig;
            previewArea.createEl("div", { text: t("实时预览"), attr: { style: "font-size:var(--font-ui-smaller);color:var(--text-muted);margin-bottom:8px;" } });
            const pvRow = previewArea.createEl("div", { attr: { style: "display:flex;flex-wrap:wrap;gap:10px;align-items:flex-start;" } });
            const makePvTile = (iconName, color, title) => {
                const tile = document.createElement("div");
                tile.className = "fop-em-tile";
                const c = color || "neutral";
                if (GROUP_COLORS[c]) tile.dataset.c = c;
                else if (c.includes("|")) { const parts = c.split("|"); tile.style.background = parts[0]; tile.style.color = parts[1] || autoContrast(parts[0]); }
                else { tile.style.background = c; tile.style.color = autoContrast(c); }
                tile.title = title || "";
                const raw = iconName || "";
                if (raw.includes("<svg")) tile.innerHTML = raw;
                else {
                    let ic = null;
                    try { ic = getIcon(raw); } catch (e) {}
                    if (ic) tile.appendChild(ic);
                    else if (raw) { tile.textContent = raw; tile.style.whiteSpace = "nowrap"; tile.style.overflow = "visible"; }
                }
                tile.addEventListener("click", () => { tile.style.filter = "brightness(0.6)"; setTimeout(() => tile.style.filter = "", 150); });
                return tile;
            };
            for (const grp of cfg.groups) {
                if (!grp.items || grp.items.length === 0) continue;
                const col = document.createElement("div");
                if (cfg.showGroupLabels !== false) {
                    const label = document.createElement("div");
                    label.className = "fop-em-group-label";
                    label.textContent = grp.label || "";
                    const gc = GROUP_COLORS[grp.color];
                    if (gc) label.style.color = gc.fg;
                    else if (grp.color && grp.color.includes("|")) label.style.color = grp.color.split("|")[1] || "var(--text-normal)";
                    else if (grp.color) label.style.color = autoContrast(grp.color);
                    else label.style.color = "var(--text-muted)";
                    col.appendChild(label);
                }
                const grid = document.createElement("div");
                grid.className = "fop-em-grid";
                for (const item of grp.items) grid.appendChild(makePvTile(item.icon, item.color || grp.color, item.label || ""));
                col.appendChild(grid);
                pvRow.appendChild(col);
            }
        };

        const render = () => {
            renderPreview();
            root.empty();
            const cfg = this.editorMenuConfig;

            const enRow = root.createEl("div", { attr: { style: "display:flex;align-items:center;gap:8px;margin-bottom:12px;" } });
            const cb = enRow.createEl("input", { type: "checkbox" });
            cb.checked = cfg.enabled !== false;
            enRow.createEl("span", { text: t("启用增强菜单（关闭则用原生右键）") });
            cb.onchange = () => {
                cfg.enabled = cb.checked;
                this.saveEditorMenuConfig();
                if (!cb.checked) new Notice(t("已关闭增强菜单。重新启用：命令面板(Ctrl+P)搜「编辑器右键菜单设置」"));
            };

            const lblRow = root.createEl("div", { attr: { style: "display:flex;align-items:center;gap:8px;margin-bottom:12px;" } });
            const lblCb = lblRow.createEl("input", { type: "checkbox" });
            lblCb.checked = cfg.showGroupLabels !== false;
            lblRow.createEl("span", { text: t("显示分组标题") });
            lblCb.onchange = () => { cfg.showGroupLabels = lblCb.checked; this.saveEditorMenuConfig(); renderPreview(); };

            for (let gi = 0; gi < cfg.groups.length; gi++) {
                const grp = cfg.groups[gi];
                const box = root.createEl("div", { attr: { style: "border:1px solid var(--background-modifier-border);border-radius:6px;padding:8px;margin-bottom:8px;" } });
                const head = box.createEl("div", { attr: { style: "display:flex;align-items:center;gap:6px;margin-bottom:6px;flex-wrap:wrap;" } });
                const ni = head.createEl("input", { type: "text", value: grp.label || "", attr: { style: "width:120px;padding:2px 4px;" } });
                ni.onchange = () => { grp.label = ni.value; this.saveEditorMenuConfig(); renderPreview(); };
                const swatchRow = head.createEl("div", { attr: { style: "display:flex;gap:3px;" } });
                for (const k of Object.keys(GROUP_COLORS)) {
                    const sw = swatchRow.createEl("div", { text: "Aa", attr: { style: "width:24px;height:16px;border-radius:3px;cursor:pointer;border:1px solid var(--background-modifier-border);background:" + GROUP_COLORS[k].bg + ";color:" + GROUP_COLORS[k].fg + ";font-size:9px;display:flex;align-items:center;justify-content:center;", title: GROUP_COLORS[k].label } });
                    if (grp.color === k) sw.style.outline = "2px solid var(--interactive-accent)";
                    sw.onclick = () => { grp.color = k; this.saveEditorMenuConfig(); render(); };
                }
                const isCustom = !GROUP_COLORS[grp.color];
                const customParts = isCustom && grp.color && grp.color.includes("|") ? grp.color.split("|") : (isCustom && grp.color ? [grp.color, ""] : ["", ""]);
                const bgInput = head.createEl("input", { type: "text", value: customParts[0], attr: { style: "width:64px;padding:2px 4px;font-size:var(--font-ui-smaller);", placeholder: t("背景") } });
                const fgInput = head.createEl("input", { type: "text", value: customParts[1], attr: { style: "width:64px;padding:2px 4px;font-size:var(--font-ui-smaller);", placeholder: t("文字") } });
                const colorPreview = head.createEl("div", { text: "Aa", attr: { style: "width:24px;height:16px;border-radius:3px;border:1px solid var(--background-modifier-border);background:" + (customParts[0] || "transparent") + ";color:" + (customParts[1] || "var(--text-normal)") + ";font-size:9px;display:flex;align-items:center;justify-content:center;" } });
                const updatePreview = () => { colorPreview.style.background = bgInput.value.trim() || "transparent"; colorPreview.style.color = fgInput.value.trim() || "var(--text-normal)"; };
                bgInput.oninput = updatePreview;
                fgInput.oninput = updatePreview;
                const commitColor = () => { const bg = bgInput.value.trim(), fg = fgInput.value.trim(); if (bg || fg) { grp.color = (bg || "#fff") + "|" + (fg || "#000"); this.saveEditorMenuConfig(); render(); } };
                bgInput.onchange = commitColor;
                fgInput.onchange = commitColor;
                const dg = head.createEl("button", { text: t("删除组"), cls: "mod-warning", attr: { style: "margin-left:auto;" } });
                dg.onclick = () => {
                    const removedGrp = cfg.groups[gi];
                    if (removedGrp && DEFAULT_EDITOR_MENU.groups.some(g => g.id === removedGrp.id)) {
                        cfg.removedDefaults = cfg.removedDefaults || [];
                        if (!cfg.removedDefaults.includes(removedGrp.id)) cfg.removedDefaults.push(removedGrp.id);
                    }
                    cfg.groups.splice(gi, 1); this.saveEditorMenuConfig(); render();
                };

                const hdr = box.createEl("div", { attr: { style: "display:flex;gap:6px;margin:4px 0 2px;font-size:var(--font-ui-smaller);color:var(--text-muted);" } });
                hdr.createEl("div", { text: t("图标"), attr: { style: "width:140px;", title: t("lucide 图标名 / 粘贴 <svg> 代码 / 任意文字（识别不到则按文字显示）") } });
                hdr.createEl("div", { text: t("名称"), attr: { style: "width:120px;", title: t("tile 鼠标悬停时显示的提示文字") } });
                hdr.createEl("div", { text: t("类型"), attr: { style: "width:82px;", title: t("cmd=执行命令  regex=正则替换选中文本  custom=预设转换") } });
                hdr.createEl("div", { text: t("操作"), attr: { style: "margin-left:auto;", title: t("删除该选项") } });

                for (let ii = 0; ii < (grp.items || []).length; ii++) {
                    const item = grp.items[ii];
                    const ir = box.createEl("div", { attr: { style: "display:flex;gap:6px;align-items:center;margin:2px 0;" } });
                    const iconTa = ir.createEl("textarea", { attr: { style: "width:140px;min-width:80px;max-width:280px;padding:2px;resize:horizontal;height:24px;font-size:var(--font-ui-smaller);", placeholder: t("图标/svg/文字") } });
                    iconTa.value = item.icon || "";
                    iconTa.onchange = () => { item.icon = iconTa.value; this.saveEditorMenuConfig(); renderPreview(); };
                    ir.createEl("input", { type: "text", value: item.label || "", attr: { style: "width:120px;padding:2px;", placeholder: t("名称") } }).onchange = (e) => { item.label = e.target.value; this.saveEditorMenuConfig(); renderPreview(); };
                    const ts = ir.createEl("select");
                    ts.style.width = "82px";
                    for (const t of ["cmd", "regex", "custom"]) ts.createEl("option", { value: t, text: t });
                    ts.value = item.type || "cmd";
                    ts.onchange = () => { item.type = ts.value; this.saveEditorMenuConfig(); render(); };
                    if (item.type === "cmd") {
                        ir.createEl("input", { type: "text", value: item.cmd || "", attr: { style: "flex:1;min-width:140px;padding:2px;", placeholder: t("命令ID，如 editor:toggle-bold") } }).onchange = (e) => { item.cmd = e.target.value; this.saveEditorMenuConfig(); renderPreview(); };
                    } else if (item.type === "regex") {
                        ir.createEl("input", { type: "text", value: item.pattern || "", attr: { style: "flex:1;min-width:80px;padding:2px;", placeholder: t("正则") } }).onchange = (e) => { item.pattern = e.target.value; this.saveEditorMenuConfig(); renderPreview(); };
                        ir.createEl("input", { type: "text", value: item.replacement || "", attr: { style: "flex:1;min-width:80px;padding:2px;", placeholder: t("替换 \\n=换行") } }).onchange = (e) => { item.replacement = e.target.value; this.saveEditorMenuConfig(); renderPreview(); };
                        ir.createEl("input", { type: "text", value: item.flags || "g", attr: { style: "width:46px;padding:2px;", placeholder: t("标志") } }).onchange = (e) => { item.flags = e.target.value; this.saveEditorMenuConfig(); renderPreview(); };
                    } else if (item.type === "custom") {
                        ir.createEl("input", { type: "text", value: item.custom || "", attr: { style: "flex:1;min-width:120px;padding:2px;", placeholder: t("转换名，如 fullwidthToHalf") } }).onchange = (e) => { item.custom = e.target.value; this.saveEditorMenuConfig(); renderPreview(); };
                    }
                    const db = ir.createEl("button", { text: "✕", attr: { style: "margin-left:auto;padding:2px 6px;" } });
                    db.onclick = () => { grp.items.splice(ii, 1); this.saveEditorMenuConfig(); render(); };
                }
                const ab = box.createEl("button", { text: t("+ 添加选项"), attr: { style: "margin-top:4px;" } });
                ab.onclick = () => { grp.items = grp.items || []; grp.items.push({ icon: "square", label: t("新选项"), type: "cmd", cmd: "" }); this.saveEditorMenuConfig(); render(); };
            }
            const ag = root.createEl("button", { text: t("+ 添加分组"), attr: { style: "margin-top:8px;" } });
            ag.onclick = () => { cfg.groups.push({ id: "g" + Date.now(), label: t("新分组"), color: "neutral", items: [] }); this.saveEditorMenuConfig(); render(); };

        };
        rsBtn.onclick = () => { this.editorMenuConfig = JSON.parse(JSON.stringify(DEFAULT_EDITOR_MENU)); this.saveEditorMenuConfig(); render(); };
        render();
    }
}

module.exports = FileOpsPlusPlugin;
