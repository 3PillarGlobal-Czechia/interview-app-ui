import { Tag } from 'antd';
import React from 'react';

export default function DistinctCategoryTags({
  categories,
}: {
  categories: string[];
}): JSX.Element {
  return (
    <div>
      {categories.map((category) => (
        <Tag color="cyan">{category}</Tag>
      ))}
    </div>
  );
}
