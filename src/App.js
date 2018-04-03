import React, {Component} from "react";
import {
    BrowserRouter as Router,
    Route,
    NavLink
} from "react-router-dom";
import {combineReducers, createStore} from "redux";
import {Provider} from "react-redux";
import ProductBook from "./Products/ProductBook";
import RecipesCreator from "./Recipes/RecipesCreator";
import RecipesSearch from "./ReciplesSearchEngine/RecipesSearch";
import products from "./Products/reducers";
import recipes from "./Recipes/reducers";
import {initialState} from "./shared/constants";
import messages from "./shared/messages";
import "./styles/App.css";

const reducers = combineReducers({
    products,
    recipes
});

const store = createStore(
    reducers,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="container">
                        <div className="header">
                            <h1>{messages.pl.menu.header}</h1>
                        </div>
                        <div className="menu">
                            <ul>
                                <li>
                                    <NavLink exact to="/" activeClassName="active">{messages.pl.menu.products}</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/recipes" activeClassName="active">{messages.pl.menu.recipes}</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/search" activeClassName="active">{messages.pl.menu.search}</NavLink>
                                </li>
                            </ul>
                        </div>
                        <div className="middle float-fix">
                            <Route exact path="/" component={ProductBook}/>
                            <Route path="/recipes" component={RecipesCreator}/>
                            <Route path="/search" component={RecipesSearch}/>
                        </div>
                        <div className="footer">
                            <p>{messages.pl.menu.footer}</p>
                        </div>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;