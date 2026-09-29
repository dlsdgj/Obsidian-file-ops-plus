"use strict";

const { Plugin, TFile, TFolder, FileSystemAdapter, Notice, Modal, Menu, getIcon, MarkdownRenderer } = require("obsidian");
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
    "编辑器右键菜单设置": "Editor Context Menu Settings", "右键菜单设置": "Context Menu Settings", "恢复默认": "Reset to Default",
    "实时预览": "Live Preview", "启用增强菜单（关闭则用原生右键）": "Enable enhanced menu (disable for native menu)", "启用": "Enable",
    "显示分组标题": "Show group labels", "删除组": "Delete Group", "颜色": "Color", "添加颜色": "Add Color",
    "添加选项": "Add Option", "添加分组": "Add Group",
    "图标": "Icon", "名称": "Name", "类型": "Type", "操作": "Action", "背景": "BG", "文字": "FG",
    "关闭编辑器增强菜单": "Disable Editor Enhanced Menu", "启用编辑器增强菜单": "Enable Editor Enhanced Menu",
    "已启用编辑器增强菜单": "Editor enhanced menu enabled", "已关闭编辑器增强菜单": "Editor enhanced menu disabled",
    "已关闭增强菜单。重新启用：命令面板(Ctrl+P)搜「右键菜单设置」": "Enhanced menu disabled. Re-enable via Command Palette (Ctrl+P) search \"Context Menu Settings\"",
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
    "命令": "Command", "选择该选项执行的命令": "Command to-Option", "直接插入文本": "Insert Text", "插入的文本，{{text}}=选中文本": "Text to insert, {{text}}=selected text",
    "暂存": "Stash", "暂存区空": "Stash empty", "暂存选中文本": "Stash selection", "已暂存": "Stashed", "点击插入": "Click to insert", "清空暂存": "Clear stash", "暂存选中文本到面板右侧": "Stash selected text to panel right", "暂存区": "Stash panel", "添加到暂存区": "Add to stash", "请先输入文本": "Please enter text first",
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
    "拖拽排序": "Drag to sort",
    "管道": "Pipeline", "管道步骤未找到：": "Pipeline step not found: ",
    "用→分隔步骤名，如 去HTML标签→合并空行": "Step names separated by \u2192, e.g. Strip HTML\u2192Merge Blank Lines",
    "按钮名→按钮名（Tab键插入→）": "Name\u2192Name (Tab to insert \u2192)",
    "g=全局 i=忽略大小写 m=多行 s=dotall u=unicode y=粘附": "g=global i=case-insensitive m=multiline s=dotall u=unicode y=sticky",
    "复制为块引用": "Copy as Block Ref", "提取为新笔记": "Extract to New Note", "复制标题链接": "Copy Heading Link",
    "未找到标题": "No heading found", "输入笔记名称": "Enter note name", "文件已存在，是否覆盖？": "File exists, overwrite?",
    "操作": "Action",
    "cmd=命令 regex=正则 custom=转换 pipeline=管道 action=操作": "cmd=command regex=regex custom=transform pipeline=chained action=action",
    "已创建：": "Created: ",
    "点击后按键录制": "Click then press keys", "请按键…": "Press keys\u2026", "按键": "Keystroke",
    "粘贴失败": "Paste failed",
    "cmd=命令 regex=正则 custom=转换 pipeline=管道 action=操作 key=按键 ai=AI": "cmd=command regex=regex custom=transform pipeline=chained action=action key=keystroke ai=AI",
    "cmd=命令 regex=正则 text=文本 custom=转换 pipeline=管道 action=操作 key=按键 ai=AI": "cmd=command regex=regex text=text custom=transform pipeline=chained action=action key=keystroke ai=AI",
    "AI 设置": "AI Settings", "模型": "Model", "温度": "Temp", "API 地址": "API URL",
    "新建": "New", "至少保留一个 AI 配置": "Keep at least one AI config", "未填写 API Key": "API Key not set",
    "提示词，{{text}}=选中文本": "Prompt, {{text}}=selected text",
    "生成中…": "Generating…", "AI 返回为空": "AI returned empty",
    "AI 返回失败：": "AI failed: ", "AI 请求失败：": "AI request failed: ",
    "AI 请求超时（60s）": "AI request timed out (60s)",
    "API Key 未配置，请在编辑器菜单设置的 AI 设置中填写": "API Key not configured. Set it in Editor Menu Settings → AI Settings",
    "替换选中": "Replace Selection",
    "根据选中文本提供几个Insight": "Provide a few insights on the selected text",
    "调整分组顺序": "Reorder Groups", "完成排序": "Done Reordering",
    "拖动分组标题调整顺序，再次点击完成": "Drag group titles to reorder, click Done when finished",
    "选中文本显示悬浮球，悬停展开": "Show floating ball on selection, hover to expand",
    "悬浮球偏移": "Ball offset",
    "选中文本设为文档标题": "Set selection as note title",
    "剪贴板创建新笔记": "Create Note from Clipboard",
    "处理后标题为空": "Title empty after cleanup", "已存在同名文件": "Same-name file exists",
    "标题未变化": "Title unchanged",     "已重命名：": "Renamed: ",
    "打开": "Open", "管理": "Manage", "视图": "View", "导航": "Navigate", "编辑": "Edit",
    "编辑器菜单": "Editor Menu", "文件菜单": "File Menu", "标签页菜单": "Tab Menu",
    "导出设置": "Export Settings", "导入设置": "Import Settings",
    "设置已导出": "Settings exported", "设置已导入": "Settings imported",
    "导入失败：": "Import failed: ", "导出失败：": "Export failed: ",
    "折叠/展开": "Collapse/Expand",
    "搜索图标…": "Search icon…", "搜索命令…": "Search command…",
    "所有分类": "All", "选择图标": "Pick icon", "选择命令": "Pick command",
    "无匹配": "No match", "（当前不在名单内，仍可使用）": " (not in list, still usable)",
};
const t = (zh) => _isZh() ? zh : (I18N_EN[zh] || zh);

const LUCIDE_ICONS = {
    format: "bold italic strikethrough underline highlighter code code-2 quote remove-formatting align-left align-center align-right align-justify align-start align-end list list-ordered list-checks list-tree list-collapse indent outdent pilcrow wrap-text superscript subscript type".split(" "),
    text: "heading heading-1 heading-2 heading-3 heading-4 heading-5 heading-6 paragraph text text-cursor text-cursor-input case-sensitive case-upper case-lower spell-check".split(" "),
    editor: "scissors copy clipboard clipboard-list clipboard-check clipboard-x eraser undo-2 redo-2 check check-line check-check x pen pen-line pencil pencil-line edit edit-3 square-pen".split(" "),
    link: "link link-2 unlink external-link chain at-sign mail send forward share share-2".split(" "),
    media: "image image-plus images film video music file-audio file-video file-image camera mic volume volume-2 play pause skip-forward skip-back headphones repeat shuffle".split(" "),
    nav: "arrow-up arrow-down arrow-left arrow-right arrow-up-right arrow-up-left arrow-down-right arrow-down-left chevron-up chevron-down chevron-left chevron-right chevrons-up chevrons-down chevrons-left chevrons-right corner-up-left corner-up-right move move-right move-left move-up move-down navigation navigation-2 compass map map-pin route guide signpost".split(" "),
    file: "file file-plus file-minus file-text file-check file-check-2 file-x file-x-2 file-edit file-search file-code file-code-2 files folder folder-plus folder-minus folder-open folder-tree folder-search archive book book-open notebook notebook-pen sheet database hard-drive file-output file-input paperclip".split(" "),
    search: "search search-check search-x search-code filter funnel scan scan-line scan-text telescope radar target crosshair".split(" "),
    view: "eye eye-off eye-closed focus focus-2 maximize maximize-2 minimize minimize-2 expand shrink fullscreen columns columns-2 columns-3 columns-4 rows rows-2 rows-3 layout layout-dashboard layout-template layout-grid panel-left panel-right panel-top panel-bottom panel-left-close panel-right-close sidebar frame frames frames-2".split(" "),
    ui: "settings settings-2 tool tools wrench hammer sliders sliders-horizontal toggle-left toggle-right check-circle check-circle-2 check-square circle circle-dot circle-plus circle-minus circle-x circle-check circle-check-big square square-plus square-minus square-x square-check square-dot square-arrow-up-right dot plus minus asterisk hash equal equal-not divide percent sigma function function-square calculator binary".split(" "),
    ai: "sparkles sparkles-2 wand wand-2 wand-sparkles brain bot message-square message-circle messages-square lightbulb lightbulb-off zap flame star star-half star-off award badge badge-check badge-dollar-sign crown gem diamond rocket".split(" "),
    time: "clock clock-1 clock-2 clock-3 clock-4 timer timer-reset stopwatch calendar calendar-check calendar-plus calendar-x calendar-days calendar-range history refresh-ccw refresh-cw rotate-ccw rotate-cw arrow-clockwise arrow-counter-clockwise hourglass alarm-clock".split(" "),
    misc: "info info-2 help-circle help question alert-circle alert-triangle alert-octagon ban lock lock-open key shield shield-check shield-off shield-alert fingerprint user users contact contact-2 smile thumbs-up thumbs-down heart flag flag-off bookmark bookmark-plus bookmark-check tag tags barcode qrcode gift party-popper toast bell bell-off bell-plus megaphone announcement".split(" "),
};

function fopPopupPicker(hostEl, opts) {
    if (window._fopPickerClose) { try { window._fopPickerClose(); } catch (e) {} window._fopPickerClose = null; }
    const { renderItems, onPick, placeholder, width } = opts;
    const rect = hostEl.getBoundingClientRect();
    const popup = document.body.createEl("div", { cls: "fop-picker-popup" });
    const popupH = 360;
    let top = rect.bottom + 2;
    if (top + popupH > window.innerHeight) top = Math.max(8, rect.top - popupH - 2);
    popup.style.cssText = `position:fixed;z-index:999999;background:var(--background-primary);border:1px solid var(--background-modifier-border);border-radius:6px;box-shadow:0 4px 12px rgba(0,0,0,0.18);padding:6px;max-height:${popupH}px;display:flex;flex-direction:column;left:${rect.left}px;top:${top}px;`;
    if (width) popup.style.width = width + "px";
    else popup.style.minWidth = Math.max(rect.width, 220) + "px";
    const pw = width || Math.max(rect.width, 220);
    if (rect.left + pw > window.innerWidth - 8) popup.style.left = Math.max(8, window.innerWidth - pw - 8) + "px";
    const search = popup.createEl("input", { type: "text", attr: { placeholder, style: "width:100%;box-sizing:border-box;padding:4px 6px;margin-bottom:4px;" } });
    const list = popup.createEl("div", { attr: { style: "flex:1;min-height:0;overflow-y:auto;overflow-x:hidden;" } });
    let items = [], activeIdx = -1;
    const refresh = () => {
        list.empty();
        renderItems(list, search.value.trim().toLowerCase(), (value) => { close(); onPick(value); });
        items = Array.from(list.querySelectorAll(".fop-picker-item"));
        activeIdx = -1;
    };
    const setActive = (idx) => {
        if (activeIdx >= 0 && items[activeIdx]) items[activeIdx].classList.remove("fop-picker-active");
        activeIdx = idx;
        if (activeIdx >= 0 && items[activeIdx]) {
            const it = items[activeIdx];
            it.classList.add("fop-picker-active");
            const itRect = it.getBoundingClientRect(), lRect = list.getBoundingClientRect();
            if (itRect.top < lRect.top) list.scrollTop -= (lRect.top - itRect.top + 2);
            else if (itRect.bottom > lRect.bottom) list.scrollTop += (itRect.bottom - lRect.bottom + 2);
        }
    };
    search.addEventListener("input", refresh);
    search.addEventListener("keydown", (e) => {
        if (e.key === "ArrowDown") { e.preventDefault(); setActive(Math.min(activeIdx + 1, items.length - 1)); }
        else if (e.key === "ArrowUp") { e.preventDefault(); setActive(Math.max(activeIdx - 1, 0)); }
        else if (e.key === "Enter") { e.preventDefault(); if (activeIdx >= 0 && items[activeIdx]) items[activeIdx].dispatchEvent(new MouseEvent("mousedown", { bubbles: true })); }
        else if (e.key === "Escape") { e.preventDefault(); close(); }
    });
    const onDocDown = (e) => { if (!popup.contains(e.target) && !hostEl.contains(e.target)) close(); };
    const onDocKey = (e) => { if (e.key === "Escape") close(); };
    setTimeout(() => { document.addEventListener("mousedown", onDocDown); document.addEventListener("keydown", onDocKey, true); }, 0);
    const close = () => {
        popup.remove();
        document.removeEventListener("mousedown", onDocDown);
        document.removeEventListener("keydown", onDocKey, true);
        if (window._fopPickerClose === close) window._fopPickerClose = null;
    };
    window._fopPickerClose = close;
    refresh();
    search.focus();
    return { close, refresh };
}

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

const CUSTOM_TRANSFORM_LABELS = {
    fullwidthToHalf: "全角转半角", toggleChecklist: "任务列表",
    toggleHeading1: "H1", toggleHeading2: "H2", toggleHeading3: "H3",
    toggleHeading4: "H4", toggleHeading5: "H5", toggleHeading6: "H6",
    toggleParagraph: "正文", toggleCodeblock: "代码块", toggleMathblock: "数学块",
};

const ACTION_LABELS = {
    copyBlockRef: "复制为块引用", extractToNote: "提取为新笔记", copyHeadingLink: "复制标题链接", setSelectionAsTitle: "选中文本设为文档标题", clipboardToNote: "剪贴板创建新笔记",
};

const FILE_ACTIONS = {
    newTab: { label: "新标签页", icon: "file-plus", available: (c) => c.isFile && !c.multi, fn: (c) => () => c.plugin.app.workspace.getLeaf().openFile(c.file) },
    newWindow: { label: "新窗口", icon: "app-window", available: (c) => c.isFile && !c.multi, fn: (c) => () => c.plugin.openInNewWindow(c.file) },
    defaultApp: { label: "默认应用", icon: "external-link", available: (c) => c.isFile && !c.multi, fn: (c) => () => c.plugin.openWithDefaultApp(c.file) },
    externalEditor: { label: "外部编辑器", icon: "square-pen", available: (c) => c.isFile && !c.multi, fn: (c) => () => c.plugin.openWithExternalEditor(c.file) },
    revealInExplorer: { label: "资源管理器", icon: "folder-search", available: (c) => !c.multi, fn: (c) => () => c.plugin.revealInExplorer(c.file) },
    rename: { label: "重命名", icon: "pencil", inline: true, available: (c) => !c.multi, fn: (c) => (m, r) => c.plugin.renameInline(m, r, c.file) },
    duplicate: { label: "创建副本", icon: "copy", available: (c) => c.isFile && !c.multi, fn: (c) => () => c.plugin.createDuplicate(c.file) },
    togglePin: { label: "置顶", icon: "pin", dynamicLabel: "pin", available: (c) => !c.multi, fn: (c) => () => c.plugin.togglePin(c.file) },
    newFolder: { label: "新建文件夹", icon: "folder-plus", inline: true, available: (c) => !c.isFile && !c.multi, fn: (c) => (m, r) => c.plugin.createInline(m, r, c.file, true) },
    newFile: { label: "新建文件", icon: "file-plus", inline: true, available: (c) => !c.isFile && !c.multi, fn: (c) => (m, r) => c.plugin.createInline(m, r, c.file, false) },
    absPath: { label: "绝对路径", icon: "link", fn: (c) => () => c.plugin.copyAbsolutePath(c.allTargets) },
    relPath: { label: "相对路径", icon: "link-2", fn: (c) => () => c.plugin.copyRelativePath(c.allTargets) },
    wikilink: { label: "wikilink", icon: "link", available: (c) => !c.multi, fn: (c) => () => c.plugin.copyAsWikilink(c.file) },
    mdLink: { label: "md链接", icon: "link", available: (c) => !c.multi, fn: (c) => () => c.plugin.copyAsMarkdownLink(c.file) },
    copyFiles: { label: "复制", icon: "copy", available: (c) => c.isFile && c.files.length > 0, fn: (c) => () => c.plugin.copyFilesToClipboard(c.files) },
    moveUp: { label: "文件上移", icon: "arrow-up", available: (c) => c.isFile && c.files.length > 0, fn: (c) => () => c.plugin.moveFilesUp(c.files) },
    moveTo: { label: "移动到…", icon: "folder-input", available: (c) => c.isFile && c.files.length > 0, fn: (c) => () => c.plugin.startMoveMode(c.files) },
    delete: { label: "删除", icon: "trash-2", dynamicLabel: "delete", danger: true, fn: (c) => () => c.plugin.deleteFiles(c.allTargets) },
    colorRow: { label: "颜色", icon: "palette", special: "colorRow", available: (c) => !c.multi },
    toggleEditorMenu: { label: "关闭编辑器增强菜单", icon: "settings", dynamicLabel: "editorMenu", fn: (c) => () => { c.plugin.editorMenuConfig.enabled = c.plugin.editorMenuConfig.enabled === false; c.plugin.saveEditorMenuConfig(); new Notice(c.plugin.editorMenuConfig.enabled ? t("已启用编辑器增强菜单") : t("已关闭编辑器增强菜单")); } },
};

