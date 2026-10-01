"use strict";

const { Plugin, TFile, TFolder, FileSystemAdapter, Notice, Modal, Menu, getIcon, MarkdownRenderer, MarkdownView } = require("obsidian");
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
    "移除高亮": "Remove Highlight", "移除行内代码": "Remove Inline Code", "移除emoji": "Remove Emoji", "预设": "Preset", "标题升级": "Heading Promote", "标题降级": "Heading Demote",
    "链接留文本": "Link to Text", "链接留URL": "Link to URL", "wiki留文本": "Wiki to Text",
    "去HTML标签": "Strip HTML", "合并空行": "Merge Blank Lines", "去行首空白": "Trim Leading Space",
    "全角转半角": "Fullwidth to Half",
    "剪贴板": "Clipboard", "剪切": "Cut", "复制": "Copy", "粘贴": "Paste", "纯文本粘贴": "Paste Plain", "全选": "Select All",
    "原生菜单": "Native Menu", "设置": "Settings",
    "编辑器右键菜单设置": "Editor Context Menu Settings", "右键菜单设置": "Context Menu Settings", "恢复默认": "Reset to Default",
    "文件管理器": "File Explorer", "外观": "Appearance", "配色": "Color Theme", "风格": "Button Style",
    "实时预览": "Live Preview", "启用增强菜单（关闭则用原生右键）": "Enable enhanced menu (disable for native menu)", "启用": "Enable",
    "显示分组标题": "Show group labels", "删除组": "Delete Group", "颜色": "Color", "添加颜色": "Add Color",
    "显示": "Show", "隐藏": "Hide",
    "添加选项": "Add Option", "添加分组": "Add Group",
    "图标": "Icon", "名称": "Name", "类型": "Type", "操作": "Action", "背景": "BG", "文字": "FG",
    "关闭编辑器增强菜单": "Disable Editor Enhanced Menu", "启用编辑器增强菜单": "Enable Editor Enhanced Menu",
    "已启用编辑器增强菜单": "Editor enhanced menu enabled", "已关闭编辑器增强菜单": "Editor enhanced menu disabled",
    "已关闭增强菜单。重新启用：命令面板(Ctrl+P)搜「右键菜单设置」": "Enhanced menu disabled. Re-enable via Command Palette (Ctrl+P) search \"Context Menu Settings\"",
    "关闭": "Close", "关闭其他": "Close Others", "关闭右侧": "Close to Right", "全部关闭": "Close All",
    "撤销": "Undo", "重做": "Redo", "系统回收站不可用已永久删除": "System trash unavailable, permanently deleted",
    "取消锁定": "Unpin", "锁定": "Pin", "阅读/源码": "Reading/Source",
    "左右分屏": "Split Vertical", "上下分屏": "Split Horizontal", "新窗口": "New Window",
    "默认应用": "Default App", "外部编辑器": "External Editor", "资源管理器": "Reveal in Explorer",
    "局部图": "Local Graph", "反链": "Backlinks", "出链": "Outgoing Links", "大纲": "Outline",
    "重命名": "Rename", "取消置顶": "Unpin", "置顶": "Pin", "创建副本": "Duplicate",
    "定位": "Reveal", "折叠所在文件夹": "Collapse Folder", "已在根目录": "Already at root", "未找到文件夹": "Folder not found",
    "自动定位到当前文档": "Auto reveal current file", "自动折叠文件夹": "Auto collapse folder",
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

    "阅读视图": "Reading View", "导出": "Export",
    "无活动文件": "No active file", "未找到关联笔记": "No linked notes found", "透明": "Opacity", "拖动调整面板宽高": "Drag to resize", "关系图": "Graph", "设置面板分组手风琴模式": "Settings panel group accordion mode", "局部关系列表": "Local relation list", "提及文档": "Mentions", "被提及文档": "Mentioned by", "吸附/脱离": "Dock/Undock",
    "暂存": "Stash", "暂存列表": "Stash List", "插入到光标位置": "Insert at cursor", "空暂存": "Empty stash", "暂存为空": "Stash is empty",
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
    "新建文件": "New File", "AI命名": "AI Name", "请选择文件名": "Choose a file name", "创建文件失败：": "File creation failed: ",
    "已创建文件：": "File created: ", "正在生成文件名…": "Generating file name…", "流式输出": "Stream",
    "新文件模板": "New File Template", "{{blockRef}}=块引用 {{embedRef}}=嵌入引用 {{aiResult}}=AI返回": "{{blockRef}}=block ref {{embedRef}}=embed ref {{aiResult}}=AI result",
    "杂项": "Misc",
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
    "文件名着色": "Filename Color", "着色": "Colorize", "间距": "Spacing",
    "按钮间距": "Button Spacing", "分组间距": "Group Spacing",
    "+ 着色": "+ Colorize", "+ 加粗": "+ Bold", "新颜色": "New Color",
    "柔彩粉彩": "Soft Pastel", "莫兰迪灰调": "Morandi Gray", "单色墨线": "Monochrome Ink",
    "深色霓虹": "Dark Neon", "纸墨国风": "Paper Ink", "高饱和实色": "Solid Vivid",
    "孟菲斯": "Memphis", "霓虹夜城": "Neon City", "合成波日落": "Synthwave Sunset",
    "糖果波普": "Candy Pop", "故宫红墙": "Forbidden City", "浮世绘": "Ukiyo-e",
    "黑金暗房": "Black Gold", "蒸汽铜绿": "Steam Patina", "莫奈睡莲": "Monet Lily",
    "墨绿书房": "Green Study", "火星基地": "Mars Base", "海盐薄荷": "Mint Salt",
    "落日蜜桃": "Sunset Peach", "北欧雾蓝": "Nord Fog", "樱花绿茶": "Sakura Mint",
    "茶咖大地": "Tea Earth", "复古胶片": "Vintage Film", "青花瓷": "Porcelain",
    "敦煌矿彩": "Dunhuang", "Nord极光": "Nord Aurora", "终端荧光": "Terminal Glow",
    "扁平": "Flat", "新拟态": "Neumorphism", "玻璃拟态": "Glassmorphism",
    "新粗野": "Neo-Brutalism", "赛博朋克": "Cyberpunk", "蒸汽波": "Vaporwave",
    "果冻": "Jelly", "包豪斯": "Bauhaus", "手绘": "Hand Drawn", "和纸": "Washi",
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

