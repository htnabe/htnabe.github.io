import assert from "node:assert/strict";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import postcss from "postcss";

async function loadConfig(environment) {
  const previous = process.env.HUGO_ENVIRONMENT;
  process.env.HUGO_ENVIRONMENT = environment;
  try {
    return (await import(`../postcss.config.mjs?environment=${environment}`)).default;
  } finally {
    if (previous === undefined) {
      delete process.env.HUGO_ENVIRONMENT;
    } else {
      process.env.HUGO_ENVIRONMENT = previous;
    }
  }
}

test("production config purges unused CSS and preserves Hugo and Bootstrap classes", async () => {
  const config = await loadConfig("production");
  const directory = await mkdtemp(join(tmpdir(), "t-pot-postcss-"));
  const previous = process.cwd();
  try {
    await writeFile(
      join(directory, "hugo_stats.json"),
      JSON.stringify({ htmlElements: { tags: ["article"], classes: ["used"], ids: ["heading"] } })
    );
    process.chdir(directory);
    const result = await postcss(config.plugins).process(
      "article,.used,#heading,.show,.modal-backdrop,.xxx{color:red}",
      { from: undefined }
    );
    for (const selector of ["article", ".used", "#heading", ".show", ".modal-backdrop"]) {
      assert.ok(result.css.includes(selector), `preserves ${selector}`);
    }
    assert.ok(!result.css.includes(".xxx"));
  } finally {
    process.chdir(previous);
    await rm(directory, { recursive: true, force: true });
  }
});

test("development config keeps unused CSS and enables autoprefixer", async () => {
  const config = await loadConfig("development");
  const result = await postcss(config.plugins.filter(Boolean)).process(
    ".unused{user-select:none}",
    {
      from: undefined,
    }
  );
  assert.ok(result.css.includes(".unused"));
  assert.ok(result.css.includes("-webkit-user-select"));
});
