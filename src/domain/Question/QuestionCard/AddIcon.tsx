import { CheckCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import React from 'react';

import styles from './QuestionCard.module.scss';

export default function AddIcon({
  isAddIcon,
  addClickCallback,
}: {
  isAddIcon: boolean;
  addClickCallback: () => void;
}): JSX.Element {
  const tooltip = 'This question is already in this set';
  if (isAddIcon) {
    return (
      <PlusCircleOutlined className={styles.icon} onClick={addClickCallback} />
    );
  }

  return (
    <Tooltip title={tooltip} placement="right">
      <CheckCircleOutlined className={styles.icon} />
    </Tooltip>
  );
}
