import * as constants from "../shared/constants"

const recipesData = (state = [], action) => {
    switch (action.type) {
        case constants.ADD_RECIPE: {
            return [
                ...state,
                action.newRecipe
            ];
        }
        case constants.REMOVE_RECIPE_BY_ID: {
            const recipeId = action.recipeId;
            return state.filter(recipe => recipe.id !== recipeId);
        }
        case constants.UPDATE_RECIPE: {
            const recipeToUpdate = action.recipe;

            return state.map(recipe =>
                recipe.id === recipeToUpdate.id ?
                    {
                        ...recipe,
                        name: recipeToUpdate.name,
                        description: recipeToUpdate.description,
                        ingredients: recipeToUpdate.ingredients
                    } :
                    recipe
            );
        }
        case constants.REMOVE_RECIPES_BY_PRODUCT_ID: {
            const productId = action.productId;
            return state.filter(
                recipe => !recipe.ingredients.includes(productId)
            );
        }
        default:
            return state;
    }
};

export default recipesData;