import React from "react";
import { Composition } from "remotion";
import { HelloWorldVideo, HelloWorldVideoProps } from "./HelloWorldVideo";

// Calculate total duration accounting for transitions:
// 4 scenes + 1 code scene, minus transition overlaps
const FPS = 30;
const SCENE_DURATION = Math.round(3.5 * FPS);
const CODE_DURATION = Math.round(5 * FPS);
const TRANSITION_DURATION = Math.round(0.5 * FPS);
const TOTAL_DURATION =
  SCENE_DURATION * 3 +
  CODE_DURATION -
  TRANSITION_DURATION * 3;

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="HelloWorld"
      component={HelloWorldVideo}
      durationInFrames={TOTAL_DURATION}
      fps={FPS}
      width={1920}
      height={1080}
      defaultProps={
        {
          title: "Hello, Remotion!",
          subtitle: "Programmatic video creation with React",
        } satisfies HelloWorldVideoProps
      }
    />
  );
};
