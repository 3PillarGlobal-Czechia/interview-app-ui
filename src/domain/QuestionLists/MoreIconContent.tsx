import { Button, Menu } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

import { QuestionSetModel } from '../../services/Client';

export default function MoreIconContent({
  list,
  startInterviewCallback,
  deleteCallback,
}: {
  list: QuestionSetModel;
  startInterviewCallback: () => void;
  deleteCallback: () => void;
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
          <Link to={`Interview/${list.id}`} onClick={startInterviewCallback}>
            Start Interview
          </Link>
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button type="link" danger>
          <Link onClick={deleteCallback} to="/">
            Delete
          </Link>
        </Button>
      </Menu.Item>
    </Menu>
  );
}
