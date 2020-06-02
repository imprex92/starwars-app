import React, {useState, useEffect} from 'react'
import firebase from './firebase/Firebase'
import './CSSfolder/Favorites.css'
import Header from './header/Header'
import {FavoriteInput} from './FavoriteInput'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCreativeCommonsBy} from '@fortawesome/free-brands-svg-icons'


function Favorites() {

	const [loading, setLoading] = useState(false)
	const [favResults, setFavResults] = useState([]) 
	const [newFavoriteName, setNewFavoriteName] = useState('')
	const [newFavoriteEyeColor, setnewFavoriteEyeColor] = useState('')
	const [newFavoritePlanet, setnewFavoritePlanet] = useState('')
	const [newFavoriteTerrain, setNewFavoriteTerrain] = useState('')
	const [newFavoriteClimate, setNewFavoriteClimate] = useState('')
	const [brodcastMsg, setBrodcastMsg] = useState(null)
	const [isOK, setIsOK] = useState(null)
	const [showDropdown, setShowDropdown] = useState(false)
	const [typeOption, setTypeOption] = useState('person')
	const [filterBy, setFilterBy] = useState('showAll')
	var date = new Date( )
	useEffect(() => {
		
			setLoading(true)
			
			const db = firebase.firestore()
			const unsubscribe = db.collection('favResults').onSnapshot((snapshot) => { 
				const favoriteData = []
				snapshot.forEach(doc => favoriteData.push(({...doc.data(), id: doc.id})))
				setFavResults(favoriteData)
			})
			setLoading(false)
			
		return unsubscribe //? don't forget to unsubscribe when you use .onSnapshot()
	}, []) // använd "[]" eftersom vi bara vill anropa useEffect en gång!

	let filterByPeople = favResults.filter((favorite) => {
		return favorite.ofType.includes('person')
	})
	let filterByPlanet = favResults.filter((favorite) => {
		return favorite.ofType.includes('planet')
	})
	

	
	const onCreate = (e) => {
		const db = firebase.firestore()
		db.collection('favResults').add({
			created: date,
			isCustom: true,
			isFavorite: true,
			ofType: typeOption,
			name: newFavoriteName,
			eye_color: newFavoriteEyeColor,
			homeworld: newFavoritePlanet,
			terrain: newFavoriteTerrain,
			climate: newFavoriteClimate
		})
		.then(function(docRef) {
			console.log("Document written with ID: ", docRef.id);
			setBrodcastMsg('Successfully added!')
			setIsOK(true)
		})
		.catch(function(error) {
			console.log("Error adding document: ", error);
			setBrodcastMsg('Error! You messed up something! Try again.')
			setIsOK(false)
		});
		e.preventDefault();
	}
	if(loading){
		return 	<div className="loader">
					<div className="loader-wheel"></div>
					<div className="loader-text"></div>
	  			</div>
	}
	return (
		<main>
			<Header/>
				
					<h2>Your Favorites</h2>
					<div className="filter-button-container">
					<p><FontAwesomeIcon className='description-isCustom-icon' icon={faCreativeCommonsBy}/> = Custom by you</p>
						<button className="filter-button" onClick={() => setFilterBy('showAll')}>All</button>
						<button className="filter-button" onClick={() => setFilterBy('showPeople')}>Peoples</button>
						<button className="filter-button" onClick={() => setFilterBy('showPlanet')}>Planets</button>
					</div>
					<div className="favSection" style={filterBy === 'showPeople' ? {display: 'block'} : {display: 'none'}}>
						{filterByPeople.map(favorite => (
							<div className='list-group-item' key={favorite.id}>
								<span className="list-subgroup-item-1"><FavoriteInput favorite={favorite} loading={loading} /></span>
								<span className="list-subgroup-item-2" style={favorite.ofType === 'person' ? {display: 'block'} : {display: 'none'}}><strong>Eye color: </strong> {favorite.eye_color} </span>
								<span className="list-subgroup-item-3" style={favorite.ofType === 'person' ? {display: 'block'} : {display: 'none'}}> <strong>Homeworld: </strong>{favorite.homeworld} </span>
							</div>
						))}
					</div>
					<div className="favSection" style={filterBy === 'showPlanet' ? {display: 'block'} : {display: 'none'}}>
						{filterByPlanet.map(favorite => (
							<div className='list-group-item' key={favorite.id}>
								<span className="list-subgroup-item-1"><FavoriteInput favorite={favorite} loading={loading} /></span>
								<span className="list-subgroup-item-2" style={favorite.ofType === 'planet' ? {display: 'block'} : {display: 'none'}}><strong>Terrain: </strong> {favorite.terrain} </span>
								<span className="list-subgroup-item-3" style={favorite.ofType === 'planet' ? {display: 'block'} : {display: 'none'}}> <strong>Climate: </strong>{favorite.climate} </span>
							</div>
						))}
					</div>

					<div className="favSection" style={filterBy === 'showAll' ? {display: 'block'} : {display: 'none'}}>	
						{favResults.map(favorite => (
							<div className='list-group-item' key={favorite.id}>								
								<span className="list-subgroup-item-1"><FavoriteInput favorite={favorite} loading={loading} /></span>

								<span className="list-subgroup-item-2" style={favorite.ofType === 'person' ? {display: 'block'} : {display: 'none'}}><strong>Eye color: </strong> {favorite.eye_color} </span>
								<span className="list-subgroup-item-2" style={favorite.ofType === 'planet' ? {display: 'block'} : {display: 'none'}}><strong>Terrain: </strong> {favorite.terrain} </span>

								<span className="list-subgroup-item-3" style={favorite.ofType === 'person' ? {display: 'block'} : {display: 'none'}}> <strong>Homeworld: </strong>{favorite.homeworld} </span>
								<span className="list-subgroup-item-3" style={favorite.ofType === 'planet' ? {display: 'block'} : {display: 'none'}}> <strong>Climate: </strong>{favorite.climate} </span>
								<FontAwesomeIcon className='favorite-isCustom-icon' icon={faCreativeCommonsBy} style={favorite.isCustom ? {display: 'block'} : {display: 'none'}}/>
							</div>
						))}
					</div>

																												
						<span className="add-favorite-section" onClick={() => setShowDropdown(!showDropdown)}>Add a Favorit</span>
					<div className='add-favorite-dropdown' style={showDropdown ? {display: 'block'} : {display: 'none'}}>
						<form className="form-text-input">
						
							{/*//! onChange tar värdet som finns i inputfältet*/}
							<div id='form-planet' style={typeOption === 'planet' ? {display: 'block'} : {display: 'none'}}>
								<span className="brodcast-error" style={!newFavoriteName.trim('') || !newFavoriteTerrain.trim('') || !newFavoriteClimate.trim('') ? {visibility: 'visible'} : {visibility: 'hidden'}}>All fields (3) are required!</span><br/>
								<input type="text" placeholder="Enter Name" value={newFavoriteName} onChange={(e) => setNewFavoriteName(e.target.value)}/> 
								<input type="text" placeholder="Enter terrain" value={newFavoriteTerrain} onChange={(e) => setNewFavoriteTerrain(e.target.value)}/>
								<input type="text" placeholder="Enter climate" value={newFavoriteClimate} onChange={(e) => setNewFavoriteClimate(e.target.value)}/>
							</div>

							<div id='form-person' style={typeOption === 'person' ? {display: 'block'} : {display: 'none'}}>
								<span className="brodcast-error" style={!newFavoriteName.trim('') || !newFavoriteEyeColor.trim('') || !newFavoritePlanet.trim('') ? {visibility: 'visible'} : {visibility: 'hidden'}}>All fields (3) are required!</span><br/>
								<input type="text" placeholder="Enter Name" value={newFavoriteName} onChange={(e) => setNewFavoriteName(e.target.value)}/> 
								<input type="text" placeholder="Enter eye color" value={newFavoriteEyeColor} onChange={(e) => setnewFavoriteEyeColor(e.target.value)}/>
								<input type="text" placeholder="Enter HomePlanet" value={newFavoritePlanet} onChange={(e) => setnewFavoritePlanet(e.target.value)}/>
							</div> <br/>
							<p>Is this a person or planet you're adding?</p>
								<div className="form-favorite-radio">
									<label htmlFor="person-radio">A Person</label>
									<label htmlFor="planet-radio">A Planet</label>
									<input onChange={(e) => setTypeOption(e.target.value)} defaultChecked={true} type="radio" name="ofType" id="person-radio" value="person"/>
									<input onChange={(e) => setTypeOption(e.target.value)} type="radio" name="ofType" id="planet-radio" value="planet"/>
								</div>
								
							<button style={typeOption === 'planet' ? {display: 'none'} : {display: 'block'}} type="submit" value="Submit" disabled={!newFavoriteName.trim('') || !newFavoriteEyeColor.trim('') || !newFavoritePlanet.trim('')} onClick={(e) => onCreate(e)}>Save new favorite</button> 
							<button style={typeOption === 'planet' ? {display: 'block'} : {display: 'none'}} type="submit" value="Submit" disabled={!newFavoriteName.trim('') || !newFavoriteTerrain.trim('') || !newFavoriteClimate.trim('')} onClick={(e) => onCreate(e)}>Save new favorite</button> <br/>
							<span className={isOK ? 'brodcast-OK' : 'brodcast-error'}> { brodcastMsg } </span>
						</form>
					</div>
				
		</main>
	)
}

export default Favorites
