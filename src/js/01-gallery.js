import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { galleryItems } from './gallery-items.js';

const galleryList = document.querySelector('.gallery')

const liTemplates = galleryItems.map((item) => `
<div class="gallery__item">
  <a class="gallery__link" href="${item.original}">
    <img
      class="gallery__image"
      src="${item.preview}"
      data-source="${item.original}"
      alt="${item.description}"
    />
  </a>
</div>
`);
galleryList.insertAdjacentHTML("beforeend", liTemplates.join(""));

const lightbox = new SimpleLightbox('.gallery a');

galleryList.addEventListener('click', (e) => {
    e.preventDefault();

    if (e.target.classList.contains('gallery__image')) {
        const largeImageUrl = e.target.dataset.source;

        const instance = SimpleLightbox.open({
            content: `<img src="${largeImageUrl}">`
        });
    }
});
