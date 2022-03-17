import { Input, Modal, Space } from 'antd';
import React, { useEffect, useState } from 'react';

import { CreateQuestionListModalProps } from './CreateQuestionListModalProps';

const { TextArea } = Input;

export default function CreateQuestionListModal(
  props: CreateQuestionListModalProps
): JSX.Element {
  const { visible, okCallback, cancelCallback } = props;

  const [titleInput, setTitleInput] = useState<string>('');
  const [descriptionInput, setDescriptionInput] = useState<string>('');

  const submit = (): void => {
    okCallback(titleInput, descriptionInput);
  };

  useEffect(() => {
    setTitleInput('');
    setDescriptionInput('');
  }, [visible]);

  return (
    <Modal
      title="New Question List"
      visible={visible}
      okButtonProps={{ disabled: titleInput === '' }}
      onOk={submit}
      onCancel={cancelCallback}
    >
      <Space direction="vertical" className="full-width">
        <Input
          placeholder="Title"
          value={titleInput}
          onChange={(e) => setTitleInput(e.target.value)}
        />
        <TextArea
          placeholder="Description"
          value={descriptionInput}
          onChange={(e) => setDescriptionInput(e.target.value)}
          rows={4}
        />
      </Space>
    </Modal>
  );
}
