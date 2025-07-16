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
      gsap.to(card, {
        y: -8,
        scale: 1.03,
        duration: 0.1,
        ease: 'power2.out',
      });

      gsap.to(content, {
        y: -2,
        duration: 0.3,
        ease: 'power2.out',
      });

      // Анимация иконки
      gsap.to(content.querySelector('.icon'), {
        scale: 1.2,
        rotation: 5,
        duration: 0.3,
        ease: 'back.out(1.7)',
      });
    };
    const leave = () => {
      gsap.to(card, {
        y: 0,
        scale: 1,
        duration: 0.1,
        ease: 'power2.out',
      });

      gsap.to(content, {
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
      });

      // Возврат иконки
      gsap.to(content.querySelector('.icon'), {
        scale: 1,
        rotation: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    };
    const click = () => {
      gsap.to(card, {
        scale: 0.95,
        duration: 0.1,
        ease: 'power2.out',
        onComplete: () => {
          gsap.to(card, {
            scale: isSelected ? 1.03 : 1,
            duration: 0.2,
            ease: 'back.out(1.7)',
          });
        },
      });

      onSelect(category);
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
