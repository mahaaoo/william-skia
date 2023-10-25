// import { Skia, Canvas, Fill, ImageShader, Shader, useImage, useComputedValue } from '@shopify/react-native-skia';
// import React, { useCallback, useMemo } from 'react';
// import {View, Dimensions} from 'react-native';
// import { Gesture, GestureDetector } from 'react-native-gesture-handler';
// import { runOnJS, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';

// const { width, height } = Dimensions.get("window");

// interface IndexProps {
// };

// const snapPoint = (
//   value: number,
//   velocity: number,
//   points: ReadonlyArray<number>
// ): number => {
//   "worklet";
//   const point = value + 0.2 * velocity;
//   const deltas = points.map((p) => Math.abs(point - p));
//   const minDelta = Math.min.apply(null, deltas);
//   return points.filter((p) => Math.abs(point - p) === minDelta)[0];
// };

// const clamp = (
//   value: number,
//   lowerBound: number,
//   upperBound: number
// ) => {
//   'worklet';
//   return Math.min(Math.max(lowerBound, value), upperBound);
// };

// const source = Skia.RuntimeEffect.Make(`
// uniform shader image1;
// uniform shader image2;

// uniform float progress;
// uniform float2 resolution;

// half4 getFromColor(float2 uv) {
//   return image1.eval(uv * resolution);
// }

// half4 getToColor(float2 uv) {
//   return image2.eval(uv * resolution);
// }

// vec4 transition(vec2 uv) {
//   return mix(
//     getFromColor(uv),
//     getToColor(uv),
//     progress
//   );
// }

// half4 main(vec2 xy) {
//   vec2 uv = xy / resolution;
//   return transition(uv);
// }
// `)

// const Index: React.FC<IndexProps> = props => {
//   const {} = props;
//   const image1 = useImage(require('./1.jpg'));
//   const image = useImage(require('./2.jpg'));
//   const progressLeft = useSharedValue(0);
//   const offset = useSharedValue(0);

//   const next = useCallback(() => {
//     offset.value += 1;
//     progressLeft.value = 0;
//   }, [offset, progressLeft]);

//   const left = useMemo(
//     () =>
//       Gesture.Pan()
//         .activeOffsetX(-10)
//         .onChange((pos) => {
//           progressLeft.value = progressLeft.value - pos.changeX / width;
//         })
//         .onEnd(({ velocityX }) => {
//           const dst = snapPoint(progressLeft.value, -velocityX / width, [0, 1]);
//           console.log('asd', dst)
//           progressLeft.value = withTiming(dst, { duration: 100 }, () => {
//             // runOnJS(next)();
//           });
//         }),
//     [next, progressLeft]
//   );

//   const uniformsLeft = useComputedValue(() => {
//     return {
//       progress: progressLeft.value,
//       resolution: [width, height],
//     };
//   }, [progressLeft]);

//   return (
//     <View style={{ flex: 1 }}>
//       <GestureDetector gesture={left}>
//         <Canvas style={{ flex: 1 }}>
//           <Fill>
//             <Shader source={source} uniforms={uniformsLeft}>
//               <ImageShader
//                 image={image}
//                 fit="cover"
//                 width={width}
//                 height={height}
//               />
//               <ImageShader
//                 image={image1}
//                 fit="cover"
//                 width={width}
//                 height={height}
//               />
//             </Shader>
//           </Fill>
//         </Canvas>
//       </GestureDetector>
//     </View>
//   )
// };

// export default Index;

