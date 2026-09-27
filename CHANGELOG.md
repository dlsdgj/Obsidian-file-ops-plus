# Changelog

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
