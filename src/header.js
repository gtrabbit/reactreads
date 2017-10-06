import React from 'react'
import { Link } from 'react-router-dom'



const Header = function(){
	return (
        <div className="list-books-title">
            <h1><Link to="/">MyReads</Link></h1>
        </div>
		)
	}



export default Header