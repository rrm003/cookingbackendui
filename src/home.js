import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/DeleteRounded";
import EditIcon from "@material-ui/icons/Edit";
import axios from 'axios';

import config from './config.json';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            data : [],
            search:null,
         }
    }

    componentDidMount(){
        this.renderRecipe()
    }

    recipeDelete(index) {
        axios.post(config.serv_url+"/v1/remove/"+index)
        .then((response) => {
            if (response.data.data===true) {
                alert("data deleted!")
                window.location.reload();
            }else{
                alert("data not deleted!")
            }
        },(error) => {
                console.log(error);
        });
    }
    
    renderRecipe = () =>{
        axios.get(config.serv_url+"/v1/getallForm")
        .then((response) => {
            if (response.data.data !==null) {
                for(var i=0; i< response.data.data.length; i++){
                    
                    var tempdetails =response.data.data[i]["recipedetails"]
                    var tempinstructions =response.data.data[i]["recipeinstruction"]
                    var tempingrediant = response.data.data[i]["ingrediants"]
                    var tempnutrient = response.data.data[i]["nutrients"]
                    var recipe = {
                        number : response.data.data[i]["recipenumber"],
                        name : response.data.data[i]["recipename"],
                        video : response.data.data[i]["recipevideo"],
                        type : response.data.data[i]["recipetype"],
                        date : response.data.data[i]["recipedate"],
                        desktopimg : response.data.data[i]["desktopImg"],
                        mobileimg : response.data.data[i]["mobileImg"],
                        tags: response.data.data[i]["tags"],
                        details: tempdetails,
                        instruction : tempinstructions,
                        ingrediants: tempingrediant,
                        nutrients : tempnutrient,

                    }
                    this.setState({data: [...this.state.data, recipe]})
                }
                console.log(this.state.data)
            }else {
                alert("Data Not Fetched!!")
            }
          }, (error) => {
            console.log(error);
          });
    }

    searchSpace=(event)=>{
        let keyword = event.target.value;
        this.setState({search:keyword})
    }

    render() {
        const items = this.state.data.filter((data)=>{
            if(this.state.search == null)
                return data
            else if(data.name.toLowerCase().includes(this.state.search.toLowerCase())){
                return data
            }
        }).map((value,index)=>{
            let link = "/recipe/"+value.number;
            let editlink = "updateForm/"+value.number
            return(    
                <Grid item key={index}>
                    <Card raised={true} style={{"width":"400px", "height":"500px"}}>
                        <div>
                            <img src={config.serv_url+"/image/desktop/"+value.desktopimg} width="400px" height="200px" alt={value.desktopimg}/>
                            <Link to={link} style={{"color":"blue"}}><h4>{value.name}</h4></Link>
                        </div>
                        <CardHeader
                            subheader={value.type}
                        />
                        <CardContent>
                            <div></div>
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton aria-label="delete" onClick={(e)=>this.recipeDelete(value.number)}>
                            <DeleteIcon color="disabled" />
                            </IconButton>
                            <Link to={{pathname:editlink, data:value}}><EditIcon color="error"/></Link>
                        </CardActions>
                    </Card>
                </Grid>    
            )
        })
        
        return (
           <div>
            <div style={{"alignContent":"center", "justifyItems":"center"}}>
            <div className="navigation" style={{"position":"-webkit-sticky", "position":"sticky", "top":"0","alignContent":"center","justify":"center", "direction":"row"}}>
                    <ul style={{"padding":"5px", "backgroundColor":"#282c34"}}>
                        <li><a class="active" href="#">Home</a></li>
                        <li><a href="#recipeForm">Add</a></li>
                        <li><a href="#updateForm">Update</a></li>
                        <li><a href="#miscellaneous">Miscellaneous</a></li>
                        <li><a href="#faq">FAQ</a></li>
                        <li style={{"display":"flex", "flexDirection":"column"}}>
                            <Paper>
                                    <InputBase
                                        placeholder="Search Recipe"
                                        name="search"
                                        onChange={(e)=>this.searchSpace(e)}
                                    />
                                    <IconButton type="submit" aria-label="search" onChange={(e)=>this.searchSpace(e)}>
                                        <SearchIcon />
                                    </IconButton>
                            </Paper>
                        </li>
                    </ul>
                </div>
                <Grid container spacing={2} alignContent='center' justify='center' direction='row'>       
                    {items}
                </Grid>
            </div>   
            </div>           
        );
    }
}
 
export default Home;