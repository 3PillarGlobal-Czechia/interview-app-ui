import { DeleteOutlined } from '@ant-design/icons';
import { Divider, Drawer, Space } from 'antd';
import React from 'react';

import { InterviewQuestionModel } from '../services/Client';

export default function QuestionCart({
  isVisible,
  visibilityChangedCallback,
  addList,
  removeList,
  removeFromAddListCallback,
  removeFromRemoveListCallback,
}: {
  isVisible: boolean;
  visibilityChangedCallback: (value?: boolean | null) => void;
  addList: InterviewQuestionModel[];
  removeList: InterviewQuestionModel[];
  removeFromAddListCallback: (question: InterviewQuestionModel) => void;
  removeFromRemoveListCallback: (question: InterviewQuestionModel) => void;
}): JSX.Element {
  return (
    <Drawer
      title="Question Cart"
      placement="left"
      onClose={() => visibilityChangedCallback(false)}
      visible={isVisible}
    >
      {addList.map((question) => (
        <>
          <Space>
            <strong>Add: </strong>
            {question.title}
            <DeleteOutlined
              onClick={() => removeFromAddListCallback(question)}
            />
          </Space>
          <Divider />
        </>
      ))}
      {removeList.map((question) => (
        <>
          <Space>
            <strong>Remove: </strong>
            {question.title}
            <DeleteOutlined
              onClick={() => removeFromRemoveListCallback(question)}
            />
          </Space>
          <Divider />
        </>
      ))}
    </Drawer>
  );
}