import React, { useCallback, useMemo } from "react";
import { Dimensions, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import {
  runOnJS,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {
  Canvas,
  Fill,
  ImageShader,
  Shader,
  Skia,
  clamp,
  useImage,
} from "@shopify/react-native-skia";

// import { snapPoint } from "./Math";
const snapPoint = (
  value: number,
  velocity: number,
  points: ReadonlyArray<number>
): number => {
  "worklet";
  const point = value + 0.2 * velocity;
  const deltas = points.map((p) => Math.abs(point - p));
  const minDelta = Math.min.apply(null, deltas);
  return points.filter((p) => Math.abs(point - p) === minDelta)[0];
};

// import {
//   transition,
//   cube,
//   pageCurl,
//   glitchMemories,
//   swirl,
//   swap,
// } from "./transitions/index";
// import { useAssets } from "./Assets";

const source = Skia.RuntimeEffect.Make(`
uniform shader image1;
uniform shader image2;

uniform float progress;
uniform float2 resolution;

half4 getFromColor(float2 uv) {
  return image1.eval(uv * resolution);
}

half4 getToColor(float2 uv) {
  return image2.eval(uv * resolution);
}

vec4 transition(vec2 uv) {
  return mix(
    getFromColor(uv),
    getToColor(uv),
    progress
  );
}

half4 main(vec2 xy) {
  vec2 uv = xy / resolution;
  return transition(uv);
}
`)

const useAssets = () => {
  const image1 = useImage(require("./1.jpg"));
  const image2 = useImage(require("./2.jpg"));
  const image3 = useImage(require("./3.jpg"));
  const image4 = useImage(require("./4.jpg"));
  const image5 = useImage(require("./5.jpg"));
  const image6 = useImage(require("./6.jpg"));
  const image7 = useImage(require("./7.jpg"));
  if (
    !image1 ||
    !image2 ||
    !image3 ||
    !image4 ||
    !image5 ||
    !image6 ||
    !image7
  ) {
    return null;
  }
  return [image1, image2, image3, image4, image5, image6, image7];
};

const { width, height } = Dimensions.get("window");
// const transitions = [
//   cube,
//   pageCurl,
//   cube,
//   glitchMemories,
//   swirl,
//   swap,
//   cube,
// ].map((t) => transition(t));

/*
 // Example usage:
const arr = [1, 2, 3, 4, 5];
console.log(getElementAtIndex(arr, 7)); // Output: 3
console.log(getElementAtIndex(arr, -2)); // Output: 4
*/
const at = <T,>(array: T[] | null, index: number): T | null => {
  "worklet";
  if (array === null) {
    return null;
  }
  return array[((index % array.length) + array.length) % array.length];
};

const duration = 100;

const Transitions = () => {
  const offset = useSharedValue(0);
  const progressLeft = useSharedValue(0);
  const progressRight = useSharedValue(0);
  const assets = useAssets();
  const next = useCallback(() => {
    offset.value += 1;
    progressLeft.value = 0;
  }, [offset, progressLeft]);
  const previous = useCallback(() => {
    offset.value -= 1;
    progressRight.value = 0;
  }, [offset, progressRight]);
  const panRight = useMemo(
    () =>
      Gesture.Pan()
        .onBegin(() => {
          progressRight.value = 0;
        })
        .activeOffsetX(10)
        .onChange((pos) => {
          progressRight.value = clamp(
            progressRight.value + pos.changeX / width,
            0,
            1
          );
        })
        .onEnd(({ velocityX }) => {
          const dst = snapPoint(progressRight.value, velocityX / width, [0, 1]);
          progressRight.value = withTiming(dst, { duration }, () => {
            runOnJS(previous)();
          });
        }),
    [previous, progressRight]
  );
  const panLeft = useMemo(
    () =>
      Gesture.Pan()
        .activeOffsetX(-10)
        .onChange((pos) => {
          progressLeft.value = clamp(
            progressLeft.value - pos.changeX / width,
            0,
            1
          );
        })
        .onEnd(({ velocityX }) => {
          const dst = snapPoint(progressLeft.value, -velocityX / width, [0, 1]);
          progressLeft.value = withTiming(dst, { duration }, () => {
            runOnJS(next)();
          });
        }),
    [next, progressLeft]
  );

  const uniformsRight = useDerivedValue(() => {
    return {
      progress: progressRight.value,
      resolution: [width, height],
    };
  });

  const uniformsLeft = useDerivedValue(() => {
    return {
      progress: progressLeft.value,
      resolution: [width, height],
    };
  });
  // const transition1 = useDerivedValue(() => {
  //   return at(transitions, offset.value - 1)!;
  // });

  const transition2 = useDerivedValue(() => {
    return source;
  });

  const assets1 = useDerivedValue(() => {
    return at(assets, offset.value - 1);
  });

  const assets2 = useDerivedValue(() => {
    return at(assets, offset.value);
  });

  const assets3 = useDerivedValue(() => {
    return at(assets, offset.value + 1);
  });

  if (!assets) {
    return null;
  }
  return (
    <View style={{ flex: 1 }}>
      <GestureDetector gesture={Gesture.Race(panRight, panLeft)}>
        <Canvas style={{ flex: 1 }}>
          <Fill>
            <Shader source={source} uniforms={uniformsLeft}>
              <ImageShader
                image={assets2}
                fit="cover"
                width={width}
                height={height}
              />
              <ImageShader
                image={assets3}
                fit="cover"
                width={width}
                height={height}
              />
            </Shader>
          </Fill>
        </Canvas>
      </GestureDetector>
    </View>
  );
};

export default Transitions;
