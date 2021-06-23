import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import toast from 'react-hot-toast';

import illustrationsImg from '../../assets/images/illustration.svg';
import logoImg from '../../assets/images/logo.svg';
import googleIconImg from '../../assets/images/google-icon.svg';

import { useAuth } from '../../hooks/useAuth';

import { Button } from '../../components/Button';

import '../../styles/auth.scss';
import { database } from '../../services/firebase';

export function Home() {
  const { signInWithGoogle, user } = useAuth();
  const history = useHistory();

  const [roomCode, setRoomCode] = useState('');

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }

    history.push('rooms/new');
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() !== '') {
      const roomRef = await database.ref(`rooms/${roomCode}`).get();

      if (!roomRef.exists()) {
        toast(
          `Poxaaa. A sala ${roomCode} não existe no momento. Mas fique triste, entra em outra.`,
        );
        return;
      }

      history.push(`/rooms/${roomCode}`);
    }
  }

  return (
    <div id="page-auth">
      <aside>
        <img
          src={illustrationsImg}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire suas dúvidas da sua audiência em tempo real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="letmeask" />
          <button
            onClick={handleCreateRoom}
            className="create-room"
            type="button"
          >
            <img src={googleIconImg} alt="Logo do google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={event => setRoomCode(event.target.value)}
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
