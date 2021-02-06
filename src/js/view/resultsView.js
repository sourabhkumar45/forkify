import View from './view.js';
import previewView from './previewView.js';

import icons from 'url:../../img/icons.svg';

class Resultsview extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = `No Recipe Available for Search Query!! Please Try Again`;
  _message = ``;

  _generateMarkup() {
    //console.log(this._data);
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}
export default new Resultsview();
