# Changelog

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
