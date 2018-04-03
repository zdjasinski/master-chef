import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import SelectProductList from "../shared/SelectProductList"
import RecipeList from "../shared/RecipeList"
import messages from "../shared/messages"

class RecipesSearch extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ingredients: [],
            products: this.props.products,
            recipes: this.props.recipes
        };
    }

    setSelectedIngredients = ingredients => {
        this.setState({
            ingredients: ingredients
        })
    };

    filteredRecipes = () => {
        const userIngredientsIds = this.state.ingredients;

        return this.state.recipes.filter(recipe => {
            const missingIngredients = recipe.ingredients.filter(
                ingredientId => !userIngredientsIds.includes(ingredientId)
            );

            return missingIngredients.length === 0;
        })
    };

    render() {
        return (
            <div>
                <label>{messages.pl.search.labels.info}</label>
                <SelectProductList
                    products={this.props.products}
                    setSelectedIngredients={this.setSelectedIngredients}
                />
                <RecipeList
                    recipes={this.filteredRecipes()}
                    products={this.props.products}
                    recipesEmptyListMessage={messages.pl.recipes.labels.recipesNotFound}
                />
            </div>
        )
    }
}


RecipesSearch.propTypes = {
    recipes: PropTypes.array,
    products: PropTypes.array
};

RecipesSearch.defaultProps = {
    products: [],
    recipes: []
};

const mapStateToProps = state => {
    return {
        recipes: state.recipes,
        products: state.products
    };
};

export default connect(mapStateToProps, null)(RecipesSearch);