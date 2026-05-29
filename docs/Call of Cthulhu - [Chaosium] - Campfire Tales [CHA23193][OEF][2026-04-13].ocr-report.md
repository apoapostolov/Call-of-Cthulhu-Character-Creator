# OCR Markdown Audit

- Raw: `C:\git\lifestyle\rpg_projects\files\campfire-tales\Call of Cthulhu - [Chaosium] - Campfire Tales [CHA23193][OEF][2026-04-13].raw.md`
- Clean: `C:\git\lifestyle\rpg_projects\files\campfire-tales\Call of Cthulhu - [Chaosium] - Campfire Tales [CHA23193][OEF][2026-04-13].md`

## Raw Artifact Counts

- `all_caps_lines`: 0
- `double_blank_runs`: 43
- `dropcap_damage_candidates`: 578
- `html_breaks`: 163
- `markdown_headings`: 795
- `page_number_lines`: 0
- `picture_placeholders`: 152
- `picture_text_markers`: 84
- `pipe_table_lines`: 32
- `spaced_heading_candidates`: 0

## Raw Repeated Short-Line Candidates

- None detected

## Clean Artifact Counts

- `all_caps_lines`: 0
- `double_blank_runs`: 186
- `dropcap_damage_candidates`: 518
- `html_breaks`: 0
- `markdown_headings`: 764
- `page_number_lines`: 0
- `picture_placeholders`: 0
- `picture_text_markers`: 0
- `pipe_table_lines`: 1258
- `spaced_heading_candidates`: 0

## Clean Repeated Short-Line Candidates

- None detected

## Delta

- `all_caps_lines`: 0 -> 0 (+0)
- `double_blank_runs`: 43 -> 186 (+143)
- `dropcap_damage_candidates`: 578 -> 518 (-60)
- `html_breaks`: 163 -> 0 (-163)
- `markdown_headings`: 795 -> 764 (-31)
- `page_number_lines`: 0 -> 0 (+0)
- `picture_placeholders`: 152 -> 0 (-152)
- `picture_text_markers`: 84 -> 0 (-84)
- `pipe_table_lines`: 32 -> 1258 (+1226)
- `spaced_heading_candidates`: 0 -> 0 (+0)

## Interpretation

- High `picture_placeholders`, `picture_text_markers`, or `html_breaks` means image-text cleanup is still needed.
- High `all_caps_lines` often indicates surviving running headers or flattened labels.
- High `spaced_heading_candidates` suggests decorative heading reconstruction remains incomplete.
- High `double_blank_runs` usually indicates layout noise rather than real manuscript spacing.
- `pipe_table_lines` rising after cleanup is often good if flattened tables were reconstructed.
- Repeated short-line candidates often catch leftover running headers or footer titles that generic counts miss.
