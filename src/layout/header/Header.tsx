import React from 'react';

import styles from './Header.module.scss';

export default function Header({
  left,
  right,
}: {
  left: JSX.Element;
  right: JSX.Element;
}): JSX.Element {
  return (
    <div className={styles.header}>
      {left}
      {right}
    </div>
  );
}
