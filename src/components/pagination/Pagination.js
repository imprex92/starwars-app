import React from 'react'

//! tar in tre (3) PROPS
const Pagination = ({ postPerPage, totalPosts, paginate }) => {
	const pageNumbers = [];

	//! Nedan räknar ut totalt antal sidor som finns
	for(let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++){
		pageNumbers.push(i)
	}
		//! Här är nav för alla våra sidor.
	return (
		<nav>
			<ul className="pagination ml-4" >
				{pageNumbers.map(number => (
					<li key={number} className="page-item">
						<span onClick={() => paginate(number)} href="" className="page-link"> {/*onClick anropar metoden paginate som vi tilldelar number-variabeln paginate blir anropad som en prop */}
							{number}
						</span>
					</li>
				))}
			</ul>
		</nav>
	)
}

export default Pagination
