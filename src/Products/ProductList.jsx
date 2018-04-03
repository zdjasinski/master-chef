import React, {Component} from "react";
import PropTypes from "prop-types";
import Button from "../shared/Button";
import messages from "../shared/messages";

class ProductList extends Component {

    constructor(props) {
        super(props);

        this.state ={
            products: this.props.products,
            phrase: null
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.products !== this.state.products) {
            this.setState({
                products: nextProps.products
            })
        }
    };

    setPhrase = (event) => {
        const phrase = event.currentTarget.value;

        this.setState({
            phrase: phrase
        })
    };

    setNewName = (event, productToSetName) => {
        const newName = event.target.value;
        this.props.setNewName(productToSetName, newName);
    };

    renderProductList = products => {
        const phrase = this.state.phrase;

        if (phrase) {
            const filteredProducts = products.filter(
                product => product.name.toLowerCase().includes(phrase.toLowerCase())
            );

            return filteredProducts.map(this.renderProduct);
        } else {
            return products.map(this.renderProduct);
        }
    };

    renderProduct = product => product.editMode ?
        this.renderEditedProductRow(product) :
        this.renderProductRow(product);

    renderEditedProductRow = product => {
        const buttonsConfig = [
            {
                action: this.props.removeProduct,
                label: "remove"
            },
            {
                action: this.props.updateProduct,
                label: "save"
            },
            {
                action: this.props.switchProductEdition,
                label: "cancel"
            }
        ];

        return (
            <div
                key={product.id}
                className="product-list-row"
            >
                <div>
                    <input
                        type="text"
                        onChange={(event) => this.setNewName(event, product)}
                        value={product.newName}
                        className={product.error ? "invalid-value" : ""}
                    />
                    {this.renderButtons(buttonsConfig, product)}
                </div>
                {product.error ? <span className="validation-error">{product.error}</span> : null}
            </div>
        )
    };

    renderProductRow = product => {
        const buttonsConfig = [
            {
                action: this.props.removeProduct,
                label: "remove"
            },
            {
                action: this.props.switchProductEdition,
                label: "edit"
            }
        ];

        return (
            <div
                key={product.id}
                className="product-list-row"
            >
                <p>{product.name}</p>
                {this.renderButtons(buttonsConfig, product)}
            </div>
        )
    };

    renderButtons = (buttonsConfig, product) => {
        return buttonsConfig.map((buttonConfig, index) =>
            <Button
                key={index}
                onButtonClick={() => buttonConfig.action(product)}
                label={messages.pl.products.labels[buttonConfig.label]}
            />
        );
    };

    render() {
        const shouldRenderProductList = this.props.products.length > 0;

        return shouldRenderProductList ? (
            <div className="product-list">
                <input
                    className="product-search-input"
                    onInput={this.setPhrase}
                    placeholder={messages.pl.products.placeholders.searchProduct}
                />
                <div>
                    {this.renderProductList(this.state.products)}
                </div>
            </div>
        ) : (
            <p className="error-message">{messages.pl.products.labels.emptyList}</p>
        );
    }
}

ProductList.propTypes = {
    products: PropTypes.array,
    removeProduct: PropTypes.func,
    switchProductEdition: PropTypes.func,
    updateProduct: PropTypes.func,
    setNewName: PropTypes.func
};

export default ProductList;