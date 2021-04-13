import './App.css';
import {HashRouter as Router, Route } from "react-router-dom";

import Home from "./home.js"
import Recipe from "./Recipe.js"
import UpdateForm from "./updateForm"
import RecipeForm from "./RecipeForm"
import Miscellaneous from "./Miscellaneous.js"
import Faq from "./Faq.js"

function App() {
  return (
    <div className="App">
      <header className="App-header" style={{"padding":"10px"}}>
      <Router>
        <Route exact path="/" component={Home} />
        <Route exact path="/updateForm/" component={UpdateForm} />
        <Route exact path="/updateForm/:id" component={UpdateForm} />
        <Route exact path="/recipeForm" component={RecipeForm} />
        <Route exact path="/recipe/:id" component={Recipe}/>
        <Route exact path="/miscellaneous" component={Miscellaneous} />
        <Route exact path="/faq" component={Faq} />
      </Router>
      </header>
    </div>
  );
}

export default App;
