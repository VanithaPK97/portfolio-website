import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const alt = `${profile.name}, ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Link preview card for LinkedIn, Slack and email clients.
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#0b0d11",
          color: "#e9ecf1",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, color: "#949daa" }}>
          {profile.name}, {profile.role}
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 68, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05 }}>
          <span>{profile.headline[0]}</span>
          <span style={{ color: "#6ee7b7" }}>{profile.headline[1]}</span>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#c3c9d3" }}>
          Java / Spring Boot / React / PostgreSQL / AWS
        </div>
      </div>
    ),
    size,
  );
}
