import React, { useState, useEffect } from 'react';
import s from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Modal from 'components/Modal/Modal';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

export default function ImageGallery({ images }) {
  const [showModal, setShowModal] = useState(false);
  const [bigPic, setBigPic] = useState(null);

  useEffect(() => {
    document.addEventListener('click', e => {
      if (e.target.nodeName !== 'IMG') {
        return;
      }
      let picture = images.filter(obj => {
        return obj.id === parseInt(e.target.alt);
      });
      if (!picture.length) {
        return;
      }
      setBigPic(picture[0].largeImageURL);
    });
  }, [bigPic, images]);

  const toggleModal = () => {
    setShowModal(prevShow => !prevShow);
  };

  return (
    <>
      <ul className={s.gallery} onClick={toggleModal}>
        {images.map(img => {
          return (
            <ImageGalleryItem
              key={nanoid()}
              smallImgURL={img.webformatURL}
              id={img.id}
            />
          );
        })}
      </ul>
      {showModal && bigPic && <Modal onClose={toggleModal} pic={bigPic} />}
    </>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
    })
  ),
};
