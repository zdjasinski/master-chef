import * as constants from "../shared/constants"

const productsData = (state = [], action) => {
    switch (action.type) {
        case constants.ADD_PRODUCT: {
            return [
                ...state,
                action.newProduct
            ]
        }
        case constants.UPDATE_PRODUCT: {
            const productToUpdate = action.product;

            return state.map(product =>
                product.id === productToUpdate.id ?
                    {
                        ...product,
                        name: productToUpdate.newName
                    } :
                    product
            );
        }
        case constants.REMOVE_PRODUCT: {
            const productToRemove = action.product;

            return state.filter(product =>
                product.id !== productToRemove.id
            );
        }
        default:
            return state;
    }
};

export default productsData;