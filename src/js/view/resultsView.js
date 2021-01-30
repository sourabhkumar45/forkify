import View from './view.js';

import icons from 'url:../../img/icons.svg';
import { IMAGE_URL } from '../config.js';
class Resultsview extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = `No Recipe Available for Search Query!! Please Try Again`;
  _message = ``;

  _generateMarkup() {
    //console.log(this._data);
    return this._data.map(this._generateMarkupPreview).join('');
  }
  _generateMarkupPreview(res) {
    return ` <li class="preview">
    <a class="preview__link" href="#${res.id}">
      <figure class="preview__fig">
        <img src="${IMAGE_URL}" alt="Test" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">${res.title}</h4>
        <p class="preview__publisher">${res.publisher}</p>
      </div>
    </a>
  </li>`;
  }
}
export default new Resultsview();