const FOP_COLOR_THEMES = [
    { id: "default", name: "柔彩粉彩", groups: {
        accent: { bg: "#e3eefc", fg: "#1d4e89" }, pro: { bg: "#ece8fb", fg: "#4b3c99" },
        success: { bg: "#e4f3df", fg: "#2f6b2a" }, warning: { bg: "#fdecd6", fg: "#9a5a12" },
        regex: { bg: "#fde6e2", fg: "#b23a2a" }, neutral: { bg: "#fff", fg: "#666" } },
      hl: ["#ffe45c","#ffb3b3","#b5f2a6","#a9d4ff","#ffb8e0","#ffd2a6","#d9b3ff","#a6fbff"] },
    { id: "morandi", name: "莫兰迪灰调", groups: {
        accent: { bg: "#d5dde0", fg: "#3f5560" }, pro: { bg: "#ddd6df", fg: "#5d4a66" },
        success: { bg: "#d8ded0", fg: "#4d5f3f" }, warning: { bg: "#e8dcc8", fg: "#7a5c2e" },
        regex: { bg: "#e6d3cf", fg: "#8a4a41" }, neutral: { bg: "#faf8f5", fg: "#6f6a62" } },
      hl: ["#e8d98f","#dba9a3","#b4cfa8","#a3bfd6","#d9b0c9","#e0bf9a","#bfa9d1","#a5cfcb"] },
    { id: "inkline", name: "单色墨线", groups: {
        accent: { bg: "#fff", fg: "#222" }, pro: { bg: "#fff", fg: "#222" },
        success: { bg: "#fff", fg: "#222" }, warning: { bg: "#fff", fg: "#222" },
        regex: { bg: "#fff", fg: "#c0392b" }, neutral: { bg: "#f4f4f4", fg: "#777" } },
      hl: ["#fff3a0","#ffd0d0","#d6f5cc","#cfe6ff","#ffd6ee","#ffe4c4","#e8d6ff","#ccfbff"] },
    { id: "neon", name: "深色霓虹", groups: {
        accent: { bg: "#12283f", fg: "#5ab0ff" }, pro: { bg: "#241a3f", fg: "#b39dff" },
        success: { bg: "#12301f", fg: "#5fe08a" }, warning: { bg: "#3a2810", fg: "#ffb84d" },
        regex: { bg: "#3a1519", fg: "#ff7a7a" }, neutral: { bg: "#20222c", fg: "#9aa0b4" } },
      hl: ["#5c5210","#5c2020","#1f4a1f","#1f3a5c","#5c1f45","#5c3a1f","#40205c","#1f5c5c"] },
    { id: "guofeng", name: "纸墨国风", groups: {
        accent: { bg: "#e2e8ea", fg: "#2e4a57" }, pro: { bg: "#e9e0e8", fg: "#5a3d5c" },
        success: { bg: "#e0e8d6", fg: "#3f5e2f" }, warning: { bg: "#f5e6bf", fg: "#8a6410" },
        regex: { bg: "#f3d9d2", fg: "#a83a28" }, neutral: { bg: "#fffaf0", fg: "#6f6248" } },
      hl: ["#f2d96b","#e8a29a","#a8c99a","#8fb3c9","#d9a3bd","#e0b47f","#b79ac9","#9acfc4"] },
    { id: "solid", name: "高饱和实色", groups: {
        accent: { bg: "#3b82f6", fg: "#fff" }, pro: { bg: "#8b5cf6", fg: "#fff" },
        success: { bg: "#22a06b", fg: "#fff" }, warning: { bg: "#f59e0b", fg: "#fff" },
        regex: { bg: "#ef4444", fg: "#fff" }, neutral: { bg: "#e5e7eb", fg: "#4b5563" } },
      hl: ["#facc15","#fb7185","#4ade80","#60a5fa","#f472b6","#fb923c","#a78bfa","#22d3ee"] },
    { id: "memphis", name: "孟菲斯", groups: {
        accent: { bg: "#3a86ff", fg: "#fff" }, pro: { bg: "#9b5de5", fg: "#fff" },
        success: { bg: "#2ec4b6", fg: "#111" }, warning: { bg: "#ff8c42", fg: "#fff" },
        regex: { bg: "#ff5fa2", fg: "#fff" }, neutral: { bg: "#fff8e7", fg: "#111" } },
      hl: ["#ffd23f","#ff5fa2","#7bdc6a","#5cc8ff","#ff9ecd","#ff8c42","#c9a3ff","#2ec4b6"] },
    { id: "neoncity", name: "霓虹夜城", groups: {
        accent: { bg: "#00C2FF", fg: "#1a1a1a" }, pro: { bg: "#A855F7", fg: "#fff" },
        success: { bg: "#00FF9C", fg: "#1a1a1a" }, warning: { bg: "#FF9F1C", fg: "#1a1a1a" },
        regex: { bg: "#FF2E63", fg: "#fff" }, neutral: { bg: "#0D0221", fg: "#fff" } },
      hl: ["#00C2FF","#A855F7","#00FF9C","#FF9F1C","#FF2E63","#00C2FF","#A855F7","#00FF9C"] },
    { id: "synwave", name: "合成波日落", groups: {
        accent: { bg: "#2DE2E6", fg: "#1a1a1a" }, pro: { bg: "#9D4EDD", fg: "#fff" },
        success: { bg: "#7CFFCB", fg: "#1a1a1a" }, warning: { bg: "#FF9E00", fg: "#1a1a1a" },
        regex: { bg: "#FF206E", fg: "#fff" }, neutral: { bg: "#1A1033", fg: "#fff" } },
      hl: ["#2DE2E6","#9D4EDD","#7CFFCB","#FF9E00","#FF206E","#2DE2E6","#9D4EDD","#7CFFCB"] },
    { id: "candy", name: "糖果波普", groups: {
        accent: { bg: "#3A86FF", fg: "#fff" }, pro: { bg: "#8338EC", fg: "#fff" },
        success: { bg: "#06D6A0", fg: "#1a1a1a" }, warning: { bg: "#FFBE0B", fg: "#1a1a1a" },
        regex: { bg: "#FF006E", fg: "#fff" }, neutral: { bg: "#FFFBEA", fg: "#1a1a1a" } },
      hl: ["#3A86FF","#8338EC","#06D6A0","#FFBE0B","#FF006E","#3A86FF","#8338EC","#06D6A0"] },
    { id: "guGong", name: "故宫红墙", groups: {
        accent: { bg: "#3E6B8A", fg: "#fff" }, pro: { bg: "#7B4B6A", fg: "#fff" },
        success: { bg: "#5E7F5A", fg: "#fff" }, warning: { bg: "#E3A33B", fg: "#1a1a1a" },
        regex: { bg: "#B3261E", fg: "#fff" }, neutral: { bg: "#F4E9D4", fg: "#1a1a1a" } },
      hl: ["#3E6B8A","#7B4B6A","#5E7F5A","#E3A33B","#B3261E","#3E6B8A","#7B4B6A","#5E7F5A"] },
    { id: "ukiyoe", name: "浮世绘", groups: {
        accent: { bg: "#1B4F72", fg: "#fff" }, pro: { bg: "#6C3F6B", fg: "#fff" },
        success: { bg: "#6B8E4E", fg: "#fff" }, warning: { bg: "#E09F3E", fg: "#1a1a1a" },
        regex: { bg: "#C8372D", fg: "#fff" }, neutral: { bg: "#EFE3C8", fg: "#1a1a1a" } },
      hl: ["#1B4F72","#6C3F6B","#6B8E4E","#E09F3E","#C8372D","#1B4F72","#6C3F6B","#6B8E4E"] },
    { id: "darkgold", name: "黑金暗房", groups: {
        accent: { bg: "#5B7C99", fg: "#fff" }, pro: { bg: "#8B6FA8", fg: "#fff" },
        success: { bg: "#6B8F71", fg: "#fff" }, warning: { bg: "#D4A017", fg: "#1a1a1a" },
        regex: { bg: "#B03A48", fg: "#fff" }, neutral: { bg: "#141414", fg: "#fff" } },
      hl: ["#5B7C99","#8B6FA8","#6B8F71","#D4A017","#B03A48","#5B7C99","#8B6FA8","#6B8F71"] },
    { id: "patina", name: "蒸汽铜绿", groups: {
        accent: { bg: "#4A7C8C", fg: "#fff" }, pro: { bg: "#7D5A6E", fg: "#fff" },
        success: { bg: "#6E9A7E", fg: "#fff" }, warning: { bg: "#C98A3C", fg: "#1a1a1a" },
        regex: { bg: "#A64B32", fg: "#fff" }, neutral: { bg: "#2B2118", fg: "#fff" } },
      hl: ["#4A7C8C","#7D5A6E","#6E9A7E","#C98A3C","#A64B32","#4A7C8C","#7D5A6E","#6E9A7E"] },
    { id: "monet", name: "莫奈睡莲", groups: {
        accent: { bg: "#8FB8DE", fg: "#1a1a1a" }, pro: { bg: "#B8A1D9", fg: "#1a1a1a" },
        success: { bg: "#9CC5A1", fg: "#1a1a1a" }, warning: { bg: "#F2C894", fg: "#1a1a1a" },
        regex: { bg: "#E8A0BF", fg: "#1a1a1a" }, neutral: { bg: "#F6F3EC", fg: "#1a1a1a" } },
      hl: ["#8FB8DE","#B8A1D9","#9CC5A1","#F2C894","#E8A0BF","#8FB8DE","#B8A1D9","#9CC5A1"] },
    { id: "greenroom", name: "墨绿书房", groups: {
        accent: { bg: "#3D5A80", fg: "#fff" }, pro: { bg: "#6D597A", fg: "#fff" },
        success: { bg: "#2F6B4F", fg: "#fff" }, warning: { bg: "#D9A441", fg: "#1a1a1a" },
        regex: { bg: "#9E2A2B", fg: "#fff" }, neutral: { bg: "#F2EBDD", fg: "#1a1a1a" } },
      hl: ["#3D5A80","#6D597A","#2F6B4F","#D9A441","#9E2A2B","#3D5A80","#6D597A","#2F6B4F"] },
    { id: "marsbase", name: "火星基地", groups: {
        accent: { bg: "#4CC9F0", fg: "#1a1a1a" }, pro: { bg: "#B5179E", fg: "#fff" },
        success: { bg: "#80ED99", fg: "#1a1a1a" }, warning: { bg: "#F77F00", fg: "#1a1a1a" },
        regex: { bg: "#D62828", fg: "#fff" }, neutral: { bg: "#1B1B1E", fg: "#fff" } },
      hl: ["#4CC9F0","#B5179E","#80ED99","#F77F00","#D62828","#4CC9F0","#B5179E","#80ED99"] },
    { id: "mintsalt", name: "海盐薄荷", groups: {
        accent: { bg: "#D4EEF3", fg: "#1a1a1a" }, pro: { bg: "#DDE3F7", fg: "#1a1a1a" },
        success: { bg: "#D2F0E0", fg: "#1a1a1a" }, warning: { bg: "#FCEFD2", fg: "#1a1a1a" },
        regex: { bg: "#F9DAD8", fg: "#1a1a1a" }, neutral: { bg: "#F5F8F8", fg: "#1a1a1a" } },
      hl: ["#D4EEF3","#DDE3F7","#D2F0E0","#FCEFD2","#F9DAD8","#D4EEF3","#DDE3F7","#D2F0E0"] },
    { id: "sunsetpeach", name: "落日蜜桃", groups: {
        accent: { bg: "#DCE6F7", fg: "#1a1a1a" }, pro: { bg: "#E8DCF3", fg: "#1a1a1a" },
        success: { bg: "#E1F0D6", fg: "#1a1a1a" }, warning: { bg: "#FFE2B8", fg: "#1a1a1a" },
        regex: { bg: "#FFCFC4", fg: "#1a1a1a" }, neutral: { bg: "#FFF6EE", fg: "#1a1a1a" } },
      hl: ["#DCE6F7","#E8DCF3","#E1F0D6","#FFE2B8","#FFCFC4","#DCE6F7","#E8DCF3","#E1F0D6"] },
    { id: "nordfog", name: "北欧雾蓝", groups: {
        accent: { bg: "#C9D8E4", fg: "#1a1a1a" }, pro: { bg: "#D3D3E6", fg: "#1a1a1a" },
        success: { bg: "#CEDDD4", fg: "#1a1a1a" }, warning: { bg: "#E6DCCB", fg: "#1a1a1a" },
        regex: { bg: "#E3CFCF", fg: "#1a1a1a" }, neutral: { bg: "#EEF1F3", fg: "#1a1a1a" } },
      hl: ["#C9D8E4","#D3D3E6","#CEDDD4","#E6DCCB","#E3CFCF","#C9D8E4","#D3D3E6","#CEDDD4"] },
    { id: "sakuramint", name: "樱花绿茶", groups: {
        accent: { bg: "#DCE7F5", fg: "#1a1a1a" }, pro: { bg: "#EBDDF0", fg: "#1a1a1a" },
        success: { bg: "#DDEBCB", fg: "#1a1a1a" }, warning: { bg: "#FBE7C6", fg: "#1a1a1a" },
        regex: { bg: "#F8CFDB", fg: "#1a1a1a" }, neutral: { bg: "#FFF7F9", fg: "#1a1a1a" } },
      hl: ["#DCE7F5","#EBDDF0","#DDEBCB","#FBE7C6","#F8CFDB","#DCE7F5","#EBDDF0","#DDEBCB"] },
    { id: "teaearth", name: "茶咖大地", groups: {
        accent: { bg: "#B8C7C4", fg: "#1a1a1a" }, pro: { bg: "#B9ADBA", fg: "#1a1a1a" },
        success: { bg: "#B5C29C", fg: "#1a1a1a" }, warning: { bg: "#DDB87A", fg: "#1a1a1a" },
        regex: { bg: "#C68A74", fg: "#1a1a1a" }, neutral: { bg: "#F1E8DA", fg: "#1a1a1a" } },
      hl: ["#B8C7C4","#B9ADBA","#B5C29C","#DDB87A","#C68A74","#B8C7C4","#B9ADBA","#B5C29C"] },
    { id: "vintfilm", name: "复古胶片", groups: {
        accent: { bg: "#4F7CAC", fg: "#fff" }, pro: { bg: "#8E6C8A", fg: "#fff" },
        success: { bg: "#7A9E7E", fg: "#1a1a1a" }, warning: { bg: "#E0A030", fg: "#1a1a1a" },
        regex: { bg: "#C0503A", fg: "#fff" }, neutral: { bg: "#EFE6D2", fg: "#1a1a1a" } },
      hl: ["#4F7CAC","#8E6C8A","#7A9E7E","#E0A030","#C0503A","#4F7CAC","#8E6C8A","#7A9E7E"] },
    { id: "porcelain", name: "青花瓷", groups: {
        accent: { bg: "#1F4E8C", fg: "#fff" }, pro: { bg: "#5B7DB1", fg: "#fff" },
        success: { bg: "#8FB1D6", fg: "#1a1a1a" }, warning: { bg: "#C9DAEC", fg: "#1a1a1a" },
        regex: { bg: "#B5483A", fg: "#fff" }, neutral: { bg: "#F7F9FC", fg: "#1a1a1a" } },
      hl: ["#1F4E8C","#5B7DB1","#8FB1D6","#C9DAEC","#B5483A","#1F4E8C","#5B7DB1","#8FB1D6"] },
    { id: "dunhuang", name: "敦煌矿彩", groups: {
        accent: { bg: "#2F6F8F", fg: "#fff" }, pro: { bg: "#7A5C8E", fg: "#fff" },
        success: { bg: "#4E9F8A", fg: "#fff" }, warning: { bg: "#E2A93B", fg: "#1a1a1a" },
        regex: { bg: "#C8452F", fg: "#fff" }, neutral: { bg: "#F3EEE2", fg: "#1a1a1a" } },
      hl: ["#2F6F8F","#7A5C8E","#4E9F8A","#E2A93B","#C8452F","#2F6F8F","#7A5C8E","#4E9F8A"] },
    { id: "nord", name: "Nord极光", groups: {
        accent: { bg: "#81A1C1", fg: "#1a1a1a" }, pro: { bg: "#B48EAD", fg: "#1a1a1a" },
        success: { bg: "#A3BE8C", fg: "#1a1a1a" }, warning: { bg: "#EBCB8B", fg: "#1a1a1a" },
        regex: { bg: "#BF616A", fg: "#fff" }, neutral: { bg: "#2E3440", fg: "#fff" } },
      hl: ["#81A1C1","#B48EAD","#A3BE8C","#EBCB8B","#BF616A","#81A1C1","#B48EAD","#A3BE8C"] },
    { id: "terminal", name: "终端荧光", groups: {
        accent: { bg: "#00E5FF", fg: "#1a1a1a" }, pro: { bg: "#B388FF", fg: "#1a1a1a" },
        success: { bg: "#39FF14", fg: "#1a1a1a" }, warning: { bg: "#FFB300", fg: "#1a1a1a" },
        regex: { bg: "#FF3D71", fg: "#fff" }, neutral: { bg: "#0B0F0A", fg: "#fff" } },
      hl: ["#00E5FF","#B388FF","#39FF14","#FFB300","#FF3D71","#00E5FF","#B388FF","#39FF14"] },
];

const FOP_BUTTON_STYLES = [
    { id: "flat", name: "扁平" },
    { id: "neu", name: "新拟态" },
    { id: "gl", name: "玻璃拟态" },
    { id: "nb", name: "新粗野" },
    { id: "cy", name: "赛博朋克" },
    { id: "vp", name: "蒸汽波" },
    { id: "w95", name: "Win95" },
    { id: "jl", name: "果冻" },
    { id: "bh", name: "包豪斯" },
    { id: "dd", name: "手绘" },
    { id: "wa", name: "和纸" },
    { id: "memphis", name: "孟菲斯" },
];

function getColorTheme(id) {
    return FOP_COLOR_THEMES.find(t => t.id === id) || FOP_COLOR_THEMES[0];
}

let GROUP_COLORS = {};
function applyColorTheme(id) {
    const theme = getColorTheme(id);
    GROUP_COLORS = {
        accent: { label: t("蓝"), bg: theme.groups.accent.bg, fg: theme.groups.accent.fg },
        pro: { label: t("紫"), bg: theme.groups.pro.bg, fg: theme.groups.pro.fg },
        success: { label: t("绿"), bg: theme.groups.success.bg, fg: theme.groups.success.fg },
        warning: { label: t("橙"), bg: theme.groups.warning.bg, fg: theme.groups.warning.fg },
        regex: { label: t("红"), bg: theme.groups.regex.bg, fg: theme.groups.regex.fg },
        neutral: { label: t("灰"), bg: theme.groups.neutral.bg, fg: theme.groups.neutral.fg },
    };
    const root = document.documentElement;
    for (const [k, v] of Object.entries(theme.groups)) {
        root.style.setProperty("--fop-c-" + k + "-bg", v.bg);
        root.style.setProperty("--fop-c-" + k + "-fg", v.fg);
    }
}
applyColorTheme("default");

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
    revealInFop: { label: "定位", icon: "target", available: (c) => c.isFile && !c.multi, fn: (c) => () => c.plugin.revealFileByPath(c.file.path) },
    collapseFolder: { label: "折叠所在文件夹", icon: "folder-closed", available: (c) => c.isFile && !c.multi, fn: (c) => () => c.plugin.collapseFileFolder(c.file) },
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
    colorRow: { label: "文件名着色", icon: "palette", special: "colorRow", available: (c) => !c.multi },
    toggleEditorMenu: { label: "关闭编辑器增强菜单", icon: "settings", dynamicLabel: "editorMenu", fn: (c) => () => { c.plugin.editorMenuConfig.enabled = c.plugin.editorMenuConfig.enabled === false; c.plugin.saveEditorMenuConfig(); new Notice(c.plugin.editorMenuConfig.enabled ? t("已启用编辑器增强菜单") : t("已关闭编辑器增强菜单")); } },
    nativeMenu: { label: "原生菜单", icon: "more-horizontal", fn: (c) => () => { c.plugin._skipFileMenu = true; setTimeout(() => { const target = document.elementFromPoint(c.x, c.y); if (target) target.dispatchEvent(new MouseEvent("contextmenu", { clientX: c.x, clientY: c.y, bubbles: true, cancelable: true })); }, 0); } },
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
    colorRow: { label: "文件名着色", icon: "palette", special: "colorRow", available: (c) => c.file instanceof TFile },
    delete: { label: "删除", icon: "trash-2", danger: true, available: (c) => c.file instanceof TFile, fn: (c) => () => c.plugin.deleteFiles([c.file]) },
    nativeMenu: { label: "原生菜单", icon: "more-horizontal", fn: (c) => () => { c.plugin._skipTabMenu = true; setTimeout(() => { const target = document.elementFromPoint(c.x, c.y); if (target) target.dispatchEvent(new MouseEvent("contextmenu", { clientX: c.x, clientY: c.y, bubbles: true, cancelable: true })); }, 0); } },
};

const DEFAULT_COLOR_ITEMS = [
    { type: "着色", op: "bold", icon: "bold", label: t("加粗") },
    { type: "着色", color: "#e74c3c", icon: "circle", label: t("红") },
    { type: "着色", color: "#e67e22", icon: "circle", label: t("橙") },
    { type: "着色", color: "#f1c40f", icon: "circle", label: t("黄") },
    { type: "着色", color: "#2ecc71", icon: "circle", label: t("绿") },
    { type: "着色", color: "#1abc9c", icon: "circle", label: t("青") },
    { type: "着色", color: "#3498db", icon: "circle", label: t("蓝") },
    { type: "着色", color: "#9b59b6", icon: "circle", label: t("紫") },
    { type: "着色", color: "#95a5a6", icon: "circle", label: t("灰") },
];

