import React from "react";
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type FeatureItem = {
  icon: string;
  label: string;
};

export type FeatureSceneProps = {
  heading: string;
  features: FeatureItem[];
  backgroundColor: string;
  accentColor: string;
};

const FeatureCard: React.FC<{
  icon: string;
  label: string;
  accentColor: string;
}> = ({ icon, label, accentColor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 180 },
  });

  const scale = interpolate(entrance, [0, 1], [0.5, 1]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        transform: `scale(${scale})`,
        opacity,
      }}
    >
      <div
        style={{
          width: 100,
          height: 100,
          borderRadius: 20,
          backgroundColor: accentColor,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 48,
        }}
      >
        {icon}
      </div>
      <span
        style={{
          fontSize: 22,
          fontFamily: "Arial, sans-serif",
          color: "#ffffff",
          fontWeight: 600,
          textAlign: "center",
          maxWidth: 140,
        }}
      >
        {label}
      </span>
    </div>
  );
};

export const FeatureScene: React.FC<FeatureSceneProps> = ({
  heading,
  features,
  backgroundColor,
  accentColor,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headingOpacity = interpolate(frame, [0, 0.4 * fps], [0, 1], {
    extrapolateRight: "clamp",
  });

  const headingTranslateY = interpolate(frame, [0, 0.4 * fps], [-20, 0], {
    extrapolateRight: "clamp",
  });

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
          alignItems: "center",
          gap: 50,
          width: "100%",
        }}
      >
        <h2
          style={{
            fontSize: 56,
            fontWeight: "bold",
            color: "#ffffff",
            fontFamily: "Arial, sans-serif",
            opacity: headingOpacity,
            transform: `translateY(${headingTranslateY}px)`,
            margin: 0,
            textAlign: "center",
          }}
        >
          {heading}
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 40,
            flexWrap: "wrap",
          }}
        >
          {features.map((feature, index) => (
            <Sequence
              key={index}
              from={Math.round(0.3 * fps + index * 0.15 * fps)}
              layout="none"
            >
              <FeatureCard
                icon={feature.icon}
                label={feature.label}
                accentColor={accentColor}
              />
            </Sequence>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
