import React from 'react';

import styles from '../App.module.scss';

export default function Category({
  text,
  color,
}: {
  text: string;
  color: string;
}) {
  const colorStyle = { '--color': color } as React.CSSProperties;
  return (
    <div className={styles.categoryBox} style={colorStyle}>
      <p>{text}</p>
    </div>
  );
}
