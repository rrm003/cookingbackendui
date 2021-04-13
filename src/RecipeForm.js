import React, { Component } from 'react'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import { Input } from '@material-ui/core';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import "./RecipeForm.css"
import NavBar from './NavBar.js'
import axios from 'axios';

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

export default class RecipeForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            video:'',
            type: '',
            tags: [],
            newtag: '',
            mobImg: null,
            Img: null,
            dskImg: null,
            cookingTime : 0,
            preprationTime : 0,
            readyTime : 0,
            servePeople : 0,
            details: '',
            notes: '',
            energy: 0,
            carbohydrates: 0,
            protien: 0,
            fat: '',
            fiber: '',
            sodium: '',
            instructionList: [],
            newInstruction:'',
            ingredientList: [],
            newIngredient:'',
            names : [],
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleFile = this.handleFile.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }


    componentDidMount(){
        this.renderRecipeType();
    }

    renderRecipeType = () =>{
        axios.get("http://localhost:8000/v1/recipetype")
        .then((response) => {
            if (response.data.data!==null || response.data.data!=="undefined") {
                this.setState({names : response.data.data})
                console.log(response.data.data)
            }else {
                alert("Data Not Fetched!!")
            }
          }, (error) => {
            console.log(error);
          });
    }

      handleReset(){
        document.querySelectorAll('input');
        this.setState({
            newtag: ''
        });
      };
      
      shouldComponentUpdate(nextprops, nextstate){
        console.log("Update")
        return true
      }

      tagAdd(event) {
          if (this.state.newtag === ''){
            alert("Empty tag")
            return
          }else{
            this.setState({tags: [...this.state.tags, this.state.newtag]})
            this.setState({newtag:''});
            document.getElementById("newtag").value = '';
          }
       }

      tagRemove(index) {
        this.state.tags.splice(index,1)
        this.setState({tags: this.state.tags})
      }

      instructionAdd() {
        if (this.state.newInstruction === ''){
            alert("Empty Instruction")
            return
          }else{
            this.setState({instructionList: [...this.state.instructionList, this.state.newInstruction]})
            this.setState({newInstruction:''});
            document.getElementById("newInstruction").value = '';
          }
      }

      instructionRemove(index) {
        this.state.instructionList.splice(index,1)
        this.setState({instructionList: this.state.instructionList})
      }

      ingredientAdd() {
        if (this.state.newIngredient === ''){
            alert("Empty Ingredient")
            return
          }else{
            this.setState({ingredientList: [...this.state.ingredientList, this.state.newIngredient]});
            this.setState({newIngredient:''});
            document.getElementById("newIngredient").value = '';
          }
      }

      ingredientRemove(index) {
        this.state.ingredientList.splice(index,1)
        this.setState({ingredientList: this.state.ingredientList})
      }
    
      handleChange(event) {
        console.log(event.target.value);
        this.setState({[event.target.name]: event.target.value});
      }

      handleFile(event) {
        console.log(event.target.files[0]);
        console.log(event.target.name)
        let file = event.target.files[0];
        this.setState({[event.target.name]: event.target.files[0]})
      }
    
      handleSubmit(event) {
        var formFile = new FormData();
        event.preventDefault();
        if(this.state.name ===''|| this.state.video ==='' || this.state.type ===''){
            alert("Empty Feilds!")
            return
        }else if (this.state.dskImg ===null|| this.state.mobImg ===null|| this.state.Img ===null){
            alert("Empty Image Paths!")
            return
        }else if (this.state.preprationTime <1 || this.state.cookingTime <1 || this.state.readyTime <1 || this.state.servePeople <1){
            alert("Set recipe time!")
            return
        }else if (this.state.instructionList.length <1){
            alert("Add instruction!")
            return
        }else if (this.state.ingredientList.length <1){
            alert("Add ingredients!")
            return
        }else {

            var recipedetails = {
                cookingtime : parseInt(this.state.cookingTime),
                preprationtime : parseInt(this.state.preprationTime),
                readytime : parseInt(this.state.readyTime),
                serverpeople : parseInt(this.state.servePeople),
                extradetail : this.state.details,
                notebeforecooking: this.state.notes,
            }

            var recipeinstruction = {
                instructionlist: this.state.instructionList,
            }

            var ingredientsList = []
            for (var i=0; i<this.state.ingredientList.length; i++){
                var temp = {
                    ingredientname : this.state.ingredientList[i]
                }
                ingredientsList.push(temp)
            }

            var nutrientsList = []
            nutrientsList.push({nutrientsname : 'energy', nutrientsquantity : parseFloat(this.state.energy) })
            nutrientsList.push({nutrientsname : 'protien', nutrientsquantity : parseFloat(this.state.protien) })
            nutrientsList.push({nutrientsname : 'carbohydrates', nutrientsquantity : parseFloat(this.state.carbohydrates) })
            nutrientsList.push({nutrientsname : 'fat', nutrientsquantity : parseFloat(this.state.fat) })
            nutrientsList.push({nutrientsname : 'fiber', nutrientsquantity : parseFloat(this.state.fiber) })
            nutrientsList.push({nutrientsname : 'sodium', nutrientsquantity : parseFloat(this.state.sodium) })
        
            var formData = {
                recipename : this.state.name,
                recipevideo: this.state.video,
                recipetype : this.state.type,
                desktopImg : "",
                mobileImg : "",
                img : "",
                tags : this.state.tags,
                recipedetails : recipedetails,
                recipeinstruction: recipeinstruction,
                ingrediants : ingredientsList,
                nutrients : nutrientsList,
            }
            
            formFile.append("dskimage", this.state.dskImg);
            formFile.append("mobimage", this.state.mobImg);
            formFile.append("image", this.state.Img);
            console.log(formFile)
            
            console.log(JSON.stringify(formData))
            axios.post('http://localhost:8000/v1/addForm',formData)
              .then((response) => {
                console.log(response);
                if (response.data.data === true) {
                    axios.post(
                        'http://localhost:8000/v1/img/'+response.data.recipeID+"/"+response.data.recipeName,
                        formFile,
                        {
                            headers: {
                            'Content-Type': 'multipart/form-data'
                            }
                        }
                    )
                    alert("Data Added!!")
                }else {
                    alert("Data Not Added!!")
                }
              }, (error) => {
                console.log(error);
              });
        }
      }
      
      render() {
        return (
            <div>
                <NavBar id={2}/>
                <div className= "FormContainer">
                        <div className="FormHeader"  style={{"color":"white"}}>
                            <label>Recipe Details</label>
                        </div>
                        <form onSubmit={this.handleSubmit} className="RecipeForm">
                        <div style={{"margin":"50px"}}>
                            <div>
                            <TextField
                                label="Recipe Name"
                                id="name"
                                name="name"
                                defaultValue=""
                                helperText="Name of Recipie"
                                style={{ margin: 10}}
                                margin="normal"
                                onChange={this.handleChange}
                            />
                            <TextField
                                label="VideoID"
                                id="video"
                                name="video"
                                defaultValue=""
                                helperText="Youtube VideoID of Recipie"
                                style={{ margin: 10}}
                                margin="normal"
                                onChange={this.handleChange}
                            />
                            <div style={{margin:10}}>
                                <InputLabel>Recipe Type</InputLabel>
                                <Select
                                    id="type"
                                    name="type"
                                    value={this.state.type}
                                    style={{"width":"250px"}}
                                    helperText="Type of Recipe"
                                    onChange={this.handleChange}
                                >
                                {this.state.names.map((name) => (
                                    <div style={{display:'flex', flexDirection:'column'}} key={name["recipetypeid"]} value={name["recipetype"]}>
                                        <MenuItem>
                                        {name["recipetype"]}
                                        </MenuItem>
                                    </div>
                                ))}
                                </Select>
                            </div>
                            <div>
                                <h4>Tags : </h4>
                                <List>
                                {
                                    this.state.tags.map((value, index)=>(
                                        <div key={index}>
                                            <ListItem>
                                                <ListItemText primary={value} />
                                                <ListItemSecondaryAction>
                                                    <IconButton edge="end" aria-label="delete" onClick={(e)=>this.tagRemove(index)}>
                                                    <DeleteIcon />
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        </div>
                                    ))
                                }
                                </List>
                                <TextField
                                    label="New Tag"
                                    id="newtag"
                                    name="newtag"
                                    helperText="New Tag"
                                    style={{ margin: 10}}
                                    margin="normal"
                                    onChange={this.handleChange}
                                />
                                <Button style={{"margin":"10px"}} variant="contained" size="small" onClick={(e)=>this.tagAdd(e)}> 
                                    Add +
                                </Button>
                            </div>
                            <table style={{"fontSize":"20px", "margin":"10px", "width":"50%"}}>
                                <tbody>
                                    <tr>
                                        <td><label>Desktop Image:</label></td>
                                        <td><input type="file" name="dskImg" onChange={this.handleFile} /></td>
                                    </tr>
                                    <tr>
                                        <td><label>Mobile Image:</label></td>
                                        <td><input type="file" name="mobImg" onChange={this.handleFile} /></td>
                                    </tr>
                                    <tr>
                                        <td><label>Image:</label></td>
                                        <td><input type="file" name="Img" onChange={this.handleFile} /></td>
                                    </tr>
                                </tbody>
                            </table>
                            </div>
                            < ColoredLine black/>
                            <div>
                            <Input
                                placeholder="Cooking Time"
                                type="number" 
                                name="cookingTime" 
                                style={{ margin: 10}}
                                onChange={this.handleChange}
                            />
                            <Input 
                                placeholder="Prepration Time"
                                type="number" 
                                name="preprationTime" 
                                style={{ margin: 10}}
                                onChange={this.handleChange}
                            />
                            <Input 
                                placeholder="Ready Time"
                                type="number" 
                                name="readyTime" 
                                style={{ margin: 10}}
                                onChange={this.handleChange}
                            />
                            <Input 
                                placeholder="Serve People"
                                type="number" 
                                name="servePeople" 
                                style={{ margin: 10}}
                                onChange={this.handleChange}
                            />
                            <TextField
                                id="details"
                                name="details"
                                label="Extra Details"
                                multiline
                                rows={10}
                                defaultValue=""
                                variant="outlined"
                                margin="dense"
                                fullWidth
                                onChange={this.handleChange}
                            />
                            <TextField
                                id="notes"
                                name="notes"
                                label="Notes"
                                multiline
                                rows={5}
                                defaultValue=""
                                variant="outlined"
                                margin="dense"
                                fullWidth
                                onChange={this.handleChange}
                            />
                            </div>
                            < ColoredLine black/>
                            <div>
                                <h4>Instrctions : </h4>
                                <List>
                                {
                                    this.state.instructionList.map((value, index)=>(
                                        <div key={index}>
                                            <ListItem>
                                                <ListItemText primary={value} />
                                                <ListItemSecondaryAction>
                                                    <IconButton edge="end" aria-label="delete" onClick={(e)=>this.instructionRemove(index)}>
                                                    <DeleteIcon />
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        </div>
                                    ))
                                }
                                </List>
                                <TextField
                                    label="New Instruction"
                                    id="newInstruction"
                                    name="newInstruction"
                                    defaultValue=""
                                    helperText="Write new instruction"
                                    multiline
                                    rows={5}
                                    style={{ margin: 10}}
                                    variant="outlined"
                                    margin="dense"
                                    multiline
                                    fullWidth
                                    onChange={this.handleChange}
                                />
                                <Button style={{"margin":"10px"}} variant="contained" size="small" onClick={(e)=>this.instructionAdd(e)}> 
                                    Add +
                                </Button>
                            </div>
                            < ColoredLine black/>
                            <div>
                                <h4>Ingredients : </h4>
                                <List>
                                {
                                    this.state.ingredientList.map((value, index)=>(
                                        <div key={index}>
                                            <ListItem>
                                                <ListItemText primary={value} />
                                                <ListItemSecondaryAction>
                                                    <IconButton edge="end" aria-label="delete" onClick={(e)=>this.ingredientRemove(index)}>
                                                    <DeleteIcon />
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        </div>
                                    ))
                                }
                                </List>
                                <TextField
                                    label="New Ingredients"
                                    id="newIngredient"
                                    name="newIngredient"
                                    defaultValue=""
                                    helperText="New Ingredients"
                                    style={{ margin: 10}}
                                    margin="normal"
                                    onChange={this.handleChange}
                                />
                                <Button style={{"margin":"10px"}} variant="contained" size="small" onClick={(e)=>this.ingredientAdd(e)}> 
                                    Add +
                                </Button>
                            </div>
                            < ColoredLine black/>
                            <div>
                            <TextField
                                label="Energy"
                                id="energy"
                                name="energy"
                                defaultValue=""
                                helperText="kCal"
                                style={{ margin: 10 }}
                                margin="normal"
                                onChange={this.handleChange}
                            />
                            <TextField
                                label="Carbohydrates"
                                id="carbohydrates"
                                name="carbohydrates"
                                defaultValue=""
                                helperText="gram"
                                style={{ margin: 10 }}
                                margin="normal"
                                onChange={this.handleChange}
                            />
                            <TextField
                                label="Fat"
                                id="fat"
                                name="fat"
                                defaultValue=""
                                helperText="gram"
                                style={{ margin: 10 }}
                                margin="normal"
                                onChange={this.handleChange}
                            />
                            <TextField
                                label="Protien"
                                id="protien"
                                name="protien"
                                defaultValue=""
                                helperText="gram"
                                style={{ margin: 10 }}
                                margin="normal"
                                onChange={this.handleChange}
                            />
                            <TextField
                                label="Fiber"
                                id="fiber"
                                name="fiber"
                                defaultValue=""
                                helperText="gram"
                                style={{ margin: 10 }}
                                margin="normal"
                                onChange={this.handleChange}
                            />
                            <TextField
                                label="Sodium"
                                id="sodium"
                                name="sodium"
                                defaultValue=""
                                helperText="milligram"
                                style={{ margin: 10 }}
                                margin="normal"
                                onChange={this.handleChange}
                            />
                            </div>
                        </div>
                        <Button style={{"backgroundColor": "black", "color":"white"}} type="submit" variant="contained" value="Submit">Submit</Button>
                    </form>
            </div>
          </div>
        );
      }   
}
