import { useHistory, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

import { useCallback, useState } from 'react';
import logoImg from '../../assets/images/logo.svg';
import deleteImg from '../../assets/images/delete.svg';
import checkImg from '../../assets/images/check.svg';
import answerImg from '../../assets/images/answer.svg';

import { Button } from '../../components/Button';
import { RoomCode } from '../../components/RoomCode';
import { Question } from '../../components/Question';

import { useRoom } from '../../hooks/useRoom';

import { database } from '../../services/firebase';

import '../Room/styles.scss';
import { ModalConfirmation } from '../../components/ModalConfirmation';

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const [isModalConfirmationOpen, setIsModalConfirmationOpen] = useState(false);
  const [isModalConfirmationEndRoomOpen, setIsModalConfirmationEndRoomOpen] =
    useState(false);
  const [questionSelectedToDelete, setQuestionSelectedToDelete] = useState('');

  const { questions, title } = useRoom(roomId);

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });

    history.push('/');

    toast.success(
      'Sua sala foi encerrada com sucesso! Esperamos que em breve você crie uma nova sala',
    );
  }

  async function handleDeleteQuestion(questionId: string) {
    setIsModalConfirmationOpen(prevState => !prevState);
    await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
  }

  const handleOpenModalConfirmation = useCallback((questionId: string) => {
    setQuestionSelectedToDelete(questionId);
    setIsModalConfirmationOpen(prevState => !prevState);
  }, []);

  const handleCloseModalConfirmation = useCallback(() => {
    setQuestionSelectedToDelete('');
    setIsModalConfirmationOpen(prevState => !prevState);
  }, []);

  const handleToggleModalConfirmationEndRoom = useCallback(() => {
    setIsModalConfirmationEndRoomOpen(prevState => !prevState);
  }, []);

  async function handleCheckQuestionAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHightlighted: true,
    });
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={handleToggleModalConfirmationEndRoom}>
              Encerrar sala
            </Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala - {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className="question-list">
          {questions.map(question => (
            <Question
              key={question.id}
              author={question.author}
              content={question.content}
              isAnswered={question.isAnswered}
              isHightlighted={question.isHightlighted}
            >
              <button
                type="button"
                onClick={() => handleHighlightQuestion(question.id)}
              >
                <img src={checkImg} alt="Marcar pergunta como respondida" />
              </button>
              <button
                type="button"
                onClick={() => handleCheckQuestionAnswered(question.id)}
              >
                <img src={answerImg} alt="Dar destaque a pergunta" />
              </button>
              <button
                type="button"
                onClick={() => handleOpenModalConfirmation(question.id)}
              >
                <img src={deleteImg} alt="Remover pergunta" />
              </button>
            </Question>
          ))}
        </div>
      </main>

      <ModalConfirmation
        isOpen={isModalConfirmationOpen}
        onRequestClose={handleCloseModalConfirmation}
        onRequestConfirm={() => handleDeleteQuestion(questionSelectedToDelete)}
        title="Excluir pergunta"
        message="Tem certeza que você deseja excluir esta pergunta?"
        confirmButtonText="Sim, excluir"
      />

      <ModalConfirmation
        isOpen={isModalConfirmationEndRoomOpen}
        onRequestClose={handleToggleModalConfirmationEndRoom}
        onRequestConfirm={handleEndRoom}
        title="Encerrar sala"
        message="Tem certeza que você deseja encerrar esta sala?"
        confirmButtonText="Sim, encerrar"
      />
    </div>
  );
}
