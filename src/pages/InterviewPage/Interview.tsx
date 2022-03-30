import { List, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import InterviewHeader from '../../domain/Interview/InterviewHeader';
import QuestionView from '../../domain/Interview/QuestionView';
import ScalableBody from '../../layout/scalableBody/ScalableBody';
import {
  Client,
  QuestionModel,
  QuestionSetDetail,
} from '../../services/Client';

export default function Interview(): JSX.Element {
  const { id } = useParams<'id'>();
  const client = new Client();
  const navigate = useNavigate();
  const [questionSetDetail, setQuestionSetDetail] =
    useState<QuestionSetDetail>();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  useEffect(() => {
    client
      .getQuestionSetById(Number(id))
      .then((questionSet) => setQuestionSetDetail(questionSet));
  }, []);

  return (
    <ScalableBody>
      <div>
        <Modal
          visible={isModalVisible}
          title="Quit interview?"
          onOk={() => navigate('/')}
          onCancel={() => setIsModalVisible(false)}
          okButtonProps={{ danger: true }}
        >
          <p>Any data entered will be lost!</p>
        </Modal>
        <InterviewHeader
          questionSetName={questionSetDetail?.questionSet?.title ?? ''}
          buttonClickedCallback={() => setIsModalVisible(true)}
        />
        <List<QuestionModel>
          itemLayout="horizontal"
          dataSource={questionSetDetail?.questions}
          renderItem={(question: QuestionModel) => (
            <List.Item>
              <QuestionView question={question} />
            </List.Item>
          )}
        />
      </div>
    </ScalableBody>
  );
}
