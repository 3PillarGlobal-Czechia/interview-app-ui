import { LoadingOutlined } from '@ant-design/icons';
import { Input, List, Select, Spin } from 'antd';
import React from 'react';
import { QuestionModel } from '../../services/Client';
import QuestionCardLarge from '../Question/QuestionCard/QuestionCardLarge';

import styles from './QuestionSetView.module.scss';

const { Search } = Input;

export default function AvailableQuestionsView({ availableQuestions, questionsAddedToSet, addToSetCallback }: { availableQuestions: QuestionModel[] | undefined; questionsAddedToSet: QuestionModel[] | undefined; addToSetCallback: (question: QuestionModel) => void; }): JSX.Element {
    const questionListElement = availableQuestions && questionsAddedToSet
        ? <List dataSource={availableQuestions} renderItem={item => <QuestionCardLarge question={item} addToSetCallback={addToSetCallback} isContainedInSet={questionsAddedToSet.map(q => q.id).includes(item.id)} />} />
        : <Spin indicator={<LoadingOutlined />} />

    return (
        <div className={styles.availableQuestions}>
            <h3>Available Questions</h3>
            <div>
                <Search placeholder='Search available questions' allowClear />
                <Select placeholder='Category' />
                <Select placeholder='Difficulty' />
            </div>
            {questionListElement}
        </div>
    );
}