const DEFAULT_FILE_MENU = {
    enabled: true,
    groups: [
        { id: "open", label: t("打开"), color: "accent", items: [{ action: "newTab" }, { action: "newWindow" }, { action: "defaultApp" }, { action: "externalEditor" }, { action: "revealInExplorer" }, { action: "revealInFop" }] },
        { id: "manage", label: t("管理"), color: "pro", items: [{ action: "rename" }, { action: "duplicate" }, { action: "togglePin" }, { action: "newFolder" }, { action: "newFile" }, { action: "collapseFolder" }] },
        { id: "copy", label: t("复制"), color: "success", items: [{ action: "absPath" }, { action: "relPath" }, { action: "wikilink" }, { action: "mdLink" }, { action: "copyFiles" }, { action: "moveUp" }, { action: "moveTo" }] },
        { id: "color", label: t("文件名着色"), color: "warning", items: DEFAULT_COLOR_ITEMS.map(it => ({ ...it })) },
        { id: "danger", label: t("删除"), color: "regex", items: [{ action: "delete" }, { action: "toggleEditorMenu" }, { action: "nativeMenu" }] },
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
        { id: "color", label: t("文件名着色"), color: "warning", items: DEFAULT_COLOR_ITEMS.map(it => ({ ...it })) },
        { id: "danger", label: t("删除"), color: "regex", items: [{ action: "delete" }, { action: "nativeMenu" }] },
    ],
};

