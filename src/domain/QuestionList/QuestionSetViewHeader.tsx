import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import Header from '../../layout/header/Header';
import { Client } from '../../services/Client';
import styles from './QuestionSetView.module.scss';

export default function QuestionSetViewHeader({
  title,
  createdBy,
  updateTitleCallback,
}: {
  title: string;
  createdBy: string;
  updateTitleCallback: (title: string) => void;
}): JSX.Element {
  const [isBeingEdited, setIsBeingEdited] = useState(false);
  const [inputValue, setInputValue] = useState(title);
  const inputRef = useRef<Input>(null);

  const changeIsBeingEdited = (value?: boolean) => {
    const targetValue = value || !isBeingEdited;
    if (targetValue) {
      setTimeout(() => inputRef.current?.select(), 100);
    } else {
      updateTitleCallback(inputValue);
    }
    setIsBeingEdited(targetValue);
  };

  return (
    <Header
      left={
        <div className={styles.questionSetViewHeader}>
          <Link to="/" className="text-black">
            <ArrowLeftOutlined />
          </Link>
          {isBeingEdited ? (
            <Input
              onKeyDown={(e) =>
                e.key == 'Enter' ? changeIsBeingEdited(false) : null
              }
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          ) : (
            <h3 onClick={(_) => changeIsBeingEdited(true)}>{inputValue}</h3>
          )}
          <EditOutlined onClick={(_) => changeIsBeingEdited()} />
        </div>
      }
      right={<span>By {createdBy}</span>}
    />
  );
}
