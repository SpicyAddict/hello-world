import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export type CodeSceneProps = {
  code: string;
  caption: string;
  backgroundColor: string;
};

export const CodeScene: React.FC<CodeSceneProps> = ({
  code,
  caption,
  backgroundColor,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Typewriter effect: reveal code character by character
  const totalChars = code.length;
  const typingDuration = 2 * fps;
  const charsToShow = Math.min(
    totalChars,
    Math.floor(
      interpolate(frame, [0.3 * fps, 0.3 * fps + typingDuration], [0, totalChars], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    )
  );

  const visibleCode = code.slice(0, charsToShow);

  // Blinking cursor
  const cursorOpacity =
    charsToShow < totalChars ? (Math.floor(frame / (fps * 0.5)) % 2 === 0 ? 1 : 0) : 0;

  // Card entrance animation
  const cardEntrance = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  const cardScale = interpolate(cardEntrance, [0, 1], [0.9, 1]);
  const cardOpacity = interpolate(cardEntrance, [0, 1], [0, 1]);

  // Caption fade in after code is typed
  const captionOpacity = interpolate(
    frame,
    [0.3 * fps + typingDuration, 0.3 * fps + typingDuration + 0.5 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor,
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
          alignItems: "center",
          transform: `scale(${cardScale})`,
          opacity: cardOpacity,
          width: "85%",
        }}
      >
        <div
          style={{
            backgroundColor: "#1e1e2e",
            borderRadius: 16,
            padding: 32,
            width: "100%",
            boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
          }}
        >
          {/* Window chrome dots */}
          <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: "50%",
                backgroundColor: "#ff5f57",
              }}
            />
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: "50%",
                backgroundColor: "#febc2e",
              }}
            />
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: "50%",
                backgroundColor: "#28c840",
              }}
            />
          </div>

          <pre
            style={{
              fontSize: 24,
              fontFamily: "'Courier New', monospace",
              color: "#cdd6f4",
              margin: 0,
              whiteSpace: "pre-wrap",
              lineHeight: 1.5,
            }}
          >
            {visibleCode}
            <span style={{ opacity: cursorOpacity, color: "#89b4fa" }}>|</span>
          </pre>
        </div>

        <p
          style={{
            fontSize: 28,
            color: "#ffffff",
            fontFamily: "Arial, sans-serif",
            opacity: captionOpacity,
            margin: 0,
            textAlign: "center",
          }}
        >
          {caption}
        </p>
      </div>
    </AbsoluteFill>
  );
};
