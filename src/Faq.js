import React from 'react'
import TextField from '@material-ui/core/TextField';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import "./Faq.css"
import axios from 'axios';
import NavBar from './NavBar.js';
import config from './config.json';


class Faq extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            qa:[],
            question:"",
            answer:""
         }
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount(){
        axios.get(config.serv_url+'/v1/faq')
        .then((response) => {
                console.log(response.data.data);
                if (response.data.data!==null || response.data.data!=="undefined"){
                    this.setState({qa : response.data.data})
                    console.log(this.state.qa);
                }
            }, (error) => {
            console.log(error);
        });
    }

    addFaq(){
//this.setState({qa: [...this.state.qa, {q:this.state.question, a:this.state.answer}]})
        var formData = {
            question:this.state.question,
            answer:this.state.answer
        }
        axios.post(config.serv_url+'/v1/addfaq', formData)
        .then((response) => {
                console.log(response.data.data);
                if (response.data.data===true){
                    window.location.reload();
                    alert("FAQ Added!")
                }else{
                    alert("FAQ Not Added!")
                }
            }, (error) => {
            console.log(error);
        });
    }

    removeFaq(id){
        axios.post(config.serv_url+'/v1/removefaq/'+id)
        .then((response) => {
            console.log(response);
            if (response.data.data === true) {
                window.location.reload();
                alert("FAQ Removed!!")
            }else {
                alert("FAQ Not Removed!!")
            }
            }, (error) => {
            console.log(error);
        });
    }

    qaRemove(index, id) {
        this.removeFaq(id)
        alert("Removed Question")
        this.state.qa.splice(index,1)
        this.setState({qa: this.state.qa})
    }

    handleChange(event) {
        console.log(event.target.value);
        this.setState({[event.target.name]: event.target.value});
    }

    render() { 
        return ( 
            <div>
                <NavBar id={5}/>           
                <div style={{"color":"black", "borderRadius":"1%" , "backgroundColor":"white", "margin":"5%", "padding":"1%"}}>
                    {/* <div className="FormHeader"  style={{"color":"white"}}>
                        <label>FAQ</label>
                    </div> */}
                    <List >
                        {
                            this.state.qa.map((value, index)=>(
                                <div key={index}>
                                        <ListItem divider={true}>
                                                <div>
                                                <table style={{"fontSize":"18px"}}>
                                                    <tbody>
                                                        <tr style={{"width":"100%"}}>
                                                            <td>
                                                                <tr>
                                                                <td><ListItem alignItems="flex"><h4>{value["question"]}</h4></ListItem></td>
                                                                </tr>
                                                                <tr>
                                                                    <td><ListItem alignItems="flex"><p>{value["answer"]}</p></ListItem></td>
                                                                </tr>
                                                            </td>
                                                            <td>
                                                                <ListItem alignItems="center">
                                                                    <IconButton  aria-label="delete" float="right" onClick={(e)=>this.qaRemove(index, value["faqnumber"])}>
                                                                    <DeleteIcon />
                                                                    </IconButton>
                                                                </ListItem>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                </div>
                                        </ListItem>
                                </div>
                            ))
                        }
                    </List>
                    <TextField
                        id="question"
                        name="question"
                        label="Question"
                        multiline
                        rows={2}
                        variant="outlined"
                        margin="dense"
                        fullWidth
                        onChange={this.handleChange}
                    />
                    <TextField
                        id="answer"
                        name="answer"
                        label="Answer"
                        multiline
                        rows={5}
                        variant="outlined"
                        margin="dense"
                        fullWidth
                        onChange={this.handleChange}
                    />
                    <Button style={{"margin":"10px", "backgroundColor": "black", "color":"white"}} variant="contained" size="small" onClick={(e)=>this.addFaq(e)}> 
                        Add +
                    </Button>
                </div>
            </div> 
        );
    }
}
 
export default Faq;