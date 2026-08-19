/* Genera favicon y OG image derivados del isotipo sobre --arena.
   Uso: node scripts/generar-assets.mjs */
import sharp from "sharp";

const ARENA = "#DCD1C2";

/* Favicon: isotipo centrado sobre arena, 512x512 */
const isotipo = await sharp("public/innerlogo.png")
  .resize(400, 400, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .toBuffer();

await sharp({
  create: { width: 512, height: 512, channels: 4, background: ARENA },
})
  .composite([{ input: isotipo, gravity: "center" }])
  .png()
  .toFile("app/icon.png");

/* OG image: wordmark centrado sobre arena, 1200x630 */
const wordmark = await sharp("public/inner.png")
  .resize(520, 520, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .toBuffer();

await sharp({
  create: { width: 1200, height: 630, channels: 4, background: ARENA },
})
  .composite([{ input: wordmark, gravity: "center" }])
  .png()
  .toFile("public/og.png");

console.log("assets generados: app/icon.png, public/og.png");
