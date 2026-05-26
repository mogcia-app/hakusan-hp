import fs from "fs";
import path from "path";

const inputPath = path.resolve(process.cwd(), "hakusan.html");
const outputRoot = path.resolve(process.cwd(), "public", "hakusan-import");
const assetRoot = path.join(outputRoot, "assets");

function readTagContent(source, type) {
  const startTag = `<script type="${type}">`;
  const endTag = "</script>";
  const start = source.indexOf(startTag);

  if (start < 0) {
    throw new Error(`Missing tag: ${type}`);
  }

  const end = source.indexOf(endTag, start);

  if (end < 0) {
    throw new Error(`Missing closing tag for: ${type}`);
  }

  return source.slice(start + startTag.length, end);
}

function mimeToExtension(mime) {
  switch (mime) {
    case "image/png":
      return ".png";
    case "image/jpeg":
      return ".jpg";
    case "image/webp":
      return ".webp";
    case "image/svg+xml":
      return ".svg";
    case "font/woff2":
      return ".woff2";
    case "text/css":
      return ".css";
    case "application/javascript":
    case "text/javascript":
      return ".js";
    default:
      return "";
  }
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function writeManifestAssets(manifest) {
  const assetMap = new Map();

  for (const [uuid, entry] of Object.entries(manifest)) {
    const ext = mimeToExtension(entry.mime);
    const fileName = `${uuid}${ext}`;
    const outputPath = path.join(assetRoot, fileName);
    const bytes = Buffer.from(entry.data, "base64");

    fs.writeFileSync(outputPath, bytes);
    assetMap.set(uuid, `/hakusan-import/assets/${fileName}`);
  }

  return assetMap;
}

function rewriteTemplate(template, assetMap, extResources) {
  let rewritten = template;

  for (const [uuid, publicPath] of assetMap.entries()) {
    rewritten = rewritten.split(uuid).join(publicPath);
  }

  const resourceMap = {};
  for (const entry of extResources) {
    const publicPath = assetMap.get(entry.uuid);
    if (publicPath) {
      resourceMap[entry.id] = publicPath;
    }
  }

  const headOpen = rewritten.match(/<head[^>]*>/i);
  if (headOpen) {
    const injectAt = (headOpen.index ?? 0) + headOpen[0].length;
    const resourceScript = `<script>window.__resources = ${JSON.stringify(resourceMap)};<\/script>`;
    rewritten = `${rewritten.slice(0, injectAt)}${resourceScript}${rewritten.slice(injectAt)}`;
  }

  return rewritten;
}

function main() {
  if (!fs.existsSync(inputPath)) {
    throw new Error(`Input file not found: ${inputPath}`);
  }

  ensureDir(assetRoot);

  const source = fs.readFileSync(inputPath, "utf8");
  const manifest = JSON.parse(readTagContent(source, "__bundler/manifest"));
  const template = JSON.parse(readTagContent(source, "__bundler/template"));
  const extResources = JSON.parse(readTagContent(source, "__bundler/ext_resources"));

  const assetMap = writeManifestAssets(manifest);
  const rewrittenTemplate = rewriteTemplate(template, assetMap, extResources);

  fs.writeFileSync(path.join(outputRoot, "hakusan.extracted.html"), rewrittenTemplate);

  console.log(
    JSON.stringify(
      {
        extractedAt: new Date().toISOString(),
        inputPath,
        outputRoot,
        assetCount: assetMap.size,
      },
      null,
      2,
    ),
  );
}

main();
