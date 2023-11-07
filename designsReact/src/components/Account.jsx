import '../styles/Account.scss';
import PropTypes from 'prop-types';
import { Transaction } from './Transaction';

export function Account ({ userName }) {
    return (
      <section className='account'>
        <div className='userName'>
          <h1>Welcome back<br/>{userName}!</h1>
          <button className='edit-button'>Edit Name</button>
        </div>
        <Transaction accountTitle="Argent Bank Checking" accountNumber="x8349" availableBalance="2,082.79" />
      </section>
    );
  }

  Account.propTypes = {
    userName: PropTypes.string.isRequired
  };