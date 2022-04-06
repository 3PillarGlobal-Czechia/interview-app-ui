import { LoadingOutlined } from '@ant-design/icons';
import { Input, List, Select, Spin } from 'antd';
import React, { useState } from 'react';
import { QuestionModel } from '../../services/Client';
import { filterQuestions } from '../../services/filterService';
import QuestionCardLarge from '../Question/QuestionCard/QuestionCardLarge';

import styles from './QuestionSetView.module.scss';

const { Search } = Input;

export default function AvailableQuestionsView({ availableQuestions, questionsAddedToSet, addToSetCallback }: { availableQuestions: QuestionModel[] | undefined; questionsAddedToSet: QuestionModel[] | undefined; addToSetCallback: (question: QuestionModel) => void; }): JSX.Element {
    const [searchText, setSearchText] = useState('');

    const questionListElement = availableQuestions && questionsAddedToSet
        ? <List dataSource={filterQuestions(availableQuestions, searchText, undefined, undefined, undefined)} renderItem={item => <QuestionCardLarge question={item} addToSetCallback={addToSetCallback} isContainedInSet={questionsAddedToSet.map(q => q.id).includes(item.id)} />} />
        : <Spin indicator={<LoadingOutlined />} />

    return (
        <div className={styles.availableQuestions}>
            <h3>Available Questions</h3>
            <div>
                <Search placeholder='Search available questions' allowClear value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                <Select placeholder='Category'>
                    {availableQuestions?.map(question => <Select.Option value={question.category}>{question.category}</Select.Option>)}
                </Select>
                <Select placeholder='Difficulty' />
            </div>
            {questionListElement}
        </div>
    );
}
