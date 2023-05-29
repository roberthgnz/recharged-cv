'use client';
import { useCallback, useContext, useEffect, useRef } from 'react';
import { CVEditorScoreContext } from '@/cv-editor-score';
import { Badge, Text } from '@tremor/react';

import ReactCanvasConfetti from 'react-canvas-confetti';

const colors: any = {
  0: 'bg-red-500',
  25: 'bg-yellow-500',
  50: 'bg-yellow-500',
  75: 'bg-green-500',
  100: 'bg-green-500'
};

const canvasStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0
};

export const ResumeScore = () => {
  const refAnimationInstance = useRef<any>(null);

  const { state: score } = useContext(CVEditorScoreContext);

  const color = Object.keys(colors).reduce((acc, key) => {
    if (score >= Number(key)) {
      return colors[key];
    }
    return acc;
  }, 'red');

  const getInstance = useCallback((instance: any) => {
    refAnimationInstance.current = instance;
  }, []);

  const startAnimation = () => {
    refAnimationInstance.current();
  };

  useEffect(() => {
    if (score === 100) {
      startAnimation();
    }
  }, [score]);

  return (
    <div>
      <div className="flex items-center space-x-3">
        <Badge color={color.split('-')[1] as any}>{score}%</Badge>{' '}
        <Text className="text-white">Resume score</Text>
      </div>
      <div className="h-0.5 bg-gray-200">
        <div
          className={`h-full ${color} mt-2`}
          style={{ width: `${score}%` }}
        ></div>
      </div>
      <ReactCanvasConfetti
        refConfetti={getInstance}
        style={canvasStyles as any}
      />
    </div>
  );
};
