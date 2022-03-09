import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

import Header from './Header';
import styles from './QuestionLists.module.scss';

export default function QuestionListHeader({
  isBeingEdited,
  setBeingEditedCallback,
  listTitle,
  discardCallback,
  saveChangesCallback,
  setDrawerVisibilityCallback,
}: {
  isBeingEdited: boolean;
  setBeingEditedCallback: (value: boolean) => void;
  listTitle: string | undefined;
  discardCallback: () => void;
  saveChangesCallback: () => void;
  setDrawerVisibilityCallback: (value?: boolean | null) => void;
}): JSX.Element {
  return isBeingEdited ? (
    <Header
      left={<h3>{listTitle}</h3>}
      right={
        <Space>
          <Button onClick={() => setDrawerVisibilityCallback(true)}>
            Open
          </Button>
          <Button onClick={discardCallback}>Discard</Button>
          <Button type="primary" onClick={saveChangesCallback}>
            Save
          </Button>
        </Space>
      }
    />
  ) : (
    <Header
      left={
        <div>
          <Link to="/" className={styles.black}>
            <ArrowLeftOutlined />
          </Link>
          <h3>{listTitle}</h3>
        </div>
      }
      right={
        <Button type="primary" onClick={() => setBeingEditedCallback(true)}>
          Edit
        </Button>
      }
    />
  );
}
