'use client';

import { useCallback, useEffect, useRef, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { usePlaylistAnimation } from '@/contexts/PlaylistAnimationContext';
import { PLUS_ICON_PATH, PLUS_ICON_SIZE, PLUS_ICON_VIEWBOX } from '@/lib/constants';

const noop = () => () => {};
function useIsClient() {
  return useSyncExternalStore(noop, () => true, () => false);
}

function FlyingIcon() {
  const { animationEvent, targetRef, onAnimationEnd } =
    usePlaylistAnimation();
  const lastIdRef = useRef<number>(0);

  const runAnimation = useCallback(() => {
    if (!animationEvent || animationEvent.id === lastIdRef.current) return;
    lastIdRef.current = animationEvent.id;

    const src = animationEvent.sourceRect;
    const target = targetRef.current;
    const dest = target?.getBoundingClientRect();
    const targetVisible = dest != null && dest.width > 0 && dest.height > 0;

    const el = document.createElement('div');
    el.className = 'playlist-flying-icon';
    el.innerHTML = `<svg width="${PLUS_ICON_SIZE}" height="${PLUS_ICON_SIZE}" viewBox="${PLUS_ICON_VIEWBOX}" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="${PLUS_ICON_PATH}"/></svg>`;

    const srcX = src.left + src.width / 2;
    const srcY = src.top + src.height / 2;

    el.style.position = 'fixed';
    el.style.left = `${srcX}px`;
    el.style.top = `${srcY}px`;
    el.style.zIndex = '9999';
    el.style.pointerEvents = 'none';

    document.body.appendChild(el);

    const onFinish = () => {
      el.remove();
      onAnimationEnd();
    };

    if (!targetVisible) {
      // Mobile fallback: float upward and fade out
      const anim = el.animate(
        [
          { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
          { transform: 'translate(-50%, calc(-50% - 120px)) scale(0.4)', opacity: 0 },
        ],
        { duration: 450, easing: 'cubic-bezier(0.22, 0.6, 0.36, 1)', fill: 'forwards' }
      );
      anim.onfinish = onFinish;
      return;
    }

    const destX = dest.left + dest.width / 2;
    const destY = dest.top + dest.height / 2;

    const dx = destX - srcX;
    const dy = destY - srcY;

    const STEPS = 8;
    const arcHeight = Math.max(100, Math.min(Math.abs(dx) * 0.6, 250));
    const keyframes: Keyframe[] = [];
    for (let i = 0; i <= STEPS; i++) {
      const t = i / STEPS;
      const x = dx * t;
      const y = dy * t + arcHeight * 4 * t * (t - 1);
      const s = 1 - 0.7 * t;
      const o = t < 0.8 ? 1 : 1 - (t - 0.8) / 0.2;
      keyframes.push({
        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${s})`,
        opacity: o,
      });
    }

    const anim = el.animate(keyframes, {
      duration: 550,
      easing: 'linear',
      fill: 'forwards',
    });

    anim.onfinish = onFinish;
  }, [animationEvent, targetRef, onAnimationEnd]);

  useEffect(() => {
    runAnimation();
  }, [runAnimation]);

  return null;
}

export default function PlaylistAnimations() {
  if (!useIsClient()) return null;

  return createPortal(<FlyingIcon />, document.body);
}
