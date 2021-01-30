import { async } from 'regenerator-runtime';
import { API_URL } from './config.js';
import { getJSON } from './helper.js';
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
  },
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
        image: rec.image,
      };
    });
    console.log(state.search.results);
  } catch (err) {
    //temporary handling
    // console.error(`${err} 💥`)
    throw err;
  }
};
