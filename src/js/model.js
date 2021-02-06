import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON } from './helper.js';
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultsPerPage: RES_PER_PAGE,
    page: 1,
  },
  bookMarks: [],
};
export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);

    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      soureUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    if (state.bookMarks.some(bookMark => bookMark.id === id))
      state.recipe.bookMarked = true;
    else state.recipe.bookMarked = false;
    console.log(state.recipe);
  } catch (err) {
    //temporary handling
    // console.error(`${err} 💥`)
    throw err;
  }
};

//making API call for loading search results
export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    console.log('search data = ', data);

    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
    console.log(state.search.results);
  } catch (err) {
    //temporary handling
    // console.error(`${err} 💥`)
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage; // 0
  const end = page * state.search.resultsPerPage; // 9

  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ingredient => {
    ingredient.quantity =
      (ingredient.quantity * newServings) / state.recipe.servings;
    state.recipe.servings = newServings;
  });
};

export const addBookMark = function (recipe) {
  state.bookMarks.push(recipe); // Add Bookmark

  // Mark current recipe as bookmark
  if (recipe.id === state.recipe.id) state.recipe.bookMarked = true; //Adding new property to recipe

  presistantBookmark();
};

export const removeBookMark = function (id) {
  const index = state.bookMarks.findIndex(el => el.id === id);
  state.bookMarks.splice(index, 1);

  // Mark current recipe as Not bookmark
  if (id === state.recipe.id) state.recipe.bookMarked = false;

  presistantBookmark();
};

const presistantBookmark = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookMarks));
};
const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookMarks = JSON.parse(storage);
};
init();
