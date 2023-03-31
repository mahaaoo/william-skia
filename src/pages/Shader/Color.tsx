import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { Canvas, Skia, Shader, Fill, vec, useTouchHandler, useValue, useComputedValue, useClockValue } from '@shopify/react-native-skia';

interface IndexProps {}

 
const source = Skia.RuntimeEffect.Make(`
uniform float2 window;
uniform float2 center;
uniform float2 pointer;
uniform float clock;

vec3 colorA = vec3(0.149,0.141,0.912);
vec3 colorB = vec3(1.000,0.833,0.224);

vec4 main(vec2 pos) {
  vec3 color = vec3(0.0);

  float pct = abs(sin(clock));

  // Mix uses pct (a value from 0-1) to
  // mix the two colors
  color = mix(colorA, colorB, pct);

  return vec4(color,1.0);
}`)!;

 
const source2 = Skia.RuntimeEffect.Make(`
uniform float2 window;
uniform float2 center;
uniform float2 pointer;
uniform float clock;

vec3 colorA = vec3(0.149,0.141,0.912);
vec3 colorB = vec3(1.000,0.833,0.224);

float plot (vec2 st, float pct){
  return  smoothstep( pct-0.01, pct, st.y) -
          smoothstep( pct, pct+0.01, st.y);
}

vec4 main(vec2 pos) {
  vec2 st = pos.xy/window;
  vec3 color = vec3(0.0);

  vec3 pct = vec3(st.x);

  pct.r = smoothstep(0.0,1.0, st.x);
  pct.g = sin(st.x*3.14);
  pct.b = pow(st.x,0.5);

  // Mix uses pct (a value from 0-1) to
  // mix the two colors
  color = mix(colorA, colorB, pct);

  color = mix(color,vec3(1.0,0.0,0.0),plot(st,pct.r));
  color = mix(color,vec3(0.0,1.0,0.0),plot(st,pct.g));
  color = mix(color,vec3(0.0,0.0,1.0),plot(st,pct.b));

  return vec4(color, 1.0);
}`)!;

const source3 = Skia.RuntimeEffect.Make(`
uniform float2 window;
uniform float2 center;
uniform float2 pointer;
uniform float clock;


vec3 hsb2rgb( in vec3 c ){
  vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),
                           6.0)-3.0)-1.0,
                   0.0,
                   1.0 );
  rgb = rgb*rgb*(3.0-2.0*rgb);
  return c.z * mix( vec3(1.0), rgb, c.y);
}

vec4 main(vec2 pos) {
  vec2 st = pos.xy/window;
  vec3 color = vec3(0.0);

  vec2 toCenter = vec2(0.5)-st;
  float angle = atan(toCenter.y,toCenter.x);
  float radius = length(toCenter)*2.0;

  // Map the angle (-PI to PI) to the Hue (from 0 to 1)
  // and the Saturation to the radius
  color = hsb2rgb(vec3((angle/6.28)+0.5,radius,1.0));

  return vec4(color, 1.0);
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
    return { center, pointer: pointer.current, clock: clock.current / 1000, window }
  }, [pointer, clock])

  return (
    <Canvas style={{ width, height: width }} onTouch={onTouch}>
      <Fill>
        <Shader source={source3} uniforms={uniforms} />
      </Fill>
    </Canvas>
  );
};

export default Index;