const EDITOR_MENU_CSS = `
.fop-em-panel{position:fixed;z-index:9999;background:var(--background-secondary);border:1px solid var(--background-modifier-border);border-radius:10px;padding:10px;box-shadow:0 4px 16px rgba(0,0,0,.2);font-size:var(--font-ui-small);box-sizing:border-box;}
.fop-em-row{display:flex;flex-direction:column;gap:var(--fop-group-gap,6px);}
.fop-em-group-label{font-size:10px;margin-bottom:4px;padding-left:2px;}
.fop-em-grid{display:flex;flex-wrap:wrap;gap:var(--fop-tile-gap,3px);}
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

.fop-em-tile[data-c="accent"]{background:var(--fop-c-accent-bg,#E6F1FB);color:var(--fop-c-accent-fg,#0C447C);}
.fop-em-tile[data-c="pro"]{background:var(--fop-c-pro-bg,#EEEDFE);color:var(--fop-c-pro-fg,#3C3489);}
.fop-em-tile[data-c="success"]{background:var(--fop-c-success-bg,#EAF3DE);color:var(--fop-c-success-fg,#27500A);}
.fop-em-tile[data-c="warning"]{background:var(--fop-c-warning-bg,#FAEEDA);color:var(--fop-c-warning-fg,#854F0B);}
.fop-em-tile[data-c="regex"]{background:var(--fop-c-regex-bg,#FDE8E0);color:var(--fop-c-regex-fg,#B23A1A);}
.fop-em-tile[data-c="neutral"]{background:var(--fop-c-neutral-bg,var(--background-primary));color:var(--fop-c-neutral-fg,var(--text-muted));border:0.5px solid var(--background-modifier-border);}

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
            { icon: "remove-formatting", label: t("移除emoji"), type: "regex", pattern: "\\p{Extended_Pictographic}(?:\\u200D\\p{Extended_Pictographic})*\\uFE0F?", replacement: "", flags: "gu" },
            { icon: "heading-up", label: t("标题升级"), type: "regex", pattern: "^(#)(#{1,5}\\s)", replacement: "$2", flags: "gm", requireSelection: true },
            { icon: "heading-down", label: t("标题降级"), type: "regex", pattern: "^(#{1,5})(\\s)", replacement: "$1#$2", flags: "gm", requireSelection: true },
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
            { icon: "undo", label: t("撤销"), type: "cmd", cmd: "editor:undo" },
            { icon: "redo", label: t("重做"), type: "cmd", cmd: "editor:redo" },
            { icon: "link", label: t("复制为块引用"), type: "action", action: "copyBlockRef" },
            { icon: "file-plus", label: t("提取为新笔记"), type: "action", action: "extractToNote" },
            { icon: "heading", label: t("复制标题链接"), type: "action", action: "copyHeadingLink" },
            { icon: "clipboard-paste", label: t("剪贴板创建新笔记"), type: "action", action: "clipboardToNote" },
            { icon: "git-fork", label: t("局部关系列表"), type: "graph" },
            { icon: "clipboard-list", label: t("暂存"), type: "stash" },
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
        applyColorTheme(this.editorMenuConfig.colorTheme);
        if (this.editorMenuConfig.tileGap != null) document.documentElement.style.setProperty("--fop-tile-gap", this.editorMenuConfig.tileGap + "px");
        if (this.editorMenuConfig.groupGap != null) document.documentElement.style.setProperty("--fop-group-gap", this.editorMenuConfig.groupGap + "px");
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
                const seen = new Set();
                const deduped = [];
                for (const item of grp.items) {
                    const key = item.label || (item.pattern != null ? item.pattern + "|" + item.replacement : JSON.stringify(item));
                    if (!seen.has(key)) { seen.add(key); deduped.push(item); }
                    else needSave = true;
                }
                grp.items = deduped;
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
        const migrateColorRow = (config) => {
            if (!config || !config.groups) return;
            let hadOldColorRow = false;
            for (const g of config.groups) {
                if (!g.items) continue;
                const idx = g.items.findIndex(i => i.action === "colorRow");
                if (idx >= 0) { g.items.splice(idx, 1); hadOldColorRow = true; }
            }
            let colorGroup = config.groups.find(g => g.id === "color");
            if (!colorGroup) { colorGroup = { id: "color", label: t("文件名着色"), color: "warning", items: [] }; config.groups.push(colorGroup); }
            colorGroup.label = t("文件名着色");
            if (!colorGroup.items) colorGroup.items = [];
            colorGroup.items = colorGroup.items.filter(i => i.action !== "colorRow");
            if (hadOldColorRow || !colorGroup.items.some(i => i.type === "着色")) {
                if (!colorGroup.items.some(i => i.type === "着色")) {
                    colorGroup.items.push(...DEFAULT_COLOR_ITEMS.map(it => ({ ...it })));
                }
            }
        };
        migrateColorRow(this.fileMenuConfig);
        migrateColorRow(this.tabMenuConfig);
        const migrateNativeMenu = (config, defaultConfig) => {
            if (!config || !config.groups) return;
            const hasNative = config.groups.some(g => (g.items || []).some(i => i.action === "nativeMenu"));
            if (hasNative) return;
            const dg = defaultConfig.groups.find(g => (g.items || []).some(i => i.action === "nativeMenu"));
            if (!dg) return;
            let target = config.groups.find(g => g.id === dg.id);
            if (!target) { target = { id: dg.id, label: dg.label, color: dg.color, items: [] }; config.groups.push(target); }
            if (!target.items) target.items = [];
            const di = dg.items.find(i => i.action === "nativeMenu");
            if (di) target.items.push(JSON.parse(JSON.stringify(di)));
        };
        migrateNativeMenu(this.fileMenuConfig, DEFAULT_FILE_MENU);
        migrateNativeMenu(this.tabMenuConfig, DEFAULT_TAB_MENU);
        const dedupItems = (config) => {
            if (!config || !config.groups) return;
            for (const g of config.groups) {
                if (!g.items) continue;
                const seen = new Set(); const deduped = [];
                for (const item of g.items) {
                    const key = item.action || item.label || JSON.stringify(item);
                    if (!seen.has(key)) { seen.add(key); deduped.push(item); }
                }
                g.items = deduped;
            }
        };
        dedupItems(this.fileMenuConfig);
        dedupItems(this.tabMenuConfig);
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
                if (document.querySelector(".fop-em-panel:not(.fop-graph-panel):not(.fop-stash-panel)")) return;
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
            if (this._skipTabMenu) { this._skipTabMenu = false; return; }
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
        if (this._skipFileMenu) { this._skipFileMenu = false; return; }
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
        panel.className = "file-ops-plus-menu fop-em-panel";
        const bs = this.editorMenuConfig.buttonStyle;
        if (bs && bs !== "flat") panel.classList.add("fop-style-" + bs);
        panel.style.cssText = "position:fixed;left:" + x + "px;top:" + y + "px;z-index:9999;";
        const addRow = (items, colorKey) => {
            const row = document.createElement("div");
            row.className = "fop-em-grid";
            const gc = GROUP_COLORS[colorKey];
            const c = colorKey || "neutral";
            for (const item of items) {
                const btn = document.createElement("div");
                btn.className = "fop-em-tile";
                btn.style.whiteSpace = "nowrap";
                btn.style.gap = "4px";
                if (GROUP_COLORS[c]) btn.dataset.c = c;
                else if (c.includes("|")) { const parts = c.split("|"); btn.style.background = parts[0]; btn.style.color = parts[1] || autoContrast(parts[0]); }
                else if (c && c !== "neutral") { btn.style.background = c; btn.style.color = autoContrast(c); }
                if (item.colorDot) {
                    btn.style.width = "18px"; btn.style.height = "18px"; btn.style.minWidth = "18px";
                    btn.style.borderRadius = "50%"; btn.style.background = item.colorDot;
                    btn.style.border = "1px solid var(--background-modifier-border)";
                    btn.title = item.title || "";
                    if (item.active) { btn.style.boxShadow = "0 0 4px var(--text-accent)"; btn.style.border = "2px solid var(--text-accent)"; }
                    btn.addEventListener("mouseenter", () => btn.style.setProperty("background", "var(--background-modifier-hover)"));
                    btn.addEventListener("mouseleave", () => btn.style.setProperty("background", item.colorDot));
                } else if (item.bold) {
                    btn.textContent = "B"; btn.style.fontWeight = "bold";
                    btn.title = item.title || "";
                    if (item.active) { btn.style.background = "var(--interactive-accent)"; btn.style.color = "var(--text-on-accent)"; }
                    btn.addEventListener("mouseenter", () => btn.style.setProperty("background", "var(--background-modifier-hover)"));
                    btn.addEventListener("mouseleave", () => { if (item.active) btn.style.setProperty("background", "var(--interactive-accent)"); else btn.style.removeProperty("background"); });
                } else {
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
                btn.addEventListener("mouseenter", () => btn.style.setProperty("background", "var(--background-modifier-hover)"));
                btn.addEventListener("mouseleave", () => btn.style.removeProperty("background"));
                }
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
        const ctx = { plugin: this, leaf, file, isPinned, safeDetach, x, y };
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
        const cfg = this.editorMenuConfig;
        const prevFolder = this.lastRevealedFolder;
        this.lastRevealedPath = path;
        this.lastRevealedFolder = file.parent ? file.parent.path : "";
        if (cfg && cfg.autoReveal === false) return;
        this.revealTimer = setTimeout(() => {
            this.revealFileByPath(path);
            if (cfg && cfg.autoCollapseFolder === true && prevFolder) {
                const newFolder = file.parent ? file.parent.path : "";
                if (prevFolder !== newFolder && !(newFolder && newFolder.startsWith(prevFolder + "/"))) {
                    setTimeout(() => this._collapseFolderByPath(prevFolder), 50);
                }
            }
        }, 300);
    }

    _collapseFolderByPath(folderPath) {
        if (!folderPath) return;
        const folderEl = document.querySelector('.nav-folder-title[data-path="' + folderPath.replace(/"/g, '\\"') + '"]');
        if (folderEl) {
            const navFolder = folderEl.closest(".nav-folder");
            if (navFolder && !navFolder.classList.contains("is-collapsed")) folderEl.click();
        }
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
        const ctx = { plugin: this, file, files, multi, isFile, allTargets, x, y };
        this.renderMenuByConfig(panel, addRow, this.fileMenuConfig, FILE_ACTIONS, ctx);
        finish();
    }

    renderMenuByConfig(panel, addRow, config, actionTable, ctx) {
        for (const grp of (config.groups || [])) {
            if (grp.hidden) continue;
            const items = [];
            for (const item of (grp.items || [])) {
                if (item.type === "着色") {
                    if (item.op === "bold") {
                        items.push({ bold: true, title: item.label || t("加粗"), active: this.boldSet.has(ctx.file.path), fn: async () => { await this.toggleBold(ctx.file); } });
                    } else if (item.color) {
                        items.push({ colorDot: item.color, title: item.label || item.color, active: this.colorMap[ctx.file.path] === item.color, fn: async () => { const now = this.colorMap[ctx.file.path]; await this.setColor(ctx.file, now === item.color ? null : item.color); } });
                    }
                    continue;
                }
                const a = actionTable[item.action];
                if (!a) continue;
                if (a.available && !a.available(ctx)) continue;
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
                    lbl.style.cssText = "font-size:10px;margin:4px 0 1px 2px;color:var(--text-muted);";
                    const gc = GROUP_COLORS[grp.color];
                    if (gc) {
                        const bar = document.createElement("span");
                        bar.style.cssText = "display:inline-block;width:10px;height:3px;border-radius:2px;background:" + gc.bg + ";margin-right:4px;vertical-align:middle;";
                        lbl.appendChild(bar);
                    }
                    const txt = document.createElement("span");
                    txt.textContent = grp.label;
                    lbl.appendChild(txt);
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

    collapseFileFolder(file) {
        const folder = file.parent;
        if (!folder) { new Notice(t("已在根目录")); return; }
        const folderEl = document.querySelector('.nav-folder-title[data-path="' + folder.path.replace(/"/g, '\\"') + '"]');
        if (folderEl) {
            const navFolder = folderEl.closest(".nav-folder");
            if (navFolder && !navFolder.classList.contains("is-collapsed")) folderEl.click();
        } else {
            new Notice(t("未找到文件夹"));
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
        const trashOpt = this.app.vault.getConfig("trashOption");
        const adapter = this.app.vault.adapter;
        const hasFullPath = adapter && typeof adapter.getFullPath === "function";
        for (const f of files) {
            try {
                if (trashOpt === "none") {
                    await this.app.vault.delete(f, true);
                } else if (trashOpt === "system" && hasFullPath) {
                    const fullPath = adapter.getFullPath(f.path);
                    try {
                        const { shell } = require("electron");
                        await shell.trashItem(fullPath);
                    } catch (e1) {
                        const { exec } = require("child_process");
                        const isFolder = f instanceof TFolder;
                        const psCmd = isFolder
                            ? `Add-Type -AssemblyName Microsoft.VisualBasic; [Microsoft.VisualBasic.FileIO.FileSystem]::DeleteDirectory('${fullPath.replace(/'/g, "''")}','OnlyErrorDialogs','SendToRecycleBin')`
                            : `Add-Type -AssemblyName Microsoft.VisualBasic; [Microsoft.VisualBasic.FileIO.FileSystem]::DeleteFile('${fullPath.replace(/'/g, "''")}','OnlyErrorDialogs','SendToRecycleBin')`;
                        await new Promise((resolve, reject) => {
                            exec(`powershell -NoProfile -Command "${psCmd.replace(/"/g, '\\"')}"`, (err) => err ? reject(err) : resolve());
                        });
                    }
                } else {
                    await this.app.vault.trash(f, false);
                }
                n++;
            }
            catch (e) {
                console.error("[fop] delete error:", e);
                new Notice(t("删除失败：") + (e.message || e));
            }
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
        const allFolders = Array.from(document.querySelectorAll('.nav-folder:not(.is-collapsed) > .nav-folder-title'));
        allFolders.sort((a, b) => {
            const ap = (a.getAttribute("data-path") || "").split("/").length;
            const bp = (b.getAttribute("data-path") || "").split("/").length;
            return bp - ap;
        });
        for (const el of allFolders) {
            const navFolder = el.closest(".nav-folder");
            if (navFolder && !navFolder.classList.contains("is-collapsed")) el.click();
        }
        const explorerScroll = document.querySelector('.workspace-leaf-content[data-type="file-explorer"] .nav-files-container') || document.querySelector('.workspace-leaf-content[data-type="file-explorer"]');
        if (explorerScroll) explorerScroll.scrollTop = 0;
        const label = files.length > 1 ? files.length + t(" 个文件") : '"' + files[0].name + '"';
        this.moveNotice = new Notice(t("移动模式：点击目标文件夹移动 ") + label + t("（Esc 取消）"), 0);
        this.moveClickHandler = (evt) => {
            if (!evt.isTrusted) return;
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
        this.moveHoverExpandHandler = (e) => {
            const titleEl = e.target.closest && e.target.closest(".nav-folder-title");
            if (!titleEl) return;
            const navFolder = titleEl.closest(".nav-folder");
            if (!navFolder) return;
            if (navFolder.classList.contains("is-collapsed")) {
                titleEl.click();
                navFolder.dataset.fopMoveExpanded = "1";
            }
        };
        this.moveHoverCollapseHandler = (e) => {
            const titleEl = e.target.closest && e.target.closest(".nav-folder-title");
            if (!titleEl) return;
            const navFolder = titleEl.closest(".nav-folder");
            if (!navFolder) return;
            if (navFolder.dataset.fopMoveExpanded !== "1") return;
            if (e.relatedTarget && navFolder.contains(e.relatedTarget)) return;
            if (!navFolder.classList.contains("is-collapsed")) {
                titleEl.click();
                delete navFolder.dataset.fopMoveExpanded;
            }
        };
        document.addEventListener("click", this.moveClickHandler, { capture: true });
        document.addEventListener("keydown", this.moveKeyHandler, { capture: true });
        document.addEventListener("mouseover", this.moveHoverExpandHandler, { capture: true });
        document.addEventListener("mouseout", this.moveHoverCollapseHandler, { capture: true });
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
        if (this.moveHoverExpandHandler) { document.removeEventListener("mouseover", this.moveHoverExpandHandler, { capture: true }); this.moveHoverExpandHandler = null; }
        if (this.moveHoverCollapseHandler) { document.removeEventListener("mouseout", this.moveHoverCollapseHandler, { capture: true }); this.moveHoverCollapseHandler = null; }
        const expanded = document.querySelectorAll('.nav-folder[data-fop-move-expanded="1"]');
        for (const navFolder of expanded) {
            const titleEl = navFolder.querySelector(".nav-folder-title");
            if (titleEl && !navFolder.classList.contains("is-collapsed")) titleEl.click();
            delete navFolder.dataset.fopMoveExpanded;
        }
        if (this.moveNotice) { this.moveNotice.hide(); this.moveNotice = null; }
        document.body.classList.remove(MOVE_MODE_BODY_CLASS);
    }

    showEditorMenu(x, y, view, opts = {}) {
        if (!this.editorMenuConfig || this.editorMenuConfig.enabled === false) return;
        if (!opts.skipClose) {
        const existing = document.querySelector(".fop-em-panel:not(.fop-graph-panel):not(.fop-stash-panel)");
        if (existing) existing.remove();
        }

        const cfg = this.editorMenuConfig;
        const panel = document.createElement("div");
        panel.className = "fop-em-panel";
        const bs = this.editorMenuConfig.buttonStyle;
        if (bs && bs !== "flat") panel.classList.add("fop-style-" + bs);
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
                label.style.color = "var(--text-muted)";
                const gc = GROUP_COLORS[grp.color];
                if (gc) {
                    const bar = document.createElement("span");
                    bar.style.cssText = "display:inline-block;width:10px;height:3px;border-radius:2px;background:" + gc.bg + ";margin-right:4px;vertical-align:middle;";
                    label.appendChild(bar);
                } else if (grp.color) {
                    const bar = document.createElement("span");
                    const bg = grp.color.includes("|") ? grp.color.split("|")[0] : grp.color;
                    bar.style.cssText = "display:inline-block;width:10px;height:3px;border-radius:2px;background:" + bg + ";margin-right:4px;vertical-align:middle;";
                    label.appendChild(bar);
                }
                const txt = document.createElement("span");
                txt.textContent = grp.label || "";
                label.appendChild(txt);
                col.appendChild(label);
            }
            const grid = document.createElement("div");
            grid.className = "fop-em-grid";
            for (let ii = 0; ii < grp.items.length; ii++) {
                const item = grp.items[ii];
                grid.appendChild(makeTile(item.icon, item.color || grp.color, item.label || "", async () => {
                    if (opts.onTileClick) { opts.onTileClick(item, grp.id, ii); }
                    else if (item.type === "graph") {
                        const gp = document.querySelector(".fop-graph-panel");
                        if (gp) { gp.remove(); cfg.graphEnabled = false; this.saveEditorMenuConfig(); }
                        else { cfg.graphEnabled = true; cfg.graphDocked = true; this.saveEditorMenuConfig(); this.showLocalGraphPanel(view); }
                    }
                    else if (item.type === "stash") {
                        const sp = document.querySelector(".fop-stash-panel");
                        if (sp) { sp.remove(); cfg.stashEnabled = false; this.saveEditorMenuConfig(); }
                        else { cfg.stashEnabled = true; cfg.stashDocked = true; this.saveEditorMenuConfig(); this.showStashPanel(view); }
                    }
                    else { panel.remove(); this.execEditorItem(item, view); }
                }));
            }
            col.appendChild(grid);
            row.appendChild(col);
        }

        if (!opts.skipClose) {
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
        }

        const body = document.createElement("div");
        body.className = "fop-em-body";
        const leftCol = document.createElement("div");
        leftCol.className = "fop-em-left-col";

        leftCol.appendChild(row);
        body.appendChild(leftCol);
        panel.appendChild(body);



        if (cfg.panelWidth) panel.style.width = cfg.panelWidth + "px";
        if (cfg.panelHeight) { panel.style.height = cfg.panelHeight + "px"; body.style.maxHeight = (cfg.panelHeight - 20) + "px"; body.style.overflowY = "auto"; }

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
                body.style.maxHeight = (nh - 20) + "px";
                body.style.overflowY = "auto";
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
        if (!opts.skipPosition) {
            const rect = panel.getBoundingClientRect();
            panel.style.left = (x + rect.width > window.innerWidth - 10 ? window.innerWidth - rect.width - 10 : x) + "px";
            panel.style.top = (y + rect.height > window.innerHeight - 10 ? window.innerHeight - rect.height - 10 : y) + "px";
        }

        const isBlank = (el) => el === panel || el === row || el.classList.contains("fop-em-row") || el.classList.contains("fop-em-grid") || el.classList.contains("fop-em-group-label") || el.classList.contains("fop-em-body") || el.classList.contains("fop-em-left-col");
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

        if (!opts.skipClose) {
            const close = (e) => { if (e.target.closest?.(".fop-graph-panel")) return; if (e.target.closest?.(".fop-stash-panel")) return; if (!panel.contains(e.target)) { panel.remove(); cleanup(); } };
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
        return panel;
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
        } else if (item.type === "graph") {
            this.showLocalGraphPanel(view);
        } else if (item.type === "stash") {

            this.showStashPanel(view);
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
        let streaming = true;

        const panel = document.createElement("div");
        panel.className = "fop-ai-panel fop-em-panel";
        const bs = cfg.buttonStyle;
        if (bs && bs !== "flat") panel.classList.add("fop-style-" + bs);
        panel.style.cssText = "position:fixed;z-index:10000;width:380px;max-width:92vw;display:flex;flex-direction:column;box-sizing:border-box;overflow:visible;";
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
        body.style.cssText = "flex:1;overflow:auto;padding:10px;min-height:40px;max-height:55vh;font-size:var(--font-ui-small);user-select:text;-webkit-user-select:text;white-space:pre-wrap;word-break:break-word;line-height:1.5;";
        body.textContent = t("生成中…");
        panel.appendChild(body);
        const foot = document.createElement("div");
        foot.style.cssText = "display:flex;gap:6px;padding:6px 10px;border-top:1px solid var(--background-modifier-border);flex-wrap:wrap;";
        const mkBtn = (text, fn) => {
            const b = foot.createEl("button", { text, attr: { style: "font-size:var(--font-ui-smaller);padding:2px 10px;" } });
            b.disabled = true; b.onclick = () => { if (result) fn(); };
            return b;
        };
        const copyBtn = mkBtn(t("复制"), () => { navigator.clipboard.writeText(result).then(() => new Notice(t("已复制"))).catch(() => {}); });
        const insBtn = mkBtn(t("插入"), () => { try { const ed = view.editor; if (ed) { ed.focus(); ed.replaceRange("\n\n" + result, ed.getCursor("to")); } } catch (e) {} });
        const repBtn = mkBtn(t("替换选中"), () => { try { const ed = view.editor; if (ed) { ed.focus(); ed.replaceSelection(result); } } catch (e) {} });
        const newFileBtn = mkBtn(t("新建文件"), () => { this.aiCreateNewFile(result, sel, view, foot, panel, closePanel); });

        panel.appendChild(foot);
        const resizeHandle = document.createElement("div");
        resizeHandle.className = "fop-em-resize";
        resizeHandle.title = t("拖动调整面板宽高");
        panel.appendChild(resizeHandle);

        document.body.appendChild(panel);
        const hasSavedH = !!cfg.aiPanelHeight;
        if (cfg.aiPanelWidth) { panel.style.width = cfg.aiPanelWidth + "px"; }
        if (hasSavedH) { panel.style.height = cfg.aiPanelHeight + "px"; body.style.maxHeight = "none"; }
        const px = cfg.aiPanelX != null ? cfg.aiPanelX : window.innerWidth - 400;
        const py = cfg.aiPanelY != null ? cfg.aiPanelY : 80;
        panel.style.left = Math.max(10, Math.min(px, window.innerWidth - panel.offsetWidth - 10)) + "px";
        panel.style.top = Math.max(10, Math.min(py, window.innerHeight - panel.offsetHeight - 10)) + "px";
        if (!hasSavedH) {
            const availH = window.innerHeight - panel.getBoundingClientRect().top - 10;
            const nonBody = panel.offsetHeight - body.offsetHeight;
            body.style.maxHeight = Math.max(80, availH - nonBody) + "px";
        }

        let drag = false, dgx = 0, dgy = 0;
        header.addEventListener("mousedown", (e) => {
            if (e.target === closeBtn) return;
            drag = true; dgx = e.clientX - panel.getBoundingClientRect().left; dgy = e.clientY - panel.getBoundingClientRect().top;
            e.preventDefault();
        });
        const dm = (e) => { if (!drag) return; let nl = e.clientX - dgx, nt = e.clientY - dgy; nl = Math.max(10, Math.min(nl, window.innerWidth - panel.offsetWidth - 10)); nt = Math.max(10, Math.min(nt, window.innerHeight - 60)); panel.style.left = nl + "px"; panel.style.top = nt + "px"; if (!hasSavedH) { const availH = window.innerHeight - nt - 10; const nonBody = panel.offsetHeight - body.offsetHeight; body.style.maxHeight = Math.max(80, availH - nonBody) + "px"; } };
        const du = () => { if (drag) { drag = false; cfg.aiPanelX = parseInt(panel.style.left); cfg.aiPanelY = parseInt(panel.style.top); this.saveEditorMenuConfig(); } };
        document.addEventListener("mousemove", dm);
        document.addEventListener("mouseup", du);
        const closePanel = () => { panel.remove(); document.removeEventListener("mousemove", dm); document.removeEventListener("mouseup", du); document.removeEventListener("mousemove", rzm); document.removeEventListener("mouseup", rzu); document.removeEventListener("keydown", escH); };
        const escH = (e) => { if (e.key === "Escape") closePanel(); };
        document.addEventListener("keydown", escH);
        closeBtn.onclick = closePanel;
        let rzing = false, rsx = 0, rsy = 0, rsw = 0, rsh = 0;
        resizeHandle.addEventListener("mousedown", (e) => {
            e.preventDefault(); e.stopPropagation();
            rzing = true; rsx = e.clientX; rsy = e.clientY;
            rsw = panel.offsetWidth; rsh = panel.offsetHeight;
        });
        const rzm = (e) => {
            if (!rzing) return;
            const nw = Math.max(200, Math.min(window.innerWidth - 20, rsw + (e.clientX - rsx)));
            const nh = Math.max(100, Math.min(window.innerHeight - 20, rsh + (e.clientY - rsy)));
            panel.style.width = nw + "px";
            panel.style.height = nh + "px";
            body.style.maxHeight = "none";
        };
        const rzu = () => { if (rzing) { rzing = false; cfg.aiPanelWidth = panel.offsetWidth; cfg.aiPanelHeight = panel.offsetHeight; this.saveEditorMenuConfig(); } };
        document.addEventListener("mousemove", rzm);
        document.addEventListener("mouseup", rzu);

        this.callAIStream(fullPrompt, (chunk) => {
            if (streaming) {
                if (body.textContent === t("生成中…")) body.textContent = "";
                result += chunk;
                body.textContent = result;
                body.scrollTop = body.scrollHeight;
            }
        }).then(() => {
            streaming = false;
            result = result.trim();
            if (!result) { body.textContent = t("AI 返回为空"); return; }
            body.textContent = result;
            copyBtn.disabled = insBtn.disabled = repBtn.disabled = newFileBtn.disabled = false;
        }).catch((err) => {
            streaming = false;
            body.textContent = t("AI 返回失败：") + (err && err.message ? err.message : err);
        });
    }

    async callAIStream(prompt, onChunk) {
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
                body: JSON.stringify({ model, messages: [{ role: "user", content: prompt }], max_tokens: 3000, temperature: conf.temperature != null && conf.temperature !== "" ? Number(conf.temperature) : 0.7, stream: true }),
                signal: controller.signal,
            });
            clearTimeout(timeoutId);
            if (!response.ok) {
                const errText = await response.text();
                throw new Error(t("AI 请求失败：") + response.status + " - " + String(errText).slice(0, 200));
            }
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let buffer = "";
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split("\n");
                buffer = lines.pop() || "";
                for (const line of lines) {
                    const trimmed = line.trim();
                    if (!trimmed || !trimmed.startsWith("data:")) continue;
                    const data = trimmed.slice(5).trim();
                    if (data === "[DONE]") return;
                    try {
                        const json = JSON.parse(data);
                        const delta = json.choices && json.choices[0] && json.choices[0].delta;
                        if (delta && delta.content) onChunk(delta.content);
                    } catch (e) {}
                }
            }
        } catch (e) {
            clearTimeout(timeoutId);
            if (e && e.name === "AbortError") throw new Error(t("AI 请求超时（60s）"));
            throw e;
        }
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

    showLocalGraphPanel(view) {
        const existing = document.querySelector(".fop-graph-panel");
        if (existing) { if (existing._fopCleanup) existing._fopCleanup(); else existing.remove(); }
        const file = view && view.file;
        if (!file) { new Notice(t("无活动文件")); return; }
        const cfg = this.editorMenuConfig;
        const mc = this.app.metadataCache;
        const vault = this.app.vault;

        const outgoing = [];
        const fileCache = mc.getCache(file.path);
        for (const link of (fileCache?.links || [])) {
            const linkPath = link.link.split("#")[0];
            const tf = mc.getFirstLinkpathDest(linkPath, file.path);
            if (tf && tf instanceof TFile && !outgoing.some(f => f.path === tf.path)) outgoing.push(tf);
        }
        const incoming = [];
        const rl = mc.resolvedLinks || {};
        for (const srcPath of Object.keys(rl)) {
            if (rl[srcPath] && rl[srcPath][file.path]) {
                const sf = vault.getAbstractFileByPath(srcPath);
                if (sf && sf instanceof TFile) incoming.push(sf);
            }
        }
        if (outgoing.length === 0 && incoming.length === 0) { new Notice(t("未找到关联笔记")); return; }

        const w = cfg.graphPanelWidth || 300, h = cfg.graphPanelHeight || 400;
        const panel = document.createElement("div");
        panel.className = "fop-graph-panel fop-em-panel";
        const bs = cfg.buttonStyle;
        if (bs && bs !== "flat") panel.classList.add("fop-style-" + bs);
        panel.style.cssText = "position:fixed;z-index:9999;width:" + w + "px;max-height:" + h + "px;max-width:92vw;display:flex;flex-direction:column;box-sizing:border-box;overflow:visible;";
        const header = document.createElement("div");
        header.style.cssText = "display:flex;align-items:center;gap:6px;padding:6px 10px;cursor:grab;border-bottom:1px solid var(--background-modifier-border);";
        const ttl = document.createElement("div");
        ttl.textContent = t("局部关系列表");
        ttl.style.cssText = "font-weight:600;flex:1;font-size:var(--font-ui-small);";
        header.appendChild(ttl);

        const closeBtn = document.createElement("div");
        closeBtn.textContent = "✕";
        closeBtn.style.cssText = "cursor:pointer;padding:0 6px;color:var(--text-error);display:none;font-weight:700;";
        header.appendChild(closeBtn);
        panel.appendChild(header);

        const content = document.createElement("div");
        content.style.cssText = "flex:1;min-height:0;overflow-y:auto;padding:6px 10px;";
        const renderList = (title, files) => {
            if (files.length === 0) return;
            const sec = content.createEl("div", { attr: { style: "margin-bottom:10px;" } });
            sec.createEl("div", { text: title + " (" + files.length + ")", attr: { style: "font-size:var(--font-ui-smaller);color:var(--text-muted);margin-bottom:4px;font-weight:600;" } });
            for (const f of files) {
                const item = sec.createEl("div", { text: f.basename, attr: { style: "padding:3px 6px;cursor:pointer;border-radius:4px;font-size:var(--font-ui-small);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" } });
                item.addEventListener("mouseenter", () => item.style.background = "var(--background-modifier-hover)");
                item.addEventListener("mouseleave", () => item.style.background = "");
                item.addEventListener("click", () => this.app.workspace.getLeaf().openFile(f));
            }
        };
        renderList(t("提及文档"), outgoing);
        renderList(t("被提及文档"), incoming);
        panel.appendChild(content);

        const resizeHandle = document.createElement("div");
        resizeHandle.style.cssText = "position:absolute;right:0;bottom:0;width:12px;height:12px;cursor:nwse-resize;z-index:10;border-top-left-radius:4px;background:var(--background-modifier-border);";
        panel.appendChild(resizeHandle);
        let rz = false, rzx = 0, rzy = 0, rzw = 0, rzh = 0;
        resizeHandle.addEventListener("mousedown", (e) => {
            e.preventDefault(); e.stopPropagation();
            rz = true; rzx = e.clientX; rzy = e.clientY; rzw = panel.offsetWidth; rzh = panel.offsetHeight;
        });
        const rzMove = (e) => {
            if (!rz) return;
            const nw = Math.max(150, rzw + (e.clientX - rzx));
            const nh = Math.max(150, rzh + (e.clientY - rzy));
            panel.style.width = nw + "px";
            panel.style.height = nh + "px";
            panel.style.maxHeight = nh + "px";
            content.style.maxHeight = Math.max(100, nh - header.offsetHeight) + "px";
        };
        const rzUp = () => {
            if (rz) {
                rz = false;
                cfg.graphPanelWidth = panel.offsetWidth;
                cfg.graphPanelHeight = panel.offsetHeight;
                this.saveEditorMenuConfig();
            }
        };
        document.addEventListener("mousemove", rzMove);
        document.addEventListener("mouseup", rzUp);

        document.body.appendChild(panel);
        if (cfg.graphOpacity != null) panel.style.opacity = cfg.graphOpacity.toString();
        panel.addEventListener("wheel", (e) => {
            if (!e.ctrlKey) return;
            e.preventDefault();
            let opa = parseFloat(panel.style.opacity || "1");
            opa = Math.max(0.2, Math.min(1, opa + (e.deltaY < 0 ? 0.05 : -0.05)));
            panel.style.opacity = opa.toString();
            cfg.graphOpacity = opa; this.saveEditorMenuConfig();
        }, { passive: false });
        let docked = cfg.graphDocked !== false;
        const updatePosition = () => {
            const menuPanel = document.querySelector(".fop-em-panel:not(.fop-graph-panel):not(.fop-stash-panel):not(.file-ops-plus-menu)");
            if (docked && menuPanel) {
                const mr = menuPanel.getBoundingClientRect();
                const side = cfg.graphDockSide || "right";
                if (side === "right") {
                    panel.style.left = (mr.right + 6) + "px";
                    if (mr.right + 6 + panel.offsetWidth > window.innerWidth - 10) panel.style.left = (mr.left - panel.offsetWidth - 6) + "px";
                } else {
                    panel.style.left = (mr.left - panel.offsetWidth - 6) + "px";
                    if (parseInt(panel.style.left) < 10) panel.style.left = (mr.right + 6) + "px";
                }
                panel.style.top = mr.top + "px";
            } else {
                const px = cfg.graphPanelX != null ? cfg.graphPanelX : window.innerWidth - w - 20;
                const py = cfg.graphPanelY != null ? cfg.graphPanelY : 80;
                panel.style.left = Math.max(10, Math.min(px, window.innerWidth - panel.offsetWidth - 10)) + "px";
                panel.style.top = Math.max(10, Math.min(py, window.innerHeight - panel.offsetHeight - 10)) + "px";
            }
            panel.style.height = Math.max(150, Math.min(h, window.innerHeight - parseInt(panel.style.top) - 10)) + "px";
            content.style.maxHeight = Math.max(100, parseInt(panel.style.height) - header.offsetHeight) + "px";
        };
        updatePosition();

        const checkMenu = () => {
            const menuPanel = document.querySelector(".fop-em-panel:not(.fop-graph-panel):not(.fop-stash-panel):not(.file-ops-plus-menu)");
            if (docked && !menuPanel) panel.style.display = "none";
            else if (docked && menuPanel) { panel.style.display = ""; updatePosition(); }
        };
        const observer = new MutationObserver(checkMenu);
        observer.observe(document.body, { childList: true, subtree: false });
        checkMenu();

        let drag = false, dgx = 0, dgy = 0, dragged = false;
        header.addEventListener("mousedown", (e) => {
            if (e.target === closeBtn) return;
            drag = true; dragged = false; dgx = e.clientX - panel.getBoundingClientRect().left; dgy = e.clientY - panel.getBoundingClientRect().top;
            e.preventDefault();
        });
        const dm = (e) => { if (!drag) return; dragged = true; panel.style.left = (e.clientX - dgx) + "px"; panel.style.top = (e.clientY - dgy) + "px"; };
        const du = () => {
            if (drag) {
                drag = false;
                if (dragged) {
                    docked = false; cfg.graphDocked = false;
                    closeBtn.style.display = "";
                    cfg.graphPanelX = parseInt(panel.style.left); cfg.graphPanelY = parseInt(panel.style.top);
                    this.saveEditorMenuConfig();
                }
            }
        };
        document.addEventListener("mousemove", dm);
        document.addEventListener("mouseup", du);
        const escH = (e) => { if (e.key === "Escape" && !docked) closePanel(); };
        document.addEventListener("keydown", escH);
        const closePanel = () => { observer.disconnect(); panel.remove(); document.removeEventListener("mousemove", dm); document.removeEventListener("mouseup", du); document.removeEventListener("keydown", escH); document.removeEventListener("mousemove", rzMove); document.removeEventListener("mouseup", rzUp); this.app.workspace.offref(leafRef); };
        panel._fopCleanup = closePanel;
        closeBtn.onclick = () => { cfg.graphEnabled = false; this.saveEditorMenuConfig(); closePanel(); };
        let lastPath = file.path;
        const leafHandler = () => {
            if (!cfg.graphEnabled) return;
            const av = this.app.workspace.getActiveViewOfType(MarkdownView);
            const nf = av && av.file;
            if (!nf || nf.path === lastPath) return;
            lastPath = nf.path;
            this.showLocalGraphPanel(av);
        };
        const leafRef = this.app.workspace.on("active-leaf-change", leafHandler);
    }

    showStashPanel(view) {
        const existing = document.querySelector(".fop-stash-panel");
        if (existing) { if (existing._fopCleanup) existing._fopCleanup(); else existing.remove(); }
        const cfg = this.editorMenuConfig;
        const items = cfg.stashItems || [];

        const w = cfg.stashPanelWidth || 300, h = cfg.stashPanelHeight || 400;
        const panel = document.createElement("div");
        panel.className = "fop-stash-panel fop-em-panel";
        const bs = cfg.buttonStyle;
        if (bs && bs !== "flat") panel.classList.add("fop-style-" + bs);
        panel.style.cssText = "position:fixed;z-index:9999;width:" + w + "px;max-height:" + h + "px;max-width:92vw;display:flex;flex-direction:column;box-sizing:border-box;overflow:visible;";
        const header = document.createElement("div");
        header.style.cssText = "display:flex;align-items:center;gap:6px;padding:6px 10px;cursor:grab;border-bottom:1px solid var(--background-modifier-border);";
        const ttl = document.createElement("div");
        ttl.textContent = t("暂存列表") + " (" + items.length + ")";
        ttl.style.cssText = "font-weight:600;flex:1;font-size:var(--font-ui-small);";
        header.appendChild(ttl);
        const addBtn = document.createElement("div");
        addBtn.textContent = "+";
        addBtn.style.cssText = "cursor:pointer;padding:0 6px;color:var(--text-accent);font-weight:700;font-size:var(--font-ui-small);user-select:none;";
        addBtn.title = t("添加选中文本到暂存");
        addBtn.addEventListener("click", async (e) => {
            e.stopPropagation();
            const av = this.app.workspace.getActiveViewOfType(MarkdownView);
            const sel = av && av.editor ? av.editor.getSelection() : "";
            let text = sel;
            if (!text) { try { text = await navigator.clipboard.readText(); } catch (err) {} }
            if (!text) { new Notice(t("无选中文本或剪贴板内容")); return; }
            cfg.stashItems = cfg.stashItems || [];
            cfg.stashItems.push({ text, ts: Date.now() });
            this.saveEditorMenuConfig();
            closePanel(); this.showStashPanel(view);
        });
        header.appendChild(addBtn);
        const clearBtn = document.createElement("div");
        clearBtn.textContent = "🗑";
        clearBtn.style.cssText = "cursor:pointer;padding:0 6px;color:var(--text-warning);font-size:var(--font-ui-smaller);user-select:none;";
        clearBtn.title = t("清空暂存");
        clearBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            if (cfg.stashItems && cfg.stashItems.length > 0) {
                cfg.stashItems = [];
                this.saveEditorMenuConfig();
                closePanel(); this.showStashPanel(view);
            }
        });
        header.appendChild(clearBtn);
        const closeBtn = document.createElement("div");
        closeBtn.textContent = "✕";
        closeBtn.style.cssText = "cursor:pointer;padding:0 6px;color:var(--text-error);display:none;font-weight:700;";
        header.appendChild(closeBtn);
        panel.appendChild(header);

        const content = document.createElement("div");
        content.style.cssText = "flex:1;min-height:0;overflow-y:auto;padding:6px 10px;";
        if (items.length === 0) {
            content.createEl("div", { text: t("暂存为空"), attr: { style: "color:var(--text-muted);text-align:center;padding:20px 0;" } });
        }
        const allBodies = [], allChevrons = [];
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const sec = content.createEl("div", { attr: { style: "margin-bottom:6px;border:1px solid var(--background-modifier-border);border-radius:4px;overflow:hidden;" } });
            const head = sec.createEl("div", { attr: { style: "display:flex;align-items:center;gap:4px;padding:4px 6px;cursor:pointer;background:var(--background-modifier-form-field);" } });
            const chevron = head.createEl("span", { text: "▶", attr: { style: "font-size:10px;color:var(--text-muted);user-select:none;" } });
            const preview = item.text.slice(0, 40).replace(/\n/g, " ");
            const label = head.createEl("span", { text: preview + (item.text.length > 40 ? "…" : ""), attr: { style: "flex:1;font-size:var(--font-ui-smaller);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" } });
            const delBtn = head.createEl("span", { text: "✕", attr: { style: "color:var(--text-error);cursor:pointer;padding:0 4px;font-size:var(--font-ui-smaller);user-select:none;" } });
            delBtn.addEventListener("click", (e) => { e.stopPropagation(); cfg.stashItems.splice(i, 1); this.saveEditorMenuConfig(); closePanel(); this.showStashPanel(view); });
            const body = sec.createEl("div", { attr: { style: "display:none;padding:6px 8px;font-size:var(--font-ui-small);white-space:pre-wrap;word-break:break-all;max-height:200px;overflow-y:auto;background:var(--background-primary);" } });
            body.textContent = item.text;
            allBodies.push(body); allChevrons.push(chevron);
            sec.addEventListener("mouseenter", () => {
                for (let j = 0; j < allBodies.length; j++) {
                    if (j === i) { allBodies[j].style.display = ""; allChevrons[j].textContent = "▼"; }
                    else { allBodies[j].style.display = "none"; allChevrons[j].textContent = "▶"; }
                }
            });
            sec.addEventListener("mouseleave", () => { body.style.display = "none"; chevron.textContent = "▶"; });
            body.addEventListener("click", () => {
                const av = this.app.workspace.getActiveViewOfType(MarkdownView);
                if (av && av.editor) { av.editor.replaceSelection(item.text); new Notice(t("已插入")); }
            });
        }
        panel.appendChild(content);

        const resizeHandle = document.createElement("div");
        resizeHandle.style.cssText = "position:absolute;right:0;bottom:0;width:12px;height:12px;cursor:nwse-resize;z-index:10;border-top-left-radius:4px;background:var(--background-modifier-border);";
        panel.appendChild(resizeHandle);
        let rz = false, rzx = 0, rzy = 0, rzw = 0, rzh = 0;
        resizeHandle.addEventListener("mousedown", (e) => {
            e.preventDefault(); e.stopPropagation();
            rz = true; rzx = e.clientX; rzy = e.clientY; rzw = panel.offsetWidth; rzh = panel.offsetHeight;
        });
        const rzMove = (e) => {
            if (!rz) return;
            const nw = Math.max(150, rzw + (e.clientX - rzx));
            const nh = Math.max(150, rzh + (e.clientY - rzy));
            panel.style.width = nw + "px";
            panel.style.height = nh + "px";
            panel.style.maxHeight = nh + "px";
            content.style.maxHeight = Math.max(100, nh - header.offsetHeight) + "px";
        };
        const rzUp = () => {
            if (rz) {
                rz = false;
                cfg.stashPanelWidth = panel.offsetWidth;
                cfg.stashPanelHeight = panel.offsetHeight;
                this.saveEditorMenuConfig();
            }
        };
        document.addEventListener("mousemove", rzMove);
        document.addEventListener("mouseup", rzUp);

        document.body.appendChild(panel);
        if (cfg.stashOpacity != null) panel.style.opacity = cfg.stashOpacity.toString();
        panel.addEventListener("wheel", (e) => {
            if (!e.ctrlKey) return;
            e.preventDefault();
            let opa = parseFloat(panel.style.opacity || "1");
            opa = Math.max(0.2, Math.min(1, opa + (e.deltaY < 0 ? 0.05 : -0.05)));
            panel.style.opacity = opa.toString();
            cfg.stashOpacity = opa; this.saveEditorMenuConfig();
        }, { passive: false });
        let docked = cfg.stashDocked !== false;
        const updatePosition = () => {
            const menuPanel = document.querySelector(".fop-em-panel:not(.fop-graph-panel):not(.fop-stash-panel):not(.file-ops-plus-menu)");
            const graphPanel = document.querySelector(".fop-graph-panel");
            if (docked && menuPanel) {
                const mr = menuPanel.getBoundingClientRect();
                const side = cfg.stashDockSide || "right";
                if (side === "right") {
                    panel.style.left = (mr.right + 6) + "px";
                    if (mr.right + 6 + panel.offsetWidth > window.innerWidth - 10) panel.style.left = (mr.left - panel.offsetWidth - 6) + "px";
                } else {
                    panel.style.left = (mr.left - panel.offsetWidth - 6) + "px";
                    if (parseInt(panel.style.left) < 10) panel.style.left = (mr.right + 6) + "px";
                }
                let topY = mr.top;
                if (graphPanel && graphPanel.style.display !== "none") { const gr = graphPanel.getBoundingClientRect(); topY = gr.bottom + 6; }
                panel.style.top = topY + "px";
            } else {
                const px = cfg.stashPanelX != null ? cfg.stashPanelX : window.innerWidth - w - 20;
                const py = cfg.stashPanelY != null ? cfg.stashPanelY : 80;
                panel.style.left = Math.max(10, Math.min(px, window.innerWidth - panel.offsetWidth - 10)) + "px";
                panel.style.top = Math.max(10, Math.min(py, window.innerHeight - panel.offsetHeight - 10)) + "px";
            }
            panel.style.height = Math.max(150, Math.min(h, window.innerHeight - parseInt(panel.style.top) - 10)) + "px";
            content.style.maxHeight = Math.max(100, parseInt(panel.style.height) - header.offsetHeight) + "px";
        };
        updatePosition();

        const checkMenu = () => {
            const menuPanel = document.querySelector(".fop-em-panel:not(.fop-graph-panel):not(.fop-stash-panel):not(.file-ops-plus-menu)");
            if (docked && !menuPanel) panel.style.display = "none";
            else if (docked && menuPanel) { panel.style.display = ""; requestAnimationFrame(() => updatePosition()); }
        };
        const observer = new MutationObserver(checkMenu);
        observer.observe(document.body, { childList: true, subtree: false });
        checkMenu();

        let drag = false, dgx = 0, dgy = 0, dragged = false;
        header.addEventListener("mousedown", (e) => {
            if (e.target === closeBtn || e.target === addBtn || e.target === clearBtn) return;
            drag = true; dragged = false; dgx = e.clientX - panel.getBoundingClientRect().left; dgy = e.clientY - panel.getBoundingClientRect().top;
            e.preventDefault();
        });
        const dm = (e) => { if (!drag) return; dragged = true; panel.style.left = (e.clientX - dgx) + "px"; panel.style.top = (e.clientY - dgy) + "px"; };
        const du = () => {
            if (drag) {
                drag = false;
                if (dragged) {
                    docked = false; cfg.stashDocked = false;
                    closeBtn.style.display = "";
                    cfg.stashPanelX = parseInt(panel.style.left); cfg.stashPanelY = parseInt(panel.style.top);
                    this.saveEditorMenuConfig();
                }
            }
        };
        document.addEventListener("mousemove", dm);
        document.addEventListener("mouseup", du);
        const escH = (e) => { if (e.key === "Escape" && !docked) closePanel(); };
        document.addEventListener("keydown", escH);
        const closePanel = () => { observer.disconnect(); panel.remove(); document.removeEventListener("mousemove", dm); document.removeEventListener("mouseup", du); document.removeEventListener("keydown", escH); document.removeEventListener("mousemove", rzMove); document.removeEventListener("mouseup", rzUp); };
        panel._fopCleanup = closePanel;
        closeBtn.onclick = () => { cfg.stashEnabled = false; this.saveEditorMenuConfig(); closePanel(); };
    }

    async aiCreateNewFile(content, sel, view, foot, panel, closePanel) {
        try {
            const file = view && view.file;
            const editor = view && view.editor;
            const now = Date.now();
            const defaultName = "AI-" + new Date(now).toISOString().slice(0, 10) + "-" + (now % 100000);
            const origChildren = Array.from(foot.childNodes);
            foot.empty();
            foot.style.position = "relative";
            let pop = null, cache = null;
            const inputEl = foot.createEl("input", { type: "text", value: defaultName, attr: { style: "flex:1;min-width:0;padding:4px 8px;border:1px solid var(--interactive-accent);border-radius:4px;background:var(--background-primary);color:var(--text-normal);font-size:var(--font-ui-small);box-sizing:border-box;" } });
            const togBtn = foot.createEl("button", { text: "▾", attr: { style: "padding:4px 8px;border:1px solid var(--background-modifier-border);border-radius:4px;cursor:pointer;background:var(--background-primary);color:var(--text-normal);font-size:var(--font-ui-small);" } });
            togBtn.title = t("候选名称");
            const aiBtn = foot.createEl("button", { text: "✨", attr: { style: "padding:4px 8px;border:1px solid var(--background-modifier-border);border-radius:4px;cursor:pointer;background:var(--background-primary);color:var(--text-normal);font-size:var(--font-ui-small);" } });
            aiBtn.title = t("AI 生成候选");
            const okBtn = foot.createEl("button", { text: "✓", attr: { style: "padding:4px 10px;border:1px solid var(--interactive-accent);border-radius:4px;cursor:pointer;background:var(--interactive-accent);color:var(--text-on-accent);font-size:var(--font-ui-small);font-weight:700;" } });
            okBtn.title = t("确认");
            const noBtn = foot.createEl("button", { text: "✕", attr: { style: "padding:4px 8px;border:1px solid var(--background-modifier-border);border-radius:4px;cursor:pointer;background:var(--background-primary);color:var(--text-error);font-size:var(--font-ui-small);" } });
            noBtn.title = t("取消");
            const closePop = () => { if (pop) { pop.remove(); pop = null; } };
            const openPop = () => {
                closePop();
                if (!cache || cache.length === 0) return;
                pop = document.createElement("div");
                pop.style.cssText = "position:absolute;left:6px;right:6px;bottom:100%;margin-bottom:4px;background:var(--background-primary);border:1px solid var(--background-modifier-border);border-radius:6px;box-shadow:0 4px 14px rgba(0,0,0,.18);padding:4px;max-height:132px;overflow-y:auto;z-index:2;";
                for (const n of cache) {
                    const b = pop.createEl("button", { text: n, attr: { style: "display:block;width:100%;text-align:left;padding:4px 8px;margin:1px 0;font-size:var(--font-ui-small);border:0;border-radius:4px;cursor:pointer;background:none;color:var(--text-normal);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" } });
                    b.title = n;
                    if (n === inputEl.value) b.style.background = "var(--background-modifier-hover)";
                    b.onmouseenter = () => b.style.background = "var(--background-modifier-hover)";
                    b.onmouseleave = () => b.style.background = (n === inputEl.value) ? "var(--background-modifier-hover)" : "none";
                    b.onclick = () => { inputEl.value = n; closePop(); inputEl.focus(); inputEl.setSelectionRange(0, 0); };
                    pop.appendChild(b);
                }
                foot.appendChild(pop);
            };
            const restoreFoot = () => {
                closePop();
                foot.empty();
                foot.style.position = "";
                for (const child of origChildren) foot.appendChild(child);
            };
            inputEl.focus();
            inputEl.select();
            const doCreate = async () => {
                let name = inputEl.value.trim();
                if (!name) return;
                if (!name.endsWith(".md")) name += ".md";
                let blockRefLink = "";
                if (file && editor) {
                    try {
                        const toLine = editor.getCursor("to").line;
                        const lineContent = editor.getLine(toLine);
                        const blockId = "fop" + Date.now().toString(36);
                        editor.replaceRange(" ^" + blockId, { line: toLine, ch: lineContent.length });
                        blockRefLink = "[[" + file.basename + "#^" + blockId + "]]";
                    } catch (e) {}
                }
                const embedRefLink = blockRefLink ? "!" + blockRefLink : "";
                const tpl = this.editorMenuConfig.newFileTemplate || ("{{blockRef}}\n{{embedRef}}\n{{aiResult}}");
                const fileContent = tpl
                    .replace(/\{\{blockRef\}\}/g, blockRefLink)
                    .replace(/\{\{embedRef\}\}/g, embedRefLink)
                    .replace(/\{\{aiResult\}\}/g, content);
                try {
                    const f = await this.app.vault.create(name, fileContent);
                    closePanel();
                    this.app.workspace.getLeaf().openFile(f);
                    new Notice(t("已创建文件：") + name);
                } catch (e) { new Notice(t("创建文件失败：") + e.message); }
            };
            okBtn.onclick = doCreate;
            noBtn.onclick = restoreFoot;
            togBtn.onclick = () => { if (pop) closePop(); else if (cache) openPop(); else aiBtn.click(); };
            inputEl.addEventListener("keydown", (e) => {
                if (e.key === "Enter") { e.preventDefault(); doCreate(); }
                else if (e.key === "Escape") { if (pop) closePop(); else restoreFoot(); }
                else if (e.key === "ArrowDown" || e.key === "ArrowUp") { e.preventDefault(); openPop(); }
            });
            aiBtn.onclick = async () => {
                aiBtn.textContent = "…"; aiBtn.disabled = true;
                const oldVal = inputEl.value;
                inputEl.disabled = true; inputEl.value = t("命名中…");
                try {
                    const res = await this.callAI("Based on the following AI-generated content, suggest 3 short file names (without .md extension), one per line, no numbering:\n\n" + content.slice(0, 500));
                    const names = res.split("\n").map(n => n.trim().replace(/^\d+[.)]\s*/, "")).filter(n => n && n.length <= 50).slice(0, 5);
                    cache = names;
                    inputEl.disabled = false; inputEl.value = oldVal;
                    if (names.length > 0) openPop();
                    else new Notice(t("AI 返回为空"));
                } catch (e) { inputEl.disabled = false; inputEl.value = oldVal; new Notice(t("AI 返回失败：") + (e && e.message ? e.message : e)); }
                aiBtn.textContent = "✨"; aiBtn.disabled = false;
            };
        } catch (e) { new Notice(t("创建文件失败：") + e.message); }
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


        const root = document.createElement("div");
        root.style.cssText = "flex:1;overflow:auto;padding:0 12px 12px;min-height:0;";
        body.appendChild(root);

        panel.appendChild(body);


        const handle = document.createElement("div");
        handle.style.cssText = "position:absolute;right:0;bottom:0;width:16px;height:16px;cursor:nwse-resize;z-index:10;background:linear-gradient(135deg,transparent 50%,var(--text-muted) 50%);";
        handle.title = t("拖动调整大小");
        panel.appendChild(handle);
        document.body.appendChild(panel);

        let attachedMenu = null;
        const syncAttachedMenuPos = () => {
            if (!attachedMenu) return;
            const sr = panel.getBoundingClientRect();
            const mr = attachedMenu.getBoundingClientRect();
            attachedMenu.style.left = Math.max(10, sr.left - mr.width - 4) + "px";
            attachedMenu.style.top = sr.top + "px";
        };
        const showAttachedMenu = () => {
            const view = this.app.workspace.getActiveViewOfType(MarkdownView);

            if (attachedMenu) attachedMenu.remove();
            attachedMenu = this.showEditorMenu(0, 0, view, {
                skipClose: true, skipPosition: true,
                onTileClick: (item, groupId, itemIdx) => {
                    if (!groupId) return;
                    const ec = this.editorMenuConfig; ec.collapsedState = ec.collapsedState || {};
                    const wasCol = ec.collapsedState[groupId] === true;
                    if (wasCol || ec.accordionMode) {
                        ec.collapsedState[groupId] = false;
                        if (ec.accordionMode) { for (const g2 of ec.groups) { if (g2.id !== groupId) ec.collapsedState[g2.id] = true; } }
                        this.saveEditorMenuConfig(); render();
                    }
                    const tb = root.querySelector('[data-group-id="' + groupId + '"]');
                    if (tb) {
                        let o = 0, el = tb; while (el && el !== root) { o += el.offsetTop; el = el.offsetParent; }
                        root.scrollTop = Math.max(0, o - 8);
                        if (itemIdx != null) {
                            const ir = tb.querySelector('[data-item-idx="' + itemIdx + '"]');
                            if (ir) { ir.style.transition = "background .3s"; ir.style.background = "var(--interactive-accent)"; ir.style.borderRadius = "4px"; setTimeout(() => ir.style.background = "", 1500); }
                        }
                    }
                }
            });
            syncAttachedMenuPos();
        };
        const hideAttachedMenu = () => { if (attachedMenu) { attachedMenu.remove(); attachedMenu = null; } };
        const showAttachedFileTabMenu = (config, actionTable) => {
            if (attachedMenu) attachedMenu.remove();
            const mp = document.createElement("div");
            mp.className = "fop-em-panel";

            const bs = this.editorMenuConfig.buttonStyle;
            if (bs && bs !== "flat") mp.classList.add("fop-style-" + bs);
            const row = document.createElement("div");
            row.className = "fop-em-row";
            const makeFTTile = (iconName, color, title, groupId, itemIdx, label) => {
                const tile = document.createElement("div");
                tile.className = "fop-em-tile";
                tile.style.whiteSpace = "nowrap";
                tile.style.gap = "4px";
                const c = color || "neutral";
                if (GROUP_COLORS[c]) tile.dataset.c = c;
                else if (c.includes("|")) { const parts = c.split("|"); tile.style.background = parts[0]; tile.style.color = parts[1] || autoContrast(parts[0]); }
                else if (c && c !== "neutral") { tile.style.background = c; tile.style.color = autoContrast(c); }
                tile.title = title || "";
                const raw = iconName || "";
                if (raw.includes("<svg")) {
                    const wrapper = document.createElement("span");
                    wrapper.style.cssText = "display:inline-flex;align-items:center;width:14px;height:14px;";
                    wrapper.innerHTML = raw;
                    const svg = wrapper.querySelector("svg");
                    if (svg) { svg.style.width = "14px"; svg.style.height = "14px"; }
                    tile.appendChild(wrapper);
                } else { let ic = null; try { ic = getIcon(raw); } catch (e) {} if (ic) { ic.style.width = "14px"; ic.style.height = "14px"; tile.appendChild(ic); } else if (raw) { const sp = document.createElement("span"); sp.textContent = raw; tile.appendChild(sp); } }
                if (label) { const sp = document.createElement("span"); sp.textContent = label; tile.appendChild(sp); }
                tile.addEventListener("click", () => {
                    if (!groupId) return;
                    const tb = root.querySelector('[data-group-id="' + groupId + '"]');
                    if (tb) {
                        let o = 0, el = tb; while (el && el !== root) { o += el.offsetTop; el = el.offsetParent; }
                        root.scrollTop = Math.max(0, o - 8);
                        if (itemIdx != null) { const ir = tb.querySelector('[data-item-idx="' + itemIdx + '"]'); if (ir) { ir.style.transition = "background .3s"; ir.style.background = "var(--interactive-accent)"; ir.style.borderRadius = "4px"; setTimeout(() => ir.style.background = "", 1500); } }
                    }
                });
                return tile;
            };
        for (const grp of (config.groups || [])) {
            if (grp.hidden) continue;
                const items = grp.items || [];
                const hasValid = items.some(it => it.type === "着色" || actionTable[it.action]);
                if (!hasValid) continue;
                const col = document.createElement("div");
                if (config.showGroupLabels !== false) {
                    const label = document.createElement("div");
                    label.className = "fop-em-group-label";
                    label.style.color = "var(--text-muted)";
                    const gc = GROUP_COLORS[grp.color];
                    if (gc) {
                        const bar = document.createElement("span");
                        bar.style.cssText = "display:inline-block;width:10px;height:3px;border-radius:2px;background:" + gc.bg + ";margin-right:4px;vertical-align:middle;";
                        label.appendChild(bar);
                    } else if (grp.color) {
                        const bar = document.createElement("span");
                        const bg = grp.color.includes("|") ? grp.color.split("|")[0] : grp.color;
                        bar.style.cssText = "display:inline-block;width:10px;height:3px;border-radius:2px;background:" + bg + ";margin-right:4px;vertical-align:middle;";
                        label.appendChild(bar);
                    }
                    const txt = document.createElement("span");
                    txt.textContent = grp.label || "";
                    label.appendChild(txt);
                    col.appendChild(label);
                }
                const grid = document.createElement("div");
                grid.className = "fop-em-grid";
                for (let ii = 0; ii < items.length; ii++) {
                    const item = items[ii];
                    if (item.type === "着色") {
                        const tile = document.createElement("div");
                        tile.className = "fop-em-tile";
                        const c = grp.color || "neutral";
                        if (GROUP_COLORS[c]) tile.dataset.c = c;
                        if (item.op === "bold") {
                            tile.textContent = "B"; tile.style.fontWeight = "bold";
                            tile.title = item.label || t("加粗");
                        } else if (item.color) {
                            tile.style.width = "18px"; tile.style.height = "18px"; tile.style.minWidth = "18px";
                            tile.style.borderRadius = "50%"; tile.style.background = item.color;
                            tile.style.border = "1px solid var(--background-modifier-border)";
                            tile.title = item.label || item.color;
                        }
                        tile.addEventListener("click", () => {
                            const tb = root.querySelector('[data-group-id="' + grp.id + '"]');
                            if (tb) { let o = 0, el = tb; while (el && el !== root) { o += el.offsetTop; el = el.offsetParent; } root.scrollTop = Math.max(0, o - 8);
                                const ir = tb.querySelector('[data-item-idx="' + ii + '"]'); if (ir) { ir.style.transition = "background .3s"; ir.style.background = "var(--interactive-accent)"; ir.style.borderRadius = "4px"; setTimeout(() => ir.style.background = "", 1500); } }
                        });
                        grid.appendChild(tile);
                        continue;
                    }
                    const a = actionTable[item.action];
                    if (!a) continue;
                    const iconName = item.icon || a.icon;
                    const lbl = item.label === undefined ? (a.label || "") : item.label;
                    grid.appendChild(makeFTTile(iconName, item.color || grp.color, t(lbl), grp.id, ii, t(lbl)));
                }
                col.appendChild(grid);
                row.appendChild(col);
            }
            mp.appendChild(row);
            document.body.appendChild(mp);
            attachedMenu = mp;
            syncAttachedMenuPos();
        };

        let dragging = false, dgx = 0, dgy = 0;
        const onMove = (e) => { if (!dragging) return; panel.style.left = (e.clientX - dgx) + "px"; panel.style.top = (e.clientY - dgy) + "px"; syncAttachedMenuPos(); };
        const onUp = () => { if (dragging) { dragging = false; header.style.cursor = "grab"; cfg.settingsX = parseInt(panel.style.left); cfg.settingsY = parseInt(panel.style.top); this.saveEditorMenuConfig(); } };
        document.addEventListener("mousemove", onMove);
        document.addEventListener("mouseup", onUp);
        header.addEventListener("mousedown", (e) => {
            if (e.target === closeBtn) return;
            dragging = true; dgx = e.clientX - panel.getBoundingClientRect().left; dgy = e.clientY - panel.getBoundingClientRect().top;
            header.style.cursor = "grabbing"; e.preventDefault();
        });
        const closePanel = () => { hideAttachedMenu(); panel.remove(); document.removeEventListener("mousemove", onMove); document.removeEventListener("mouseup", onUp); document.removeEventListener("keydown", escH); };
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


        const renderFileTabPreview = () => {
            if (currentTab === "file") showAttachedFileTabMenu(this.fileMenuConfig, FILE_ACTIONS);
            else if (currentTab === "tab") showAttachedFileTabMenu(this.tabMenuConfig, TAB_ACTIONS);
        };
        const renderPreview = () => { showAttachedMenu(); };
        let sortMode = false;
        let currentTab = "editor";
        const render = () => {
            if (currentTab === "editor" || currentTab === "appearance") showAttachedMenu();
            else if (currentTab === "file") showAttachedFileTabMenu(this.fileMenuConfig, FILE_ACTIONS);
            else if (currentTab === "tab") showAttachedFileTabMenu(this.tabMenuConfig, TAB_ACTIONS);
            else hideAttachedMenu();
            const _savedScroll = root.scrollTop;
            try {
            root.empty();
            const tabRow = root.createEl("div", { attr: { style: "display:flex;gap:4px;margin-bottom:12px;border-bottom:1px solid var(--background-modifier-border);padding:6px 4px 8px;background:var(--background-primary);border-radius:4px;position:sticky;top:0;z-index:5;" } });
            for (const [key, label] of [["editor", t("编辑器菜单")], ["file", t("文件菜单")], ["tab", t("标签页菜单")], ["explorer", t("文件管理器")], ["appearance", t("外观")], ["misc", t("杂项")]]) {
                const b = tabRow.createEl("button", { text: label, attr: { style: "padding:2px 10px;" + (currentTab === key ? "border-bottom:2px solid var(--interactive-accent);font-weight:600;" : "") } });
                b.onclick = () => { currentTab = key; sortMode = false; render(); };
            }
            if (currentTab === "explorer") {
                const cfg = this.editorMenuConfig;
                const revealRow = root.createEl("div", { attr: { style: "display:flex;align-items:center;gap:8px;margin-bottom:12px;" } });
                const revealCb = revealRow.createEl("input", { type: "checkbox" });
                revealCb.checked = cfg.autoReveal !== false;
                revealRow.createEl("span", { text: t("自动定位到当前文档") });
                revealCb.onchange = () => { cfg.autoReveal = revealCb.checked; this.saveEditorMenuConfig(); };
                const autoCollapseRow = root.createEl("div", { attr: { style: "display:flex;align-items:center;gap:8px;margin-bottom:12px;" } });
                const autoCollapseCb = autoCollapseRow.createEl("input", { type: "checkbox" });
                autoCollapseCb.checked = cfg.autoCollapseFolder === true;
                autoCollapseRow.createEl("span", { text: t("自动折叠文件夹") });
                autoCollapseCb.onchange = () => { cfg.autoCollapseFolder = autoCollapseCb.checked; this.saveEditorMenuConfig(); };
                return;
            }
            if (currentTab === "appearance") {
                const cfg = this.editorMenuConfig;
                const ctRow = root.createEl("div", { attr: { style: "margin-bottom:16px;" } });
                ctRow.createEl("div", { text: t("配色"), attr: { style: "font-weight:600;margin-bottom:8px;" } });
                const ctGrid = ctRow.createEl("div", { attr: { style: "display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:8px;" } });
                for (const theme of FOP_COLOR_THEMES) {
                    const card = ctGrid.createEl("div", { attr: { style: "border:1px solid var(--background-modifier-border);border-radius:6px;padding:8px;cursor:pointer;" + (cfg.colorTheme === theme.id ? "border-color:var(--interactive-accent);background:var(--background-modifier-hover);" : "") } });
                    card.createEl("div", { text: t(theme.name), attr: { style: "font-size:12px;margin-bottom:6px;" } });
                    const swatchRow = card.createEl("div", { attr: { style: "display:flex;gap:3px;" } });
                    for (const gk of ["accent","pro","success","warning","regex","neutral"]) {
                        swatchRow.createEl("div", { attr: { style: "width:16px;height:16px;border-radius:3px;background:" + theme.groups[gk].bg + ";border:1px solid var(--background-modifier-border);" } });
                    }
                    card.onclick = () => { cfg.colorTheme = theme.id; applyColorTheme(theme.id); this.saveEditorMenuConfig(); render(); };
                }
                const bsRow = root.createEl("div", { attr: { style: "margin-top:20px;" } });
                bsRow.createEl("div", { text: t("风格"), attr: { style: "font-weight:600;margin-bottom:8px;" } });
                const bsGrid = bsRow.createEl("div", { attr: { style: "display:grid;grid-template-columns:repeat(auto-fill,minmax(100px,1fr));gap:8px;" } });
                for (const style of FOP_BUTTON_STYLES) {
                    const card = bsGrid.createEl("div", { attr: { style: "border:1px solid var(--background-modifier-border);border-radius:6px;padding:8px;cursor:pointer;text-align:center;" + (cfg.buttonStyle === style.id ? "border-color:var(--interactive-accent);background:var(--background-modifier-hover);" : "") } });
                    card.createEl("div", { text: t(style.name), attr: { style: "font-size:12px;" } });
                    card.onclick = () => {
                        cfg.buttonStyle = style.id; this.saveEditorMenuConfig();
                        document.querySelectorAll(".fop-em-panel").forEach(p => {
                            p.classList.forEach(cls => { if (cls.startsWith("fop-style-")) p.classList.remove(cls); });
                            if (style.id !== "flat") p.classList.add("fop-style-" + style.id);
                        });
                        render();
                    };
                }
                const spRow = root.createEl("div", { attr: { style: "margin-top:20px;" } });
                spRow.createEl("div", { text: t("间距"), attr: { style: "font-weight:600;margin-bottom:8px;" } });
                const spGrid = spRow.createEl("div", { attr: { style: "display:flex;gap:16px;flex-wrap:wrap;" } });
                const tgWrap = spGrid.createEl("div", { attr: { style: "display:flex;align-items:center;gap:6px;" } });
                tgWrap.createEl("span", { text: t("按钮间距"), attr: { style: "font-size:var(--font-ui-smaller);" } });
                const tgIn = tgWrap.createEl("input", { type: "number", attr: { style: "width:50px;padding:2px 4px;", min: "0", max: "20" } });
                tgIn.value = cfg.tileGap != null ? cfg.tileGap : 3;
                tgIn.onchange = () => { cfg.tileGap = parseInt(tgIn.value) || 0; this.saveEditorMenuConfig(); document.documentElement.style.setProperty("--fop-tile-gap", cfg.tileGap + "px"); };
                const ggWrap = spGrid.createEl("div", { attr: { style: "display:flex;align-items:center;gap:6px;" } });
                ggWrap.createEl("span", { text: t("分组间距"), attr: { style: "font-size:var(--font-ui-smaller);" } });
                const ggIn = ggWrap.createEl("input", { type: "number", attr: { style: "width:50px;padding:2px 4px;", min: "0", max: "30" } });
                ggIn.value = cfg.groupGap != null ? cfg.groupGap : 6;
                ggIn.onchange = () => { cfg.groupGap = parseInt(ggIn.value) || 0; this.saveEditorMenuConfig(); document.documentElement.style.setProperty("--fop-group-gap", cfg.groupGap + "px"); };
                return;
            }
            if (currentTab === "misc") {
                const cfg = this.editorMenuConfig;
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

                const accRow = root.createEl("div", { attr: { style: "display:flex;align-items:center;gap:8px;margin-bottom:12px;" } });
                const accCb = accRow.createEl("input", { type: "checkbox" });
                accCb.checked = cfg.accordionMode === true;
                accRow.createEl("span", { text: t("设置面板分组手风琴模式") });
                accCb.onchange = () => { cfg.accordionMode = accCb.checked; this.saveEditorMenuConfig(); };

                const tplBox = root.createEl("div", { attr: { style: "border:1px solid var(--background-modifier-border);border-radius:6px;padding:10px;margin-bottom:12px;" } });
                tplBox.createEl("div", { text: t("新文件模板"), attr: { style: "font-weight:600;margin-bottom:8px;" } });
                tplBox.createEl("div", { text: t("{{blockRef}}=块引用 {{embedRef}}=嵌入引用 {{aiResult}}=AI返回"), attr: { style: "font-size:var(--font-ui-smaller);color:var(--text-muted);margin-bottom:6px;" } });
                const tplIn = tplBox.createEl("textarea", { attr: { style: "width:100%;min-height:120px;padding:6px 8px;font-size:var(--font-ui-small);box-sizing:border-box;resize:vertical;font-family:var(--font-monospace);" } });
                const defaultTpl = "{{blockRef}}\n{{embedRef}}\n{{aiResult}}";
                tplIn.value = cfg.newFileTemplate || defaultTpl;
                tplIn.onchange = () => { cfg.newFileTemplate = tplIn.value; this.saveEditorMenuConfig(); };
                const rstBtn = tplBox.createEl("button", { text: t("恢复默认"), cls: "mod-warning", attr: { style: "margin-top:6px;" } });
                rstBtn.onclick = () => { cfg.newFileTemplate = defaultTpl; this.saveEditorMenuConfig(); render(); };
                return;
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
                        const acc = this.editorMenuConfig.accordionMode === true;
                        if (isCol && acc) {
                            for (const g2 of config.groups) { if (g2.id !== grp.id) config.collapsedState[g2.id] = true; }
                        }
                        config.collapsedState[grp.id] = !isCol;
                        this.saveEditorMenuConfig();
                        if (acc) render(); else { grpContent.style.display = isCol ? "" : "none"; ftChevron.textContent = isCol ? "▼" : "▶"; }
                    };
                    const ni = head.createEl("input", { type: "text", value: grp.label || "", attr: { style: "width:120px;padding:2px 4px;" } });
                    ni.onchange = () => { grp.label = ni.value; this.saveEditorMenuConfig(); renderFileTabPreview(config, actionTable); };
                    const swatchRow = head.createEl("div", { attr: { style: "display:flex;gap:3px;" } });
                    for (const k of Object.keys(GROUP_COLORS)) {
                        const sw = swatchRow.createEl("div", { text: "Aa", attr: { style: "width:24px;height:16px;border-radius:3px;cursor:pointer;border:1px solid var(--background-modifier-border);background:" + GROUP_COLORS[k].bg + ";color:" + GROUP_COLORS[k].fg + ";font-size:9px;display:flex;align-items:center;justify-content:center;", title: GROUP_COLORS[k].label } });
                        if (grp.color === k) sw.style.outline = "2px solid var(--interactive-accent)";
                        sw.onclick = () => { grp.color = k; this.saveEditorMenuConfig(); render(); };
                    }
                    const dg = head.createEl("button", { cls: "mod-warning", attr: { style: "margin-left:auto;" } });
                    if (grp.id === "color") {
                        dg.textContent = grp.hidden ? t("显示") : t("隐藏");
                        dg.classList.remove("mod-warning");
                        dg.onclick = () => { grp.hidden = !grp.hidden; this.saveEditorMenuConfig(); render(); };
                    } else {
                        dg.textContent = t("删除组");
                        dg.onclick = () => { config.groups.splice(gi, 1); this.saveEditorMenuConfig(); render(); };
                    }
                    const hdr = grpContent.createEl("div", { attr: { style: "display:flex;gap:6px;margin:4px 0 4px;font-size:var(--font-ui-smaller);color:var(--text-muted);background:var(--background-modifier-form-field);padding:3px 6px;border-radius:3px;" } });
                    hdr.createEl("div", { attr: { style: "width:14px;flex-shrink:0;" } });
                    hdr.createEl("div", { text: t("图标"), attr: { style: "width:123px;", title: t("lucide 图标名 / 粘贴 <svg> 代码 / 任意文字（识别不到则按文字显示）") } });
                    hdr.createEl("div", { text: t("名称"), attr: { style: "width:80px;text-indent:2px;", title: t("tile 鼠标悬停时显示的提示文字") } });
                    hdr.createEl("div", { text: t("命令"), attr: { style: "flex:1;text-indent:2px;", title: t("选择该选项执行的命令") } });
                    hdr.createEl("div", { text: t("操作"), attr: { style: "margin-left:auto;", title: t("删除该选项") } });
                    for (let ii = 0; ii < (grp.items || []).length; ii++) {
                        const item = grp.items[ii];
                        const a = actionTable[item.action] || {};
                        if (item.type === "着色") {
                            const ir = grpContent.createEl("div", { attr: { style: "display:flex;gap:6px;align-items:center;margin:2px 0;" } });
                            ir.dataset.itemIdx = ii;
                            ir.createEl("span", { text: "⠿", attr: { style: "cursor:grab;color:var(--text-faint);" } });
                            const lbIn = ir.createEl("input", { type: "text", value: item.label || "", attr: { placeholder: t("名称"), style: "width:80px;padding:1px 4px;font-size:var(--font-ui-smaller);" } });
                            lbIn.onchange = () => { item.label = lbIn.value.trim(); this.saveEditorMenuConfig(); renderFileTabPreview(config, actionTable); };
                            ir.createEl("span", { text: t("着色"), attr: { style: "color:var(--text-muted);font-size:var(--font-ui-smaller);" } });
                            if (item.op === "bold") {
                                ir.createEl("span", { text: t("加粗"), attr: { style: "color:var(--text-muted);font-size:var(--font-ui-smaller);" } });
                            } else if (item.color) {
                                const colorIn = ir.createEl("input", { type: "color", value: item.color, attr: { style: "width:24px;height:20px;border:none;cursor:pointer;padding:0;" } });
                                colorIn.onchange = () => { item.color = colorIn.value; this.saveEditorMenuConfig(); renderFileTabPreview(config, actionTable); };
                            }
                            const db = ir.createEl("button", { text: "✕", attr: { style: "padding:2px 6px;" } });
                            db.onclick = () => { grp.items.splice(ii, 1); this.saveEditorMenuConfig(); render(); };
                            continue;
                        }

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
                    if (grp.id === "color") {
                        const abColor = grpContent.createEl("button", { text: t("+ 着色"), attr: { style: "margin-top:4px;margin-left:4px;" } });
                        abColor.onclick = () => { grp.items = grp.items || []; grp.items.push({ type: "着色", color: "#3498db", icon: "circle", label: t("新颜色") }); this.saveEditorMenuConfig(); const s = root.scrollTop; render(); root.scrollTop = s; };
                        const abBold = grpContent.createEl("button", { text: t("+ 加粗"), attr: { style: "margin-top:4px;margin-left:4px;" } });
                        abBold.onclick = () => { grp.items = grp.items || []; grp.items.push({ type: "着色", op: "bold", icon: "bold", label: t("加粗") }); this.saveEditorMenuConfig(); const s = root.scrollTop; render(); root.scrollTop = s; };
                    }
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
                    if (isCol && cfg.accordionMode) {
                        for (const g2 of cfg.groups) { if (g2.id !== grp.id) cfg.collapsedState[g2.id] = true; }
                    }
                    cfg.collapsedState[grp.id] = !isCol;
                    this.saveEditorMenuConfig();
                    if (cfg.accordionMode) render(); else { grpContent.style.display = isCol ? "" : "none"; grpChevron.textContent = isCol ? "▼" : "▶"; }
                };
                head.addEventListener("dragover", (e) => {
                    if (!dragState) return;
                    if (grpContent.style.display !== "none") return;
                    e.preventDefault(); e.dataTransfer.dropEffect = "move";
                    clearDragIndicators(); box.style.outline = "2px solid var(--interactive-accent)";
                });
                head.addEventListener("dragleave", () => { box.style.outline = ""; });
                head.addEventListener("drop", (e) => {
                    if (!dragState) return;
                    if (grpContent.style.display !== "none") return;
                    e.preventDefault(); e.stopPropagation();
                    const fromG = dragState.fromGroup, fromI = dragState.fromItem;
                    if (fromG === gi) return;
                    const movedItem = cfg.groups[fromG].items[fromI];
                    cfg.groups[fromG].items.splice(fromI, 1);
                    cfg.groups[gi].items.push(movedItem);
                    cfg.collapsedState = cfg.collapsedState || {};
                    cfg.collapsedState[cfg.groups[gi].id] = false;
                    if (cfg.accordionMode) { for (const g2 of cfg.groups) { if (g2.id !== cfg.groups[gi].id) cfg.collapsedState[g2.id] = true; } }
                    this.saveEditorMenuConfig(); render();
                });
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
                    ts.createEl("option", { value: "graph", text: t("局部关系列表") });
                    ts.createEl("option", { value: "stash", text: t("暂存") });
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
                        const patInput = ir.createEl("input", { type: "text", value: item.pattern || "", attr: { style: "flex:1;min-width:80px;padding:2px;", placeholder: t("正则") } });
                        patInput.onchange = (e) => { item.pattern = e.target.value; this.saveEditorMenuConfig(); renderPreview(); };
                        const repInput = ir.createEl("input", { type: "text", value: item.replacement || "", attr: { style: "flex:1;min-width:80px;padding:2px;", placeholder: t("替换 \\n=换行") } });
                        repInput.onchange = (e) => { item.replacement = e.target.value; this.saveEditorMenuConfig(); renderPreview(); };
                        const flagInput = ir.createEl("input", { type: "text", value: item.flags || "g", attr: { style: "width:46px;padding:2px;", placeholder: t("标志"), title: t("g=全局 i=忽略大小写 m=多行 s=dotall u=unicode y=粘附") } });
                        flagInput.onchange = (e) => { item.flags = e.target.value; this.saveEditorMenuConfig(); renderPreview(); };
                        const presetBtn = ir.createEl("button", { text: t("预设"), attr: { style: "padding:2px 6px;font-size:12px;line-height:1;white-space:nowrap;" } });
                        presetBtn.onclick = () => {
                            fopPopupPicker(presetBtn, {
                                placeholder: t("搜索预设…"), width: 420,
                                renderItems: (container, q, pick) => {
                                    let count = 0;
                                    for (const grp of DEFAULT_EDITOR_MENU.groups) {
                                        for (const di of (grp.items || [])) {
                                            if (di.type !== "regex") continue;
                                            const lbl = (typeof di.label === "string" && di.label) ? di.label : "";
                                            const nm = t(lbl) || lbl;
                                            if (q && nm.toLowerCase().indexOf(q) < 0 && (di.pattern || "").toLowerCase().indexOf(q) < 0) continue;
                                            const row = container.createEl("div", { cls: "fop-picker-item", attr: { style: "padding:3px 6px;cursor:pointer;border-radius:4px;display:flex;flex-direction:column;gap:2px;" } });
                                            row.createEl("span", { text: nm, attr: { style: "white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" } });
                                            row.createEl("span", { text: di.pattern || "", attr: { style: "color:var(--text-muted);font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-family:var(--font-monospace);" } });
                                            row.onmousedown = (e) => { e.preventDefault(); pick(di); };
                                            count++;
                                        }
                                    }
                                    if (count === 0) container.createEl("div", { text: t("无匹配"), attr: { style: "padding:8px;color:var(--text-muted);" } });
                                },
                                onPick: (di) => {
                                    item.pattern = di.pattern || ""; patInput.value = item.pattern;
                                    item.replacement = di.replacement || ""; repInput.value = item.replacement;
                                    item.flags = di.flags || "g"; flagInput.value = item.flags;
                                    if (!item.label || item.label === t("新选项")) { item.label = di.label; }
                                    this.saveEditorMenuConfig(); renderPreview();
                                }
                            });
                        };
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
                    if (fromG !== gi) {
                        cfg.collapsedState = cfg.collapsedState || {};
                        cfg.collapsedState[cfg.groups[gi].id] = false;
                        if (cfg.accordionMode) { for (const g2 of cfg.groups) { if (g2.id !== cfg.groups[gi].id) cfg.collapsedState[g2.id] = true; } }
                    }
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
