"use client";

import { ReactLenis } from '@studio-freight/react-lenis';

export default function SmoothScroll({ children }) {
  return (
    <ReactLenis 
      root 
      options={{
        lerp: 0.08, // The lower the number, the smoother/heavier the scroll
        duration: 0.2, // How long the scroll momentum lasts
        smoothTouch: false, // Usually best to leave false so mobile feels native
      }}
    >
      {children}
    </ReactLenis>
  );
}