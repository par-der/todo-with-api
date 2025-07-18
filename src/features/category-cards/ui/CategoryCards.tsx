import { Category } from '@/entities/todo.ts';
import { useRef } from 'react';
import { useContainerEntryAnimation } from '@/shared/lib/useCategoryAnimations.ts';
import CategoryCard from '@/features/category-cards/ui/category-card.tsx';

interface CategoryCardsProps {
  onCategorySelect: (category: Category | null) => void;
  selectedCategory: Category | null;
  todoStats?: {
    by_category: Record<Category, number>;
  };
}

export const CategoryCards: React.FC<CategoryCardsProps> = ({ onCategorySelect, selectedCategory, todoStats }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useContainerEntryAnimation(containerRef);

  const categories = [
    {
      category: 'HEALTH' as Category,
      color: 'bg-gradient-to-br from-blue-100 to-blue-200 border-blue-300',
      icon: '💪',
    },
    {
      category: 'WORK' as Category,
      color: 'bg-gradient-to-br from-green-100 to-green-200 border-green-300',
      icon: '💼',
    },
    {
      category: 'MENTAL_HEALTH' as Category,
      color: 'bg-gradient-to-br from-purple-100 to-purple-200 border-purple-300',
      icon: '🧠',
    },
    {
      category: 'STUDY' as Category,
      color: 'bg-gradient-to-br from-orange-100 to-orange-200 border-orange-300',
      icon: '📚',
    },
  ];

  const handleCategorySelect = (category: Category) => {
    if (selectedCategory === category) {
      onCategorySelect(null);
    } else {
      onCategorySelect(category);
    }
  };

  return (
    <div ref={containerRef} className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Категории задач</h2>
        {selectedCategory && (
          <button
            onClick={() => onCategorySelect(null)}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            Показать все
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map(({ category, color, icon }) => (
          <CategoryCard
            key={category}
            category={category}
            count={todoStats?.by_category?.[category] || 0}
            color={color}
            icon={icon}
            onSelect={handleCategorySelect}
            isSelected={selectedCategory === category}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryCards;
