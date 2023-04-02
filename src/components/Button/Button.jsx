import PropTypes from 'prop-types';
import styles from './Button.module.css';

export default function Button({ nextPage }) {
    return (
      <button type="button" className={styles.Button} onClick={nextPage}>
        Load more
      </button>
    );
  }
  
  Button.propTypes = {
    nextPage: PropTypes.func.isRequired,
  };