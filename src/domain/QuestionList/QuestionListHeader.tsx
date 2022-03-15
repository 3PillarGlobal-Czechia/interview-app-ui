import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../../layout/header/Header';
import QuestionListHeaderProps from './QuestionListHeaderProps';

export default function QuestionListHeader(
  props: QuestionListHeaderProps
): JSX.Element {
  const {
    isBeingEdited,
    setBeingEditedCallback,
    listTitle,
    discardCallback,
    saveChangesCallback,
    setDrawerVisibilityCallback,
  } = props;

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
          <Link to="/" className="text-black">
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
