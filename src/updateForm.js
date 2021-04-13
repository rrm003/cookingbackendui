import React, { Component } from 'react'
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import axios from 'axios';
import NavBar from './NavBar.js'
import "./RecipeForm.css"

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
            searchID: 0,
            number:0,
            name: '',
            video: '',
            type: '',
            tags: [],
            newtag: '',
            dImg:'',
            mImg:'',
            dskImg: null,
            mobImg: null,
            Img: null,
            cookingTime : 0,
            preprationTime : 0,
            readyTime : 0,
            servePeople : 0,
            details: '',
            notes: '',
            energy: 0.0,
            carbohydrates: 0.0,
            protien: 0.0,
            fat: 0.0,
            fiber: 0.0,
            sodium: 0.0,
            instructionList: [],
            newInstruction:'',
            ingredientList: [],
            newIngredient:'',
            names : [],
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleFile = this.handleFile.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setData = this.setData.bind(this);
      }
      componentDidMount(){
          this.setData()
      }

      setData(){
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
        console.log(this.props.location)
        if (typeof this.props.location.data !=="undefined"){
              var num = this.props.location.data["number"]
              console.log(num)
              this.setState({number: num}); 
              var n = this.props.location.data["name"] 
              this.setState({name: n});
              console.log(n)
              this.setState({video: this.props.location.data["video"]});
              this.setState({type: this.props.location.data["type"]});
              this.setState({dImg: this.props.location.data["desktopimg"]});
              this.setState({mImg: this.props.location.data["mobileimg"]});
              this.setState({details: this.props.location.data["details"]["extradetail"]});
              this.setState({notes: this.props.location.data["details"]["notebeforecooking"]});
              this.setState({cookingTime: this.props.location.data["details"]["cookingtime"]});
              this.setState({preprationTime: this.props.location.data["details"]["preprationtime"]});
              this.setState({readyTime: this.props.location.data["details"]["readytime"]});
              this.setState({servePeople: this.props.location.data["details"]["serverpeople"]});
              console.log(this.state.number);
              console.log(this.state.name);
              console.log(this.state.type);
              console.log(this.state.video);
              if (this.props.location.data["instruction"]["instructionlist"]!==null){
                  this.setState({instructionList: this.props.location.data["instruction"]["instructionlist"]})
              }

              if(this.props.location.data["tags"] !==null){
                for(var i=0; i<this.props.location.data["tags"].length; i++){
                    var t = this.props.location.data["tags"][i]
                    this.state.tags.push(t)
                }
              }
              console.log(this.state.tags)
              if(this.props.location.data["ingrediants"] !==null){
                for(var i=0; i<this.props.location.data["ingrediants"].length; i++){
                    var t = this.props.location.data["ingrediants"][i]
                    this.state.ingredientList.push(t)
                }
              }
              console.log(this.state.ingredientList)
              var nutrients = this.props.location.data["nutrients"]
              if (nutrients!==null){
                let energy = nutrients.find(energy => energy.nutrientsname === "energy");
                if(typeof energy !== "undefined") {
                    this.setState({energy: energy.nutrientsquantity})
                }
                let protien = nutrients.find(protien => protien.nutrientsname === "protien");
                if(typeof protien !== "undefined") {
                    this.setState({protien: protien.nutrientsquantity})
                }
                let carbohydrates = nutrients.find(carbohydrates => carbohydrates.nutrientsname === "carbohydrates");
                if(typeof carbohydrates !== "undefined") {
                    this.setState({carbohydrates: carbohydrates.nutrientsquantity})
                }
                let fat = nutrients.find(fat => fat.nutrientsname === "fat");
                if(typeof fat !== "undefined") {
                    this.setState({fat: fat.nutrientsquantity})
                }
                let fiber = nutrients.find(fiber => fiber.nutrientsname === "fiber");
                if(typeof fiber !== "undefined") {
                    this.setState({fiber: fiber.nutrientsquantity})
                }
                let sodium = nutrients.find(sodium => sodium.nutrientsname === "sodium");
                if(typeof sodium !== "undefined") {
                    this.setState({sodium: sodium.nutrientsquantity})
                }
              }
        }
      }
    
      tagAdd() {
        if (this.state.newtag === ''){
            alert("Empty tag !")
            return
        }else{
            this.setState({tags: [...this.state.tags, this.state.newtag]});
            this.setState({newtag:''});
            document.getElementById("newtag").value = '';
        }
     }

      tagRemove(index) {
        this.state.tags.splice(index,1);
        this.setState({tags: this.state.tags});
      }

      instructionAdd() {
        if (this.state.newInstruction === ''){
            alert("Empty Instruction !")
            return
        }else{
            this.setState({instructionList: [...this.state.instructionList, this.state.newInstruction]});
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
            alert("Empty Ingredient !")
            return
        }else{
            console.log(this.state.ingredientList)
            this.setState({ingredientList: [...this.state.ingredientList, {"ingredientname":this.state.newIngredient, "recipenumber": this.state.number}]});
            this.setState({newIngredient:''});
            document.getElementById("newIngredient").value = '';
        }
      }

      ingredientRemove(index) {
        this.state.ingredientList.splice(index,1)
        this.setState({ingredientList: this.state.ingredientList})
      }
    
      handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
      }
    
      handleFile(event) {
        console.log(event.target.files[0]);
        console.log(event.target.name)
        let file = event.target.files[0];
        this.setState({[event.target.name]: event.target.files[0]})
      }

      handleSubmit(event) {
        event.preventDefault();
        var formFile = new FormData();
        
        console.log(this.state.dskImg)
        console.log(this.state.mobImg)
        console.log(this.state.Img)

        formFile.append("dskimage", this.state.dskImg);
        formFile.append("mobimage", this.state.mobImg);
        formFile.append("image", this.state.Img);
        console.log(formFile)

        if(this.state.name ==='' || this.state.video ==='' || this.state.type ===''){
            alert("Empty Feilds!")
            return
        }else if (this.state.dskImg === null || this.state.mobImg === null || this.state.Img === null){
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
                var temp = this.state.ingredientList[i]
                ingredientsList.push(temp)
            }
            console.log(ingredientsList)
            var nutrientsList = []
            nutrientsList.push({nutrientsname : 'energy', nutrientsquantity : parseFloat(this.state.energy) })
            nutrientsList.push({nutrientsname : 'protien', nutrientsquantity : parseFloat(this.state.protien) })
            nutrientsList.push({nutrientsname : 'carbohydrates', nutrientsquantity : parseFloat(this.state.carbohydrates) })
            nutrientsList.push({nutrientsname : 'fat', nutrientsquantity : parseFloat(this.state.fat) })
            nutrientsList.push({nutrientsname : 'fiber', nutrientsquantity : parseFloat(this.state.fiber) })
            nutrientsList.push({nutrientsname : 'sodium', nutrientsquantity : parseFloat(this.state.sodium) })
        
            var formData = {
                recipenumber : this.state.number,
                recipename : this.state.name,
                recipevideo : this.state.video,
                recipetype : this.state.type,
                desktopImg : this.state.dImg,
                mobileImg : this.state.mImg,
                img : "N/A",
                tags : this.state.tags,
                recipedetails : recipedetails,
                recipeinstruction: recipeinstruction,
                ingrediants : ingredientsList,
                nutrients : nutrientsList,
            }
            console.log(JSON.stringify(formData))
            axios.post('http://localhost:8000/v1/updateForm',formData)
              .then((response) => {
                console.log(response);
                if (response.data.data === true) {
                    axios.post(
                        'http://localhost:8000/v1/img/'+this.state.number+"/"+this.state.name,
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
      
      getForm(index) {
        axios.get('http://localhost:8000/v1/getForm/'+parseInt(index))
        .then((response) => {
          console.log(response);
          if (response.data.data !== null) {
              alert("Data found!!")
              var formdata =response.data.data
              this.setState({name: response.data.data.recipename})
          }else {
              alert("Data Not found!!")
          }
        }, (error) => {
          console.log(error);
          alert("Err fetching data!!")
        });
      }

      render() {
        console.log(this.state.dskImg)
        console.log(this.state.mobImg)
        return (
            <div>
                <NavBar id={3}/>
                <div className= "FormContainer">
                    <Paper  style={{"background-color": "white"}}>
                    <form onSubmit={this.handleSubmit} className="RecipeForm">
                        <div className="FormHeader" style={{"color":"white"}}>
                            <label>Update Recipe</label>
                        </div>
                        <div style={{"margin":"50px"}}>
                            <div>
                            <TextField
                                label="Recipe ID"
                                type="number" 
                                name="number" 
                                value={this.state.number}
                                style={{ margin: 10}}
                                onChange={this.handleChange}
                            />
                            <TextField
                                label="Recipe Name"
                                id="name"
                                name="name"
                                placeholder={this.state.name}
                                value={this.state.name}
                                helperText="Name of Recipie" 
                                style={{ margin: 10}}
                                margin="normal"
                                onChange={this.handleChange}
                            />
                            <TextField
                                label="Video ID"
                                id="video"
                                name="video"
                                placeholder={this.state.video}
                                value={this.state.video}
                                helperText="Name of Recipie" 
                                style={{ margin: 10}}
                                margin="normal"
                                onChange={this.handleChange}
                            />
                            <div style={{margin:10}}>
                                <InputLabel>Recipe Type</InputLabel>
                                <FormControl>
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
                                </FormControl>
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
                                    defaultValue=""
                                    helperText="New Tag"
                                    style={{ margin: 10}}
                                    margin="normal"
                                    onChange={this.handleChange}
                                />
                                <Button style={{"margin":"10px"}} variant="contained" size="small" color="black" onClick={(e)=>this.tagAdd(e)}> 
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
                            <TextField
                                label="Cooking Time"
                                type="number" 
                                name="cookingTime"
                                value={this.state.cookingTime}
                                style={{ margin: 10}}
                                onChange={this.handleChange}
                            />
                            <TextField
                                label="Prepration Time"
                                type="number" 
                                name="preprationTime" 
                                value={this.state.preprationTime}
                                style={{ margin: 10}}
                                onChange={this.handleChange}
                            />
                            <TextField 
                                label="Ready Time"
                                type="number" 
                                name="readyTime" 
                                value={this.state.readyTime}
                                style={{ margin: 10}}
                                onChange={this.handleChange}
                            />
                            <TextField 
                                label="Serve People"
                                type="number" 
                                name="servePeople" 
                                value={this.state.servePeople}
                                style={{ margin: 10}}
                                onChange={this.handleChange}
                            />
                            <TextField
                                id="details"
                                name="details"
                                label="Extra Details"
                                multiline
                                rows={10}
                                value={this.state.details}
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
                                defaultValue={this.state.notes}
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
                                    style={{ margin: 10}}
                                    rows={5}
                                    margin="normal"
                                    variant="outlined"
                                    multiline
                                    fullWidth
                                    onChange={this.handleChange}
                                />
                                <Button style={{"margin":"10px"}} variant="contained" size="small" color="black" onClick={(e)=>this.instructionAdd(e)}> 
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
                                                <ListItemText primary={value["ingredientname"]} />
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
                                    helperText="New Ingredients"
                                    style={{ margin: 10}}
                                    margin="normal"
                                    onChange={this.handleChange}
                                />
                                <Button style={{"margin":"10px"}} variant="contained" size="small" color="black" onClick={(e)=>this.ingredientAdd(e)}> 
                                    Add +
                                </Button>
                            </div>
                            < ColoredLine black/>
                            <div>
                            <TextField
                                label="Energy"
                                id="energy"
                                name="energy"
                                type="string"
                                value={this.state.energy}
                                helperText="kCal"
                                style={{ margin: 10}}
                                margin="normal"
                                onChange={this.handleChange}
                            />
                            <TextField
                                label="Carbohydrates"
                                id="carbohydrates"
                                name="carbohydrates"
                                type="number"
                                step={0.00001}
                                value={this.state.carbohydrates}
                                helperText="gram"
                                style={{ margin: 10 }}
                                margin="normal"
                                onChange={this.handleChange}
                            />
                            <TextField
                                label="Fat"
                                id="fat"
                                name="fat"
                                type="number"
                                step={0.00001}
                                value={this.state.fat}
                                helperText="gram"
                                style={{ margin: 10 }}
                                margin="normal"
                                onChange={this.handleChange}
                            />
                            <TextField
                                label="Protien"
                                id="protien"
                                name="protien"
                                type="number"
                                step={0.00001}
                                value={this.state.protien}
                                helperText="gram"
                                style={{ margin: 10 }}
                                margin="normal"
                                onChange={this.handleChange}
                            />
                            <TextField
                                label="Fiber"
                                id="fiber"
                                name="fiber"
                                type="number"
                                step={0.00001}
                                value={this.state.fiber}
                                helperText="gram"
                                style={{ margin: 10 }}
                                margin="normal"
                                onChange={this.handleChange}
                            />
                            <TextField
                                label="Sodium"
                                id="sodium"
                                name="sodium"
                                type="number"
                                step={0.00001}
                                value={this.state.sodium}
                                helperText="milligram"
                                style={{ margin: 10 }}
                                margin="normal"
                                onChange={this.handleChange}
                            />
                            </div>
                        </div>
                        <Button style={{"backgroundColor": "black", "color":"white"}} type="submit" variant="contained" value="Submit">Update</Button>
                    </form>
                    </Paper>
            </div>
           </div> 
        );
      }   
}
