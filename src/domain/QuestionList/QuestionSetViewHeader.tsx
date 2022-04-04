import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons';
import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../../layout/header/Header';
import styles from './QuestionSetView.module.scss';

export default function QuestionSetViewHeader({
  title,
}: {
  title: string;
}): JSX.Element {
  return (
    <Header
      left={
        <div className={styles.questionSetViewHeader}>
          <Link to="/" className="text-black">
            <ArrowLeftOutlined />
          </Link>
          <h3>{title}</h3>
          <EditOutlined />
        </div>
      }
      right={<span>By anonymous</span>}
    />
  );
}
