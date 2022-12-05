
import './App.css';
import { Switch } from 'react-router-dom';
import SignIn from './pages/SignIn';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute.jsx'
import Home from './pages/Home';


function App() {
  return (
    <Switch>
      <PublicRoute path='/signin' >
        <SignIn />
      </PublicRoute>
      <PrivateRoute path='/' >
        <Home />
      </PrivateRoute>
    </Switch>
  );
}

export default App;
