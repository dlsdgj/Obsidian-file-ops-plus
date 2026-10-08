# Changelog

## 1.1.0

### Added

- **Editor menu icon preview & color editing** — Icons in the editor menu can now be previewed and their colors edited inline
- **Block reference highlight in local relation list** — Selecting a block reference identifier (e.g., `^fopmuogtm9e`) in the editor highlights documents referencing that block in the local relation list and expands the hover chip to show document names directly
- **3 new highlight presets + semantic renaming** — Added 3 new HTML highlight presets (pink, cyan, deep purple) alongside existing Obsidian built-in highlights (red, yellow, orange, green, blue, purple); renamed all 9 presets with semantic labels: Problem/Risk, Cause/Mechanism, Concept, Solution, Background/Relation, Own Thinking, Viewpoint, Fact, Insight (with i18n)
- **AI subwindow sends selected text** — When opening the AI subwindow with selected text, the selected text is sent directly (since the text may contain questions)

### Fixed

- **Relation list real-time update** — The relation list window now updates promptly after adding links to a document
- **Menu folder icon style not following settings** — Icons in menu folders were displaying as white background with black text/symbols regardless of configured style; now follows the configured style
- **Background tab context menu targets wrong tab** — Right-clicking a background tab and invoking menu actions (e.g., copy link) was operating on the current active tab instead of the right-clicked tab; now operates on the correct tab

## 1.0.9

### Added

- **Editor menu footer info bar** — Bottom-right footer shows plugin name + version + style pill + color pill; scroll wheel on pills cycles through styles/colors with flash animation and toast notification; footer hidden by default, fades in when mouse approaches bottom
- **Folder support in settings panel** — Folders in editor menu settings panel with tree-line connectors, collapse/expand, and drag-to-reorder; unified data model uses `grp.items` with `type:"folder"` elements
- **Folder tiles in editor menu** — Folders appear as tiles in the menu; folder position draggable between option tiles; hover shows a floating list (prototype F layout: icon + name + description inline)
- **Independent prompt type** — New standalone `prompt` type; AI subwindow no longer bound to prompt
- **Text type datetime presets** — Text type now supports `{{date}}`, `{{time}}`, `{{datetime}}`, `{{timestamp}}` presets
- **Name highlight bar in folder list** — List item names get a bottom highlight bar consistent with menu tooltip highlight style (linear-gradient marker effect)

### Fixed

- **Group title color readability** — Added `_fopPickTitleColor` function to select the higher-contrast color (bg or fg) as the group title color against the panel background
- **Folder drag insertion** — Fixed bug where folders couldn't be inserted at new positions after dragging; option row dragover handler now also checks `dragFolderState`
- **No-link hint removal** — Removed "no link" hint; association chip now shows 0
- **Scroll position preservation** — Full-text replacement now preserves page scroll position and cursor by saving/restoring `editor.cm.getScrollInfo()`
- **Resize handle z-index** — Fixed resize handle being blocked by footer trigger zone; resize handle now has `z-index:3` above footer trigger (0) and footer (2)

## 1.0.8

### Changed

- **New file creation embedded in AI panel** — Clicking "New File" button no longer opens a separate popup; instead the AI panel's bottom button row is replaced inline with a filename editor (input + ▾ + ✨ + ✓ + ✕), candidate list pops up above the editor row; ✕ restores the original button row

### Fixed

- **AI filename candidates source** — AI-generated filename candidates now explicitly use the AI response content (not the selected text) as the basis for name suggestions

## 1.0.7

### Fixed

- **Manifest description contained "Obsidian"** — Removed the word "Obsidian" from the plugin description field to comply with Obsidian plugin submission requirements

## 1.0.6

### Added

- **Stash panel** — New stash feature for the editor menu: save selected text or clipboard content to a temporary list, click to insert into the editor; panel docks below the local relation list when present
- **Stash add/clear buttons** — "+" button in stash panel header adds selected text (or clipboard fallback) to the list; 🗑 button clears all items
- **Panel resize handles** — Both local relation list and stash panels now have a bottom-right resize handle; panel width and height are persisted across sessions
- **27 color themes** — Appearance tab now offers 27 preset color palettes (Soft Pastel, Morandi Gray, Monochrome Ink, Dark Neon, Paper Ink, Solid Vivid, Memphis, Neon City, Synthwave Sunset, Candy Pop, Forbidden City, Ukiyo-e, Black Gold, Steam Patina, Monet Lily, Green Study, Mars Base, Mint Salt, Sunset Peach, Nord Fog, Sakura Mint, Tea Earth, Vintage Film, Porcelain, Dunhuang, Nord Aurora, Terminal Glow)
- **12 button styles** — 12 visual style presets for menu tiles (Flat, Neumorphism, Glassmorphism, Neo-Brutalism, Cyberpunk, Vaporwave, Win95, Jelly, Bauhaus, Hand Drawn, Washi, Memphis) with distinct borders, shadows, and border-radius treatments
- **Spacing controls** — Adjustable button spacing and group spacing via numeric inputs in the Appearance tab
- **README appearance section** — Added "Appearance Customization" section to README with three screenshots
- **i18n for appearance & file/tab menus** — Added English translations for filename color, colorize, spacing, all 27 theme names, and 12 style names

