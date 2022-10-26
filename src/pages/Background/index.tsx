import type { SkiaValue } from "@shopify/react-native-skia";
import {
  Fill,
  RadialGradient,
  vec,
  useComputedValue,
  mixColors,
} from "@shopify/react-native-skia";
import React from "react";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const c = vec(width / 2, height / 2);
const r = width / 2;

interface BackgroundProps {
  progress?: SkiaValue<number>;
}

export const Background = ({ progress }: BackgroundProps) => {
  const colors = useComputedValue(
    () => [mixColors(progress?.current ?? 1, "#040404", "#303030"), "#040404"],
    [progress]
  );
  return (
    <Fill>
      <RadialGradient c={c} r={r} colors={colors} />
    </Fill>
  );
};