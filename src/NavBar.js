import React from 'react'
import "./NavBar.css"

function NavBar(props) {
    console.log(props.id)
    return (
        <div className="navigation" style={{"position":"sticky", "top":"0"}}>
            <ul style={{"padding":"5px", "backgroundColor":"#282c34"}}>
                <li><a class={props.id === 1 ? 'active':''} href="#">Home</a></li>
                <li><a class={props.id === 2 ? 'active':''} href="#recipeForm">Add</a></li>
                <li><a class={props.id === 3 ? 'active':''} href="#updateForm">Update</a></li>
                <li><a class={props.id === 4 ? 'active':''} href="#miscellaneous">Miscellaneous</a></li>
                <li><a class={props.id === 5 ? 'active':''} href="#faq">FAQ</a></li>
            </ul>
        </div>
    )
}

export default NavBar
