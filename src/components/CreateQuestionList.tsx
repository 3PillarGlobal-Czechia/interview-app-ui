import { useState } from 'react';

import styles from '../App.module.scss';

export default function CreateQuestionList({
  toggleCallback,
  createList,
}: {
  toggleCallback: () => void;
  createList: (name: string) => void;
}) {
  const [input, setInput] = useState('');
  return (
    <div className={styles.createQuestionListPopup}>
      <div>
        <h5>New Question List</h5>
        <p onClick={toggleCallback} className={styles.close} />
      </div>
      <div>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
        />
      </div>
      <div>
        <button onClick={toggleCallback} className={styles.btnSecondary}>
          Cancel
        </button>
        <button onClick={() => createList(input)} className={styles.btnPrimary}>
          Ok
        </button>
      </div>
    </div>
  );
}
