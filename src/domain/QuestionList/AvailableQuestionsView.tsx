import { Input, Select } from 'antd';
import React from 'react';
import { QuestionModel } from '../../services/Client';

import styles from './QuestionSetView.module.scss';

const { Search } = Input;

export default function AvailableQuestionsView({ availableQuestions }: { availableQuestions: QuestionModel[] | undefined }): JSX.Element {
    return (
        <div className={styles.availableQuestions}>
            <h3>Available Questions</h3>
            <div>
                <Search placeholder='Search available questions' allowClear />
                <Select placeholder='Category' />
                <Select placeholder='Difficulty' />
            </div>
        </div>
    );
}
