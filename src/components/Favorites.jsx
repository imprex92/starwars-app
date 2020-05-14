import React, {useState, useEffect} from 'react'
import firebase from './firebase/Firebase'
import './CSSfolder/Favorites.css'
import Header from './header/Header'
import {FavoriteInput} from './FavoriteInput'

function Favorites() {

	const [loading, setLoading] = useState(false)
	const [favResults, setFavResults] = useState([]) //TODO använd "setLocalStorage" custom hook (behövs ej längre)
	const [newFavoriteName, setNewFavoriteName] = useState('')
	const [newFavoriteYear, setnewFavoriteYear] = useState('')
	const [newFavoritePlanet, setnewFavoritePlanet] = useState('')
	const [brodcastMsg, setBrodcastMsg] = useState(null)
	const [isOK, setIsOK] = useState(null)
	const [showSearch, setShowSearch] = useState(false)
	const [typeOption, setTypeOption] = useState('person')
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

	

	//TODO Validering krävs så användaren inte kan trycka på knappen om inte fälten är ifyllda!
	const onCreate = (e) => {
		const db = firebase.firestore()
		db.collection('favResults').add({
			created: date,
			isCustom: true,
			isFavorite: true,
			ofType: typeOption,
			name: newFavoriteName,
			birth_year: newFavoriteYear,
			homeworld: newFavoritePlanet,
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

	return (
		<body>
			<Header/>
				
					<h2>Your Favorites</h2>
					
					{/* <div className="peopleSection">
						{peopleResults.map(person => (
							<div key={ person.url }>{ person.name }</div>
						))}
					</div>
					<div className="planetSection">
						{ planetResults.map( planet => (
							<div key={ planet.url }> { planet.name }</div>
						))}
					</div> */}
					{/* <div className="favSection">
						{ favResults.map( favorite => (
							<div key={favorite.name}>
								<FavoriteInput favorite={favorite} />
							</div>
						))}
					</div> */}

					<div className="favSection">	{/* this is the new */}
					{favResults.map(favorite => (
							<div key={favorite.id}>
								<FavoriteInput favorite={favorite} loading={loading} />
							</div>
						))}
					</div>

						{/* <div>
							<ShowFavResults favResults={favResults} loading={loading}>
							
							</ShowFavResults>
						</div> */}																						
						<span className="add-favorite-section" onClick={() => setShowSearch(!showSearch)}>Add a Favorit</span>
					<div className='add-favorite-dropdown' style={showSearch ? {display: 'block'} : {display: 'none'}}>
						<form className="form-text-input">
							{/*//! onChange tar värdet som finns i inputfältet*/}
							<input type="text" placeholder="Enter Name" value={newFavoriteName} onChange={(e) => setNewFavoriteName(e.target.value)}/> 
							<input type="text" placeholder="Enter year of birth" value={newFavoriteYear} onChange={(e) => setnewFavoriteYear(e.target.value)}/>
							<input type="text" placeholder="Enter HomePlanet" value={newFavoritePlanet} onChange={(e) => setnewFavoritePlanet(e.target.value)}/> <br/>
							<p>Is this a person or planet you're adding?</p>
								<div className="form-favorite-radio">
									<label htmlFor="person-radio">A Person</label>
									<label htmlFor="planet-radio">A Planet</label>
									<input onChange={(e) => setTypeOption(e.target.value)} defaultChecked={true} type="radio" name="ofType" id="person-radio" value="person"/>
									<input onChange={(e) => setTypeOption(e.target.value)} type="radio" name="ofType" id="planet-radio" value="planet"/>
								</div>
								
							<button type="submit" value="Submit" disabled={!newFavoriteName || !newFavoriteYear || !newFavoritePlanet} onClick={(e) => onCreate(e)}>Save new favorite</button> <br/>
							<span className={isOK ? 'brodcast-OK' : 'brodcast-error'}> { brodcastMsg } </span>
						</form>
					</div>
				
		</body>
	)
}
//TODO filter/map favResult depending on isPerson pr isPlanet in different tabs

export default Favorites
