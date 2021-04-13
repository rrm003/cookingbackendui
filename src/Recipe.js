import React, { Component } from 'react';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import { withStyles} from '@material-ui/core/styles';

import axios from "axios";
import Paper from '@material-ui/core/Paper';

import Video from "./Video.js"
import NavBar from './NavBar.js'

const ColoredLine = ({ color }) => (
    <hr
        style={{
            backgroundColor: color,
            "height": "2px",
            "width": "100%",
            "noshade": "noshade",
        }}
    />
);

class Recipe extends Component {
    constructor(props) {
        super(props);
        this.state ={
            id : this.props.match.params.id,
            recipeData:{},
            details:{},
            instructions:[],
            ingrediants:[],
            nutrients:[],
        }
    }

    componentDidMount(){
        this.renderRecipe()
    }

    renderRecipe = () =>{
        axios.get("http://localhost:8000/v1/getForm/"+this.state.id)
        .then((response) => {
            if (response.data.data !==null) {
                var recipe = {
                    number : response.data.data["recipenumber"],
                    name : response.data.data["recipename"],
                    video : response.data.data["recipevideo"],
                    type : response.data.data["recipetype"],
                    date : response.data.data["recipedate"],
                    desktopimg : response.data.data["desktopImg"],
                    mobileimg : response.data.data["mobileImg"],
                    tags: response.data.data["tags"],
                    details: response.data.data["recipedetails"],
                    instruction : response.data.data["recipeinstruction"],
                    ingrediants: response.data.data["ingrediants"],
                    nutrients : response.data.data["nutrients"],

                }
                this.setState({recipeData: recipe});
                this.setState({details: this.state.recipeData.details});
                if(this.state.recipeData.instruction["instructionlist"] !==null){
                    this.setState({instructions: this.state.recipeData.instruction["instructionlist"]});
                }
                if(this.state.recipeData.ingrediants !== null) {
                    this.setState({ingrediants: this.state.recipeData.ingrediants});
                }
                if(this.state.recipeData.nutrients !== null){
                    this.setState({nutrients: this.state.recipeData.nutrients});
                }
            }else {
                alert("Data Not Fetched!!")
            }
          }, (error) => {
            console.log(error);
          });
    }

    render() {
        const StyledTableCell = withStyles((theme) => ({
            head: {
              backgroundColor: theme.palette.common.black,
              color: theme.palette.common.white,
            },
            body: {
              fontSize: 24,
            },
          }))(TableCell);
          
          const StyledTableRow = withStyles((theme) => ({
            root: {
              '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
              },
            },
          }))(TableRow);
        const ref = React.createRef();
        console.log(this.state.recipeData)
        return (
            <div>
                <NavBar id={-1}/>
                <div style={{"width":"100%", "alignContent":"center", "alignItems":"center"}}>
                    <Paper style={{"padding":"2%", "background-image": "linear-gradient(black, white),"}} elevation={3} ref={ref}>
                        <img src={"http://localhost:8000/image/desktop/"+this.state.recipeData.desktopimg} style={{"backgroundColor":"black"}} width="95%" height="500px" alt="recipe image"/>
                        <h1>{this.state.recipeData.name}</h1>
                        <label>{this.state.recipeData.type}</label>
                        <div style={{"textAlign":"justify" ,"fontStyle":"italic"}}>
                            <ul>
                                <li><b>{"Cooking Time : " + this.state.details.cookingtime + "min"}</b></li>
                                <br/>
                                <li><b>{"Ready Time : " +this.state.details.readytime + "min"}</b></li>
                                <br/>
                                <li><b>{"Prepration Time : " +this.state.details.preprationtime + "min"}</b></li>
                                <br/>
                            </ul>
                        </div>

                        <label><h4>Details</h4></label>
                        <p style={{"textAlign":"justify","textJustify":"inter-word" ,"fontStyle":"-moz-initial", "fontSize":"22px"}}>{this.state.details.extradetail}</p>
                        <label><h4>Note</h4></label>
                        <p style={{"textAlign":"justify","textJustify":"inter-word","fontSize":"22px"}}><b>{this.state.details.notebeforecooking}</b></p> 
                        <h4>Ingredients : </h4>
                        <ul>
                        {
                            this.state.ingrediants.map((value, index)=>(
                                <div key={index}>
                                    <ListItem >
                                        <ListItemText primary={index+1+". "+value.ingredientname} />
                                    </ListItem>
                                </div>
                            ))
                        }
                        </ul>
                        <h4>Instrctions : </h4>
                        <List>
                        {
                            this.state.instructions.map((value, index)=>(
                                <div key={index}>
                                    <ListItem alignItems="flex-start">
                                        <ListItemText style={{"fontSize":"28px"}} primary={index+1 +". "+value} />
                                    </ListItem>
                                </div>
                            ))
                        }
                        </List>

                        <h4>Nurients : </h4>
                        <TableContainer component={Paper}>
                            <Table aria-label="customized table">
                                <TableBody>
                                {this.state.nutrients.map((row, index) => (
                                    <StyledTableRow key={index}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.nutrientsname}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{row.nutrientsquantity}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <ColoredLine />
                        <Video video={this.state.recipeData.video}/>
                    </Paper>
                </div>
            </div>
        );
    }
}
 
export default Recipe;