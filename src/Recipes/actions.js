import * as constants from "../shared/constants"

export function addRecipe(newRecipe) {
    return {
        type: constants.ADD_RECIPE,
        newRecipe
    }
}

export function removeRecipeById(recipeId) {
    return {
        type: constants.REMOVE_RECIPE_BY_ID,
        recipeId
    }
}

export function updateRecipe(recipe) {
    return {
        type: constants.UPDATE_RECIPE,
        recipe
    }
}