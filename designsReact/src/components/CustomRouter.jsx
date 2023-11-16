import { Route, Routes } from 'react-router-dom';
import Account from './Account';
import Home from './Home';
import SignIn from './SignIn';

function CustomRouter() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/Account" element={<Account userName='Tony Jarvis' />} />
    </Routes>
  );
}

export default CustomRouter;


//faire étape par étape : notamment sur l'API (récuper d'abord le fetch sur SignIn, puis checker le token, etc etc.)
//useless props for account and customrouter (because redux!)