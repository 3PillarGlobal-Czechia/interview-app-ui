import { Button, Menu } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

import { QuestionSetModel } from '../../services/Client';

export default function MoreIconContent({
  list,
  startInterviewCallback,
}: {
  list: QuestionSetModel;
  startInterviewCallback: () => void;
}): JSX.Element {
  return (
    <Menu>
      <Menu.Item>
        <Button type="link">
          <Link to={`QuestionList/${list.id}`}>View</Link>
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button type="link">
          <Link onClick={startInterviewCallback} to="/">
            Start Interview
          </Link>
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button type="link" danger>
          Delete
        </Button>
      </Menu.Item>
    </Menu>
  );
}
