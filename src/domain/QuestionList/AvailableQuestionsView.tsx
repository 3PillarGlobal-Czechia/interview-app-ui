import { Input, Select } from 'antd';
import React, { useState } from 'react';

import styles from './QuestionSetView.module.scss';

const { Search } = Input;

export default function AvailableQuestionsView(): JSX.Element {
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
