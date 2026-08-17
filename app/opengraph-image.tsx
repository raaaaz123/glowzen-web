import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { SITE_NAME, TAGLINE } from "@/lib/site";

/**
 * The card every share, iMessage preview and AI answer thumbnail uses.
 *
 * Generated rather than shipped as a PNG so it stays in step with the name
 * and tagline. Satori supports flexbox only — no grid, no shorthand colour
 * functions — so the styles here are more literal than the site's Tailwind.
 *
 * The hexes are the dark palette from globals.css, hand-copied because Satori
 * cannot read CSS variables. They have to be kept in step by hand: a share
 * card still on the old white background is the first thing anyone sees of the
 * site, and it would be the one surface that never got the redesign.
 */

export const alt = `${SITE_NAME} — ${TAGLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const icon = await readFile(join(process.cwd(), "public/glowzen-icon.png"));
  const iconSrc = `data:image/png;base64,${icon.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "88px",
          backgroundImage: "linear-gradient(135deg, #0b0918, #07060d)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={iconSrc}
            width={104}
            height={104}
            alt=""
            style={{ borderRadius: "26px" }}
          />
          <span style={{ fontSize: 54, fontWeight: 800, color: "#f4f2ff" }}>
            {SITE_NAME}
          </span>
        </div>

        {/* Each text block is its own flex row and each line is its own div.
            Satori mis-measures the height of text it wraps itself, which
            silently overlaps the block below — pre-broken lines can't. */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "44px",
            fontSize: 80,
            fontWeight: 700,
            color: "#f4f2ff",
          }}
        >
          <div style={{ display: "flex" }}>Sculpt, lift &amp; glow</div>
          <div style={{ display: "flex", marginTop: "8px" }}>— naturally</div>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: "36px",
            fontSize: 36,
            color: "#a9a3c4",
          }}
        >
          Eight minutes a day. No equipment, no procedures.
        </div>

        <div style={{ display: "flex", marginTop: "52px", gap: "18px" }}>
          {["18 exercises", "7 face zones", "iPhone"].map((pill) => (
            <div
              key={pill}
              style={{
                display: "flex",
                padding: "16px 32px",
                borderRadius: "999px",
                backgroundColor: "#1c1830",
                color: "#b9a0ff",
                fontSize: 30,
                fontWeight: 700,
              }}
            >
              {pill}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
