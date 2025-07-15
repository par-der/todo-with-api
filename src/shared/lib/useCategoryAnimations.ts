import { useEffect } from 'react';
import { gsap } from 'gsap';

export function useCategoryEntryAnimation(
  cardRef: React.RefObject<HTMLElement>,
  contentRef: React.RefObject<HTMLElement>,
) {
  useEffect(() => {
    if (!cardRef.current || !contentRef.current) return;
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 20, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.7)' },
    );
  }, []);
}

export function useCategoryHoverAnimation(
  cardRef: React.RefObject<HTMLElement>,
  contentRef: React.RefObject<HTMLElement>,
  category: string,
  onSelect: (cat: string) => void,
  isSelected: boolean,
) {
  useEffect(() => {
    const card = cardRef.current,
      content = contentRef.current;
    if (!card || !content) return;

    const enter = () => {
      /* …gsap.to… */
    };
    const leave = () => {
      /* … */
    };
    const click = () => {
      /* … */
      onSelect(category as any);
    };

    card.addEventListener('mouseenter', enter);
    card.addEventListener('mouseleave', leave);
    card.addEventListener('click', click);
    return () => {
      card.removeEventListener('mouseenter', enter);
      card.removeEventListener('mouseleave', leave);
      card.removeEventListener('click', click);
    };
  }, [category, onSelect, isSelected]);
}

export function useCategorySelectShadow(cardRef: React.RefObject<HTMLElement>, isSelected: boolean) {
  useEffect(() => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      boxShadow: isSelected ? '0 10px 30px rgba(0,0,0,0.2)' : '0 4px 12px rgba(0,0,0,0.1)',
      duration: 0.3,
    });
  }, [isSelected]);
}

export function useContainerEntryAnimation(ref: React.RefObject<HTMLElement>) {
  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' });
  }, []);
}
