import { Button } from 'antd';
import React from 'react';

import Header from '../../layout/header/Header';

export default function QuestionListsHeader({
  buttonClickCallback,
}: {
  buttonClickCallback: () => void;
}): JSX.Element {
  return (
    <Header
      left={<h2>Question Lists</h2>}
      right={
        <Button type="primary" onClick={buttonClickCallback}>
          Create a New List
        </Button>
      }
    />
  );
}
