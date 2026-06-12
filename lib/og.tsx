import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import path from "path";

export const OG_SIZE = { width: 1200, height: 630 };

export async function brandOg(title: string, subtitle?: string) {
  const [fraunces, newsreader] = await Promise.all([
    readFile(path.join(process.cwd(), "assets/fonts/Fraunces-600.ttf")),
    readFile(path.join(process.cwd(), "assets/fonts/Newsreader-400.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FAF6EF",
          padding: "72px 84px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 28,
          }}
        >
          <div
            style={{
              fontFamily: "Fraunces",
              fontSize: title.length > 50 ? 64 : 76,
              lineHeight: 1.1,
              letterSpacing: "-2px",
              color: "#1C1917",
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
          {subtitle ? (
            <div
              style={{
                fontFamily: "Newsreader",
                fontSize: 30,
                lineHeight: 1.4,
                color: "#57534E",
                maxWidth: 940,
              }}
            >
              {subtitle}
            </div>
          ) : null}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "2px solid #E5DDCD",
            paddingTop: 32,
          }}
        >
          <div
            style={{
              display: "flex",
              fontFamily: "Fraunces",
              fontSize: 34,
              color: "#1C1917",
            }}
          >
            Alonso Grimaldo
            <span style={{ color: "#9A3412" }}>.</span>
          </div>
          <div
            style={{
              fontFamily: "Newsreader",
              fontSize: 26,
              color: "#8A8378",
            }}
          >
            alonsogrimaldo.com
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Fraunces", data: fraunces, weight: 600 },
        { name: "Newsreader", data: newsreader, weight: 400 },
      ],
    }
  );
}
