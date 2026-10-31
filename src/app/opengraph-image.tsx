import { ImageResponse } from "next/og";

export const alt = "VoteWise India: first vote? Chill, we got you.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "72px 90px",
          color: "#fbf6ff",
          background:
            "radial-gradient(circle at 92% 0%, rgba(242,37,140,0.55), transparent 45%), radial-gradient(circle at 0% 100%, rgba(16,181,166,0.45), transparent 45%), #140c3a",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 720 }}>
          <div style={{ fontSize: 34, color: "#ffb627", fontWeight: 700 }}>VoteWise India</div>
          <div style={{ fontSize: 96, fontWeight: 800, lineHeight: 1, marginTop: 24, letterSpacing: -2 }}>
            First vote? Chill, we got you.
          </div>
          <div style={{ fontSize: 32, color: "#c4b8e8", marginTop: 32 }}>
            Check if you can vote · Practise on the EVM · Beat the quiz
          </div>
        </div>
        <div
          style={{
            width: 230,
            height: 400,
            borderRadius: 60,
            background: "#2a1e6b",
            display: "flex",
            justifyContent: "center",
            overflow: "hidden",
            boxShadow: "inset 0 10px 20px rgba(255,255,255,0.25)",
          }}
        >
          <div
            style={{
              marginTop: 60,
              width: 120,
              height: 420,
              borderRadius: 60,
              background: "linear-gradient(90deg, #8f5634, #c98a5e 40%, #7e4a2b)",
              display: "flex",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <div style={{ marginTop: 18, width: 80, height: 96, borderRadius: 40, background: "#f3d2bd", display: "flex" }} />
            <div
              style={{
                position: "absolute",
                top: 22,
                left: 51,
                width: 18,
                height: 130,
                borderRadius: 9,
                background: "#5a2fd0",
              }}
            />
          </div>
        </div>
      </div>
    ),
    size,
  );
}
