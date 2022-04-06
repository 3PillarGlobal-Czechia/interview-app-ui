import { CheckCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import React from 'react';

import styles from './QuestionCard.module.scss';

export default function AddIcon({ isAddIcon }: { isAddIcon: boolean }): JSX.Element {
    return (
        <>
            {isAddIcon ? <PlusCircleOutlined className={styles.icon} /> : <CheckCircleOutlined className={styles.icon} />}
        </>
    );
}
