import { Input, Select } from 'antd';
import React, { useState } from 'react';

import styles from './QuestionSetView.module.scss';

export default function AvailableQuestionsView(): JSX.Element {
    const [inputValue, setInputValue] = useState('');

    return (
        <div className={styles.availableQuestions}>
            <h3>Available Questions</h3>
            <div>
                <Input value={inputValue} onChange={e => setInputValue(e.target.value)} placeholder='Search available questions' />
                <Select placeholder='Category' />
                <Select placeholder='Difficulty' />
            </div>
        </div>
    );
}
