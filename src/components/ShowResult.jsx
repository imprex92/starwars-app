
import React, {useState}  from 'react'
import Header from './header/Header'
import Footer from './footer/Footer'
import firebase from './firebase/Firebase'
import './CSSfolder/ShowResult.css'
import './CSSfolder/Loader.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const ShowResult = ({peopleResults, planetResults, paginatePlanets, paginatePeoples, loading}) => {
	
	const [favorite, setFavorite] = useState(null)
	const [toShow, setToShow] = useState('Peoples')

	const handleFavorite = (person) => {
		person.isFavorite = true;
		console.log(person);
		const db = firebase.firestore()
		db.collection('favResults').add(person)
		
	}
	const handlePlanetFavorite = (planet) => {
		planet.isFavorite = true;
		console.log(planet);
		const db = firebase.firestore()
		db.collection('favPlanetResults').add(planet)
		
	}
	
	
	if(loading){
		return 	<div className="loader">
					<div className="loader-wheel"></div>
					<div className="loader-text"></div>
				</div>
	}
	return (
		<div>
			<Header/>
			<main>
				{/* Search Area */}
				<div className="SearchArea mt-3 mb-4">
					<h3>Search here:</h3>
					<form >
						<input className="rounded-pill" type="text"/>
						<button className="rounded ml-2" type="submit">Search</button>
					</form>
				</div>
					{/* List nav area */}
				<nav className="list-nav ml-4">
					<button onClick={() => {setToShow('Peoples'); paginatePeoples('Peoples')}} className="border-bottom-0">Peoples</button>
					<button onClick={() => {setToShow('Planets'); paginatePlanets('Planets')}} className="border-bottom-0">Planets</button>
				</nav>
					{/* Peoples list area */}
				<ul className='list-group mb-4' style={toShow === 'Peoples' ? {display: 'block'} : {display: 'none'}}>
					
					{peopleResults.map(person => (
						
					<li className="list-group-item ml-4" key={ person.id }>{ person.name }<span className="star-span" ><FontAwesomeIcon style={favorite === person.name ? {color: 'yellow'} : {color: ''}} onClick={() => {setFavorite(person.name); handlePlanetFavorite(person);}} icon={ faStar } /></span></li>
					))}
				</ul>
						{/* planet list area */}
				<ul className='list-group mb-4' style={toShow === 'Planets' ? {display: 'block'} : {display: 'none'}}>
					
					{planetResults.map(planet => (
						
					<li className="list-group-item ml-4" key={ planet.id }>{ planet.name }<span className="star-span" ><FontAwesomeIcon style={favorite === planet.name ? {color: 'yellow'} : {color: ''}} onClick={() => {setFavorite(planet.name); handleFavorite(planet);}} icon={ faStar } /></span></li>
					))}
				</ul>
			</main>
			<Footer/>
		</div>
	)
}

export default ShowResult
