import View from './view.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg';

class bookmarkView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = `No Recipe Bookmarked!! Find one`;
  _message = ``;

  publishHandlerBookmark(handler) {
    window.addEventListener('load', handler);
  }
  _generateMarkup() {
    //console.log(this._data);
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}
export default new bookmarkView();
