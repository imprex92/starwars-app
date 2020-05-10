import React, {useState, useEffect} from 'react'
import firebase from './firebase/Firebase'
import './CSSfolder/Favorites.css'
import {FavoriteInput} from './FavoriteInput'
import Header from './header/Header'
import Footer from './footer/Footer'
import ShowFavResults from './ShowFavResults'

function Favorites() {

	const [loading, setLoading] = useState(false)
	const [favResults, setFavResults] = useState([]) //TODO använd "setLocalStorage" custom hook (behövs ej längre)
	const [newFavoriteName, setNewFavoriteName] = useState()
	const [newFavoriteYear, setnewFavoriteYear] = useState()
	const [newFavoritePlanet, setnewFavoritePlanet] = useState()
	const [brodcastMsg, setBrodcastMsg] = useState(null) 
	useEffect(() => {
		const fetchData = async () => {
			setLoading(true)
			
			const db = firebase.firestore()
			const favData = await db.collection('favResults').get()
			//TODO set localStorage
			setFavResults(favData.docs.map(doc => ({...doc.data(), id: doc.id})))
			
			setLoading(false)
			
		}
		fetchData()
	}, []) // använd "[]" eftersom vi bara vill anropa useEffect en gång!

	

	//TODO Validering krävs så användaren inte kan trycka på knappen om inte fälten är ifyllda!
	const onCreate = () => {
		const db = firebase.firestore()
		db.collection('favResults').add({
			isCustom: true,
			isFavorite: true,
			name: newFavoriteName,
			birth_year: newFavoriteYear,
			homeworld: newFavoritePlanet
		})
		.then(function(docRef) {
			console.log("Document written with ID: ", docRef.id);
			setBrodcastMsg('Successfully added!')
			
		})
		.catch(function(error) {
			console.error("Error adding document: ", error);
			setBrodcastMsg('Error! You messed up something! Try again.')
		});
	}

	return (
		<div>
			<Header/>
				<main>
					<h2>Your Favorites</h2>
					<form>
						{/*//! onChange tar värdet som finns i inputfältet*/}
						<input type="text" placeholder="Enter Name" value={newFavoriteName} onChange={(e) => setNewFavoriteName(e.target.value)}/> 
						<input type="text" placeholder="Enter year of birth" value={newFavoriteYear} onChange={(e) => setnewFavoriteYear(e.target.value)}/>
						<input type="text" placeholder="Enter HomePlanet" value={newFavoritePlanet} onChange={(e) => setnewFavoritePlanet(e.target.value)}/>
					</form>
					<button onClick={onCreate}>Save new favorite</button> <span className="onSaveFav">{brodcastMsg}</span>
				
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

					{/* <div className="favSection">	{/* this is the new */}
					{/* {favResults.map(favorite => (
							<div key={favorite.name}>
								<FavoriteInput favorite={favorite} />
							</div>
						))}
					</div> */} 

						<div>
							<ShowFavResults favResults={favResults} loading={loading}>
							
							</ShowFavResults>
						</div>

				</main>
			<Footer/>
		</div>
	)
}

export default Favorites