const TAB_ACTIONS = {
    close: { label: "关闭", icon: "x", fn: (c) => () => c.safeDetach(c.leaf) },
    closeOthers: { label: "关闭其他", icon: "x-circle", fn: (c) => () => c.plugin.closeOtherTabs(c.leaf) },
    closeRight: { label: "关闭右侧", icon: "x-square", fn: (c) => () => c.plugin.closeRightTabs(c.leaf) },
    closeAll: { label: "全部关闭", icon: "x-square", fn: (c) => () => c.plugin.closeAllTabs(c.leaf) },
    togglePin: { label: "锁定", icon: "pin", dynamicLabel: "tabPin", fn: (c) => () => c.leaf.setPinned(!c.isPinned) },
    togglePreview: { label: "阅读/源码", icon: "book-open", fn: (c) => () => c.plugin.execOnLeaf(c.leaf, ["markdown:toggle-preview", "obsidian:toggle-preview"], t("阅读视图")) },
    splitV: { label: "左右分屏", icon: "columns", fn: (c) => () => c.plugin.execOnLeaf(c.leaf, ["workspace:split-vertical"], t("左右分屏")) },
    splitH: { label: "上下分屏", icon: "rows", fn: (c) => () => c.plugin.execOnLeaf(c.leaf, ["workspace:split-horizontal"], t("上下分屏")) },
    newWindow: { label: "新窗口", icon: "app-window", fn: (c) => () => c.plugin.execOnLeaf(c.leaf, ["workspace:move-to-new-window"], t("移动至新窗口")) },
    defaultApp: { label: "默认应用", icon: "external-link", available: (c) => c.file instanceof TFile, fn: (c) => () => c.plugin.openWithDefaultApp(c.file) },
    externalEditor: { label: "外部编辑器", icon: "square-pen", available: (c) => c.file instanceof TFile, fn: (c) => () => c.plugin.openWithExternalEditor(c.file) },
    revealInExplorer: { label: "资源管理器", icon: "folder-search", available: (c) => c.file instanceof TFile, fn: (c) => () => c.plugin.revealInExplorer(c.file) },
    localGraph: { label: "局部图", icon: "git-fork", available: (c) => c.file instanceof TFile, fn: (c) => () => c.plugin.execOnLeaf(c.leaf, ["graph:open-local", "graph:open"], t("局部关系图")) },
    backlink: { label: "反链", icon: "links-coming-in", available: (c) => c.file instanceof TFile, fn: (c) => () => c.plugin.execOnLeaf(c.leaf, ["backlink:open", "backlink:open-tab"], t("反向链接")) },
    outgoingLink: { label: "出链", icon: "links-going-out", available: (c) => c.file instanceof TFile, fn: (c) => () => c.plugin.execOnLeaf(c.leaf, ["outgoing-link:open", "outgoing-link:open-tab", "outgoing-links:open"], t("出链")) },
    outline: { label: "大纲", icon: "list", available: (c) => c.file instanceof TFile, fn: (c) => () => c.plugin.execOnLeaf(c.leaf, ["outline:open", "outline:open-tab"], t("大纲")) },
    rename: { label: "重命名", icon: "pencil", inline: true, available: (c) => c.file instanceof TFile, fn: (c) => (m, r) => c.plugin.renameInline(m, r, c.file) },
    duplicate: { label: "创建副本", icon: "copy", available: (c) => c.file instanceof TFile, fn: (c) => () => c.plugin.createDuplicate(c.file) },
    toggleFilePin: { label: "置顶", icon: "pin", dynamicLabel: "filePin", available: (c) => c.file instanceof TFile, fn: (c) => () => c.plugin.togglePin(c.file) },
    absPath: { label: "绝对路径", icon: "link", available: (c) => c.file instanceof TFile, fn: (c) => () => c.plugin.copyAbsolutePath([c.file]) },
    relPath: { label: "相对路径", icon: "link-2", available: (c) => c.file instanceof TFile, fn: (c) => () => c.plugin.copyRelativePath([c.file]) },
    wikilink: { label: "wikilink", icon: "link", available: (c) => c.file instanceof TFile, fn: (c) => () => c.plugin.copyAsWikilink(c.file) },
    mdLink: { label: "md链接", icon: "link", available: (c) => c.file instanceof TFile, fn: (c) => () => c.plugin.copyAsMarkdownLink(c.file) },
    copyFiles: { label: "复制", icon: "copy", available: (c) => c.file instanceof TFile, fn: (c) => () => c.plugin.copyFilesToClipboard([c.file]) },
    moveUp: { label: "文件上移", icon: "arrow-up", available: (c) => c.file instanceof TFile, fn: (c) => () => c.plugin.moveFilesUp([c.file]) },
    moveTo: { label: "移动到…", icon: "folder-input", available: (c) => c.file instanceof TFile, fn: (c) => () => c.plugin.startMoveMode([c.file]) },
    find: { label: "查找", icon: "search", available: (c) => c.file instanceof TFile, fn: (c) => () => c.plugin.execOnLeaf(c.leaf, ["editor:open-search", "editor:find"], t("查找")) },
    replace: { label: "替换", icon: "replace", available: (c) => c.file instanceof TFile, fn: (c) => () => c.plugin.execOnLeaf(c.leaf, ["editor:open-replace", "editor:replace"], t("替换")) },
    exportPDF: { label: "导出PDF", icon: "file-text", available: (c) => c.file instanceof TFile, fn: (c) => () => c.plugin.execOnLeaf(c.leaf, ["markdown:export-pdf", "obsidian:export-pdf"], t("导出")) },
    colorRow: { label: "颜色", icon: "palette", special: "colorRow", available: (c) => c.file instanceof TFile },
    delete: { label: "删除", icon: "trash-2", danger: true, available: (c) => c.file instanceof TFile, fn: (c) => () => c.plugin.deleteFiles([c.file]) },
};

const DEFAULT_FILE_MENU = {
    enabled: true,
    groups: [
        { id: "open", label: t("打开"), color: "accent", items: [{ action: "newTab" }, { action: "newWindow" }, { action: "defaultApp" }, { action: "externalEditor" }, { action: "revealInExplorer" }] },
        { id: "manage", label: t("管理"), color: "pro", items: [{ action: "rename" }, { action: "duplicate" }, { action: "togglePin" }, { action: "newFolder" }, { action: "newFile" }] },
        { id: "copy", label: t("复制"), color: "success", items: [{ action: "absPath" }, { action: "relPath" }, { action: "wikilink" }, { action: "mdLink" }, { action: "copyFiles" }, { action: "moveUp" }, { action: "moveTo" }] },
        { id: "color", label: t("高亮"), color: "warning", items: [{ action: "colorRow" }] },
        { id: "danger", label: t("删除"), color: "regex", items: [{ action: "delete" }, { action: "toggleEditorMenu" }] },
    ],
};

