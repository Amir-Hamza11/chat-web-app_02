
import './App.css';
import { Switch } from 'react-router-dom';
import SignIn from './pages/SignIn';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute.jsx'
import Home from './pages/Home';
import  './styles/main.scss'
import 'rsuite/dist/styles/rsuite-default.css';
import { ProfileProvider } from './context/ProfileContext';


function App() {
  return (
    <ProfileProvider>
    <Switch>
      <PublicRoute path='/signin' >
        <SignIn />
      </PublicRoute>
      <PrivateRoute path='/' >
        <Home />
      </PrivateRoute>
    </Switch>
    </ProfileProvider>
  );
}

export default App;
