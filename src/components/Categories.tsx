import React, { useState } from 'react';

import styles from '../App.module.scss';
import { QuestionListModel } from '../services/ApiClient';
import Category from './Category';

export default function Categories({ list }: { list: QuestionListModel }) {
  if (list?.interviewQuestions == null) return null;

  const colors: string[] = [
    '0, 0, 255',
    '255, 0, 0',
    '0, 255, 0',
    '255, 0, 255',
    '128, 0, 128',
    '255, 165, 0',
    '0, 0, 0',
  ];
  const categories = Array.from(
    new Set(
      list.interviewQuestions
        .map((question) => question.category)
        .filter((category): category is string => category !== undefined)
    )
  );

  function nextColor(): string {
    return colors[Categories.colorIndex++ % colors.length];
  }

  function colorByCategory(category: string): string {
    if (!Categories.hashmap.has(category)) {
      Categories.hashmap = Categories.hashmap.set(category, nextColor());
    }
    return Categories.hashmap.get(category)!;
  }

  return (
    <div className={styles.categories}>
      {categories.map((category, index) => (
        <Category
          key={index}
          text={category}
          color={colorByCategory(category)}
        />
      ))}
    </div>
  );
}

Categories.colorIndex = 0;
Categories.hashmap = new Map<string, string>();
