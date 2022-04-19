import { Tag } from 'antd';
import React from 'react';

import { Category } from '../services/ApiClient';
import { colorByCategory } from '../services/tagCategoryColorService';

export default function TagList({ tags }: { tags: Category[] }): JSX.Element {
  return (
    <div>
      {tags.map((tag) => (
        <Tag key={tag.title} color={colorByCategory(tag.title ?? '')}>
          {tag.title}
        </Tag>
      ))}
    </div>
  );
}
