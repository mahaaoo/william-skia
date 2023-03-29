import React from 'react';
import { useClockValue, useComputedValue } from '@shopify/react-native-skia';

import { Overlay } from './overlay';

interface TelegramLockProps {}

const TelegramLock: React.FC<TelegramLockProps> = (props) => {
  // state
  const clock = useClockValue();
  const progressSkia = useComputedValue(() => {
    return Math.round((clock.current / 2000));
  }, [clock]);

  // render
  return (
    <Overlay progressSkia={progressSkia} />
  );
};

export default TelegramLock;
