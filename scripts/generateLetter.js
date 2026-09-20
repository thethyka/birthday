const fs = require("fs");
const path = require("path");

// content/letter.md has a writing-instructions header above a `---` marker.
// Everything after the LAST such marker is the actual letter.
const src = path.join(process.cwd(), "content", "letter.md");
const out = path.join(process.cwd(), "public", "letter.json");

function run() {
  if (!fs.existsSync(src)) {
    fs.writeFileSync(out, JSON.stringify({ body: "" }));
    console.warn("⚠️  content/letter.md not found — wrote an empty letter.");
    return;
  }

  const raw = fs.readFileSync(src, "utf-8");
  const marker = "\n---\n";
  const idx = raw.lastIndexOf(marker);
  let body = idx === -1 ? raw : raw.slice(idx + marker.length);

  // Drop the HTML comment placeholder if it's still there.
  body = body.replace(/<!--[\s\S]*?-->/g, "").trim();

  fs.writeFileSync(out, JSON.stringify({ body }, null, 2));

  if (!body) {
    console.warn("⚠️  The letter is still empty — write it in content/letter.md");
  } else {
    console.log(`✅ Letter ready (${body.split(/\s+/).length} words).`);
  }
}

run();
