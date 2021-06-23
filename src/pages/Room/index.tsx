import { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

import logoImg from '../../assets/images/logo.svg';

import { Button } from '../../components/Button';
import { RoomCode } from '../../components/RoomCode';
import { useAuth } from '../../hooks/useAuth';
import { database } from '../../services/firebase';

import './styles.scss';

type RoomParams = {
  id: string;
};

export function Room() {
  const { user } = useAuth();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const [newQuestion, setNewQuestion] = useState('');

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();
    if (newQuestion.trim() === '') {
      toast('Está quase, escreva sua pergunta e mande para nós!', {
        icon: '🤯',
      });
      return;
    }

    if (!user) {
      toast.error('You must be logged in', {
        icon: '😥',
      });
      return;
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHightlighted: false,
      isAnswered: false,
    };

    await database.ref(`rooms/${roomId}/questions`).push(question);
    toast.success('Parabéns! Sua pergunta foi enviada com sucesso!', {
      icon: '🤩',
    });

    setNewQuestion('');
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <RoomCode code={roomId} />
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala React</h1>
          <span>4 perguntas</span>
        </div>

        <form>
          <textarea
            placeholder="O que você quer perguntar?"
            onChange={event => setNewQuestion(event.target.value)}
            value={newQuestion}
          />

          <div className="form-footer">
            {user ? (
              <div className="user-info">
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>
                Para enviar uma pergunta,{' '}
                <button type="button">faça seu login</button>
              </span>
            )}

            <Button type="submit" disabled={!user} onClick={handleSendQuestion}>
              Enviar pergunta
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
