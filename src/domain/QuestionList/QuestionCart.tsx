import { DeleteOutlined } from '@ant-design/icons';
import { Divider, Drawer, List, Space } from 'antd';
import React from 'react';

import QuestionCartProps from './QuestionCartProps';

export default function QuestionCart(props: QuestionCartProps): JSX.Element {
  const {
    isVisible,
    visibilityChangedCallback,
    addList,
    removeList,
    removeFromAddListCallback,
    removeFromRemoveListCallback,
  } = props;

  return (
    <Drawer
      title="Question Cart"
      placement="left"
      onClose={() => visibilityChangedCallback(false)}
      visible={isVisible}
    >
      {addList.map((question) => (
        <List key={question.id}>
          <Space>
            <strong>Add: </strong>
            {question.title}
            <DeleteOutlined
              onClick={() => removeFromAddListCallback(question)}
            />
          </Space>
          <Divider />
        </List>
      ))}
      {removeList.map((question) => (
        <List key={question.id}>
          <Space key={question.id}>
            <strong>Remove: </strong>
            {question.title}
            <DeleteOutlined
              onClick={() => removeFromRemoveListCallback(question)}
            />
          </Space>
          <Divider />
        </List>
      ))}
    </Drawer>
  );
}
