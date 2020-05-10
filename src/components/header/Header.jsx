import React from 'react'
import { Link } from 'react-router-dom'
import './Header.style.css'

function Header() {
	return (
		<header>
			<div className="PC-Flex-Container">
				<Link to="/" className="Flex-Item-1">
					<span></span>
					Home			
				</Link>
				<Link to="/Favorites" className="Flex-Item-2">
					<span></span>
					Favorites		
				</Link>
				<Link to="/Results" className="Flex-Item-3">
					<span></span>
					Results
				</Link>
			</div>
		</header>
	)
}

export default Header
