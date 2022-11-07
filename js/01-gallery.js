import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryContainer = document.querySelector('.gallery');

const markup = galleryItems
  .map(({ preview, original, description }) => {
    return `
        <div class="gallery__item">
            <a class="gallery__link" href="${original}">
                <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
                />
            </a>
        </div>`;
  })
  .join('');

galleryContainer.insertAdjacentHTML('beforeend', markup);

galleryContainer.addEventListener('click', onGalleryItemClick);

function onGalleryItemClick(evt) {
  evt.preventDefault();

  if (evt.target.nodeName !== 'IMG') {
    return;
  }

  const modalOptions = {
    onShow: () => {
        window.addEventListener('keydown', onEscapeKeyDown);
    },
    onClose: () => {
        window.removeEventListener('keydown', onEscapeKeyDown);
    },
  }

  const modal = basicLightbox.create(`<img  src="${evt.target.dataset.source}"width="800" height="600">`, modalOptions);

    function onEscapeKeyDown(element) {
		if (element.code === 'Escape') {
			modal.close();
		}
	}
    modal.show();
};