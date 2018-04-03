import * as constants from "../shared/constants"

export function addProduct(newProduct) {
    return {
        type: constants.ADD_PRODUCT,
        newProduct
    }
}

export function updateProduct(product) {
    return {
        type: constants.UPDATE_PRODUCT,
        product
    }
}

export function removeProduct(product) {
    return {
        type: constants.REMOVE_PRODUCT,
        product
    }
}

export function removeRecipesByProductId(productId) {
    return {
        type: constants.REMOVE_RECIPES_BY_PRODUCT_ID,
        productId
    }
}