const DEFAULT_TAB_MENU = {
    enabled: true,
    groups: [
        { id: "close", label: t("关闭"), color: "regex", items: [{ action: "close" }, { action: "closeOthers" }, { action: "closeRight" }, { action: "closeAll" }, { action: "togglePin" }] },
        { id: "view", label: t("视图"), color: "accent", items: [{ action: "togglePreview" }, { action: "splitV" }, { action: "splitH" }, { action: "newWindow" }, { action: "defaultApp" }, { action: "externalEditor" }, { action: "revealInExplorer" }] },
        { id: "nav", label: t("导航"), color: "pro", items: [{ action: "localGraph" }, { action: "backlink" }, { action: "outgoingLink" }, { action: "outline" }, { action: "rename" }, { action: "duplicate" }, { action: "toggleFilePin" }] },
        { id: "copy", label: t("复制"), color: "success", items: [{ action: "absPath" }, { action: "relPath" }, { action: "wikilink" }, { action: "mdLink" }, { action: "copyFiles" }, { action: "moveUp" }, { action: "moveTo" }] },
        { id: "edit", label: t("编辑"), color: "neutral", items: [{ action: "find" }, { action: "replace" }, { action: "exportPDF" }] },
        { id: "color", label: t("高亮"), color: "warning", items: [{ action: "colorRow" }] },
        { id: "danger", label: t("删除"), color: "regex", items: [{ action: "delete" }] },
    ],
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
.fop-drag-handle{cursor:grab;width:14px;flex-shrink:0;text-align:center;color:var(--text-faint);font-size:9px;line-height:14px;user-select:none;}
.fop-drag-handle:hover{color:var(--text-normal);}
.fop-drag-over{background:var(--background-modifier-hover)!important;border-radius:4px;}
.fop-picker-item:hover{background:var(--background-modifier-hover);}
.fop-picker-active{background:var(--background-modifier-hover);outline:1px solid var(--interactive-accent);}
.fop-em-body{display:flex;gap:6px;align-items:flex-start;}
.fop-em-left-col{flex:1;min-width:0;display:flex;flex-direction:column;gap:6px;}
.fop-em-divider{width:5px;align-self:stretch;background:transparent;border-left:1px solid var(--background-modifier-border);margin:0 1px;cursor:col-resize;flex-shrink:0;}
.fop-em-stash-col{width:230px;flex-shrink:0;display:flex;flex-direction:column;gap:4px;min-height:0;}
.fop-em-tab-bar{display:flex;gap:2px;border-bottom:1px solid var(--background-modifier-border);padding-bottom:3px;}
.fop-em-tab{font-size:10px;padding:2px 8px;border-radius:3px 3px 0 0;cursor:pointer;color:var(--text-muted);}
.fop-em-tab.active{color:var(--text-normal);font-weight:600;border-bottom:2px solid var(--interactive-accent);}
.fop-em-tab-content{flex:1;display:flex;flex-direction:column;gap:4px;min-height:0;}
.fop-em-stash-head{display:flex;align-items:center;justify-content:space-between;}
.fop-em-stash-title{font-size:10px;color:var(--text-muted);}
.fop-em-stash-clear{cursor:pointer;font-size:11px;color:var(--text-faint);padding:0 2px;}
.fop-em-input-box{position:relative;display:flex;align-items:stretch;align-self:flex-start;width:100%;}
.fop-em-input-resize{position:absolute;right:-2px;top:0;bottom:0;width:5px;cursor:col-resize;z-index:5;}
.fop-em-stash-input{flex:1;min-width:0;resize:vertical;min-height:28px;max-height:80px;padding:3px 26px 3px 6px;font-size:var(--font-ui-smaller);background:var(--background-primary);border:1px solid var(--background-modifier-border);border-radius:5px;font-family:inherit;}
.fop-em-stash-add{position:absolute;right:4px;top:50%;transform:translateY(-50%);width:18px;height:18px;border-radius:4px;background:var(--interactive-accent);color:var(--text-on-accent);display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:14px;line-height:1;font-weight:bold;}
.fop-acc{display:flex;flex-direction:column;gap:6px;overflow-y:auto;flex:1;min-height:0;padding-left:12px;position:relative;}
.fop-acc::before{content:"";position:absolute;left:5px;top:6px;bottom:6px;width:1px;background:var(--background-modifier-border);}
.fop-acc-item{position:relative;background:var(--background-primary);border:1px solid var(--background-modifier-border);border-radius:7px;overflow:hidden;}
.fop-acc-item::before{content:"";position:absolute;left:-9px;top:9px;width:7px;height:7px;border-radius:50%;background:var(--interactive-accent);border:1px solid var(--background-primary);z-index:1;}
.fop-acc-head{display:flex;align-items:center;gap:6px;padding:5px 7px;font-size:11.5px;cursor:pointer;}
.fop-acc-time{font-size:9px;color:var(--text-faint);flex-shrink:0;font-variant-numeric:tabular-nums;}
.fop-acc-caret{font-size:9px;color:var(--text-muted);flex-shrink:0;}
.fop-acc-txt{flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.fop-acc-del{flex-shrink:0;font-size:10px;color:var(--text-faint);cursor:pointer;display:none;padding:0 2px;}
.fop-acc-head:hover .fop-acc-del{display:block;}
.fop-acc-body{display:none;padding:0 7px 7px;font-size:11.5px;line-height:1.5;color:var(--text-normal);word-break:break-all;}
.fop-acc-item.open .fop-acc-body{display:block;}
.fop-acc-item.open .fop-acc-caret{transform:rotate(90deg);}
.fop-acc-insert{margin-top:4px;font-size:10.5px;color:var(--interactive-accent);cursor:pointer;display:inline-block;}
.fop-em-stash-empty{font-size:var(--font-ui-smaller);color:var(--text-faint);padding:6px 4px;}
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
    selectionBall: false,
    selectionBallOffset: { x: 12, y: -28 },
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
            { icon: "git-merge", label: t("管道"), type: "pipeline", pipeline: t("去HTML标签") + "\u2192" + t("合并空行") },
        ]},
        { id: "action", label: t("操作"), color: "accent", items: [
            { icon: "link", label: t("复制为块引用"), type: "action", action: "copyBlockRef" },
            { icon: "file-plus", label: t("提取为新笔记"), type: "action", action: "extractToNote" },
            { icon: "heading", label: t("复制标题链接"), type: "action", action: "copyHeadingLink" },
            { icon: "clipboard-paste", label: t("剪贴板创建新笔记"), type: "action", action: "clipboardToNote" },
        ]},
        { id: "mark", label: t("高亮"), color: "warning", items: [
            { icon: "highlighter", label: t("黄"), type: "regex", pattern: '([\\s\\S]+)', replacement: '<mark style="background:#FFF3A3">$1</mark>', flags: "", color: "#FFF3A3|#5a4a00", requireSelection: true },
            { icon: "highlighter", label: t("红"), type: "regex", pattern: '([\\s\\S]+)', replacement: '<mark style="background:#FFB3B3">$1</mark>', flags: "", color: "#FFB3B3|#7a0000", requireSelection: true },
            { icon: "highlighter", label: t("绿"), type: "regex", pattern: '([\\s\\S]+)', replacement: '<mark style="background:#B3FFB3">$1</mark>', flags: "", color: "#B3FFB3|#006600", requireSelection: true },
            { icon: "highlighter", label: t("蓝"), type: "regex", pattern: '([\\s\\S]+)', replacement: '<mark style="background:#B3D9FF">$1</mark>', flags: "", color: "#B3D9FF|#003a7a", requireSelection: true },
            { icon: "highlighter", label: t("粉"), type: "regex", pattern: '([\\s\\S]+)', replacement: '<mark style="background:#FFB3D9">$1</mark>', flags: "", color: "#FFB3D9|#7a0033", requireSelection: true },
            { icon: "highlighter", label: t("橙"), type: "regex", pattern: '([\\s\\S]+)', replacement: '<mark style="background:#FFD9B3">$1</mark>', flags: "", color: "#FFD9B3|#7a4500", requireSelection: true },
            { icon: "highlighter", label: t("紫"), type: "regex", pattern: '([\\s\\S]+)', replacement: '<mark style="background:#D9B3FF">$1</mark>', flags: "", color: "#D9B3FF|#3a0066", requireSelection: true },
            { icon: "highlighter", label: t("青"), type: "regex", pattern: '([\\s\\S]+)', replacement: '<mark style="background:#B3FFFF">$1</mark>', flags: "", color: "#B3FFFF|#006666", requireSelection: true },
        ]},
        { id: "clipboard", label: t("剪贴板"), color: "neutral", items: [
            { icon: "scissors", label: t("剪切"), type: "cmd", cmd: "editor:cut" },
            { icon: "copy", label: t("复制"), type: "cmd", cmd: "editor:copy" },
            { icon: "clipboard", label: t("粘贴"), type: "cmd", cmd: "editor:paste" },
            { icon: "clipboard-list", label: t("纯文本粘贴"), type: "cmd", cmd: "editor:paste-plain" },
            { icon: "check-line", label: t("全选"), type: "cmd", cmd: "editor:select-all" },
        ]},
        { id: "ai", label: t("AI"), color: "pro", items: [
            { icon: "sparkles", label: "AI", type: "ai", prompt: t("根据选中文本提供几个Insight") },
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
        this.colorPalette = Array.isArray(data.colorPalette) ? data.colorPalette : null;
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
                    const di = dg.items.find(i => i.label === item.label) || (item.pattern != null ? dg.items.find(i => i.pattern === item.pattern && i.replacement === item.replacement) : null);
                    if (!di) continue;
                    if (item.type !== di.type || (item.type === "cmd" && di.type === "cmd" && item.cmd !== di.cmd)) {
                        item.type = di.type; item.custom = di.custom; item.cmd = di.cmd; needSave = true;
                    }
                    if (di.requireSelection !== undefined && item.requireSelection === undefined) { item.requireSelection = di.requireSelection; needSave = true; }
                }
            }
            if (needSave) this.saveEditorMenuConfig();
        }
        if (!Array.isArray(this.editorMenuConfig.aiConfigs) || this.editorMenuConfig.aiConfigs.length === 0) {
            this.editorMenuConfig.aiConfigs = [{ name: "DeepSeek", model: "deepseek-v4-flash", base_url: "https://api.deepseek.com/chat/completions", apiKey: "", temperature: 0.7 }];
            this.editorMenuConfig.currentAI = 0;
            this.saveEditorMenuConfig();
        }
        if (this.editorMenuConfig.currentAI == null || this.editorMenuConfig.currentAI >= this.editorMenuConfig.aiConfigs.length) this.editorMenuConfig.currentAI = 0;
        this.fileMenuConfig = data.fileMenu ? data.fileMenu : JSON.parse(JSON.stringify(DEFAULT_FILE_MENU));
        this.tabMenuConfig = data.tabMenu ? data.tabMenu : JSON.parse(JSON.stringify(DEFAULT_TAB_MENU));
        if (!document.getElementById("fop-em-style")) {
            const s = document.createElement("style");
            s.id = "fop-em-style";
            s.textContent = EDITOR_MENU_CSS;
            document.head.appendChild(s);
        }
        this.contextMenuHandler = (evt) => this.onContextMenu(evt);
        document.addEventListener("contextmenu", this.contextMenuHandler, { capture: true });
        this.selectionChangeHandler = () => { if (this._selBallTimer) clearTimeout(this._selBallTimer); this._selBallTimer = setTimeout(() => this._updateSelectionBall(), 150); };
        document.addEventListener("selectionchange", this.selectionChangeHandler);
        this._lastMouseX = 0; this._lastMouseY = 0; this._mouseDown = false;
        this.mouseMoveHandler = (e) => { this._lastMouseX = e.clientX; this._lastMouseY = e.clientY; };
        document.addEventListener("mousemove", this.mouseMoveHandler);
        this.mouseDownHandler = () => { this._mouseDown = true; };
        this.mouseUpHandler = (e) => { this._mouseDown = false; this._lastMouseX = e.clientX; this._lastMouseY = e.clientY; if (this._selBallTimer) clearTimeout(this._selBallTimer); this._selBallTimer = setTimeout(() => this._updateSelectionBall(), 100); };
        document.addEventListener("mousedown", this.mouseDownHandler);
        document.addEventListener("mouseup", this.mouseUpHandler);
        this.colorInterval = window.setInterval(() => this.applyColors(), 500);
        this.applyColors();
        this.registerEvent(this.app.workspace.on("active-leaf-change", (leaf) => this.onActiveLeafChange(leaf)));

        this.addCommand({
            id: "open-editor-menu-settings",
            name: t("右键菜单设置"),
            callback: () => this.openEditorMenuSettings(),
        });

    }

    onunload() {
        if (this.contextMenuHandler) {
            document.removeEventListener("contextmenu", this.contextMenuHandler, { capture: true });
        }
        if (this.selectionChangeHandler) document.removeEventListener("selectionchange", this.selectionChangeHandler);
        if (this.mouseMoveHandler) document.removeEventListener("mousemove", this.mouseMoveHandler);
        if (this.mouseDownHandler) document.removeEventListener("mousedown", this.mouseDownHandler);
        if (this.mouseUpHandler) document.removeEventListener("mouseup", this.mouseUpHandler);
        this._hideSelectionBall();
        if (this.colorInterval) window.clearInterval(this.colorInterval);
        if (this.revealTimer) clearTimeout(this.revealTimer);
        this.cancelMoveMode();
    }

    _updateSelectionBall() {
        const cfg = this.editorMenuConfig;
        if (!cfg || cfg.enabled === false || cfg.selectionBall !== true) { this._hideSelectionBall(); return; }
        if (this._mouseDown) { this._hideSelectionBall(); return; }
        const leaf = this.app.workspace.activeLeaf;
        const view = leaf && leaf.view;
        if (!view || !view.getViewType || view.getViewType() !== "markdown" || !view.editor) { this._hideSelectionBall(); return; }
        if (!view.editor.getSelection()) { this._hideSelectionBall(); return; }
        const domSel = window.getSelection();
        if (!domSel || domSel.rangeCount === 0) { this._hideSelectionBall(); return; }
        const anchor = domSel.anchorNode;
        if (!anchor || !anchor.parentElement || !anchor.parentElement.closest(".cm-editor, .markdown-source-view, .markdown-reading-view")) { this._hideSelectionBall(); return; }
        const rect = domSel.getRangeAt(0).getBoundingClientRect();
        if (!rect || (rect.width === 0 && rect.height === 0)) { this._hideSelectionBall(); return; }
        if (!cfg.selectionBallOffset || typeof cfg.selectionBallOffset.x !== "number") cfg.selectionBallOffset = { x: 12, y: -28 };
        if (!this.selectionBallEl) {
            const ball = document.createElement("div");
            ball.className = "fop-sel-ball";
            ball.style.cssText = "position:fixed;z-index:9998;width:20px;height:20px;border-radius:50%;background:var(--interactive-accent);color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 2px 6px rgba(0,0,0,.3);opacity:.65;transition:opacity .15s,transform .15s;font-size:13px;line-height:1;user-select:none;";
            ball.textContent = "≡";
            ball.addEventListener("mouseenter", () => {
                if (document.querySelector(".fop-em-panel")) return;
                ball.style.opacity = "1"; ball.style.transform = "scale(1.15)";
                const r = ball.getBoundingClientRect();
                this.showEditorMenu(r.left, r.bottom + 4, view);
            });
            document.body.appendChild(ball);
            this.selectionBallEl = ball;
        }

        const ball = this.selectionBallEl;
        const off = cfg.selectionBallOffset;
        ball.style.left = Math.max(0, Math.min(this._lastMouseX + off.x, window.innerWidth - 20)) + "px";
        ball.style.top = Math.max(0, Math.min(this._lastMouseY + off.y, window.innerHeight - 20)) + "px";
    }

    _hideSelectionBall() {
        if (this.selectionBallEl) { this.selectionBallEl.remove(); this.selectionBallEl = null; }
    }

    onContextMenu(evt) {
        const tabHeader = evt.target.closest(".workspace-tab-header");
        if (tabHeader) {
            if (!this.tabMenuConfig || this.tabMenuConfig.enabled === false) return;
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
        if (!this.fileMenuConfig || this.fileMenuConfig.enabled === false) return;
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

    createFopMenuPanel(x, y) {
        const existing = document.querySelector(".file-ops-plus-menu");
        if (existing) existing.remove();
        const panel = document.createElement("div");
        panel.className = "file-ops-plus-menu";
        panel.style.cssText = "position:fixed;left:" + x + "px;top:" + y + "px;background:var(--background-secondary);border:1px solid var(--background-modifier-border);border-radius:10px;padding:8px;z-index:9999;box-shadow:0 4px 16px rgba(0,0,0,0.2);font-size:var(--font-ui-small);";
        const addRow = (items, colorKey) => {
            const row = document.createElement("div");
            row.style.cssText = "display:flex;gap:3px;flex-wrap:wrap;margin:2px 0;";
            const gc = GROUP_COLORS[colorKey];
            const baseBg = gc ? gc.bg : "transparent";
            for (const item of items) {
                const btn = document.createElement("div");
                btn.style.cssText = "padding:5px 8px;border-radius:5px;cursor:pointer;white-space:nowrap;display:flex;align-items:center;gap:4px;";
                btn.style.background = baseBg;
                btn.style.color = gc ? gc.fg : "var(--text-normal)";
                if (item.danger) btn.style.color = "var(--text-error)";
                if (item.icon) {
                    if (typeof item.icon === "string" && item.icon.includes("<svg")) {
                        const wrapper = document.createElement("span");
                        wrapper.style.cssText = "display:inline-flex;align-items:center;width:14px;height:14px;";
                        wrapper.innerHTML = item.icon;
                        const svg = wrapper.querySelector("svg");
                        if (svg) { svg.style.width = "14px"; svg.style.height = "14px"; }
                        btn.appendChild(wrapper);
                    } else { try { const ic = getIcon(item.icon); if (ic) { ic.style.width = "14px"; ic.style.height = "14px"; btn.appendChild(ic); } } catch (e) {} }
                }
                if (item.title) { const sp = document.createElement("span"); sp.textContent = item.title; btn.appendChild(sp); }
                btn.addEventListener("mouseenter", () => (btn.style.background = "var(--background-modifier-hover)"));
                btn.addEventListener("mouseleave", () => (btn.style.background = baseBg));
                if (item.inline) btn.addEventListener("click", () => item.fn(panel, row));
                else btn.addEventListener("click", () => { panel.remove(); item.fn(); });
                row.appendChild(btn);
            }
            panel.appendChild(row);
            return row;
        };
        const finish = () => {
            document.body.appendChild(panel);
            const rect = panel.getBoundingClientRect();
            if (x + rect.width > window.innerWidth - 10) panel.style.left = window.innerWidth - rect.width - 10 + "px";
            if (y + rect.height > window.innerHeight - 10) panel.style.top = window.innerHeight - rect.height - 10 + "px";
            const isBlank = (el) => el === panel || (el.parentElement === panel && el.tagName === "DIV" && el.style.cursor !== "pointer");
            panel.addEventListener("mousedown", (e) => {
                if (e.button !== 0 || !isBlank(e.target)) return;
                e.preventDefault();
                let dragging = true, sx = e.clientX, sy = e.clientY, sl = panel.offsetLeft, st = panel.offsetTop;
                const mv = (ev) => { if (dragging) { panel.style.left = (sl + ev.clientX - sx) + "px"; panel.style.top = (st + ev.clientY - sy) + "px"; } };
                const up = () => { dragging = false; document.removeEventListener("mousemove", mv); document.removeEventListener("mouseup", up); };
                document.addEventListener("mousemove", mv);
                document.addEventListener("mouseup", up);
            });
            const closeHandler = (e) => { if (!panel.contains(e.target)) { panel.remove(); cleanup(); } };
            const escHandler = (e) => { if (e.key === "Escape") { if (e.target.tagName === "INPUT") return; panel.remove(); cleanup(); } };
            const cleanup = () => { document.removeEventListener("mousedown", closeHandler, true); document.removeEventListener("keydown", escHandler, true); };
            setTimeout(() => { document.addEventListener("mousedown", closeHandler, true); document.addEventListener("keydown", escHandler, true); }, 0);
        };
        return { panel, addRow, finish };
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

        const { panel, addRow, finish } = this.createFopMenuPanel(x, y);
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
        const ctx = { plugin: this, leaf, file, isPinned, safeDetach };
        this.renderMenuByConfig(panel, addRow, this.tabMenuConfig, TAB_ACTIONS, ctx);
        finish();
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
        const { panel, addRow, finish } = this.createFopMenuPanel(x, y);
        const isFile = file instanceof TFile;
        const multi = files.length > 1;
        const allTargets = files.length > 0 ? files : [file];
        const ctx = { plugin: this, file, files, multi, isFile, allTargets };
        this.renderMenuByConfig(panel, addRow, this.fileMenuConfig, FILE_ACTIONS, ctx);
        finish();
    }

    renderMenuByConfig(panel, addRow, config, actionTable, ctx) {
        for (const grp of (config.groups || [])) {
            const items = [];
            for (const item of (grp.items || [])) {
                const a = actionTable[item.action];
                if (!a) continue;
                if (a.available && !a.available(ctx)) continue;
                if (a.special === "colorRow") { this.addColorRow(panel, ctx.file); continue; }
                const entry = {};
                if (item.label === undefined) entry.title = this._actionLabel(a, ctx);
                else entry.title = item.label;
                entry.icon = item.icon || a.icon || null;
                if (a.danger) entry.danger = true;
                if (a.inline) entry.inline = true;
                entry.fn = a.fn(ctx);
                items.push(entry);
            }
            if (items.length) {
                if (config.showGroupLabels !== false && grp.label) {
                    const lbl = document.createElement("div");
                    lbl.textContent = grp.label;
                    lbl.style.cssText = "font-size:10px;margin:4px 0 1px 2px;color:var(--text-muted);";
                    panel.appendChild(lbl);
                }
                addRow(items, grp.color);
            }
        }
    }

    _actionLabel(a, ctx) {
        if (a.dynamicLabel === "pin") return this.pinSet.has(ctx.file.path) ? t("取消置顶") : t("置顶");
        if (a.dynamicLabel === "delete") return ctx.multi ? t("删除 ") + ctx.files.length + t(" 个") : t("删除");
        if (a.dynamicLabel === "editorMenu") return this.editorMenuConfig.enabled !== false ? t("关闭编辑器增强菜单") : t("启用编辑器增强菜单");
        if (a.dynamicLabel === "tabPin") return ctx.isPinned ? t("取消锁定") : t("锁定");
        if (a.dynamicLabel === "filePin") return this.pinSet.has(ctx.file.path) ? t("取消置顶") : t("置顶");
        return t(a.label);
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
        const DEFAULT_COLORS = [
            { c: "#e74c3c", n: t("红") }, { c: "#e67e22", n: t("橙") }, { c: "#f1c40f", n: t("黄") },
            { c: "#2ecc71", n: t("绿") }, { c: "#1abc9c", n: t("青") }, { c: "#3498db", n: t("蓝") },
            { c: "#9b59b6", n: t("紫") }, { c: "#95a5a6", n: t("灰") },
        ];
        const palette = this.colorPalette || DEFAULT_COLORS;
        const row = document.createElement("div");
        row.style.cssText = "display:flex;gap:3px;padding:4px;align-items:center;flex-wrap:wrap;border:1px solid var(--background-modifier-border);border-radius:6px;margin:2px 0;";

        const isBold = this.boldSet.has(file.path);
        const boldBtn = document.createElement("div");
        boldBtn.textContent = "B";
        boldBtn.style.cssText = "width:20px;height:20px;border-radius:4px;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:bold;" + (isBold ? "background:var(--interactive-accent);color:var(--text-on-accent);border:1px solid var(--interactive-accent);" : "border:1px solid var(--background-modifier-border);color:var(--text-normal);");
        boldBtn.title = t("加粗");
        boldBtn.addEventListener("click", async () => { await this.toggleBold(file); boldBtn.style.cssText = "width:20px;height:20px;border-radius:4px;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:bold;" + (this.boldSet.has(file.path) ? "background:var(--interactive-accent);color:var(--text-on-accent);border:1px solid var(--interactive-accent);" : "border:1px solid var(--background-modifier-border);color:var(--text-normal);"); });
        row.appendChild(boldBtn);

        const dotsWrap = document.createElement("div");
        dotsWrap.style.cssText = "display:flex;gap:3px;align-items:center;flex-wrap:wrap;";
        row.appendChild(dotsWrap);

        const current = this.colorMap[file.path];
        const renderDots = () => {
            while (dotsWrap.firstChild) dotsWrap.removeChild(dotsWrap.firstChild);
            const cur = this.colorMap[file.path];
            for (let i = 0; i < palette.length; i++) {
                const color = palette[i];
                const dot = document.createElement("div");
                dot.style.cssText = "width:18px;height:18px;border-radius:50%;cursor:pointer;background:" + color.c + ";" + (cur === color.c ? "border:2px solid var(--text-accent);box-shadow:0 0 4px var(--text-accent);" : "border:1px solid var(--background-modifier-border);");
                dot.title = color.n + " — " + t("右键删除");
                dot.addEventListener("click", async () => { const now = this.colorMap[file.path]; await this.setColor(file, now === color.c ? null : color.c); renderDots(); });
                dot.addEventListener("contextmenu", (e) => { e.preventDefault(); e.stopPropagation(); palette.splice(i, 1); this.colorPalette = palette; this.saveData({ colors: this.colorMap, pins: Array.from(this.pinSet), bolds: Array.from(this.boldSet), colorPalette: palette }); renderDots(); });
                dotsWrap.appendChild(dot);
            }
        };
        renderDots();

        const addBtn = document.createElement("div");
        addBtn.textContent = "+";
        addBtn.style.cssText = "width:20px;height:20px;border-radius:4px;cursor:pointer;display:flex;align-items:center;justify-content:center;border:1px dashed var(--background-modifier-border);color:var(--text-muted);font-size:14px;";
        addBtn.title = t("添加颜色");
        addBtn.addEventListener("click", () => {
            const input = document.createElement("input");
            input.type = "color";
            input.value = "#3498db";
            input.style.cssText = "width:20px;height:20px;border:none;cursor:pointer;padding:0;";
            const confirm = () => { const c = input.value; if (c && !palette.some(p => p.c === c)) { palette.push({ c, n: c }); this.colorPalette = palette; this.saveData({ colors: this.colorMap, pins: Array.from(this.pinSet), bolds: Array.from(this.boldSet), colorPalette: palette }); } renderDots(); addBtn.style.display = ""; };
            addBtn.style.display = "none";
            input.addEventListener("change", confirm);
            input.addEventListener("blur", confirm);
            row.appendChild(input);
            input.click();
        });
        row.appendChild(addBtn);

        menu.appendChild(row);
    }

    async setColor(file, color) {
        if (color) {
            this.colorMap[file.path] = color;
        } else {
            delete this.colorMap[file.path];
        }
        await this.saveData({ colors: this.colorMap, pins: Array.from(this.pinSet), bolds: Array.from(this.boldSet), colorPalette: this.colorPalette || undefined });
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
        await this.saveData({ colors: this.colorMap, pins: Array.from(this.pinSet), bolds: Array.from(this.boldSet), colorPalette: this.colorPalette || undefined });
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
        await this.saveData({ colors: this.colorMap, pins: Array.from(this.pinSet), bolds: Array.from(this.boldSet), colorPalette: this.colorPalette || undefined });
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

        let accContainer = null, stashCountEl = null;
        const renderStash = () => {
            if (!accContainer) return;
            accContainer.empty();
            const stash = cfg.stash || [];
            if (stashCountEl) stashCountEl.textContent = t("暂存区") + " (" + stash.length + ")";
            if (stash.length === 0) {
                const empty = document.createElement("div");
                empty.className = "fop-em-stash-empty";
                empty.textContent = t("暂存区空");
                accContainer.appendChild(empty);
                return;
            }
            for (let i = stash.length - 1; i >= 0; i--) {
                const s = stash[i];
                const item = document.createElement("div");
                item.className = "fop-acc-item";
                const head = document.createElement("div");
                head.className = "fop-acc-head";
                const caret = document.createElement("span");
                caret.className = "fop-acc-caret";
                caret.textContent = "▶";
                head.appendChild(caret);
                const time = document.createElement("span");
                time.className = "fop-acc-time";
                time.textContent = s.ts ? new Date(s.ts).toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" }) : "";
                head.appendChild(time);
                const txt = document.createElement("span");
                txt.className = "fop-acc-txt";
                txt.textContent = s.text;
                head.appendChild(txt);
                const del = document.createElement("span");
                del.className = "fop-acc-del";
                del.textContent = "✕";
                const idx = i;
                del.onclick = (e) => { e.stopPropagation(); cfg.stash.splice(idx, 1); this.saveEditorMenuConfig(); renderStash(); };
                head.appendChild(del);
                item.appendChild(head);
                const body = document.createElement("div");
                body.className = "fop-acc-body";
                body.textContent = s.text;
                const insertBtn = document.createElement("div");
                insertBtn.className = "fop-acc-insert";
                insertBtn.textContent = t("点击插入");
                insertBtn.onclick = (e) => { e.stopPropagation(); const ed = view.editor; if (ed) ed.replaceSelection(s.text); };
                body.appendChild(insertBtn);
                item.appendChild(body);
                item.addEventListener("mouseenter", () => {
                    accContainer.querySelectorAll(".fop-acc-item").forEach(it => { if (it !== item) it.classList.remove("open"); });
                    item.classList.add("open");
                });
                item.addEventListener("mouseleave", () => {
                    item.classList.remove("open");
                });
                accContainer.appendChild(item);
            }
        };
        const stashOn = cfg.stashEnabled !== false;
        const body = document.createElement("div");
        body.className = "fop-em-body";
        const leftCol = document.createElement("div");
        leftCol.className = "fop-em-left-col";
        const inputBox = document.createElement("div");
        inputBox.className = "fop-em-input-box";
        const stashInput = document.createElement("textarea");
        stashInput.className = "fop-em-stash-input";
        stashInput.placeholder = t("暂存选中文本到面板右侧");
        const addBtn = document.createElement("div");
        addBtn.className = "fop-em-stash-add";
        addBtn.textContent = "+";
        addBtn.title = t("添加到暂存区");
        addBtn.onclick = () => { const text = stashInput.value; if (!text) { new Notice(t("请先输入文本")); return; } cfg.stash = cfg.stash || []; cfg.stash.push({ id: "s" + Date.now(), text: text, ts: Date.now() }); this.saveEditorMenuConfig(); renderStash(); stashInput.value = ""; };
        inputBox.appendChild(stashInput);
        inputBox.appendChild(addBtn);
        if (!stashOn) addBtn.style.display = "none";
        if (cfg.inputBoxWidth) inputBox.style.width = cfg.inputBoxWidth + "px";
        const inputResize = document.createElement("div");
        inputResize.className = "fop-em-input-resize";
        inputBox.appendChild(inputResize);
        inputResize.addEventListener("mousedown", (e) => {
            e.preventDefault(); e.stopPropagation();
            const startX = e.clientX;
            const startW = inputBox.offsetWidth;
            const onMove = (ev) => {
                const nw = Math.max(120, Math.min(panel.offsetWidth - 20, startW + (ev.clientX - startX)));
                inputBox.style.width = nw + "px";
            };
            const onUp = () => {
                document.removeEventListener("mousemove", onMove);
                document.removeEventListener("mouseup", onUp);
                cfg.inputBoxWidth = inputBox.offsetWidth;
                this.saveEditorMenuConfig();
            };
            document.addEventListener("mousemove", onMove);
            document.addEventListener("mouseup", onUp);
        });
        leftCol.appendChild(inputBox);
        leftCol.appendChild(row);
        body.appendChild(leftCol);
        if (stashOn) {
            const divider = document.createElement("div");
            divider.className = "fop-em-divider";
            body.appendChild(divider);
            const stashCol = document.createElement("div");
            stashCol.className = "fop-em-stash-col";
            if (cfg.stashColWidth) stashCol.style.width = cfg.stashColWidth + "px";
            const tabBar = document.createElement("div");
            tabBar.className = "fop-em-tab-bar";
            const tabStash = document.createElement("div");
            tabStash.className = "fop-em-tab active";
            tabStash.textContent = t("暂存区");
            tabBar.appendChild(tabStash);
            stashCol.appendChild(tabBar);
            const tabContent = document.createElement("div");
            tabContent.className = "fop-em-tab-content";
            const sHead = document.createElement("div");
            sHead.className = "fop-em-stash-head";
            stashCountEl = document.createElement("div");
            stashCountEl.className = "fop-em-stash-title";
            sHead.appendChild(stashCountEl);
            const clearBtn = document.createElement("div");
            clearBtn.textContent = "✕";
            clearBtn.title = t("清空暂存");
            clearBtn.className = "fop-em-stash-clear";
            clearBtn.onclick = () => { cfg.stash = []; this.saveEditorMenuConfig(); renderStash(); };
            sHead.appendChild(clearBtn);
            tabContent.appendChild(sHead);
            accContainer = document.createElement("div");
            accContainer.className = "fop-acc";
            tabContent.appendChild(accContainer);
            stashCol.appendChild(tabContent);
            body.appendChild(stashCol);
            divider.addEventListener("mousedown", (e) => {
                e.preventDefault(); e.stopPropagation();
                const startX = e.clientX;
                const startW = stashCol.offsetWidth;
                const onMove = (ev) => {
                    const nw = Math.max(150, Math.min(panel.offsetWidth - 220, startW - (ev.clientX - startX)));
                    stashCol.style.width = nw + "px";
                };
                const onUp = () => {
                    document.removeEventListener("mousemove", onMove);
                    document.removeEventListener("mouseup", onUp);
                    cfg.stashColWidth = stashCol.offsetWidth;
                    this.saveEditorMenuConfig();
                };
                document.addEventListener("mousemove", onMove);
                document.addEventListener("mouseup", onUp);
            });
        }
        panel.appendChild(body);
        const ed0 = view.editor;
        if (ed0) stashInput.value = ed0.getSelection() || "";
        renderStash();
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
        if (stashOn) {
            panel.style.left = Math.max(10, Math.min(x, window.innerWidth - rect.width - 10)) + "px";
        } else {
            panel.style.left = (x + rect.width > window.innerWidth - 10 ? window.innerWidth - rect.width - 10 : x) + "px";
        }
        panel.style.top = (y + rect.height > window.innerHeight - 10 ? window.innerHeight - rect.height - 10 : y) + "px";

        const isBlank = (el) => el === panel || el === row || el.classList.contains("fop-em-row") || el.classList.contains("fop-em-grid") || el.classList.contains("fop-em-group-label") || el.classList.contains("fop-em-body") || el.classList.contains("fop-em-left-col") || el.classList.contains("fop-em-stash-col") || el.classList.contains("fop-em-tab-bar") || el.classList.contains("fop-em-tab-content") || el.classList.contains("fop-em-input-box") || el.classList.contains("fop-acc");
        panel.addEventListener("mousedown", (e) => {
            if (e.button !== 0 || !isBlank(e.target)) return;
            e.preventDefault();
            let dragging = true, sx = e.clientX, sy = e.clientY, sl = panel.offsetLeft, st = panel.offsetTop;
            panel.style.cursor = "grabbing";
            const mv = (ev) => { if (!dragging) return; panel.style.left = (sl + ev.clientX - sx) + "px"; panel.style.top = (st + ev.clientY - sy) + "px"; };
            const up = () => { dragging = false; panel.style.cursor = ""; document.removeEventListener("mousemove", mv); document.removeEventListener("mouseup", up); };
            document.addEventListener("mousemove", mv);
            document.addEventListener("mouseup", up);
        });

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

    async execEditorItem(item, view) {
        const editor = view.editor;
        if (!editor) { new Notice(t("无法获取编辑器")); return; }
        if (item.type === "cmd") {

            editor.focus();
            if (this.app.commands.commands[item.cmd]) {
                setTimeout(() => this.app.commands.executeCommandById(item.cmd), 0);
            } else {
                const sel = editor.getSelection();
                if (item.cmd === "editor:copy" || item.cmd === "editor:cut") {
                    if (sel) { try { navigator.clipboard.writeText(sel); } catch (e) {} if (item.cmd === "editor:cut") editor.replaceSelection(""); }
                } else if (item.cmd === "editor:paste" || item.cmd === "editor:paste-plain") {
                    try { navigator.clipboard.readText().then(text => { editor.replaceSelection(item.cmd === "editor:paste-plain" ? text.replace(/[*_~`=#]/g, "") : text); }); } catch (e) {}
                } else {
                    setTimeout(() => this.app.commands.executeCommandById(item.cmd), 0);
                }
            }
        } else if (item.type === "regex") {
            try {
                const re = new RegExp(item.pattern, item.flags || "g");
                const rep = (item.replacement || "").replace(/\\n/g, "\n").replace(/\\t/g, "\t");
                const sel = editor.getSelection();
                if (item.requireSelection && !sel) { new Notice(t("请先选中文本")); return; }
                if (sel) {
                    editor.replaceSelection(sel.replace(re, rep));
                } else {
                    const text = editor.getValue();
                    editor.replaceRange(text.replace(re, rep), { line: 0, ch: 0 }, { line: editor.lastLine(), ch: editor.getLine(editor.lastLine()).length });
                }
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
        } else if (item.type === "pipeline") {
            const steps = (item.pipeline || "").split(/\u2192|->|=>/).map(s => s.trim()).filter(Boolean);
            if (!steps.length) return;
            const sel = editor.getSelection();
            let text = sel || editor.getValue();
            for (const stepName of steps) {
                const stepItem = this.resolvePipelineStep(stepName);
                if (!stepItem) { new Notice(t("管道步骤未找到：") + stepName); return; }
                if (stepItem.type === "key") {
                    this.execKeystroke(editor, stepItem.keystroke, view);
                    text = editor.getSelection() || editor.getValue();
                } else {
                    text = this.applyPipelineStep(stepItem, text);
                }
            }
            if (sel) {
                editor.replaceSelection(text);
            } else {
                editor.replaceRange(text, { line: 0, ch: 0 }, { line: editor.lastLine(), ch: editor.getLine(editor.lastLine()).length });
            }
        } else if (item.type === "action") {
            const file = view.file;
            if (!file) { new Notice(t("无法获取编辑器")); return; }
            if (item.action === "copyBlockRef") {
                const to = editor.getCursor("to");
                const lastLine = editor.getLine(to.line);
                const existing = lastLine.match(/\s\^([a-zA-Z][\w-]+)$/);
                let blockId;
                if (existing) { blockId = existing[1]; } else {
                    const used = new Set((editor.getValue().match(/\^[a-zA-Z][\w-]+/g) || []).map(m => m.slice(1)));
                    do { blockId = "fop" + Date.now().toString(36).slice(-4) + Math.random().toString(36).slice(2, 5); } while (used.has(blockId));
                    editor.replaceRange(` ^${blockId}`, { line: to.line, ch: lastLine.length });
                }
                const link = `[[${file.basename}#^${blockId}]]`;
                await navigator.clipboard.writeText(link);
                new Notice(t("已复制：") + link);
            } else if (item.action === "copyHeadingLink") {
                const cursor = editor.getCursor();
                let headingText = "";
                for (let i = cursor.line; i >= 0; i--) {
                    const m = editor.getLine(i).match(/^#{1,6}\s+(.+)$/);
                    if (m) { headingText = m[1].trim(); break; }
                }
                if (!headingText) { new Notice(t("未找到标题")); return; }
                const link = `[[${file.basename}#${headingText}]]`;
                await navigator.clipboard.writeText(link);
                new Notice(t("已复制：") + link);
            } else if (item.action === "setSelectionAsTitle") {
                const sel = editor.getSelection().trim();
                if (!sel) { new Notice(t("请先选中文本")); return; }
                const cleaned = sel.replace(/[#^[\]|\\/:*?<>"]+/g, "").replace(/\s+/g, " ").trim();
                if (!cleaned) { new Notice(t("处理后标题为空")); return; }
                const newPath = (file.parent.path ? file.parent.path + "/" : "") + cleaned + ".md";
                if (newPath === file.path) { new Notice(t("标题未变化")); return; }
                if (this.app.vault.getAbstractFileByPath(newPath)) { new Notice(t("已存在同名文件")); return; }
                await this.app.fileManager.renameFile(file, newPath);
                new Notice(t("已重命名：") + cleaned);
            } else if (item.action === "extractToNote") {
                const sel = editor.getSelection();
                if (!sel) { new Notice(t("请先选中文本")); return; }
                const defaultName = sel.split("\n")[0].replace(/^#+\s*/, "").replace(/[#^[\]|\\/:*?<>"]/g, "").trim().slice(0, 50) || t("新笔记");
                const modal = new Modal(this.app);
                modal.titleEl.setText(t("输入笔记名称"));
                const inputEl = modal.contentEl.createEl("input", { type: "text", value: defaultName, attr: { style: "width:100%;padding:6px;margin:8px 0;box-sizing:border-box;" } });
                const btnRow = modal.contentEl.createEl("div", { attr: { style: "text-align:right;margin-top:8px;" } });
                const okBtn = btnRow.createEl("button", { text: t("打开"), attr: { style: "margin-left:4px;" } });
                btnRow.createEl("button", { text: t("取消"), attr: { style: "margin-left:4px;" } }).onclick = () => modal.close();
                const doExtract = async () => {
                    const name = inputEl.value.trim().replace(/[#^[\]|\\/:*?<>"]/g, "");
                    if (!name) return;
                    const newPath = (file.parent.path ? file.parent.path + "/" : "") + name + ".md";
                    const existing = this.app.vault.getAbstractFileByPath(newPath);
                    if (existing instanceof TFile) { await this.app.vault.modify(existing, sel); }
                    else { await this.app.vault.create(newPath, sel); }
                    editor.replaceSelection(`[[${name}]]`);
                    modal.close();
                    this.app.workspace.openLinkText(name, file.path);
                    new Notice(t("已创建：") + name);
                };
                okBtn.onclick = doExtract;
                inputEl.addEventListener("keydown", (e) => { if (e.key === "Enter") doExtract(); });
                modal.open();
            } else if (item.action === "clipboardToNote") {
                let clipText = "";
                try { clipText = await navigator.clipboard.readText(); } catch (e) {}
                if (!clipText) { new Notice(t("剪贴板为空")); return; }
                const defaultName = clipText.split("\n")[0].replace(/^#+\s*/, "").replace(/[#^[\]|\\/:*?<>"]/g, "").trim().slice(0, 50) || t("新笔记");
                const modal = new Modal(this.app);
                modal.titleEl.setText(t("输入笔记名称"));
                const inputEl = modal.contentEl.createEl("input", { type: "text", value: defaultName, attr: { style: "width:100%;padding:6px;margin:8px 0;box-sizing:border-box;" } });
                const btnRow = modal.contentEl.createEl("div", { attr: { style: "text-align:right;margin-top:8px;" } });
                const okBtn = btnRow.createEl("button", { text: t("打开"), attr: { style: "margin-left:4px;" } });
                btnRow.createEl("button", { text: t("取消"), attr: { style: "margin-left:4px;" } }).onclick = () => modal.close();
                const doCreate = async () => {
                    const name = inputEl.value.trim().replace(/[#^[\]|\\/:*?<>"]/g, "");
                    if (!name) return;
                    const newPath = (file.parent.path ? file.parent.path + "/" : "") + name + ".md";
                    if (this.app.vault.getAbstractFileByPath(newPath)) { new Notice(t("已存在同名文件")); return; }
                    const nf = await this.app.vault.create(newPath, clipText);
                    this.app.workspace.getLeaf().openFile(nf);
                    modal.close();
                    new Notice(t("已创建：") + name);
                };
                okBtn.onclick = doCreate;
                inputEl.addEventListener("keydown", (e) => { if (e.key === "Enter") doCreate(); });
                modal.open();
            }

        } else if (item.type === "ai") {
            const sel = editor.getSelection();
            if (!sel) { new Notice(t("请先选中文本")); return; }
            this.showAIPanel(item, view, sel);
        } else if (item.type === "text") {
            const rep = (item.text || "").replace(/\\n/g, "\n").replace(/\\t/g, "\t");
            const sel = editor.getSelection();
            editor.replaceSelection(rep.replace(/\{\{text\}\}/g, sel));
        } else if (item.type === "key") {
            this.execKeystroke(editor, item.keystroke, view);
        }
    }

    async execKeystroke(editor, keystroke, view) {
        const ks = keystroke || "";
        if (!ks) return;
        const parts = ks.split("+");
        const key = parts[parts.length - 1];
        const mod = parts.includes("Ctrl") || parts.includes("Meta");
        const shift = parts.includes("Shift");
        const alt = parts.includes("Alt");
        editor.focus();
        const k = key.toUpperCase();
        if (mod) {
            const ops = {
                C: () => document.execCommand("copy"),
                X: () => document.execCommand("cut"),
                V: async () => { try { const t = await navigator.clipboard.readText(); editor.replaceSelection(t); } catch (e) { new Notice(t("粘贴失败")); } },
                A: () => editor.setSelection({ line: 0, ch: 0 }, { line: editor.lastLine(), ch: editor.getLine(editor.lastLine()).length }),
                Z: () => shift ? editor.redo() : editor.undo(),
                Y: () => editor.redo(),
                S: () => this.app.commands.executeCommandById("editor:save-file"),
                F: () => this.app.commands.executeCommandById("editor:open-search"),
                H: () => this.app.commands.executeCommandById("editor:open-search-replace"),
                D: () => this.app.commands.executeCommandById("editor:delete-line"),
                K: () => this.app.commands.executeCommandById("editor:insert-link"),
                Enter: () => this.app.commands.executeCommandById("editor:follow-link"),
            };
            if (ops[k]) { await ops[k](); return; }
        }
        if (!mod && !alt && !shift) {
            if (key === "Enter") { editor.replaceSelection("\n"); return; }
            if (key === "Tab") { editor.replaceSelection("\t"); return; }
            if (key === "Backspace") { editor.exec("deleteBackward"); return; }
            if (key === "Delete") { editor.exec("deleteForward"); return; }
            if (key.length === 1) { editor.replaceSelection(key); return; }
        }
        const opts = { key, bubbles: true, cancelable: true, ctrlKey: parts.includes("Ctrl"), metaKey: parts.includes("Meta"), altKey: alt, shiftKey: shift };
        const cm = editor.cm;
        const target = (cm && cm.dom) || (cm && cm.getWrapperElement && cm.getWrapperElement()) || (view && view.contentEl);
        if (target) {
            target.dispatchEvent(new KeyboardEvent("keydown", opts));
            target.dispatchEvent(new KeyboardEvent("keyup", opts));
        }
    }

    showAIPanel(item, view, sel) {
        const existing = document.querySelector(".fop-ai-panel");
        if (existing) existing.remove();
        const cfg = this.editorMenuConfig;
        const promptTpl = (item.prompt || "").trim();
        const fullPrompt = promptTpl.includes("{{text}}") ? promptTpl.replace(/\{\{text\}\}/g, sel) : (promptTpl ? promptTpl + "\n\n" + sel : sel);
        const sourcePath = view && view.file ? view.file.path : "";
        let result = "";

        const panel = document.createElement("div");
        panel.className = "fop-ai-panel";
        panel.style.cssText = "position:fixed;z-index:10000;width:380px;max-width:92vw;background:var(--background-secondary);border:1px solid var(--background-modifier-border);border-radius:10px;box-shadow:0 8px 24px rgba(0,0,0,.3);display:flex;flex-direction:column;box-sizing:border-box;overflow:hidden;";
        const header = document.createElement("div");
        header.style.cssText = "display:flex;align-items:center;gap:6px;padding:6px 10px;cursor:grab;border-bottom:1px solid var(--background-modifier-border);";
        const ttl = document.createElement("div");
        ttl.textContent = item.label || "AI";
        ttl.style.cssText = "font-weight:600;flex:1;font-size:var(--font-ui-small);";
        header.appendChild(ttl);
        const closeBtn = document.createElement("div");
        closeBtn.textContent = "✕";
        closeBtn.style.cssText = "cursor:pointer;padding:0 6px;color:var(--text-muted);";
        header.appendChild(closeBtn);
        panel.appendChild(header);
        const body = document.createElement("div");
        body.style.cssText = "flex:1;overflow:auto;padding:10px;min-height:40px;max-height:55vh;font-size:var(--font-ui-small);";
        body.setText(t("生成中…"));
        panel.appendChild(body);
        const foot = document.createElement("div");
        foot.style.cssText = "display:flex;gap:6px;padding:6px 10px;border-top:1px solid var(--background-modifier-border);";
        const mkBtn = (text, fn) => {
            const b = foot.createEl("button", { text, attr: { style: "font-size:var(--font-ui-smaller);padding:2px 10px;" } });
            b.disabled = true; b.onclick = () => { if (result) fn(); };
            return b;
        };
        const copyBtn = mkBtn(t("复制"), () => { navigator.clipboard.writeText(result).then(() => new Notice(t("已复制"))).catch(() => {}); });
        const insBtn = mkBtn(t("插入"), () => { try { const ed = view.editor; if (ed) { ed.focus(); ed.replaceRange("\n\n" + result, ed.getCursor("to")); } } catch (e) {} });
        const repBtn = mkBtn(t("替换选中"), () => { try { const ed = view.editor; if (ed) { ed.focus(); ed.replaceSelection(result); } } catch (e) {} });
        panel.appendChild(foot);

        document.body.appendChild(panel);
        const px = cfg.aiPanelX != null ? cfg.aiPanelX : window.innerWidth - 400;
        const py = cfg.aiPanelY != null ? cfg.aiPanelY : 80;
        panel.style.left = Math.max(10, Math.min(px, window.innerWidth - panel.offsetWidth - 10)) + "px";
        panel.style.top = Math.max(10, Math.min(py, window.innerHeight - panel.offsetHeight - 10)) + "px";

        let drag = false, dgx = 0, dgy = 0;
        header.addEventListener("mousedown", (e) => {
            if (e.target === closeBtn) return;
            drag = true; dgx = e.clientX - panel.getBoundingClientRect().left; dgy = e.clientY - panel.getBoundingClientRect().top;
            e.preventDefault();
        });
        const dm = (e) => { if (!drag) return; panel.style.left = (e.clientX - dgx) + "px"; panel.style.top = (e.clientY - dgy) + "px"; };
        const du = () => { if (drag) { drag = false; cfg.aiPanelX = parseInt(panel.style.left); cfg.aiPanelY = parseInt(panel.style.top); this.saveEditorMenuConfig(); } };
        document.addEventListener("mousemove", dm);
        document.addEventListener("mouseup", du);
        const closePanel = () => { panel.remove(); document.removeEventListener("mousemove", dm); document.removeEventListener("mouseup", du); document.removeEventListener("keydown", escH); };
        const escH = (e) => { if (e.key === "Escape") closePanel(); };
        document.addEventListener("keydown", escH);
        closeBtn.onclick = closePanel;

        this.callAI(fullPrompt).then(async (res) => {
            result = (res || "").trim();
            if (!result) { body.setText(t("AI 返回为空")); return; }
            body.empty();
            const md = body.createDiv();
            try { await MarkdownRenderer.render(this.app, result, md, sourcePath, this); }
            catch (e) {
                try { await MarkdownRenderer.renderMarkdown(result, md, sourcePath, this); }
                catch (e2) { md.setText(result); }
            }
            copyBtn.disabled = insBtn.disabled = repBtn.disabled = false;
        }).catch((err) => {
            body.setText(t("AI 返回失败：") + (err && err.message ? err.message : err));
        });
    }

    async callAI(prompt) {
        const cfg = this.editorMenuConfig || {};
        const conf = (cfg.aiConfigs || [])[cfg.currentAI || 0] || {};
        const apiUrl = conf.base_url || "https://api.openai.com/v1/chat/completions";
        const apiKey = conf.apiKey;
        if (!apiKey) throw new Error(t("API Key 未配置，请在编辑器菜单设置的 AI 设置中填写"));
        const model = conf.model || "gpt-3.5-turbo";
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 60000);
        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json", "Authorization": "Bearer " + apiKey },
                body: JSON.stringify({ model, messages: [{ role: "user", content: prompt }], max_tokens: 3000, temperature: conf.temperature != null && conf.temperature !== "" ? Number(conf.temperature) : 0.7 }),
                signal: controller.signal,
            });
            clearTimeout(timeoutId);
            if (!response.ok) {
                const errText = await response.text();
                throw new Error(t("AI 请求失败：") + response.status + " - " + String(errText).slice(0, 200));
            }
            const data = await response.json();
            return data.choices && data.choices[0] && data.choices[0].message ? (data.choices[0].message.content || "") : "";
        } catch (e) {
            clearTimeout(timeoutId);
            if (e && e.name === "AbortError") throw new Error(t("AI 请求超时（60s）"));
            throw e;
        }
    }

    resolvePipelineStep(name) {
        for (const grp of DEFAULT_EDITOR_MENU.groups) {
            for (const it of (grp.items || [])) {
                if (it.label === name) return it;
            }
        }
        const cfg = this.editorMenuConfig;
        if (cfg && cfg.groups) {
            for (const grp of cfg.groups) {
                for (const it of (grp.items || [])) {
                    if (it.label === name && it.type !== "pipeline") return it;
                }
            }
        }
        if (CUSTOM_TRANSFORMS[name]) return { type: "custom", custom: name };
        return null;
    }

    applyPipelineStep(item, text) {
        if (item.type === "regex") {
            try {
                const re = new RegExp(item.pattern, item.flags || "g");
                const rep = (item.replacement || "").replace(/\\n/g, "\n").replace(/\\t/g, "\t");
                return text.replace(re, rep);
            } catch (e) { return text; }
        } else if (item.type === "custom") {
            const fn = CUSTOM_TRANSFORMS[item.custom];
            return fn ? fn(text) : text;
        } else if (item.type === "text") {
            const rep = (item.text || "").replace(/\\n/g, "\n").replace(/\\t/g, "\t");
            return rep.replace(/\{\{text\}\}/g, text);
        }
        return text;
    }

    async saveEditorMenuConfig() {
        const data = (await this.loadData()) || {};
        await this.saveData({
            colors: data.colors || this.colorMap,
            pins: data.pins || Array.from(this.pinSet),
            bolds: data.bolds || Array.from(this.boldSet),
            editorMenu: this.editorMenuConfig,
            fileMenu: this.fileMenuConfig,
            tabMenu: this.tabMenuConfig,
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
        ttl.textContent = t("右键菜单设置") + " — " + (this.manifest.name || "File Ops Plus") + " v" + (this.manifest.version || "");
        ttl.style.fontWeight = "600";
        ttl.style.flex = "1";
        header.appendChild(ttl);

        const exportBtn = document.createElement("div");
        exportBtn.textContent = "⬇";
        exportBtn.style.cssText = "cursor:pointer;padding:2px 6px;color:var(--text-muted);font-size:14px;";
        exportBtn.title = t("导出设置");
        exportBtn.addEventListener("mouseenter", () => exportBtn.style.color = "var(--text-normal)");
        exportBtn.addEventListener("mouseleave", () => exportBtn.style.color = "var(--text-muted)");
        header.appendChild(exportBtn);
        const importBtn = document.createElement("div");
        importBtn.textContent = "⬆";
        importBtn.style.cssText = "cursor:pointer;padding:2px 6px;color:var(--text-muted);font-size:14px;";
        importBtn.title = t("导入设置");
        importBtn.addEventListener("mouseenter", () => importBtn.style.color = "var(--text-normal)");
        importBtn.addEventListener("mouseleave", () => importBtn.style.color = "var(--text-muted)");
        header.appendChild(importBtn);
        const closeBtn = document.createElement("div");
        closeBtn.textContent = "✕";
        closeBtn.style.cssText = "cursor:pointer;padding:2px 8px;color:var(--text-muted);font-size:16px;";
        header.appendChild(closeBtn);
        panel.appendChild(header);

        exportBtn.onclick = () => {
            try {
                const data = { editorMenu: this.editorMenuConfig, fileMenu: this.fileMenuConfig, tabMenu: this.tabMenuConfig, version: this.manifest.version };
                const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url; a.download = "file-ops-plus-settings.json";
                document.body.appendChild(a); a.click(); a.remove();
                URL.revokeObjectURL(url);
                new Notice(t("设置已导出"));
            } catch (e) { new Notice(t("导出失败：") + e.message); }
        };
        importBtn.onclick = () => {
            const input = document.createElement("input");
            input.type = "file"; input.accept = ".json,application/json";
            input.onchange = async () => {
                const file = input.files[0];
                if (!file) return;
                try {
                    const text = await file.text();
                    const data = JSON.parse(text);
                    if (data.editorMenu) this.editorMenuConfig = data.editorMenu;
                    if (data.fileMenu) this.fileMenuConfig = data.fileMenu;
                    if (data.tabMenu) this.tabMenuConfig = data.tabMenu;
                    this.saveEditorMenuConfig();
                    new Notice(t("设置已导入"));
                    render();
                } catch (e) { new Notice(t("导入失败：") + e.message); }
            };
            input.click();
        };

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
            const makePvTile = (iconName, color, title, groupId, itemIdx) => {
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
                tile.addEventListener("click", () => {
                    tile.style.filter = "brightness(0.6)"; setTimeout(() => tile.style.filter = "", 150);
                    if (groupId) {
                        const ec = this.editorMenuConfig; ec.collapsedState = ec.collapsedState || {};
                        const wasCol = ec.collapsedState[groupId] === true;
                        if (wasCol) { ec.collapsedState[groupId] = false; this.saveEditorMenuConfig(); render(); }
                        const tb = root.querySelector('[data-group-id="' + groupId + '"]');
                        if (tb) { let o = 0, el = tb; while (el && el !== root) { o += el.offsetTop; el = el.offsetParent; } root.scrollTop = Math.max(0, o - 8);
                            if (itemIdx != null) { const ir = tb.querySelector('[data-item-idx="' + itemIdx + '"]'); if (ir) { ir.style.transition = "background .3s"; ir.style.background = "var(--interactive-accent)"; ir.style.borderRadius = "4px"; setTimeout(() => ir.style.background = "", 1500); } }
                        }
                    }
                });
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
                for (let ii = 0; ii < (grp.items || []).length; ii++) { const item = grp.items[ii]; grid.appendChild(makePvTile(item.icon, item.color || grp.color, item.label || "", grp.id, ii)); }
                col.appendChild(grid);
                pvRow.appendChild(col);
            }
        };

        const renderFileTabPreview = (config, actionTable) => {
            previewArea.empty();
            previewArea.createEl("div", { text: t("实时预览"), attr: { style: "font-size:var(--font-ui-smaller);color:var(--text-muted);margin-bottom:8px;" } });
            for (const grp of (config.groups || [])) {
                const items = (grp.items || []).filter(item => actionTable[item.action]);
                if (!items.length) continue;
                const gc = GROUP_COLORS[grp.color];
                const grpDiv = previewArea.createEl("div", { attr: { style: "margin-bottom:8px;" } });
                if (config.showGroupLabels !== false) grpDiv.createEl("div", { text: grp.label || "", attr: { style: "font-size:10px;margin-bottom:2px;color:" + (gc ? gc.fg : "var(--text-muted)") + ";" } });
                const row = grpDiv.createEl("div", { attr: { style: "display:flex;gap:3px;flex-wrap:wrap;" } });
                for (const item of items) {
                    const a = actionTable[item.action];
                    const btn = row.createEl("div", { attr: { style: "padding:3px 6px;border-radius:4px;cursor:default;display:flex;align-items:center;gap:3px;white-space:nowrap;" + (gc ? "background:" + gc.bg + ";color:" + gc.fg + ";" : "color:var(--text-normal);") } });
                    const iconName = item.icon || a.icon;
                    if (iconName) {
                        if (typeof iconName === "string" && iconName.includes("<svg")) {
                            const wrapper = btn.createEl("span", { attr: { style: "display:inline-flex;align-items:center;width:12px;height:12px;" } });
                            wrapper.innerHTML = iconName;
                            const svg = wrapper.querySelector("svg");
                            if (svg) { svg.style.width = "12px"; svg.style.height = "12px"; }
                        } else { try { const ic = getIcon(iconName); if (ic) { ic.style.width = "12px"; ic.style.height = "12px"; btn.appendChild(ic); } } catch (e) {} }
                    }
                    const label = item.label === undefined ? (a.label || "") : item.label;
                    if (label) btn.createEl("span", { text: t(label) });
                    btn.addEventListener("click", () => { const tb = root.querySelector('[data-group-id="' + grp.id + '"]'); if (tb) { let o = 0, el = tb; while (el && el !== root) { o += el.offsetTop; el = el.offsetParent; } root.scrollTop = Math.max(0, o - 8); } });
                }
            }
        };
        let sortMode = false;
        let currentTab = "editor";
        const render = () => {
            const _savedScroll = root.scrollTop;
            try {
            if (currentTab === "editor") renderPreview();
            else renderFileTabPreview(currentTab === "file" ? this.fileMenuConfig : this.tabMenuConfig, currentTab === "file" ? FILE_ACTIONS : TAB_ACTIONS);
            root.empty();
            const tabRow = root.createEl("div", { attr: { style: "display:flex;gap:4px;margin-bottom:12px;border-bottom:1px solid var(--background-modifier-border);padding:6px 4px 8px;background:var(--background-primary);border-radius:4px;" } });
            for (const [key, label] of [["editor", t("编辑器菜单")], ["file", t("文件菜单")], ["tab", t("标签页菜单")]]) {
                const b = tabRow.createEl("button", { text: label, attr: { style: "padding:2px 10px;" + (currentTab === key ? "border-bottom:2px solid var(--interactive-accent);font-weight:600;" : "") } });
                b.onclick = () => { currentTab = key; sortMode = false; render(); };
            }
            if (currentTab !== "editor") {
                const config = currentTab === "file" ? this.fileMenuConfig : this.tabMenuConfig;
                const actionTable = currentTab === "file" ? FILE_ACTIONS : TAB_ACTIONS;
                const defaultConfig = currentTab === "file" ? DEFAULT_FILE_MENU : DEFAULT_TAB_MENU;
                const enRow2 = root.createEl("div", { attr: { style: "display:flex;align-items:center;gap:8px;margin-bottom:12px;" } });
                const cb2 = enRow2.createEl("input", { type: "checkbox" });
                cb2.checked = config.enabled !== false;
                enRow2.createEl("span", { text: t("启用") });
                cb2.onchange = () => { config.enabled = cb2.checked; this.saveEditorMenuConfig(); };
                const lblRow2 = root.createEl("div", { attr: { style: "display:flex;align-items:center;gap:8px;margin-bottom:12px;" } });
                const lblCb2 = lblRow2.createEl("input", { type: "checkbox" });
                lblCb2.checked = config.showGroupLabels !== false;
                lblRow2.createEl("span", { text: t("显示分组标题") });
                lblCb2.onchange = () => { config.showGroupLabels = lblCb2.checked; this.saveEditorMenuConfig(); renderFileTabPreview(config, actionTable); };
                const sortRow2 = root.createEl("div", { attr: { style: "display:flex;align-items:center;gap:8px;margin-bottom:12px;" } });
                const sortBtn2 = sortRow2.createEl("button", { text: sortMode ? t("完成排序") : t("调整分组顺序"), attr: { style: "padding:2px 10px;" } });
                sortBtn2.onclick = () => { sortMode = !sortMode; render(); };
                if (sortMode) {
                    for (let gi = 0; gi < config.groups.length; gi++) {
                        const grp = config.groups[gi];
                        const row = root.createEl("div", { attr: { style: "display:flex;align-items:center;gap:8px;padding:8px 10px;border:1px solid var(--background-modifier-border);border-radius:6px;margin-bottom:4px;background:var(--background-primary);" } });
                        row.createEl("span", { text: "⠿", attr: { style: "color:var(--text-faint);cursor:grab;font-size:14px;" } });
                        row.createEl("span", { text: grp.label || "", attr: { style: "font-weight:600;flex:1;" } });
                        row.createEl("span", { text: "(" + ((grp.items || []).length) + ")", attr: { style: "color:var(--text-muted);font-size:var(--font-ui-smaller);" } });
                        const c = grp.color || "neutral";
                        const sw = row.createEl("div", { attr: { style: "width:14px;height:14px;border-radius:3px;border:1px solid var(--background-modifier-border);" } });
                        if (GROUP_COLORS[c]) sw.style.background = GROUP_COLORS[c].bg;
                        else if (c.includes("|")) sw.style.background = c.split("|")[0];
                        else if (c) sw.style.background = c;
                        row.draggable = true;
                        row.addEventListener("dragstart", (e) => { e.dataTransfer.effectAllowed = "move"; e.dataTransfer.setData("text/plain", String(gi)); row.style.opacity = "0.4"; });
                        row.addEventListener("dragend", () => { row.style.opacity = ""; });
                        row.addEventListener("dragover", (e) => { e.preventDefault(); e.dataTransfer.dropEffect = "move"; root.querySelectorAll(".fop-drag-over").forEach(el => el.classList.remove("fop-drag-over")); row.classList.add("fop-drag-over"); });
                        row.addEventListener("drop", (e) => {
                            e.preventDefault(); e.stopPropagation();
                            const from = parseInt(e.dataTransfer.getData("text/plain"));
                            if (isNaN(from) || from === gi) return;
                            const rect = row.getBoundingClientRect();
                            const after = e.clientY > rect.top + rect.height / 2;
                            const moved = config.groups.splice(from, 1)[0];
                            let target = gi + (after ? 1 : 0);
                            if (from < target) target--;
                            config.groups.splice(target, 0, moved);
                            this.saveEditorMenuConfig(); render();
                        });
                    }
                    return;
                }
                for (let gi = 0; gi < config.groups.length; gi++) {
                    const grp = config.groups[gi];
                    const box = root.createEl("div", { attr: { style: "border:1px solid var(--background-modifier-border);border-radius:6px;padding:8px;margin-bottom:8px;" } });
                box.dataset.groupId = grp.id;
                    const head = box.createEl("div", { attr: { style: "display:flex;align-items:center;gap:6px;margin-bottom:8px;flex-wrap:wrap;background:var(--background-primary);padding:6px 8px;border-radius:4px;" } });
                    config.collapsedState = config.collapsedState || {};
                    const ftCollapsed = config.collapsedState[grp.id] === true;
                    const ftChevron = head.createEl("span", { text: ftCollapsed ? "▶" : "▼", attr: { style: "cursor:pointer;font-size:10px;color:var(--text-muted);user-select:none;", title: t("折叠/展开") } });
                    const grpContent = box.createEl("div");
                    if (ftCollapsed) grpContent.style.display = "none";
                    ftChevron.onclick = () => {
                        const isCol = grpContent.style.display === "none";
                        grpContent.style.display = isCol ? "" : "none";
                        ftChevron.textContent = isCol ? "▼" : "▶";
                        config.collapsedState[grp.id] = !isCol;
                        this.saveEditorMenuConfig();
                    };
                    const ni = head.createEl("input", { type: "text", value: grp.label || "", attr: { style: "width:120px;padding:2px 4px;" } });
                    ni.onchange = () => { grp.label = ni.value; this.saveEditorMenuConfig(); renderFileTabPreview(config, actionTable); };
                    const swatchRow = head.createEl("div", { attr: { style: "display:flex;gap:3px;" } });
                    for (const k of Object.keys(GROUP_COLORS)) {
                        const sw = swatchRow.createEl("div", { text: "Aa", attr: { style: "width:24px;height:16px;border-radius:3px;cursor:pointer;border:1px solid var(--background-modifier-border);background:" + GROUP_COLORS[k].bg + ";color:" + GROUP_COLORS[k].fg + ";font-size:9px;display:flex;align-items:center;justify-content:center;", title: GROUP_COLORS[k].label } });
                        if (grp.color === k) sw.style.outline = "2px solid var(--interactive-accent)";
                        sw.onclick = () => { grp.color = k; this.saveEditorMenuConfig(); render(); };
                    }
                    const dg = head.createEl("button", { text: t("删除组"), cls: "mod-warning", attr: { style: "margin-left:auto;" } });
                    dg.onclick = () => { config.groups.splice(gi, 1); this.saveEditorMenuConfig(); render(); };
                    const hdr = grpContent.createEl("div", { attr: { style: "display:flex;gap:6px;margin:4px 0 4px;font-size:var(--font-ui-smaller);color:var(--text-muted);background:var(--background-modifier-form-field);padding:3px 6px;border-radius:3px;" } });
                    hdr.createEl("div", { attr: { style: "width:14px;flex-shrink:0;" } });
                    hdr.createEl("div", { text: t("图标"), attr: { style: "width:123px;", title: t("lucide 图标名 / 粘贴 <svg> 代码 / 任意文字（识别不到则按文字显示）") } });
                    hdr.createEl("div", { text: t("名称"), attr: { style: "width:80px;text-indent:2px;", title: t("tile 鼠标悬停时显示的提示文字") } });
                    hdr.createEl("div", { text: t("命令"), attr: { style: "flex:1;text-indent:2px;", title: t("选择该选项执行的命令") } });
                    hdr.createEl("div", { text: t("操作"), attr: { style: "margin-left:auto;", title: t("删除该选项") } });
                    for (let ii = 0; ii < (grp.items || []).length; ii++) {
                        const item = grp.items[ii];
                        const a = actionTable[item.action] || {};
                        const ir = grpContent.createEl("div", { attr: { style: "display:flex;gap:6px;align-items:center;margin:2px 0;" } });
                        ir.dataset.itemIdx = ii;
                        const handle = ir.createEl("span", { text: "⠿", attr: { style: "cursor:grab;color:var(--text-faint);" } });
                        handle.addEventListener("mousedown", () => { ir.draggable = true; });
                        ir.addEventListener("dragstart", (e) => { e.dataTransfer.effectAllowed = "move"; e.dataTransfer.setData("text/plain", JSON.stringify({ g: gi, i: ii })); ir.style.opacity = "0.3"; });
                        ir.addEventListener("dragend", () => { ir.draggable = false; ir.style.opacity = ""; });
                        ir.addEventListener("dragover", (e) => { e.preventDefault(); e.dataTransfer.dropEffect = "move"; });
                        ir.addEventListener("drop", (e) => {
                            e.preventDefault(); e.stopPropagation();
                            let from; try { from = JSON.parse(e.dataTransfer.getData("text/plain")); } catch (_) { return; }
                            if (!from || (from.g === gi && from.i === ii)) return;
                            const moved = config.groups[from.g].items[from.i];
                            config.groups[from.g].items.splice(from.i, 1);
                            const rect = ir.getBoundingClientRect();
                            const after = e.clientY > rect.top + rect.height / 2;
                            let target = ii + (after ? 1 : 0);
                            if (from.g === gi && from.i < target) target--;
                            config.groups[gi].items.splice(target, 0, moved);
                            this.saveEditorMenuConfig(); render();
                        });
                        const icIn = ir.createEl("textarea", { attr: { placeholder: t("图标/svg/文字"), style: "width:90px;min-width:60px;max-width:200px;padding:1px 4px;resize:horizontal;height:24px;font-size:var(--font-ui-smaller);" } });
                        icIn.value = item.icon || a.icon || "";
                        icIn.onchange = () => { item.icon = icIn.value.trim() || undefined; this.saveEditorMenuConfig(); renderFileTabPreview(config, actionTable); };
                        const icBtn = ir.createEl("button", { text: "▦", attr: { title: t("选择图标"), style: "padding:2px 6px;font-size:13px;line-height:1;" } });
                        icBtn.onclick = () => {
                            fopPopupPicker(icBtn, {
                                placeholder: t("搜索图标…"), width: 360,
                                renderItems: (container, q, pick) => {
                                    let count = 0;
                                    for (const cat of Object.keys(LUCIDE_ICONS)) {
                                        const names = LUCIDE_ICONS[cat].filter(n => !q || n.indexOf(q) >= 0);
                                        if (names.length === 0) continue;
                                        container.createEl("div", { text: cat, attr: { style: "font-size:11px;color:var(--text-muted);margin:6px 2px 2px;text-transform:capitalize;" } });
                                        const grid = container.createEl("div", { attr: { style: "display:grid;grid-template-columns:repeat(auto-fill,28px);gap:4px;margin-bottom:4px;" } });
                                        for (const n of names) {
                                            const cell = grid.createEl("div", { cls: "fop-picker-item", attr: { title: n, style: "width:28px;height:28px;display:flex;align-items:center;justify-content:center;border-radius:4px;cursor:pointer;" } });
                                            try { const ic = getIcon(n); if (ic) { ic.style.width = "16px"; ic.style.height = "16px"; cell.appendChild(ic); } else cell.textContent = n[0]; } catch (e) { cell.textContent = n[0]; }
                                            cell.onmousedown = (e) => { e.preventDefault(); pick(n); };
                                            count++;
                                        }
                                    }
                                    if (count === 0) container.createEl("div", { text: t("无匹配"), attr: { style: "padding:8px;color:var(--text-muted);" } });
                                },
                                onPick: (name) => { item.icon = name; icIn.value = name; this.saveEditorMenuConfig(); renderFileTabPreview(config, actionTable); }
                            });
                        };
                        const lbIn = ir.createEl("input", { type: "text", value: item.label !== undefined ? item.label : (a.label ? t(a.label) : ""), attr: { placeholder: t("名称"), style: "width:80px;padding:1px 4px;font-size:var(--font-ui-smaller);" } });
                        lbIn.onchange = () => { item.label = lbIn.value.trim(); this.saveEditorMenuConfig(); renderFileTabPreview(config, actionTable); };
                        const as = ir.createEl("select");
                        as.style.cssText = "flex:1;min-width:100px;padding:0 2px;box-sizing:border-box;";
                        for (const ak of Object.keys(actionTable)) as.createEl("option", { value: ak, text: t(actionTable[ak].label) });
                        as.value = item.action || "";
                        as.onchange = () => { item.action = as.value; this.saveEditorMenuConfig(); renderFileTabPreview(config, actionTable); };
                        const db = ir.createEl("button", { text: "✕", attr: { style: "padding:2px 6px;" } });
                        db.onclick = () => { grp.items.splice(ii, 1); this.saveEditorMenuConfig(); render(); };
                    }
                    const ab = grpContent.createEl("button", { text: t("+ 添加选项"), attr: { style: "margin-top:4px;" } });
                    ab.onclick = () => { grp.items = grp.items || []; grp.items.push({ action: Object.keys(actionTable)[0] }); this.saveEditorMenuConfig(); const s = root.scrollTop; render(); root.scrollTop = s; };
                }
                const ag = root.createEl("button", { text: t("+ 添加分组"), attr: { style: "margin-top:8px;" } });
                ag.onclick = () => { config.groups.push({ id: "g" + Date.now(), label: t("新分组"), color: "neutral", items: [] }); this.saveEditorMenuConfig(); const s = root.scrollTop; render(); root.scrollTop = s; };
                const rs2 = root.createEl("button", { text: t("恢复默认"), cls: "mod-warning", attr: { style: "margin-top:8px;float:right;" } });
                rs2.onclick = () => { this[currentTab === "file" ? "fileMenuConfig" : "tabMenuConfig"] = JSON.parse(JSON.stringify(defaultConfig)); this.saveEditorMenuConfig(); render(); };
                return;
            }
            const cfg = this.editorMenuConfig;
            let dragState = null;
            const clearDragIndicators = () => {
                root.querySelectorAll(".fop-drag-over").forEach(el => el.classList.remove("fop-drag-over"));
                root.querySelectorAll(".fop-drop-zone").forEach(el => { el.style.background = ""; el.style.height = "6px"; });
            };

            const enRow = root.createEl("div", { attr: { style: "display:flex;align-items:center;gap:8px;margin-bottom:12px;" } });
            const cb = enRow.createEl("input", { type: "checkbox" });
            cb.checked = cfg.enabled !== false;
            enRow.createEl("span", { text: t("启用增强菜单（关闭则用原生右键）") });
            cb.onchange = () => {
                cfg.enabled = cb.checked;
                this.saveEditorMenuConfig();
                if (!cb.checked) new Notice(t("已关闭增强菜单。重新启用：命令面板(Ctrl+P)搜「右键菜单设置」"));
            };

            const lblRow = root.createEl("div", { attr: { style: "display:flex;align-items:center;gap:8px;margin-bottom:12px;" } });
            const lblCb = lblRow.createEl("input", { type: "checkbox" });
            lblCb.checked = cfg.showGroupLabels !== false;
            lblRow.createEl("span", { text: t("显示分组标题") });
            lblCb.onchange = () => { cfg.showGroupLabels = lblCb.checked; this.saveEditorMenuConfig(); renderPreview(); };

            const stashRow = root.createEl("div", { attr: { style: "display:flex;align-items:center;gap:8px;margin-bottom:12px;opacity:.5;" } });
            const stashCb = stashRow.createEl("input", { type: "checkbox" });
            stashCb.checked = cfg.stashEnabled !== false;
            stashCb.disabled = true;
            stashRow.createEl("span", { text: t("暂存区") });

            const ballRow = root.createEl("div", { attr: { style: "display:flex;align-items:center;gap:8px;margin-bottom:12px;" } });
            const ballCb = ballRow.createEl("input", { type: "checkbox" });
            ballCb.checked = cfg.selectionBall === true;
            ballRow.createEl("span", { text: t("选中文本显示悬浮球，悬停展开") });
            ballCb.onchange = () => { cfg.selectionBall = ballCb.checked; this.saveEditorMenuConfig(); if (!ballCb.checked) this._hideSelectionBall(); };
            const offRow = root.createEl("div", { attr: { style: "display:flex;align-items:center;gap:6px;margin-bottom:12px;margin-left:24px;" } });
            offRow.createEl("span", { text: t("悬浮球偏移"), attr: { style: "font-size:var(--font-ui-smaller);color:var(--text-muted);" } });
            if (!cfg.selectionBallOffset || typeof cfg.selectionBallOffset.x !== "number") cfg.selectionBallOffset = { x: 12, y: -28 };
            const offX = offRow.createEl("input", { type: "number", value: cfg.selectionBallOffset.x, attr: { style: "width:56px;padding:2px 4px;" } });
            offRow.createEl("span", { text: "X", attr: { style: "font-size:var(--font-ui-smaller);color:var(--text-muted);" } });
            const offY = offRow.createEl("input", { type: "number", value: cfg.selectionBallOffset.y, attr: { style: "width:56px;padding:2px 4px;" } });
            offRow.createEl("span", { text: "Y", attr: { style: "font-size:var(--font-ui-smaller);color:var(--text-muted);" } });
            const commitOff = () => { cfg.selectionBallOffset = { x: parseInt(offX.value) || 0, y: parseInt(offY.value) || 0 }; this.saveEditorMenuConfig(); };
            offX.onchange = commitOff;
            offY.onchange = commitOff;

            const sortRow = root.createEl("div", { attr: { style: "display:flex;align-items:center;gap:8px;margin-bottom:12px;" } });
            const sortBtn = sortRow.createEl("button", { text: sortMode ? t("完成排序") : t("调整分组顺序"), attr: { style: "padding:2px 10px;" } });
            sortBtn.onclick = () => { sortMode = !sortMode; render(); };
            if (sortMode) sortRow.createEl("span", { text: t("拖动分组标题调整顺序，再次点击完成"), attr: { style: "font-size:var(--font-ui-smaller);color:var(--text-muted);" } });

            if (sortMode) {
                for (let gi = 0; gi < cfg.groups.length; gi++) {
                    const grp = cfg.groups[gi];
                    const row = root.createEl("div", { attr: { style: "display:flex;align-items:center;gap:8px;padding:8px 10px;border:1px solid var(--background-modifier-border);border-radius:6px;margin-bottom:4px;background:var(--background-primary);" } });
                    const handle = row.createEl("span", { text: "⠿", attr: { style: "color:var(--text-faint);cursor:grab;font-size:14px;" } });
                    row.createEl("span", { text: grp.label || "", attr: { style: "font-weight:600;flex:1;" } });
                    row.createEl("span", { text: "(" + ((grp.items || []).length) + ")", attr: { style: "color:var(--text-muted);font-size:var(--font-ui-smaller);" } });
                    const c = grp.color || "neutral";
                    const sw = row.createEl("div", { attr: { style: "width:14px;height:14px;border-radius:3px;border:1px solid var(--background-modifier-border);" } });
                    if (GROUP_COLORS[c]) sw.style.background = GROUP_COLORS[c].bg;
                    else if (c.includes("|")) sw.style.background = c.split("|")[0];
                    else if (c) sw.style.background = c;
                    row.draggable = true;
                    row.addEventListener("dragstart", (e) => { e.dataTransfer.effectAllowed = "move"; e.dataTransfer.setData("text/plain", String(gi)); row.style.opacity = "0.4"; });
                    row.addEventListener("dragend", () => { row.style.opacity = ""; clearDragIndicators(); });
                    row.addEventListener("dragover", (e) => { e.preventDefault(); e.dataTransfer.dropEffect = "move"; clearDragIndicators(); row.classList.add("fop-drag-over"); });
                    row.addEventListener("drop", (e) => {
                        e.preventDefault(); e.stopPropagation();
                        const from = parseInt(e.dataTransfer.getData("text/plain"));
                        if (isNaN(from) || from === gi) return;
                        const rect = row.getBoundingClientRect();
                        const after = e.clientY > rect.top + rect.height / 2;
                        const moved = cfg.groups.splice(from, 1)[0];
                        let target = gi + (after ? 1 : 0);
                        if (from < target) target--;
                        cfg.groups.splice(target, 0, moved);
                        this.saveEditorMenuConfig(); render();
                    });
                }
                return;
            }

            const aiBox = root.createEl("div", { attr: { style: "border:1px solid var(--background-modifier-border);border-radius:6px;padding:8px;margin-bottom:12px;" } });
            const aiHead = aiBox.createEl("div", { attr: { style: "display:flex;align-items:center;gap:6px;margin-bottom:8px;flex-wrap:wrap;background:var(--background-primary);padding:6px 8px;border-radius:4px;" } });
            cfg.collapsedState = cfg.collapsedState || {};
            const aiCollapsed = cfg.collapsedState["ai"] === true;
            const aiChevron = aiHead.createEl("span", { text: aiCollapsed ? "▶" : "▼", attr: { style: "cursor:pointer;font-size:10px;color:var(--text-muted);user-select:none;", title: t("折叠/展开") } });
            aiHead.createEl("span", { text: t("AI 设置"), attr: { style: "font-weight:600;" } });
            const aiContent = aiBox.createEl("div");
            if (aiCollapsed) aiContent.style.display = "none";
            aiChevron.onclick = () => {
                const isCol = aiContent.style.display === "none";
                aiContent.style.display = isCol ? "" : "none";
                aiChevron.textContent = isCol ? "▼" : "▶";
                cfg.collapsedState["ai"] = !isCol;
                this.saveEditorMenuConfig();
            };
            const aiBtnRow = aiHead.createEl("div", { attr: { style: "display:flex;gap:4px;flex-wrap:wrap;" } });
            const aiCfg = () => cfg.aiConfigs[cfg.currentAI || 0];
            const renderAiBtns = () => {
                aiBtnRow.empty();
                cfg.aiConfigs.forEach((ac, idx) => {
                    const b = aiBtnRow.createEl("button", { text: (ac.apiKey ? "" : "⚠ ") + (ac.name || "AI" + (idx + 1)), attr: { style: "font-size:var(--font-ui-smaller);padding:1px 8px;" } });
                    if (idx === (cfg.currentAI || 0)) b.style.outline = "2px solid var(--interactive-accent)";
                    b.title = ac.apiKey ? (ac.model || "") : t("未填写 API Key");
                    b.onclick = () => { cfg.currentAI = idx; this.saveEditorMenuConfig(); render(); };
                });
            };
            const aiOps = aiHead.createEl("div", { attr: { style: "display:flex;gap:4px;margin-left:auto;" } });
            aiOps.createEl("button", { text: t("新建"), attr: { style: "font-size:var(--font-ui-smaller);padding:1px 8px;" } }).onclick = () => {
                cfg.aiConfigs.push({ name: "AI" + (cfg.aiConfigs.length + 1), model: "", base_url: "https://api.openai.com/v1/chat/completions", apiKey: "", temperature: 0.7 });
                cfg.currentAI = cfg.aiConfigs.length - 1; this.saveEditorMenuConfig(); render();
            };
            aiOps.createEl("button", { text: t("删除"), cls: "mod-warning", attr: { style: "font-size:var(--font-ui-smaller);padding:1px 8px;" } }).onclick = () => {
                if (cfg.aiConfigs.length <= 1) { new Notice(t("至少保留一个 AI 配置")); return; }
                cfg.aiConfigs.splice(cfg.currentAI || 0, 1);
                cfg.currentAI = Math.max(0, (cfg.currentAI || 0) - 1);
                this.saveEditorMenuConfig(); render();
            };
            const mkAiRow = () => aiContent.createEl("div", { attr: { style: "display:flex;gap:6px;align-items:center;margin:4px 0;flex-wrap:wrap;" } });
            const r1 = mkAiRow();
            r1.createEl("span", { text: t("名称"), attr: { style: "font-size:var(--font-ui-smaller);color:var(--text-muted);" } });
            const nameIn = r1.createEl("input", { type: "text", attr: { style: "width:90px;padding:2px 4px;" } });
            r1.createEl("span", { text: t("模型"), attr: { style: "font-size:var(--font-ui-smaller);color:var(--text-muted);" } });
            const modelIn = r1.createEl("input", { type: "text", attr: { style: "width:150px;padding:2px 4px;", placeholder: "deepseek-chat / gpt-4o…" } });
            r1.createEl("span", { text: t("温度"), attr: { style: "font-size:var(--font-ui-smaller);color:var(--text-muted);" } });
            const tempIn = r1.createEl("input", { type: "text", attr: { style: "width:50px;padding:2px 4px;" } });
            const r2 = mkAiRow();
            r2.createEl("span", { text: t("API 地址"), attr: { style: "font-size:var(--font-ui-smaller);color:var(--text-muted);" } });
            const urlIn = r2.createEl("input", { type: "text", attr: { style: "flex:1;min-width:220px;padding:2px 4px;", placeholder: "https://api.openai.com/v1/chat/completions" } });
            const r3 = mkAiRow();
            r3.createEl("span", { text: "API Key", attr: { style: "font-size:var(--font-ui-smaller);color:var(--text-muted);" } });
            const keyIn = r3.createEl("input", { type: "password", attr: { style: "flex:1;min-width:220px;padding:2px 4px;", placeholder: "sk-…" } });
            const fillAiFields = () => { const ac = aiCfg(); nameIn.value = ac.name || ""; modelIn.value = ac.model || ""; urlIn.value = ac.base_url || ""; keyIn.value = ac.apiKey || ""; tempIn.value = ac.temperature != null ? ac.temperature : 0.7; };
            fillAiFields();
            const bindAi = (input, key) => { input.onchange = () => { const ac = aiCfg(); ac[key] = input.value.trim(); this.saveEditorMenuConfig(); renderAiBtns(); }; };
            bindAi(nameIn, "name"); bindAi(modelIn, "model"); bindAi(urlIn, "base_url"); bindAi(keyIn, "apiKey");
            tempIn.onchange = () => { const v = parseFloat(tempIn.value); const ac = aiCfg(); ac.temperature = isNaN(v) ? 0.7 : v; this.saveEditorMenuConfig(); };
            renderAiBtns();

            for (let gi = 0; gi < cfg.groups.length; gi++) {
                const grp = cfg.groups[gi];
                const box = root.createEl("div", { attr: { style: "border:1px solid var(--background-modifier-border);border-radius:6px;padding:8px;margin-bottom:8px;" } });
                box.dataset.groupId = grp.id;
                const head = box.createEl("div", { attr: { style: "display:flex;align-items:center;gap:6px;margin-bottom:8px;flex-wrap:wrap;background:var(--background-primary);padding:6px 8px;border-radius:4px;" } });
                const grpCollapsed = cfg.collapsedState[grp.id] === true;
                const grpChevron = head.createEl("span", { text: grpCollapsed ? "▶" : "▼", attr: { style: "cursor:pointer;font-size:10px;color:var(--text-muted);user-select:none;", title: t("折叠/展开") } });
                const grpContent = box.createEl("div");
                if (grpCollapsed) grpContent.style.display = "none";
                grpChevron.onclick = () => {
                    const isCol = grpContent.style.display === "none";
                    grpContent.style.display = isCol ? "" : "none";
                    grpChevron.textContent = isCol ? "▼" : "▶";
                    cfg.collapsedState[grp.id] = !isCol;
                    this.saveEditorMenuConfig();
                };
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

                const hdr = grpContent.createEl("div", { attr: { style: "display:flex;gap:6px;margin:4px 0 4px;font-size:var(--font-ui-smaller);color:var(--text-muted);background:var(--background-modifier-form-field);padding:3px 6px;border-radius:3px;" } });
                hdr.createEl("div", { attr: { style: "width:14px;flex-shrink:0;" } });
                hdr.createEl("div", { text: t("图标"), attr: { style: "width:153px;", title: t("lucide 图标名 / 粘贴 <svg> 代码 / 任意文字（识别不到则按文字显示）") } });
                hdr.createEl("div", { text: t("名称"), attr: { style: "width:120px;text-indent:2px;", title: t("tile 鼠标悬停时显示的提示文字") } });
                hdr.createEl("div", { text: t("类型"), attr: { style: "width:90px;text-indent:2px;", title: t("cmd=命令 regex=正则 text=文本 custom=转换 pipeline=管道 action=操作 key=按键 ai=AI") } });
                hdr.createEl("div", { text: t("操作"), attr: { style: "margin-left:auto;", title: t("删除该选项") } });

                for (let ii = 0; ii < (grp.items || []).length; ii++) {
                    const item = grp.items[ii];
                    const ir = grpContent.createEl("div", { attr: { style: "display:flex;gap:6px;align-items:center;margin:2px 0;" } });
                    ir.dataset.itemIdx = ii;
                    const handle = ir.createEl("div", { cls: "fop-drag-handle", attr: { title: t("拖拽排序") } });
                    handle.textContent = "⠿";
                    handle.addEventListener("mousedown", () => { ir.draggable = true; dragState = { fromGroup: gi, fromItem: ii }; });
                    ir.addEventListener("dragstart", (e) => { e.dataTransfer.effectAllowed = "move"; e.dataTransfer.setData("text/plain", ""); ir.style.opacity = "0.3"; });
                    ir.addEventListener("dragend", () => { ir.draggable = false; ir.style.opacity = ""; clearDragIndicators(); dragState = null; });
                    ir.addEventListener("dragover", (e) => {
                        if (!dragState) return;
                        e.preventDefault(); e.dataTransfer.dropEffect = "move";
                        clearDragIndicators(); ir.classList.add("fop-drag-over");
                    });
                    ir.addEventListener("drop", (e) => {
                        if (!dragState) return;
                        e.preventDefault(); e.stopPropagation();
                        const fromG = dragState.fromGroup, fromI = dragState.fromItem;
                        if (fromG === gi && fromI === ii) return;
                        const rect = ir.getBoundingClientRect();
                        const after = e.clientY > rect.top + rect.height / 2;
                        let targetI = ii + (after ? 1 : 0);
                        const movedItem = cfg.groups[fromG].items[fromI];
                        cfg.groups[fromG].items.splice(fromI, 1);
                        if (fromG === gi && fromI < targetI) targetI--;
                        cfg.groups[gi].items.splice(targetI, 0, movedItem);
                        this.saveEditorMenuConfig(); render();
                    });
                    const iconTa = ir.createEl("textarea", { attr: { style: "width:120px;min-width:60px;max-width:240px;padding:2px;resize:horizontal;height:24px;font-size:var(--font-ui-smaller);", placeholder: t("图标/svg/文字") } });
                    iconTa.value = item.icon || "";
                    iconTa.onchange = () => { item.icon = iconTa.value; this.saveEditorMenuConfig(); renderPreview(); };
                    const iconBtn = ir.createEl("button", { text: "▦", attr: { title: t("选择图标"), style: "padding:2px 6px;font-size:13px;line-height:1;" } });
                    iconBtn.onclick = () => {
                        fopPopupPicker(iconBtn, {
                            placeholder: t("搜索图标…"), width: 360,
                            renderItems: (container, q, pick) => {
                                let count = 0;
                                for (const cat of Object.keys(LUCIDE_ICONS)) {
                                    const names = LUCIDE_ICONS[cat].filter(n => !q || n.indexOf(q) >= 0);
                                    if (names.length === 0) continue;
                                    container.createEl("div", { text: cat, attr: { style: "font-size:11px;color:var(--text-muted);margin:6px 2px 2px;text-transform:capitalize;" } });
                                    const grid = container.createEl("div", { attr: { style: "display:grid;grid-template-columns:repeat(auto-fill,28px);gap:4px;margin-bottom:4px;" } });
                                    for (const n of names) {
                                        const cell = grid.createEl("div", { cls: "fop-picker-item", attr: { title: n, style: "width:28px;height:28px;display:flex;align-items:center;justify-content:center;border-radius:4px;cursor:pointer;" } });
                                        try { const ic = getIcon(n); if (ic) { ic.style.width = "16px"; ic.style.height = "16px"; cell.appendChild(ic); } else cell.textContent = n[0]; } catch (e) { cell.textContent = n[0]; }
                                        cell.onmousedown = (e) => { e.preventDefault(); pick(n); };
                                        count++;
                                    }
                                }
                                if (count === 0) container.createEl("div", { text: t("无匹配"), attr: { style: "padding:8px;color:var(--text-muted);" } });
                            },
                            onPick: (name) => { item.icon = name; iconTa.value = name; this.saveEditorMenuConfig(); renderPreview(); }
                        });
                    };
                    ir.createEl("input", { type: "text", value: item.label || "", attr: { style: "width:120px;padding:2px;", placeholder: t("名称") } }).onchange = (e) => { item.label = e.target.value; this.saveEditorMenuConfig(); renderPreview(); };
                    const ts = ir.createEl("select");
                    ts.style.cssText = "width:90px;padding:0 2px;box-sizing:border-box;";
                    for (const t of ["cmd", "regex", "text", "custom", "pipeline", "action", "key"]) ts.createEl("option", { value: t, text: t });
                    ts.createEl("option", { value: "ai", text: "AI Prompt" });
                    ts.value = item.type || "cmd";
                    ts.onchange = () => { item.type = ts.value; this.saveEditorMenuConfig(); render(); };
                    if (item.type === "cmd") {
                        const allCmds = this.app.commands.commands;
                        const safeName = (cid) => (allCmds[cid] && typeof allCmds[cid].name === "string" && allCmds[cid].name) ? allCmds[cid].name : cid;
                        const cmdIds = Object.keys(allCmds).sort((a, b) => safeName(a).localeCompare(safeName(b)));
                        const cmdDisplay = ir.createEl("input", { type: "text", attr: { style: "flex:1;min-width:120px;padding:2px;", placeholder: t("命令ID，如 editor:toggle-bold") } });
                        cmdDisplay.value = item.cmd || "";
                        cmdDisplay.onchange = () => { item.cmd = cmdDisplay.value.trim(); this.saveEditorMenuConfig(); renderPreview(); };
                        const cmdBtn = ir.createEl("button", { text: "▾", attr: { style: "padding:2px 6px;font-size:12px;line-height:1;" } });
                        const openCmdPicker = () => {
                            fopPopupPicker(cmdBtn, {
                                placeholder: t("搜索命令…"), width: 380,
                                renderItems: (container, q, pick) => {
                                    let count = 0;
                                    for (const cid of cmdIds) {
                                        const nm = safeName(cid);
                                        if (q && nm.toLowerCase().indexOf(q) < 0 && cid.toLowerCase().indexOf(q) < 0) continue;
                                        const row = container.createEl("div", { cls: "fop-picker-item", attr: { style: "padding:3px 6px;cursor:pointer;border-radius:4px;display:flex;justify-content:space-between;gap:8px;align-items:center;" } });
                                        row.createEl("span", { text: nm, attr: { style: "white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex:1;" } });
                                        row.createEl("span", { text: cid, attr: { style: "color:var(--text-muted);font-size:11px;white-space:nowrap;" } });
                                        row.onmousedown = (e) => { e.preventDefault(); pick(cid); };
                                        count++;
                                    }
                                    if (count === 0) container.createEl("div", { text: t("无匹配"), attr: { style: "padding:8px;color:var(--text-muted);" } });
                                },
                                onPick: (cid) => { item.cmd = cid; cmdDisplay.value = cid; this.saveEditorMenuConfig(); renderPreview(); }
                            });
                        };
                        cmdBtn.onclick = openCmdPicker;
                    } else if (item.type === "regex") {
                        ir.createEl("input", { type: "text", value: item.pattern || "", attr: { style: "flex:1;min-width:80px;padding:2px;", placeholder: t("正则") } }).onchange = (e) => { item.pattern = e.target.value; this.saveEditorMenuConfig(); renderPreview(); };
                        ir.createEl("input", { type: "text", value: item.replacement || "", attr: { style: "flex:1;min-width:80px;padding:2px;", placeholder: t("替换 \\n=换行") } }).onchange = (e) => { item.replacement = e.target.value; this.saveEditorMenuConfig(); renderPreview(); };
                        ir.createEl("input", { type: "text", value: item.flags || "g", attr: { style: "width:46px;padding:2px;", placeholder: t("标志"), title: t("g=全局 i=忽略大小写 m=多行 s=dotall u=unicode y=粘附") } }).onchange = (e) => { item.flags = e.target.value; this.saveEditorMenuConfig(); renderPreview(); };
                    } else if (item.type === "custom") {
                        const cs = ir.createEl("select");
                        cs.style.cssText = "flex:1;min-width:120px;padding:0 2px;box-sizing:border-box;";
                        cs.createEl("option", { value: "", text: "" });
                        for (const k of Object.keys(CUSTOM_TRANSFORMS)) cs.createEl("option", { value: k, text: t(CUSTOM_TRANSFORM_LABELS[k] || k) });
                        cs.value = item.custom || "";
                        cs.onchange = () => { item.custom = cs.value; this.saveEditorMenuConfig(); renderPreview(); };
                    } else if (item.type === "pipeline") {
                        const plInput = ir.createEl("input", { type: "text", value: item.pipeline || "", attr: { style: "flex:1;min-width:180px;padding:2px;", placeholder: t("按钮名→按钮名（Tab键插入→）") } });
                        plInput.addEventListener("keydown", (e) => {
                            if (e.key === "Tab") {
                                e.preventDefault();
                                const s = plInput.selectionStart, en = plInput.selectionEnd;
                                plInput.value = plInput.value.slice(0, s) + "\u2192" + plInput.value.slice(en);
                                plInput.selectionStart = plInput.selectionEnd = s + 1;
                                item.pipeline = plInput.value; this.saveEditorMenuConfig(); renderPreview();
                            }
                        });
                        plInput.onchange = () => { item.pipeline = plInput.value; this.saveEditorMenuConfig(); renderPreview(); };
                    } else if (item.type === "ai") {
                        ir.createEl("input", { type: "text", value: item.prompt || "", attr: { style: "flex:1;min-width:180px;padding:2px;", placeholder: t("提示词，{{text}}=选中文本") } }).onchange = (e) => { item.prompt = e.target.value; this.saveEditorMenuConfig(); renderPreview(); };
                    } else if (item.type === "text") {
                        ir.createEl("input", { type: "text", value: item.text || "", attr: { style: "flex:1;min-width:120px;padding:2px;", placeholder: t("插入的文本，{{text}}=选中文本") } }).onchange = (e) => { item.text = e.target.value; this.saveEditorMenuConfig(); renderPreview(); };
                    } else if (item.type === "action") {
                        const as = ir.createEl("select");
                        as.style.cssText = "flex:1;min-width:120px;padding:0 2px;box-sizing:border-box;";
                        as.createEl("option", { value: "", text: "" });
                        for (const k of Object.keys(ACTION_LABELS)) as.createEl("option", { value: k, text: t(ACTION_LABELS[k] || k) });
                        as.value = item.action || "";
                        as.onchange = () => { item.action = as.value; this.saveEditorMenuConfig(); renderPreview(); };
                    } else if (item.type === "key") {
                        const ksInput = ir.createEl("input", { type: "text", value: item.keystroke || "", attr: { style: "flex:1;min-width:120px;padding:2px;text-align:center;", placeholder: t("点击后按键录制"), readonly: true } });
                        ksInput.onclick = () => {
                            ksInput.value = t("请按键…");
                            const onKey = (e) => {
                                e.preventDefault(); e.stopPropagation();
                                if (e.key === "Escape") { ksInput.value = item.keystroke || ""; ksInput.removeEventListener("keydown", onKey, true); ksInput.blur(); return; }
                                const mods = [];
                                if (e.ctrlKey) mods.push("Ctrl");
                                if (e.metaKey) mods.push("Meta");
                                if (e.altKey) mods.push("Alt");
                                if (e.shiftKey) mods.push("Shift");
                                if (["Control", "Meta", "Alt", "Shift"].includes(e.key)) { ksInput.value = mods.join("+"); return; }
                                mods.push(e.key.length === 1 ? e.key.toUpperCase() : e.key);
                                item.keystroke = mods.join("+");
                                ksInput.value = item.keystroke;
                                this.saveEditorMenuConfig(); renderPreview();
                                ksInput.removeEventListener("keydown", onKey, true);
                                ksInput.blur();
                            };
                            ksInput.addEventListener("keydown", onKey, true);
                            ksInput.focus();
                        };
                    }
                    const db = ir.createEl("button", { text: "✕", attr: { style: "margin-left:auto;padding:2px 6px;" } });
                    db.onclick = () => { grp.items.splice(ii, 1); this.saveEditorMenuConfig(); render(); };
                }
                const dropZone = grpContent.createEl("div", { cls: "fop-drop-zone", attr: { style: "height:6px;margin:2px 0;border-radius:4px;transition:background 0.15s,height 0.15s;" } });
                dropZone.addEventListener("dragover", (e) => {
                    if (!dragState) return;
                    e.preventDefault(); e.dataTransfer.dropEffect = "move";
                    clearDragIndicators(); dropZone.style.background = "var(--interactive-accent)"; dropZone.style.height = "20px";
                });
                dropZone.addEventListener("dragleave", () => { dropZone.style.background = ""; dropZone.style.height = "6px"; });
                dropZone.addEventListener("drop", (e) => {
                    if (!dragState) return;
                    e.preventDefault(); e.stopPropagation();
                    const fromG = dragState.fromGroup, fromI = dragState.fromItem;
                    if (fromG === gi && fromI === grp.items.length - 1) return;
                    const movedItem = cfg.groups[fromG].items[fromI];
                    cfg.groups[fromG].items.splice(fromI, 1);
                    cfg.groups[gi].items.push(movedItem);
                    this.saveEditorMenuConfig(); render();
                });
                const ab = grpContent.createEl("button", { text: t("+ 添加选项"), attr: { style: "margin-top:4px;" } });
                ab.onclick = () => { grp.items = grp.items || []; grp.items.push({ icon: "square", label: t("新选项"), type: "cmd", cmd: "" }); this.saveEditorMenuConfig(); const s = root.scrollTop; render(); root.scrollTop = s; };
            }
            const ag = root.createEl("button", { text: t("+ 添加分组"), attr: { style: "margin-top:8px;" } });
            ag.onclick = () => { cfg.groups.push({ id: "g" + Date.now(), label: t("新分组"), color: "neutral", items: [] }); this.saveEditorMenuConfig(); const s = root.scrollTop; render(); root.scrollTop = s; };
            const rsBtn = root.createEl("button", { text: t("恢复默认"), cls: "mod-warning", attr: { style: "margin-top:8px;float:right;" } });
            rsBtn.onclick = () => {
                const aiConfigs = this.editorMenuConfig.aiConfigs, curAI = this.editorMenuConfig.currentAI;
                this.editorMenuConfig = JSON.parse(JSON.stringify(DEFAULT_EDITOR_MENU));
                this.editorMenuConfig.aiConfigs = aiConfigs; this.editorMenuConfig.currentAI = curAI;
                this.saveEditorMenuConfig(); render();
            };
            } finally { root.scrollTop = _savedScroll; }
        };
        render();
    }
}

module.exports = FileOpsPlusPlugin;
