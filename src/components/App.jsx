import React, { Component } from "react";
import ImageGallery from "components/ImageGallery/ImageGallery";
import Modal from "components/Modal/Modal";
import Searchbar from "components/Searchbar/Searchbar";
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import fetchImages from './services/Api';

export class App extends Component {

  state = {
    inputValue: '',
    images: [],
    page: 0,
    largeImage: '',
    showModal: false,
    isLoading: false,
    error: null,
    hits: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevPage = prevState.page;
    const prevInputValue = prevState.inputValue;
    const { inputValue, page, images } = this.state;
    if (prevPage !== page || prevInputValue !== inputValue) {
      try {
        this.setState({ isLoading: true });
        const response = fetchImages(inputValue, page);
        response.then(data => {
          data.data.hits.length === 0
            ? alert('Nothing found')
            : data.data.hits.forEach(({ id, webformatURL, largeImageURL }) => {
                !images.some(image => image.id === id) &&
                  this.setState(({ images }) => ({
                    images: [...images, { id, webformatURL, largeImageURL }],
                  }));
                  this.setState({hits: data.data.hits.length})
              });
          this.setState({ isLoading: false });
        });
      } catch (error) {
        this.setState({ error, isLoading: false });
      } finally {
      }
    }
  }
  onSubmit = inputValue => {
    if (inputValue.trim() === '') {
      return alert('Enter the meaning for search');
    } else if (inputValue === this.state.inputValue) {
      return;
    }
    this.setState({
      inputValue: inputValue,
      page: 1,
      images: [],
    });
  };

  nextPage = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  openModal = index => {
    this.setState(({ images }) => ({
      showModal: true,
      largeImage: images[index].largeImageURL,
    }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { toggleModal, openModal, nextPage, onSubmit } = this;
    const { images, isLoading, largeImage, showModal, hits } = this.state;
    return (
      <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: '16px',
        paddingBottom: '24px',
      }}>
        <Searchbar onSubmit={onSubmit} />
        {images.length !== 0 && (
          <ImageGallery images={images} openModal={openModal} />
        )}
        {showModal && (
          <Modal toggleModal={toggleModal} largeImage={largeImage} />
        )}
        {isLoading && <Loader />}
        {hits >= 12 && <Button nextPage={nextPage} />}
      </div>
    );
  }
}

