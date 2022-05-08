// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

const imgConteiner = document.querySelector('.gallery');

const cardsMarkup = createImageCards(galleryItems);
imgConteiner.insertAdjacentHTML('beforeend', cardsMarkup);

function createImageCards(galleryItems) {
    return galleryItems.map(
        ({ preview, original, description }) => {
            return `
            <a class="gallery__item" href="${original}">
                <img class="gallery__image" src="${preview}" alt="${description}" />
            </a>`
        }).join('');
}

const gallery = new SimpleLightbox('.gallery a');
gallery.options.captionData = "alt";
gallery.options.captionDelay = 250;

console.log(galleryItems);
