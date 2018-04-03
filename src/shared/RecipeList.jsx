import React, {Component} from "react";
import PropTypes from "prop-types";
import {FaAngleDown, FaAngleUp} from "react-icons/lib/fa";
import RecipeEditionModal from "../Recipes/RecipeEditionModal";
import Button from "./Button";
import {getProductName} from "./helper";
import messages from "./messages";

class RecipeList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            parentRecipes: props.recipes,
            recipes: props.recipes,
            opened: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.recipes !== this.state.parentRecipes) {
            this.setState({
                recipes: nextProps.recipes
            })
        }
    }

    renderEditionActions = (recipe) => {
        return this.props.showEditionActions ? (
            this.renderActions(recipe)
        ) : null;
    };

    openEditModal = recipe => {
        this.setState({
            opened: true,
            selectedRecipe: recipe
        })
    };

    closeEditModal = () => {
        this.setState({
            opened: false,
        })
    };

    renderActions = recipe => {
        const buttonsConfig = [
            {
                action: this.props.removeRecipe,
                label: "removeRecipe"
            },
            {
                action: this.openEditModal,
                label: "edit"
            }
        ];

        return (
            this.renderButtons(buttonsConfig, recipe)
        )
    };

    renderButtons = (buttonsConfig, recipe) => {
        return buttonsConfig.map((buttonConfig, index) =>
            <Button
                key={index}
                onButtonClick={() => buttonConfig.action(recipe)}
                label={messages.pl.recipes.labels[buttonConfig.label]}
                icon={buttonConfig.icon}
            />
        );
    };

    switchDetailsVisibility = selectedRecipe => {
        this.setState(prevState => ({
            recipes: prevState.recipes.map(recipe =>
                recipe.id === selectedRecipe.id ? {
                    ...recipe,
                    showDetails: !selectedRecipe.showDetails
                } : recipe
            )
        }));
    };

    renderRecipeList = recipes => {
        const shouldRenderRecipesList = recipes.length > 0;

        return shouldRenderRecipesList ?
            recipes.map(this.renderRecipe) : (
                <p className="error-message">{this.props.recipesEmptyListMessage}</p>
            );
    };

    renderRecipeDetails = recipe => {
        return recipe.showDetails ? (
            <div className="recipe-details">
                <h3>{messages.pl.recipes.labels.preparingDescription}</h3>
                {recipe.description}
                <h3>{messages.pl.recipes.labels.ingredients}</h3>
                <ul>
                    {recipe.ingredients.map(productId =>
                        <li key={productId}>
                            {getProductName(this.props.products, productId)}
                        </li>
                    )}
                </ul>
            </div>
        ) : null;
    };

    renderRecipe = recipe => {
        return (
            <div
                key={recipe.id}
                className="recipe-list-row"
            >
                {recipe.name}
                <Button
                    onButtonClick={() => this.switchDetailsVisibility(recipe)}
                    label={messages.pl.recipes.labels.details}
                    icon={recipe.showDetails ? <FaAngleUp/> : <FaAngleDown/>}
                />
                {this.renderEditionActions(recipe)}
                {this.renderRecipeDetails(recipe)}
            </div>
        )
    };

    renderEditionModal = () => {
        return this.state.opened ? (
            <RecipeEditionModal
                close={this.closeEditModal}
                recipe={this.state.selectedRecipe}
                products={this.props.products}
                updateRecipe={this.props.updateRecipe}
            />
        ) : null
    };

    render() {
        return (
            <div className="recipe-list">
                {this.renderEditionModal()}
                {this.renderRecipeList(this.state.recipes)}
            </div>
        )
    }
}

RecipeList.propTypes = {
    recipes: PropTypes.array,
    products: PropTypes.array,
    recipesEmptyListMessage: PropTypes.string,
    removeRecipe: PropTypes.func,
    showEditionActions: PropTypes.bool,
    updateRecipe: PropTypes.func
};

RecipeList.defaultProps = {
    recipes: [],
    products: [],
};

export default RecipeList;