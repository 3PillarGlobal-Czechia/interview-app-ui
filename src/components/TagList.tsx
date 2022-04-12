import { Tag } from 'antd';
import React from 'react';

import { colorByCategory } from '../services/tagCategoryColorService';

export default function TagList({
  categories,
}: {
  categories: string[];
}): JSX.Element {
  return (
    <div>
      {categories.map((category) => (
        <Tag key={category} color={colorByCategory(category)}>
          {category}
        </Tag>
      ))}
    </div>
  );
}
