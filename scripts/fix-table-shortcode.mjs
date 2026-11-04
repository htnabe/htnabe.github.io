import { readFile, writeFile } from "node:fs/promises";

function normalizeTableClosingShortcode(content) {
  let out = content;

  // Normalize spaced shortcode variants first.
  out = out.replace(/\{\{\s*<\s*\/\s*table\s*>\s*\}\}/g, "{{</table>}}");
  // Fix broken two-line form:
  // | {{</table>}}
  //     |
  out = out.replace(/^\s*\|\s*\{\{<\/table>\}\}\s*\n\s*\|\s*$/gm, "{{</table>}}");

  // Fix one-line pipe-wrapped forms.
  out = out.replace(/^\s*\|\s*\{\{<\/table>\}\}\s*(?:\|)?\s*$/gm, "{{</table>}}");

  // Catch right-pipe-only form.
  out = out.replace(/^\s*\{\{<\/table>\}\}\s*\|\s*$/gm, "{{</table>}}");

  return out;
}

async function main() {
  const files = process.argv.slice(2).filter((p) => p.toLowerCase().endsWith(".md"));

  if (files.length === 0) {
    return;
  }

  await Promise.all(
    files.map(async (filePath) => {
      const before = await readFile(filePath, "utf8");
      const after = normalizeTableClosingShortcode(before);
      if (after !== before) {
        await writeFile(filePath, after, "utf8");
      }
    })
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
