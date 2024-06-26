import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { Canvas, Skia, Shader, Fill, vec, useTouchHandler, useValue, useComputedValue, useClockValue } from '@shopify/react-native-skia';

interface IndexProps {}

 
const source = Skia.RuntimeEffect.Make(`
uniform float2 window;
uniform float2 center;
uniform float2 pointer;
uniform float clock;

float plot(vec2 st) {    
  return smoothstep(0.005, 0.0, abs(st.y - st.x));
}

vec4 main(vec2 pos) {
  vec2 st = pos.xy/window;
  float y = st.x;

  vec3 color = vec3(y);

  // Plot a line
  float pct = plot(st);
  color = (1.0-pct)*color+pct*vec3(0.0,1.0,0.0);

  return vec4(color,1.0);
}`)!;

 
const source2 = Skia.RuntimeEffect.Make(`
uniform float2 window;
uniform float2 center;
uniform float2 pointer;
uniform float clock;

float plot(vec2 st, float pct){
  return  smoothstep( pct-0.01, pct, st.y) -
          smoothstep( pct, pct+0.01, st.y);
}

vec4 main(vec2 pos) {
  vec2 st = pos.xy/window;
  // float y = pow(st.x,5.0);
  float y = sqrt(st.x);

  vec3 color = vec3(y);

  // Plot a line
  float pct = plot(st, y);
  color = (1.0-pct)*color+pct*vec3(0.0,1.0,0.0);

  return vec4(color,1.0);
}`)!;



const Index: React.FC<IndexProps> = (props) => {
  const {} = props;

  const { width, height } = useWindowDimensions();
  const center = vec(width / 2, height / 2);
  const clock = useClockValue();
  const pointer = useValue(center);
  const window = vec(width, width);

  const onTouch = useTouchHandler({
    onActive: (e) => {
      pointer.current = e;
    }
  })

  const uniforms = useComputedValue(() => {
    return { center, pointer: pointer.current, clock: clock.current, window }
  }, [pointer, clock])

  return (
    <Canvas style={{ width, height: width }} onTouch={onTouch}>
      <Fill>
        <Shader source={source2} uniforms={uniforms} />
      </Fill>
    </Canvas>
  );
};

export default Index;