### Changed

- **Stash toggle behavior** — Stash tile in editor menu is now a pure show/hide toggle; adding text is done via the "+" button in the stash panel header
- **Stash accordion + hover** — Stash items now use accordion mode (expanding one collapses others) with hover-to-expand instead of click-to-toggle
- **Settings panel tabs** — Settings panel now has six tabs: Editor Menu / File Menu / Tab Menu / File Explorer / Appearance / Misc
- **Memphis decorations on panels** — Graph and stash panels now use `overflow:visible` so Memphis style corner decorations (triangle and circle) display fully, matching the menu panel

### Fixed

- **`opts is not defined` in file/tab menus** — Removed erroneous `opts.skipClose` references from `createFopMenuPanel`'s `finish` function that caused `ReferenceError` when opening file or tab menus, preventing them from auto-closing
- **Graph/stash panel overlap on menu reopen** — Stash panel positioning now uses `requestAnimationFrame` to ensure the graph panel updates its position first, preventing vertical overlap when the menu is reopened
- **AI panel header drag** — Fixed incorrect `addBtn` reference in the AI panel's header mousedown handler (was mistakenly applied during stash panel edit)

## 1.0.5

### Added

- **Searchable icon & command pickers** — Settings panel icon selector and command dropdown now have a search popup with keyboard navigation, replacing the plain dropdown/textarea
- **Text type for editor menu** — New `text` option type that inserts fixed text (supports `{{text}}` placeholder for selected text)
- **Clipboard to new note action** — New action `clipboardToNote` that reads clipboard text, prompts for a filename, and creates a new note
- **Floating ball offset setting** — Selection hover ball position offset (X/Y) is now configurable via numeric inputs in the settings panel
- **Selection ball mouse-aware timing** — Ball only appears after mouse release (not during drag-selection), positioned relative to mouse cursor

### Fixed

- **Config merge fallback mismatch** — Onload config merge fallback using pattern+replacement no longer mismatches cmd/pipeline/action items (which have undefined pattern/replacement), preventing user-added commands from being overwritten by preset values on restart
- **Settings panel scroll jump** — Deleting options, switching type, and other render-triggering actions no longer reset scroll position to top (try/finally preserves scrollTop)
- **Duplicate menu trigger** — Hover ball no longer re-triggers the editor menu when one is already open
- **Stash panel toggle disabled** — Stash panel checkbox in settings is now disabled (feature under refactor)

## 1.0.4

### Added

- **Export/Import settings** — Settings panel header now has ⬇/⬆ buttons to export all menu configs as JSON or import from a JSON file
- **Collapsible sections** — AI settings and each group in all three menus (editor/file/tab) have a ▼/▶ collapse toggle; collapsed state is persisted across sessions
- **SVG icon support for file & tab menus** — File and tab menu icon fields now accept `<svg>` code (textarea), matching the editor menu's icon input
- **Preset icon prefill** — File and tab menu icon fields are pre-filled with the action's default icon for immediate visibility

### Fixed

- **Empty label hides menu name** — File and tab menu items with an empty name field no longer show a label in the menu (icon-only); `undefined` still falls back to the action's default label
- **Name input i18n** — File and tab menu name fields now show translated labels in English mode instead of raw Chinese
- **Text selection triggers drag** — Drag-to-reorder in file and tab menu settings no longer activates when selecting text in icon/name inputs; draggable is now only enabled on drag handle mousedown

## 1.0.3

### Added

