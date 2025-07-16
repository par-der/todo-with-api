import React, { useRef } from 'react';
import { Category, CATEGORY_LABELS } from '@/entities/todo';
import {
  useCategoryEntryAnimation,
  useCategoryHoverAnimation,
  useCategorySelectShadow,
} from '@/shared/lib/useCategoryAnimations.ts';

interface CategoryCardProps {
  category: Category;
  count: number;
  color: string;
  icon: React.ReactNode;
  onSelect: (category: Category) => void;
  isSelected: boolean;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, count, color, icon, onSelect, isSelected }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useCategoryEntryAnimation(cardRef, contentRef);
  useCategoryHoverAnimation(cardRef, contentRef, category, onSelect, isSelected);
  useCategorySelectShadow(cardRef, isSelected);

  return (
    <div
      ref={cardRef}
      className={`
        relative overflow-hidden rounded-2xl p-6 cursor-pointer
        transition-all duration-300 border-2
        ${color}
        ${isSelected ? 'ring-2 ring-blue-500' : ''}
        hover:shadow-lg
      `}
      style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
    >
      <div ref={contentRef} className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="text-2xl icon">{icon}</div>
          <div
            className={`
            px-3 py-1 rounded-full text-sm font-medium transition-all duration-200
            ${isSelected ? 'bg-blue-500 text-white' : 'bg-white/80 text-gray-600'}
          `}
          >
            {count}
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-800 mb-2">{CATEGORY_LABELS[category]}</h3>

        <p className="text-sm text-gray-600">
          {count === 0 ? 'Нет задач' : `${count} ${count === 1 ? 'задача' : count < 5 ? 'задачи' : 'задач'}`}
        </p>
      </div>

      {/* Декоративный элемент */}
      <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/20 rounded-full blur-sm"></div>
      <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-white/30 rounded-full blur-sm"></div>
    </div>
  );
};

export default CategoryCard;
