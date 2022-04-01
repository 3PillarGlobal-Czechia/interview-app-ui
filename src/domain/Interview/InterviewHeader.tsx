import { Button } from 'antd';
import React from 'react';

import Header from '../../layout/header/Header';

export default function InterviewHeader({
  questionSetName,
  buttonClickedCallback,
}: {
  questionSetName: string;
  buttonClickedCallback: React.MouseEventHandler<HTMLElement> | undefined;
}): JSX.Element {
  return (
    <Header
      left={<h3>Interview: {questionSetName}</h3>}
      right={
        <Button onClick={buttonClickedCallback} danger>
          Leave
        </Button>
      }
    />
  );
}
