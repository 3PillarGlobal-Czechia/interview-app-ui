import { CheckOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
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
      <Button shape="circle" onClick={addClickCallback}>
        <PlusOutlined />
      </Button>
    );
  }

  return (
    <Tooltip title={tooltip} placement="right">
      <Button type="dashed" shape="circle" className={styles.icon}>
        <CheckOutlined />
      </Button>
    </Tooltip>
  );
}
