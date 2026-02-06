import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export type OutroSceneProps = {
  message: string;
  callToAction: string;
  backgroundColor: string;
  accentColor: string;
};

export const OutroScene: React.FC<OutroSceneProps> = ({
  message,
  callToAction,
  backgroundColor,
  accentColor,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Message entrance with bounce
  const messageEntrance = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 100 },
  });

  const messageScale = interpolate(messageEntrance, [0, 1], [0.3, 1]);
  const messageOpacity = interpolate(messageEntrance, [0, 1], [0, 1]);

  // CTA button entrance
  const ctaEntrance = spring({
    frame,
    fps,
    delay: Math.round(0.5 * fps),
    config: { damping: 200 },
  });

  const ctaTranslateY = interpolate(ctaEntrance, [0, 1], [40, 0]);
  const ctaOpacity = interpolate(ctaEntrance, [0, 1], [0, 1]);

  // Subtle pulsing glow on the CTA after it appears
  const pulsePhase = Math.sin((frame / fps) * Math.PI * 2 * 0.8);
  const glowIntensity = interpolate(pulsePhase, [-1, 1], [0.3, 0.6]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 40,
        }}
      >
        <h1
          style={{
            fontSize: 72,
            fontWeight: "bold",
            color: "#ffffff",
            fontFamily: "Arial, sans-serif",
            transform: `scale(${messageScale})`,
            opacity: messageOpacity,
            margin: 0,
            textAlign: "center",
            padding: "0 60px",
          }}
        >
          {message}
        </h1>

        <div
          style={{
            opacity: ctaOpacity,
            transform: `translateY(${ctaTranslateY}px)`,
          }}
        >
          <div
            style={{
              backgroundColor: accentColor,
              padding: "18px 48px",
              borderRadius: 50,
              fontSize: 32,
              fontWeight: "bold",
              color: "#ffffff",
              fontFamily: "Arial, sans-serif",
              boxShadow: `0 0 ${30 + glowIntensity * 30}px ${accentColor}`,
            }}
          >
            {callToAction}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
