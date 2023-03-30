import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { Canvas, Skia, Shader, Fill, vec, useTouchHandler, useValue, useComputedValue, useClockValue } from '@shopify/react-native-skia';

interface SkiaShaderProps {}

 
const source = Skia.RuntimeEffect.Make(`
uniform float2 center;
uniform float2 pointer;
uniform float clock;

vec4 main(vec2 pos) {
  // vec2 normalized = pos/vec2(256);
  return vec4(abs(sin(clock * 0.0008)), 1., 0.5, 1);
}`)!;

const source2 = Skia.RuntimeEffect.Make(`
uniform float2 window;
uniform float2 center;
uniform float2 pointer;
uniform float clock;

vec4 main(vec2 pos) {
  vec2 st = pos.xy/window;
	return vec4(st.x,st.y,0.0,1.0);
}`)!;

const SkiaShader: React.FC<SkiaShaderProps> = (props) => {
  const {} = props;

  const { width, height } = useWindowDimensions();
  const center = vec(width / 2, height / 2);
  const clock = useClockValue();
  const pointer = useValue(center);
  const window = vec(width, height);

  const onTouch = useTouchHandler({
    onActive: (e) => {
      pointer.current = e;
    }
  })

  const uniforms = useComputedValue(() => {
    return { center, pointer: pointer.current, clock: clock.current, window }
  }, [pointer, clock])

  return (
    <Canvas style={{ flex: 1 }} onTouch={onTouch}>
      <Fill>
        <Shader source={source2} uniforms={uniforms} />
      </Fill>
    </Canvas>
  );
};

export default SkiaShader;
