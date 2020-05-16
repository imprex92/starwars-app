
import React, {useState}  from 'react'
import Header from './header/Header'
import firebase from './firebase/Firebase'
import './CSSfolder/ShowResult.css'
import './CSSfolder/Loader.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const ShowResult = ({peopleResults, planetResults, paginatePlanets, paginatePeoples, loading}) => {
	
	const [favorite, setFavorite] = useState(null)
	const [toShow, setToShow] = useState('Peoples')
	const [searchText, setSearchText] = useState('')

	const handlePersonFavorite = (person) => {
		person.isFavorite = true;
		console.log(person);
		const db = firebase.firestore()
		db.collection('favResults').add(person)		
	}
	const handlePlanetFavorite = (planet) => {
		planet.isFavorite = true;
		console.log(planet);
		const db = firebase.firestore()
		db.collection('favResults').add(planet)		
	}
	const handleSearch = (e) => {
		let value = String(e.target.value)
		console.log(value);
		setSearchText(value)
		console.log(searchText);	
	}

	//? Filtrering

	let filterPeoples = peopleResults.filter((person) => {
		return person.name.toLowerCase().includes(searchText.toLowerCase()) || person.eye_color.toLowerCase().includes(searchText.toLowerCase()) || person.homeworld.toLowerCase().includes(searchText.toLowerCase())
	})
	let filterPlanets = planetResults.filter((planet) => {
		return planet.name.toLowerCase().includes(searchText.toLowerCase()) || planet.terrain.toLowerCase().includes(searchText.toLowerCase()) || planet.climate.toLowerCase().includes(searchText.toLowerCase())
	})
	//TODO Minor changes to loading.css. It's not centered
	if(loading){
		return 	<div className="loader">
					<div className="loader-wheel"></div>
					<div className="loader-text"></div>
				</div>
	}

	return (
		<div>
			<Header/>
			<body>
				{/* Search Area */}
				<div className="SearchArea mt-3 mb-4">
					<h3>Search here:</h3>
					<form >
						<input onChange={(e) => handleSearch(e)} className="search-bar rounded-pill pl-2" type="text"/>	
					</form>
				</div>
					{/* List nav area */}
				<nav className="list-nav ml-4">
					<button onClick={() => {setToShow('Peoples'); paginatePeoples('Peoples')}} className="border-bottom-0">Peoples</button>
					<button onClick={() => {setToShow('Planets'); paginatePlanets('Planets')}} className="border-bottom-0">Planets</button>
				</nav>
					{/* Peoples list area */}
				<ul className='list-group mb-4' style={toShow === 'Peoples' ? {display: 'block'} : {display: 'none'}}>
					
					{filterPeoples.map(person => (
						
						<li className="list-group-item ml-4 mr-4" key={ person.id }>
							{ person.name } <br/> {person.eye_color}
							<span className="star-span" >
								<FontAwesomeIcon style={favorite === person.name ? {color: 'yellow'} : {color: ''}} onClick={() => {setFavorite(person.name); handlePersonFavorite(person);}} icon={ faStar } />
							</span>
						</li>
					))}
				</ul>
						{/* planet list area */}
				<ul className='list-group mb-4' style={toShow === 'Planets' ? {display: 'block'} : {display: 'none'}}>
					
					{filterPlanets.map(planet => (
						
						<li className="list-group-item ml-4" key={ planet.id }>
							{ planet.name }
							<span className="star-span" >
								<FontAwesomeIcon style={favorite === planet.name ? {color: 'yellow'} : {color: ''}} onClick={() => {setFavorite(planet.name); handlePlanetFavorite(planet);}} icon={ faStar } />
							</span>
						</li>
					))}
				</ul>
			</body>			
		</div>
	)
}

export default ShowResult
