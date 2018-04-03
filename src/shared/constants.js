import Recipe from "../Recipes/RecipeModel";
import Product from "../Products/ProductModel";

export const ADD_PRODUCT = "ADD_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const REMOVE_PRODUCT = "REMOVE_PRODUCT";

export const ADD_RECIPE = "ADD_RECIPE";
export const REMOVE_RECIPE_BY_ID = "REMOVE_RECIPE_BY_ID";
export const UPDATE_RECIPE = "UPDATE_RECIPE";
export const REMOVE_RECIPES_BY_PRODUCT_ID = "REMOVE_RECIPES_BY_PRODUCT_ID";

export const initialState = {
    recipes: [
        new Recipe(
            1,
            "Jajecznica",
            "Roztopić masło na patelni następnie rozbic dwa jajka i dodać szczyptę soli, mieszać ok. 2 min.",
            [2, 3, 4]
        )
    ],
    products: [
        new Product(1, "mleko"),
        new Product(2, "masło"),
        new Product(3, "jajka"),
        new Product(4, "sól"),
    ]
};

export const modalStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        width: "40%"
    }
};