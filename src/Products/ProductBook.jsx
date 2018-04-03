import React, {Component} from "react";
import {connect} from "react-redux";
import {Form, Text} from "react-form";
import PropTypes from "prop-types";
import Modal from "react-modal";
import get from "lodash/get";
import ProductList from "./ProductList"
import Product from "./ProductModel"
import {isBlank, generateRandomId} from "../shared/helper";
import messages from "../shared/messages"
import * as actions from "./actions";
import {modalStyles} from "../shared/constants"

class ProductBook extends Component {

    constructor(props) {
        super(props);

        this.state = {
            products: this.props.products,
            modalIsOpen: false
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.products !== this.state.products) {
            this.setState({
                products: nextProps.products
            })
        }
    };

    openModal = productToRemove => {
        this.setState({
            modalIsOpen: true,
            productToRemove: productToRemove
        });
    };

    closeModal = () => {
        this.setState({modalIsOpen: false});
    };

    addProduct = newProductFormValues => {
        const newProduct = new Product(
            generateRandomId(),
            newProductFormValues.newProductName
        );

        this.props.addProduct(newProduct);
    };

    isProductUsed = productId => {
        const recipe = this.props.recipes.find(recipe =>
            recipe.ingredients.includes(productId)
        );

        return !!recipe;
    };

    prepareRemoveProduct = productToRemove => {
        if (this.isProductUsed(productToRemove.id)) {
            this.openModal(productToRemove);
        } else {
            this.removeProductAndRelatedRecipes(productToRemove);
        }
    };

    removeProduct = productToRemove => {
        this.removeProductAndRelatedRecipes(productToRemove);
        this.closeModal();
    };

    removeProductAndRelatedRecipes = productToRemove => {
        this.props.removeProduct(productToRemove);
        this.props.removeRecipesByProductId(productToRemove.id);
    };

    switchProductEdition = selectedProduct => {
        this.setState(state => ({
            products: state.products.map(product =>
                product.id === selectedProduct.id ?
                    {
                        ...product,
                        editMode: !selectedProduct.editMode,
                        newName: selectedProduct.name,
                        error: null
                    } :
                    product
            )
        }));
    };

    updateProduct = productToUpdate => {
        if (isBlank(productToUpdate.newName)) {
            this.throwUpdateProductNameValidationError(productToUpdate);
            return;
        }

        this.props.updateProduct(productToUpdate);
    };

    throwUpdateProductNameValidationError = productToUpdate => {
        this.setState(state => ({
            products: state.products.map(product =>
                product.id === productToUpdate.id ?
                    {
                        ...product,
                        error: messages.pl.validation.fieldNullOrEmpty
                    } :
                    product
            )
        }));
    };

    setNewName = (productToSetName, newName) => {
        this.setState(state => ({
            products: state.products.map(product =>
                product.id === productToSetName.id ?
                    {
                        ...product,
                        newName: newName
                    } :
                    product
            )
        }));
    };

    render() {
        const validateNewProduct = value => ({
            error: isBlank(value) ? messages.pl.validation.fieldNullOrEmpty : null
        });

        return (
            <div>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={modalStyles}
                >
                    <h2>{messages.pl.modals.removeProduct.content}</h2>
                    <button
                        onClick={this.closeModal}
                        className="modal-cancel-button"
                    >
                        {messages.pl.modals.removeProduct.cancel}
                    </button>
                    <button
                        onClick={() => this.removeProduct(this.state.productToRemove)}
                        className="submit-button modal-submit-button"
                    >
                        {messages.pl.modals.removeProduct.submit}
                    </button>
                </Modal>
                <div className="middle_left">
                    <Form
                        onSubmit={(values, e, formApi) => {
                            this.addProduct(values);
                            formApi.resetAll();
                        }}
                        validateOnSubmit
                    >
                        {formApi => (
                            <form
                                onSubmit={formApi.submitForm}
                                id="newProductForm"
                                className="mb-4"
                            >
                                <label htmlFor="newProductName">{messages.pl.products.labels.newProduct}</label>
                                <Text
                                    field="newProductName"
                                    id="newProductName"
                                    validate={validateNewProduct}
                                    className={get(formApi.errors, "newProductName", null) ? "invalid-value" : ""}
                                    placeholder={messages.pl.products.placeholders.newProduct}
                                />
                                <div className="validation-error">
                                    {get(formApi.errors, "newProductName", null)}
                                </div>
                                <button
                                    type="submit"
                                    className="submit-button"
                                >
                                    {messages.pl.products.labels.addProduct}
                                </button>

                            </form>
                        )}
                    </Form>
                </div>
                <div className="middle_right">
                    <label>{messages.pl.products.labels.list}</label>
                    <ProductList
                        products={this.state.products}
                        removeProduct={this.prepareRemoveProduct}
                        switchProductEdition={this.switchProductEdition}
                        updateProduct={this.updateProduct}
                        setNewName={this.setNewName}
                    />
                </div>
            </div>
        );
    }
}

ProductBook.propTypes = {
    products: PropTypes.array,
    recipes: PropTypes.array,
    addProduct: PropTypes.func,
    updateProduct: PropTypes.func,
    removeProduct: PropTypes.func,
    removeRecipesByProductId: PropTypes.func,
};

ProductBook.defaultProps = {
    products: [],
    recipes: []
};

const mapStateToProps = state => {
    return {
        products: state.products,
        recipes: state.recipes,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        addProduct: newProduct => dispatch(actions.addProduct(newProduct)),
        updateProduct: product => dispatch(actions.updateProduct(product)),
        removeProduct: product => dispatch(actions.removeProduct(product)),
        removeRecipesByProductId: productId => dispatch(actions.removeRecipesByProductId(productId)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductBook);