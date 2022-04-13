import { Tag } from 'antd';
import React from 'react';

import { colorByCategory } from '../../services/tagCategoryColorService';

export default function DistinctCategoryTags({
  categories,
}: {
  categories: string[];
}): JSX.Element {
  return (
    <div>
      {categories.map((category) => (
        <Tag color={colorByCategory(category)}>{category}</Tag>
      ))}
    </div>
  );
}
