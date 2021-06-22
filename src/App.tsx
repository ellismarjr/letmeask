import { BrowserRouter, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';

import './styles/global.scss';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Route path="/" exact component={Home} />
        <Route path="/rooms/new" component={NewRoom} />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
