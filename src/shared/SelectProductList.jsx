import React, {Component} from "react"
import PropTypes from "prop-types";
import messages from "./messages";

class SelectProductList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            products: props.products,
            ingredients: props.initialIngredients
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.resetSelectForm !== this.props.resetSelectForm) {
            this.setState({
                products: this.props.products,
                ingredients: []
            })
        }
    }

    onProductSelection = (product) => {
        if (product.selected) {
            this.deselectProduct(product);
        } else {
            this.selectProduct(product);
        }
    };

    selectProduct = selectedProduct => {
        this.setState(prevState => ({
            ingredients: [
                ...prevState.ingredients,
                selectedProduct.id
            ]
        }), () => {
            this.props.setSelectedIngredients(this.state.ingredients)
        });
        this.switchProductSelection(selectedProduct);
    };

    deselectProduct = productToDeselect => {
        this.setState(prevState => ({
            ingredients: prevState.ingredients.filter(productId => productId !== productToDeselect.id)
        }), () => {
            this.props.setSelectedIngredients(this.state.ingredients)
        });
        this.switchProductSelection(productToDeselect);
    };

    switchProductSelection = selectedProduct => {
        this.setState(prevState => ({
            products: prevState.products.map(product =>
                product.id === selectedProduct.id ? {
                    ...product,
                    selected: !selectedProduct.selected
                } : product
            )
        }));
    };

    filterProducts = (event) => {
        const phrase = event.currentTarget.value;
        const filteredProducts = this.state.products.map(product => {
            const shouldHideProduct = !product.name.toLowerCase().includes(phrase.toLowerCase());

            return {
                ...product,
                hidden: shouldHideProduct
            }
        });

        this.setState({
            products: filteredProducts
        })
    };

    renderProductList = () => {
        const shouldRenderProductsList = this.state.products.length > 0;

        return shouldRenderProductsList ?
            this.state.products.map(this.renderProduct) : (
                <p className="error-message">{messages.pl.recipes.labels.emptyProductsList}</p>
            );
    };

    renderProduct = product => {
        const additionalClass = product.selected ? "product-selected" : "";
        const showProduct = !product.hidden;

        return showProduct ? (
            <div
                key={product.id}
                className={`product-node ${additionalClass}`}
                onClick={() => this.onProductSelection(product)}
            >
                {product.name}
                {product.selected}
            </div>
        ) : null;
    };

    render() {
        return (
            <div>
                <input
                    className="product-search-input"
                    placeholder="szukaj produktu"
                    onInput={this.filterProducts}
                />
                {this.renderProductList()}
            </div>
        )
    }
}

SelectProductList.propTypes = {
    products: PropTypes.array.isRequired,
    setSelectedIds: PropTypes.func,
    resetSelectForm: PropTypes.bool,
    initialIngredients: PropTypes.array
};

SelectProductList.defaultProps = {
    initialIngredients: []
};

export default SelectProductList;