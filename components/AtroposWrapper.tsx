'use client';
import { useEffect, useRef } from 'react';
import Atropos, { AtroposInstance } from 'atropos';

let el: AtroposInstance;

export const AtroposWrapper = ({ children }: any) => {
  const elRef = useRef<any>();

  useEffect(() => {
    el = Atropos({
      el: elRef.current,
      activeOffset: 1000,
      shadowScale: 5
    });

    return () => el?.destroy?.();
  }, []);

  return (
    <div ref={elRef} className="atropos">
      <div className="atropos-scale">
        <div className="atropos-rotate">
          <div className="atropos-inner">{children}</div>
        </div>
      </div>
    </div>
  );
};
