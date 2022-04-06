import { MoreOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import React from 'react';
import { QuestionModel } from '../../../services/Client';
import AddIcon from './AddIcon';

import styles from './QuestionCard.module.scss';

export default function QuestionCardLarge({ question, isContainedInSet, addToSetCallback }: { question: QuestionModel; isContainedInSet: boolean; addToSetCallback: (question: QuestionModel) => void; }): JSX.Element {
    return (
        <div className={styles.questionCardLarge}>
            <AddIcon isAddIcon={!isContainedInSet} addClickCallback={() => addToSetCallback(question)} />
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
