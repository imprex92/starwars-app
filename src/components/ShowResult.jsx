
import React, {useState}  from 'react'
import Header from './header/Header'
import Footer from './footer/Footer'
import firebase from './firebase/Firebase'
import './CSSfolder/ShowResult.css'
import './CSSfolder/Loader.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const ShowResult = ({peopleResults, planetResults, loading}) => {
	
	const [favorite, setFavorite] = useState(null)
	const handleFavorite = (person) => {
		person.isFavorite = true;
		console.log(person);
		const db = firebase.firestore()
		db.collection('favResults').add(person)
		
	}
	
	if(loading){
		return 	<div class="loader">
					<div class="loader-wheel"></div>
					<div class="loader-text"></div>
				</div>
	}
	return (
		<div>
			<Header/>
			<main>
				<div className="SearchArea mt-3 mb-4">
					<h3>Search here:</h3>
					<form >
						<input type="text"/>
						<button type="submit">Search</button>
					</form>
				</div>
				<ul className="list-group mb-4">
					
					{peopleResults.map(person => (
						
					<li className="list-group-item ml-4" key={ person.url }>{ person.name }<span><FontAwesomeIcon style={favorite === person.name ? {color: 'yellow'} : {color: ''}} onClick={() => {setFavorite(person.name); handleFavorite(person);}} icon={ faStar } /></span></li>
					))}
				</ul>
				{/* <div className="planetSection">
					{ planetResults.map( planet => (
						<div key={ planet.url }> { planet.name }</div>
					))}
				</div> */}
			</main>
			<Footer/>
		</div>
	)
}

export default ShowResult
