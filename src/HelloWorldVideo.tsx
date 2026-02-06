import React from "react";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { useVideoConfig } from "remotion";
import { TitleScene } from "./scenes/TitleScene";
import { FeatureScene } from "./scenes/FeatureScene";
import { CodeScene } from "./scenes/CodeScene";
import { OutroScene } from "./scenes/OutroScene";

export type HelloWorldVideoProps = {
  title: string;
  subtitle: string;
};

export const HelloWorldVideo: React.FC<HelloWorldVideoProps> = ({
  title,
  subtitle,
}) => {
  const { fps } = useVideoConfig();

  const sceneDuration = Math.round(3.5 * fps);
  const codeDuration = Math.round(5 * fps);
  const transitionDuration = Math.round(0.5 * fps);

  return (
    <TransitionSeries>
      {/* Scene 1: Title */}
      <TransitionSeries.Sequence durationInFrames={sceneDuration}>
        <TitleScene
          title={title}
          subtitle={subtitle}
          backgroundColor="#0f0f23"
          textColor="#e2e8f0"
        />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: transitionDuration })}
      />

      {/* Scene 2: Features */}
      <TransitionSeries.Sequence durationInFrames={sceneDuration}>
        <FeatureScene
          heading="What Makes It Great"
          features={[
            { icon: "\u26A1", label: "Fast" },
            { icon: "\uD83C\uDFA8", label: "Beautiful" },
            { icon: "\uD83D\uDD27", label: "Flexible" },
            { icon: "\uD83D\uDE80", label: "Scalable" },
          ]}
          backgroundColor="#1a1a2e"
          accentColor="#4361ee"
        />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={slide({ direction: "from-right" })}
        timing={linearTiming({ durationInFrames: transitionDuration })}
      />

      {/* Scene 3: Code demo */}
      <TransitionSeries.Sequence durationInFrames={codeDuration}>
        <CodeScene
          code={`import { spring } from "remotion";

const scale = spring({
  frame,
  fps,
  config: { damping: 200 },
});`}
          caption="Animations powered by React"
          backgroundColor="#16213e"
        />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: transitionDuration })}
      />

      {/* Scene 4: Outro */}
      <TransitionSeries.Sequence durationInFrames={sceneDuration}>
        <OutroScene
          message="Start Creating"
          callToAction="Try Remotion"
          backgroundColor="#0f0f23"
          accentColor="#7c3aed"
        />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
