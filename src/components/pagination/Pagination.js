import React, {useState} from 'react'

//! tar in tre (3) PROPS
const Pagination = ({ postPerPage, totalPosts, paginate }) => {
	const pageNumbers = [];
	const [active, setActive] = useState(1)

	//! Nedan räknar ut totalt antal sidor som finns
	for(let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++){
		pageNumbers.push(i)
	}
		//! Här är nav för alla våra sidor.
	return (

		<div>
			<ul className="pagination justify-content-center" >
				{pageNumbers.map(number => (
					<li key={number} className={number === active ? 'page-item active' : 'page-item'}>
						<span onClick={() => {paginate(number); setActive(number)}} href="" className="page-link"> {/*onClick anropar metoden paginate som vi tilldelar number-variabeln paginate blir anropad som en prop */}
							{number}
						</span>
					</li>
				))}
			</ul>
		</div>
	)
}

export default Pagination
