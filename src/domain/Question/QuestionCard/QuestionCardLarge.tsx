import { CheckCircleOutlined, MoreOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import React from 'react';
import { QuestionModel } from '../../../services/Client';

import styles from './QuestionCard.module.scss';

export default function QuestionCardLarge({ question }: { question: QuestionModel }): JSX.Element {
    return (
        <div className={styles.questionCardLarge}>
            <CheckCircleOutlined style={{ fontSize: '32px' }} />
            <span>{question.title}</span>
            <div>
                <Dropdown overlay={<p>What to place here?</p>} placement="topLeft">
                    <MoreOutlined onClick={(e) => e.stopPropagation()} />
                </Dropdown>
                <span>{question.category}</span>
            </div>
        </div>
    );
}
