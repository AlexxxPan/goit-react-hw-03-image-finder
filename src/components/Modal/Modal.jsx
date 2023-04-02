import { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

export default class Modal extends Component {
    static propTypes = {
        toggleModal: PropTypes.func.isRequired,
        largeImage: PropTypes.string.isRequired,
      };

    state = {}

    componentDidMount() {
        window.addEventListener('keydown', this.clickEsc);
    }
    componentWillUnmount() {
        window.removeEventListener('keydown', this.clickEsc);
    }

    clickBackdrop = event => {
        if (event.target === event.currentTarget) {
            this.props.toggleModal();
        }
    }

    clickEsc = event => {
        if (event.code === 'Escape') {
            this.props.toggleModal();
        }
    }


    render() {
        return (
            <div className={styles.Overlay} onClick={this.clickBackdrop}>
                <div className={styles.Modal}>
                    <img src={this.props.largeImage} alt="" />
                </div>
            </div>
        )
    }
}