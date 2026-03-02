'use client';

import { useEffect, useRef, useCallback, useState, type ReactNode } from 'react';
import { X } from 'lucide-react';

interface FilterBottomSheetProps {
  open: boolean;
  onClose: () => void;
  gameCount: number;
  children: ReactNode;
}

const DISMISS_THRESHOLD = 120;

export default function FilterBottomSheet({
  open,
  onClose,
  gameCount,
  children,
}: FilterBottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const dragState = useRef<{ startY: number; startTranslate: number } | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!open) {
      setDragOffset(0);
      return;
    }
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    dragState.current = { startY: e.clientY, startTranslate: 0 };
    setIsDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragState.current) return;
    const dy = Math.max(0, e.clientY - dragState.current.startY);
    setDragOffset(dy);
  }, []);

  const handlePointerUp = useCallback(() => {
    if (!dragState.current) return;
    if (dragOffset > DISMISS_THRESHOLD) {
      onClose();
    }
    setDragOffset(0);
    setIsDragging(false);
    dragState.current = null;
  }, [dragOffset, onClose]);

  const translateStyle = open
    ? { transform: `translateY(${dragOffset}px)` }
    : { transform: 'translateY(100%)' };

  return (
    <div
      className={`fixed inset-0 z-50 lg:hidden ${open ? 'visible' : 'invisible'}`}
      aria-hidden={!open}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-200 ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />

      {/* Sheet */}
      <div
        ref={sheetRef}
        className={`absolute inset-x-0 bottom-0 max-h-[85vh] bg-background rounded-t-2xl border-t-3 border-x-3 border-foreground shadow-xl flex flex-col ${isDragging ? '' : 'transition-transform duration-300 ease-out'}`}
        style={translateStyle}
      >
        {/* Drag handle */}
        <div
          className="flex flex-col items-center pt-3 pb-2 cursor-grab active:cursor-grabbing touch-none"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          <div className="w-10 h-1.5 rounded-full bg-gray-300" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 pb-3 border-b-2 border-gray-200">
          <h2 className="text-2xl font-display font-bold uppercase tracking-wider text-foreground">
            Filters
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 active:scale-90"
          >
            <X size={22} strokeWidth={3} />
          </button>
        </div>

        {/* Scrollable filter content */}
        <div className="flex-1 overflow-y-auto p-4 sidebar-scroll">
          {children}
        </div>

        {/* Sticky footer */}
        <div className="shrink-0 px-4 py-3 border-t-2 border-gray-200 bg-background">
          <button
            type="button"
            onClick={onClose}
            className="w-full px-4 py-3 bg-foreground text-white font-bold rounded-xl uppercase tracking-wider text-sm hover-btn border-3 border-foreground"
          >
            Show {gameCount} {gameCount === 1 ? 'game' : 'games'}
          </button>
        </div>
      </div>
    </div>
  );
}
