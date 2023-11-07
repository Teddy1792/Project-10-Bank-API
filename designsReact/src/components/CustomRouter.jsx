import { Route, Routes } from 'react-router-dom';
import { Account } from './Account';
import { Home } from './Home';
import { SignIn } from './SignIn';

export function CustomRouter () {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/Account" element={<Account userName='Tony Jarvis' />} />
    </Routes>
  );
}