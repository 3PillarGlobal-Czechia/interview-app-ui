import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons';
import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../../layout/header/Header';

export default function QuestionSetViewHeader({
  title,
}: {
  title: string;
}): JSX.Element {
  return (
    <Header
      left={
        <>
          <Link to="/" className="text-black">
            <ArrowLeftOutlined />
          </Link>
          <h3>{title}</h3>
          <EditOutlined />
        </>
      }
      right={<span>By anonymous</span>}
    />
  );
}
