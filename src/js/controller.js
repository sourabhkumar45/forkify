import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime/runtime';
import * as model from './model.js';
import recipeView from './view/recipeViews.js';
import searchView from './view/searchView.js';
import resultView from './view/resultsView.js';
import paginationView from './view/paginationView.js';

if (module.hot) {
  module.hot.accept();
} // code for hot module replacement by parcel
// https://forkify-api.herokuapp.com/v2
console.log('Script Loaded');
///////////////////////////////////////

const controlRecipe = async function () {
  const id = window.location.hash.slice(1);

  if (!id) return;
  recipeView.renderSpinner();
  try {
    // 1) Loading Recipe
    await model.loadRecipe(id);
    const { recipe } = model.state;

    //2) Rendering recipe
    recipeView.render(model.state.recipe);
    //console.log(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultView.renderSpinner();
    // 1) get query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) load search results
    await model.loadSearchResults(query);

    //3) render results
    resultView.render(model.getSearchResultsPage(1));

    //4) Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlPagination = function (goToPage) {
  //3) render new results
  resultView.render(model.getSearchResultsPage(goToPage));

  //4) Render new pagination buttons
  paginationView.render(model.state.search);
  console.log(goToPage);
};
const subscriber = function () {
  recipeView.publishHandlerRender(controlRecipe);
  searchView.publishHandlerSearch(controlSearchResults);
  paginationView.publishHandlerClick(controlPagination);
};
subscriber();
