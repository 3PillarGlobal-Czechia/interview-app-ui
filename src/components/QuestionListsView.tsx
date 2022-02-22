import { useEffect, useState } from 'react';

import styles from '../App.module.scss';
import {
  Client,
  CreateQuestionListRequest,
  QuestionListModel,
} from '../services/ApiClient';
import Categories from './Categories';
import CreateQuestionList from './CreateQuestionList';

export default function QuestionLists() {
  const client = new Client('https://localhost:5001');
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [lists, setLists] = useState<QuestionListModel[] | null>();
  useEffect(() => {
    async function loadLists() {
      const data = await client.questionLists(undefined, undefined);
      setLists(data);
    }
    loadLists();
  }, []);

  function togglePopup(): void {
    setPopupVisible((isCurrentlyVisible) => !isCurrentlyVisible);
  }

  function createList(name: string): void {
    const request = new CreateQuestionListRequest({
      title: name,
    });
    client.create2(request).then((model) => {
      setLists([...lists!, model]);
    });
    togglePopup();
  }

  return (
    <div className={styles.questionLists}>
      <div className={styles.questionListsHeader}>
        <h4>Question Lists</h4>
        <button onClick={togglePopup} className={styles.btnPrimary}>
          Create a New List
        </button>
      </div>
      {isPopupVisible ? (
        <CreateQuestionList
          createList={createList}
          toggleCallback={togglePopup}
        />
      ) : null}
      <div className={styles.questionListsData}>
        {lists ? (
          lists.length ? (
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Categories</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {lists.map((list: QuestionListModel) => (
                  <tr key={list.id}>
                    <td>{list.title}</td>
                    <td>
                      <Categories list={list} />
                    </td>
                    <td>
                      <button onClick={() => {}} className={styles.btnTextBlue}>
                        View
                      </button>
                      <button onClick={() => {}} className={styles.btnTextBlue}>
                        Start Interview
                      </button>
                      <button onClick={() => {}} className={styles.btnTextRed}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div>
              <img src={`${process.env.PUBLIC_URL}/noQuestionLists.png`} />
              <p>No question lists</p>
            </div>
          )
        ) : (
          <p>Loading</p>
        )}
      </div>
    </div>
  );
}
{
}
