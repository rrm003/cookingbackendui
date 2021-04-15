import React, { Component } from 'react';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import NavBar from './NavBar';
import axios from 'axios';

import config from './config.json';

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

class Miscellaneous extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipeID:0,
            recipeName:'',
            newRecipe: '',
            recipeTypeList: [],
            newRecipeType:'',
            recipeType: [],
            names : [],
            recipe : null,
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        this.renderRecipeType();
    }

    addRecipeType() {
        if(this.state.newRecipeType === ""){
            alert("Empty Recipe Type")
            return
        }
        axios.post(config.serv_url+'/v1/addrecipetype/'+ this.state.newRecipeType)
        .then((response) => {
                console.log(response.data.data);
                if (response.data.data===true){
                    window.location.reload();
                    alert("Type Added!")
                }else{
                    alert("Type Not Added!")
                }
            }, (error) => {
            console.log(error);
        });
    }

    removeRecipeType(id) {
        console.log(id)
        axios.post(config.serv_url+'/v1/removerecipetype/'+ id)
        .then((response) => {
                console.log(response.data.data);
                if (response.data.data===true){
                    window.location.reload();
                    alert("Type Removed!")
                }else{
                    alert("Type Not Removed!")
                }
            }, (error) => {
            console.log(error);
        });
    }

    handleChange(event) {
        console.log(this.state.names)
        for (var i=0; i < this.state.names.length; i++){
               var temp =  this.state.names[i]
               console.log(temp.recipename, event.target.value)
            if (temp.recipename === event.target.value){
                this.setState({recipe: temp})
            }
        }
        console.log(event.target.value);
        console.log(event.target.name);
        this.setState({[event.target.name]: event.target.value});
    }

    SendMail = () =>{
        if (this.state.recipeName === ''){
            alert("Enter Recipe !!")
            return
        }
        axios.post(config.serv_url+"/v1/sendmail/"+this.state.recipe.recipenumber)
        .then((response) => {
            if (response.data.data!==null || response.data.data!=="undefined") {
                alert("Mail Sent!!");
                window.location.reload();
            }else {
                alert("Data Not Fetched!!");
            }
          }, (error) => {
            console.log(error);
        });
    }

    renderRecipeType = () =>{
        axios.get(config.serv_url+"/v1/getall")
        .then((response) => {
            if (response.data.data!==null || response.data.data!=="undefined") {
                this.setState({names : response.data.data})
            }else {
                alert("Data Not Fetched!!")
            }
          }, (error) => {
            console.log(error);
        });
        axios.get(config.serv_url+"/v1/recipetype")
        .then((response) => {
            if (response.data.data!==null || response.data.data!=="undefined") {
                this.setState({recipeType : response.data.data})
                console.log(response.data.data)
            }else {
                alert("Data Not Fetched!!")
            }
          }, (error) => {
            console.log(error);
          });
    }

    render() {
        console.log(this.state.names[0]) 
        return (
            <div>
                <NavBar id={4}/>
                <div className= "FormContainer">
                    <form onSubmit={this.handleSubmit} style={{"padding" : "2%", "text-align": "start"}}>
                        <div>
                            <h4>Send Mail : </h4>
                            <FormControl style={{"width":"300px"}}>
                                <InputLabel>Recipe Name</InputLabel>
                                <Select
                                    id="recipeName"
                                    name="recipeName"
                                    value={this.state.recipeName}
                                    onChange={this.handleChange}
                                >
                                {this.state.names.map((name) => (
                                    <div style={{display:'flex', flexDirection:'column'}}  key={name["recipenumber"]} value={name["recipename"]}>
                                        <MenuItem>
                                        {name["recipename"]}
                                        </MenuItem>
                                    </div>
                                ))}
                                </Select>
                            </FormControl>
                            <Button style={{"margin":"10px"}} variant="contained" size="small" onClick={(e)=>this.SendMail(e)}> 
                                Send 
                            </Button>
                        </div>
                    </form>
                </div>
                <ColoredLine black/>
                <div className= "FormContainer">
                    <form onSubmit={this.handleSubmit} style={{"padding" : "2%", "text-align": "start"}}>
                        <div>
                            <h4>ADD Recipe Type : </h4>
                            <List>
                            {
                                this.state.recipeType.map((value, index)=>(
                                    <div key={index}>
                                        <ListItem>
                                            <ListItemText primary={value.recipetype} />
                                            <ListItemSecondaryAction>
                                                <IconButton edge="end" aria-label="delete" onClick={(e)=>this.removeRecipeType(value.recipetypeid)}>
                                                <DeleteIcon />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                       
                                    </div>
                                ))
                            }
                            </List>
                            <TextField
                                label="New Recipe Type"
                                id="newRecipeType"
                                name="newRecipeType"
                                defaultValue=""
                                helperText="Write new Recipe Type"
                                style={{ margin: 10}}
                                rows={2}
                                variant="outlined"
                                margin="dense"
                                multiline
                                onChange={this.handleChange}
                            />
                            <Button style={{"margin":"10px"}} variant="contained" size="small" onClick={(e)=>this.addRecipeType(e)}> 
                                Add +
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}


export default Miscellaneous;