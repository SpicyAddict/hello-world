import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export type TitleSceneProps = {
  title: string;
  subtitle: string;
  backgroundColor: string;
  textColor: string;
};

export const TitleScene: React.FC<TitleSceneProps> = ({
  title,
  subtitle,
  backgroundColor,
  textColor,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Spring animation for the title scale
  const titleScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 200 },
  });

  // Fade in the title
  const titleOpacity = interpolate(frame, [0, 0.5 * fps], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Subtitle enters with a delay
  const subtitleProgress = spring({
    frame,
    fps,
    delay: Math.round(0.4 * fps),
    config: { damping: 200 },
  });

  const subtitleTranslateY = interpolate(subtitleProgress, [0, 1], [30, 0]);
  const subtitleOpacity = interpolate(subtitleProgress, [0, 1], [0, 1]);

  // Decorative line grows in width
  const lineWidth = interpolate(
    spring({
      frame,
      fps,
      delay: Math.round(0.6 * fps),
      config: { damping: 200 },
    }),
    [0, 1],
    [0, 200]
  );

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
          gap: 20,
        }}
      >
        <h1
          style={{
            fontSize: 80,
            fontWeight: "bold",
            color: textColor,
            fontFamily: "Arial, sans-serif",
            transform: `scale(${titleScale})`,
            opacity: titleOpacity,
            margin: 0,
            textAlign: "center",
            padding: "0 60px",
          }}
        >
          {title}
        </h1>

        <div
          style={{
            width: lineWidth,
            height: 4,
            backgroundColor: textColor,
            borderRadius: 2,
            opacity: 0.6,
          }}
        />

        <p
          style={{
            fontSize: 36,
            color: textColor,
            fontFamily: "Arial, sans-serif",
            opacity: subtitleOpacity,
            transform: `translateY(${subtitleTranslateY}px)`,
            margin: 0,
            textAlign: "center",
            padding: "0 80px",
          }}
        >
          {subtitle}
        </p>
      </div>
    </AbsoluteFill>
  );
};
