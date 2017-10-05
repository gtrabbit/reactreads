import React, { Component } from 'react'
import { Link } from 'react-router-dom'



class Header extends Component {

render (){

	return (
	
        <div className="list-books-title">
            <h1><Link to="/">MyReads</Link></h1>
        </div>
		)

	}

}


export default Header