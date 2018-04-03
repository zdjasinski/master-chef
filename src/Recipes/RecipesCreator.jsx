import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Form, Text, TextArea} from "react-form";
import get from "lodash/get";
import RecipeList from "../shared/RecipeList";
import SelectProductList from "../shared/SelectProductList";
import Recipe from "./RecipeModel";
import messages from "../shared/messages";
import {isBlank, generateRandomId} from "../shared/helper";
import * as actions from "./actions";

class RecipesCreator extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ingredients: [],
            products: this.props.products,
            recipes: this.props.recipes,
            resetSelectForm: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.recipes !== this.state.recipes) {
            this.setState({
                recipes: nextProps.recipes
            })
        }
    }

    setSelectedIngredients = ingredients => {
        this.setState({
            ingredients: ingredients
        })
    };

    addRecipe = (newRecipeFormValues, formApi) => {
        if (this.state.ingredients.length < 1) {
            this.setState({
                anyIngredientSelectedError: messages.pl.recipes.validation.anyIngredientSelected
            });

            return;
        }

        this.props.addRecipeToStore(new Recipe(
            generateRandomId(),
            newRecipeFormValues.name,
            newRecipeFormValues.description,
            this.state.ingredients
        ));
        formApi.resetAll();
        this.clearForm();
    };

    clearForm = () => {
        this.setState(state => ({
            anyIngredientSelectedError: null,
            ingredients: [],
            products: state.products.map(product => ({
                ...product,
                selected: false
            })),
            resetSelectForm: !state.resetSelectForm
        }));
    };

    renderIngredientsError = () => {
        return this.state.anyIngredientSelectedError ?
            <span className="validation-error">{this.state.anyIngredientSelectedError}</span> :
            null;
    };

    render() {
        const validateNewRecipe = value => ({
            error: isBlank(value) ? messages.pl.validation.fieldNullOrEmpty : null
        });

        return (
            <div>
                <div className="middle_left">
                    <label>{messages.pl.recipes.labels.createNewRecipe}</label>
                    <SelectProductList
                        products={this.state.products}
                        setSelectedIngredients={this.setSelectedIngredients}
                        resetSelectForm={this.state.resetSelectForm}
                    />
                    {this.renderIngredientsError()}
                    <Form
                        onSubmit={(values, e, formApi) => this.addRecipe(values, formApi)}
                        validateOnSubmit
                    >
                        {formApi => (
                            <form
                                onSubmit={formApi.submitForm}
                                className="new-recipe-form"
                            >
                                <Text
                                    field="name"
                                    id="name"
                                    validate={validateNewRecipe}
                                    className={formApi.errors && formApi.errors.name ? "invalid-value" : ""}
                                    placeholder={messages.pl.recipes.labels.name}
                                />
                                <div className="validation-error">{get(formApi.errors, "name", null)}</div>
                                <TextArea
                                    field="description"
                                    id="description"
                                    validate={validateNewRecipe}
                                    className={formApi.errors && formApi.errors.description ? "invalid-value" : ""}
                                    placeholder={messages.pl.recipes.labels.description}
                                />
                                <div className="validation-error">{get(formApi.errors, "description", null)}</div>
                                <button
                                    type="submit"
                                    className="submit-button"
                                >
                                    {messages.pl.recipes.labels.addRecipe}
                                </button>
                            </form>
                        )}
                    </Form>
                </div>
                <div className="middle_right">
                    <label>{messages.pl.recipes.labels.list}</label>
                    <RecipeList
                        recipes={this.props.recipes}
                        products={this.props.products}
                        recipesEmptyListMessage={messages.pl.recipes.labels.emptyRecipesList}
                        removeRecipe={this.props.removeRecipeToStore}
                        showEditionActions
                        updateRecipe={this.props.updateRecipe}
                    />
                </div>
            </div>
        )
    };
}

RecipesCreator.propTypes = {
    products: PropTypes.array,
    recipes: PropTypes.array,
    addRecipeToStore: PropTypes.func,
    removeRecipeToStore: PropTypes.func
};

RecipesCreator.defaultProps = {
    products: [],
    recipes: []
};

const mapStateToProps = (state) => {
    return {
        products: state.products,
        recipes: state.recipes
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addRecipeToStore: newRecipe => dispatch(actions.addRecipe(newRecipe)),
        removeRecipeToStore: recipe => dispatch(actions.removeRecipeById(recipe.id)),
        updateRecipe: recipe => dispatch(actions.updateRecipe(recipe))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipesCreator);