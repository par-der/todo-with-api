import { useCallback, useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * Плавное появление карточки при монтировании.
 */
export function useCategoryEntryAnimation(cardRef: React.RefObject<HTMLElement>) {
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    gsap.fromTo(
      card,
      { opacity: 0, y: 20, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.7)' },
    );
  }, []);
}

/**
 * Hover / Click анимации (таймлайн + play/reverse).
 */
export function useCategoryHoverAnimation(
  cardRef: React.RefObject<HTMLElement>,
  contentRef: React.RefObject<HTMLElement>,
  category: string,
  onSelect: (cat: string) => void,
  isSelected: boolean,
) {
  const hoverTl = useRef<gsap.core.Timeline | null>(null);
  const iconEl = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const card = cardRef.current;
    const content = contentRef.current;
    if (!card || !content) return;

    iconEl.current = content.querySelector<HTMLElement>('.icon') || null;

    // Начальные значения (важно! чтобы reset не искал их в computed стилях)
    gsap.set(card, { y: 0, scale: 1 });
    gsap.set(content, { y: 0 });
    if (iconEl.current) gsap.set(iconEl.current, { scale: 1, rotation: 0 });

    const tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.out' } });
    tl.to(card, { y: -8, scale: 1.03, duration: 0.12 }, 0).to(content, { y: -2, duration: 0.2 }, 0);
    if (iconEl.current) {
      tl.to(iconEl.current, { scale: 1.2, rotation: 5, duration: 0.25, ease: 'back.out(1.7)' }, 0);
    }

    hoverTl.current = tl;

    return () => {
      tl.kill();
      hoverTl.current = null;
    };
  }, []); // один раз

  const handleMouseEnter = useCallback(() => {
    hoverTl.current?.play();
  }, []);

  const handleMouseLeave = useCallback(() => {
    hoverTl.current?.reverse();
  }, []);

  const handleClick = useCallback(() => {
    const card = cardRef.current;
    if (card) {
      // короткий press-эффект — не конфликтует с hoverTl, т.к. мы анимируем "от значения" к целевому
      gsap.fromTo(
        card,
        { scale: 1 },
        {
          scale: isSelected ? 1.03 : 1,
          duration: 0.16,
          ease: 'back.out(1.7)',
        },
      );
    }
    onSelect(category);
  }, [category, onSelect, isSelected]);

  return useMemo(
    () => ({
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onClick: handleClick,
    }),
    [handleMouseEnter, handleMouseLeave, handleClick],
  );
}

/**
 * Тень при выборе.
 */
export function useCategorySelectShadow(cardRef: React.RefObject<HTMLElement>, isSelected: boolean) {
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    gsap.to(el, {
      boxShadow: isSelected ? '0 10px 30px rgba(0,0,0,0.2)' : '0 4px 12px rgba(0,0,0,0.1)',
      duration: 0.25,
      ease: 'power2.out',
    });
  }, [isSelected]);
}

/**
 * Появление контейнера (например, списка категорий).
 */
export function useContainerEntryAnimation(ref: React.RefObject<HTMLElement>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(el, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' });
  }, []);
}