- **Unified menu shell** — Editor, file, and tab menus now share a common panel container (rounded corners, shadow, Esc/outside-click close, blank-area drag)
- **Configurable file & tab menus** — File and tab context menus are now fully configurable via the settings panel, with enable toggle, group add/remove/rename/color, item drag-to-reorder, action dropdown, icon and label customization
- **Icons for file & tab menus** — All file and tab menu actions now have lucide icons; each option's icon and label can be customized in settings
- **Live preview for file & tab menus** — Settings panel shows real-time preview for file and tab menu configurations, with show/hide group labels toggle
- **Tab menu new actions** — Added Copy, Move Up, and Move To… to the tab context menu
- **AI Prompt type** — New editor menu option type that sends selected text to an AI (OpenAI-compatible API) and displays the result in a non-modal floating panel with Copy/Insert/Replace buttons
- **Selection hover ball** — Selecting text in the editor shows a hover ball at the selection's top-right; hovering expands the editor enhanced menu
- **cmd dropdown** — cmd type now uses a dropdown listing all available Obsidian commands (sorted by name) instead of manual ID entry
- **Set selection as title** — New action that sets the selected text as the current document's title (strips illegal characters)
- **Color palette add/remove** — Color tag row now displays colors inline with a + button to add custom colors (color picker) and right-click to delete; custom palette is persisted
- **Group labels in file & tab menus** — File and tab menus now show group labels (configurable via show/hide toggle)
- **Settings panel title** — Title now includes plugin name and version (e.g. "Context Menu Settings — File Ops Plus v1.0.3")
- **Three settings tabs** — Settings panel has three tabs: Editor Menu / File Menu / Tab Menu

### Changed

- **Button coloring** — Menu buttons now have their own background and text color (matching editor menu style) instead of coloring the entire row
- **Reset button placement** — Reset to Default buttons moved to bottom-right of settings panel (removed extra footer border)
- **Settings panel title** — Renamed from "Editor Context Menu Settings" to "Context Menu Settings" (covers all three menus now)
- **README** — Comprehensive update with new features, option types table, and screenshot references

### Fixed

- **i18n missing keys** — Added translations for "Enable", "Color", "Add Color" that were previously untranslated

## 1.0.2

### Added

- **Pipeline type** — Chain multiple transforms with `→` separator (e.g. `Strip HTML→Merge Blank Lines`), supports Chinese button names, Tab key inserts `→` in settings input
- **Action type** — Three built-in actions: Copy as Block Ref (`^block-id`), Extract to New Note (Notion-style convert to page), Copy Heading Link (`[[file#heading]]`)
- **Keystroke type** — Record and replay keyboard shortcuts via button click; supports modifier keys (Ctrl/Alt/Shift/Meta); common shortcuts mapped to editor API (`Ctrl+C/V/X/A/Z/Y/S/F/H/D/K`); usable in pipeline steps
- **Flag tooltip** — Hover on regex flag input shows `g=global i=case-insensitive m=multiline s=dotall u=unicode y=sticky`
- **Custom dropdown** — Custom transform type now uses dropdown selection instead of manual text input
- **Regex/pipeline without selection** — Regex and pipeline now operate on entire document when no text is selected, instead of showing "Please select text first" notice

### Fixed

- **Select dropdown truncation** — Type selector text was clipped by excessive padding; fixed with `padding:0 2px;box-sizing:border-box`
- **Keystroke modifier recording** — Modifier-only keydown no longer finishes recording prematurely; waits for non-modifier key to complete combo
- **Synthetic KeyboardEvent ignored** — `isTrusted=false` events were ignored by CodeMirror; replaced with direct editor API calls (`document.execCommand`, `editor.undo()`, etc.)

## 1.0.0

### Added

- File explorer context menu: new tab / new window / default app / external editor / reveal in explorer, rename, duplicate, pin, absolute path / relative path / wikilink / MD link, copy, move up, move to…, color tags (8 colors + bold), inline new file / folder, delete (pulse countdown confirmation)
- Tab header context menu: close / close others / close right / close all, pin / unpin, reading-source toggle, split vertical / horizontal, new window, local graph / backlinks / outgoing links / outline, find / replace / export PDF
- Editor context menu: grouped icon panel (link / format / paragraph / insert / replace / highlight), supporting cmd / regex / custom types
- Editor menu settings panel: live preview, add/remove groups and options, icon / label / type / regex / color configuration, drag to reposition and resize
- External editor auto-detection (VS Code / Typora / Notepad++ / Sublime Text), with manual path input prompt when none found
- 12 regex replacement presets + 8-color mark highlight
- Custom transforms: toggleHeading1-6 / toggleChecklist / toggleParagraph / toggleCodeblock / toggleMathblock / fullwidthToHalf
- Chinese/English i18n (auto-switch based on moment.locale())
- Command palette entry: Editor Context Menu Settings
- File context menu quick toggle: Enable/Disable Editor Enhanced Menu
- "..." button to expand Obsidian native menu
- Backward-compatible data.json migration: auto-append missing groups, sync type/cmd changes by label
