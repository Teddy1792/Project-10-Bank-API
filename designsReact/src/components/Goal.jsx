import '../styles/Goal.scss';
import PropTypes from 'prop-types';

function Goal({ icon, title, description }) {
  return (
    <div className="goal">
        <div className='imgBox'>
            <img src={icon} alt='icon' className="feature-icon" />
        </div>
        <h3 className="feature-item-title">{title}</h3>
        <p>{description}</p>
    </div>
  );
}

Goal.propTypes = {
    icon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
};

export default Goal;
