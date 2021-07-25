const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const galleryRef = document.querySelector('.gallery');
const modalRef = document.querySelector('.js-lightbox');
const modalImgRef = document.querySelector('.lightbox__image');
const modalOverlayRef = document.querySelector('.lightbox__overlay');
const btnCloseModalRef = document.querySelector(
  'button[data-action="close-lightbox"]'
);


function createItemGallery(array) {
  return array
    .map(
      item =>
        `<li class="gallery__item">
        <a
          class="gallery__link"
          href="${item.original}"
        >
          <img
            class="gallery__image"
            src="${item.preview}"
            data-source="${item.original}"
            alt="${item.description}"
          />
          </a>
          </li>`
    )
    .join('');
}

const insertGalleryItem = createItemGallery(galleryItems);

galleryRef.insertAdjacentHTML('beforeend', insertGalleryItem);

function modalRemoveListAndAtr() {
  modalRef.classList.remove('is-open');
  modalImgRef.removeAttribute('src');
}

function modalOpen(event) {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') {
    return;
  }

  galleryItems.find(item => {
    if (item.description === event.target.alt) {
      return modalImgRef.setAttribute('src', item.original);
    }
  });

  modalRef.classList.add('is-open');
}

function modalClose() {
  modalRemoveListAndAtr();
}

function modalCloseOverlay(event) {
  if (event.target === 'IMG') {
    return;
  }

  modalRemoveListAndAtr();
}

function modalCloseEsc(event) {
  if (event.code !== 'Escape') {
    return;
  }

  modalRemoveListAndAtr();
}

const newArrayOriginalImg = galleryItems.map(item => item.original);

function thumbImgModal(event) {
  if(event.code !== "ArrowLeft" && event.code !== "ArrowRight") {
    return
  }

  const getAtrSrc = modalImgRef.getAttribute("src");
  const indexImg = newArrayOriginalImg.indexOf(getAtrSrc);

  if(event.code === 'ArrowLeft' && indexImg > 0) {
    return modalImgRef.setAttribute('src', newArrayOriginalImg[indexImg - 1]);
  } else if (event.code === 'ArrowRight' && indexImg < newArrayOriginalImg.length - 1) {
    return modalImgRef.setAttribute('src', newArrayOriginalImg[indexImg + 1]);
  }
}

galleryRef.addEventListener('click', modalOpen);
btnCloseModalRef.addEventListener('click', modalClose);
modalOverlayRef.addEventListener('click', modalCloseOverlay);
window.addEventListener('keydown', modalCloseEsc);
window.addEventListener('keydown', thumbImgModal);
