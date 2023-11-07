import '../styles/Transaction.scss';
import PropTypes from 'prop-types';

export function Transaction({ accountTitle, accountNumber, availableBalance }) {
  return (
    <section className='transaction'>
      <div className='account-content-wrapper'>
        <h3 className='account-title'>{accountTitle} ({accountNumber})</h3>
        <p className='account-amount'>${availableBalance}</p>
        <p className='account-amount-description'>Available Balance</p>
      </div>
      <div className='account-content-wrapper cta'>
        <button className='transaction-button'>View transactions</button>
      </div>
    </section>
  );
}

Transaction.propTypes = {
  accountTitle: PropTypes.string.isRequired,
  accountNumber: PropTypes.string.isRequired,
  availableBalance: PropTypes.string.isRequired
};
