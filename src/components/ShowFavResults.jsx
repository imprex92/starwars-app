import React, {useState} from 'react'
import './CSSfolder/Favorites.css'
import './CSSfolder/Loader.css'
import firebase from './firebase/Firebase'
const ShowFavResults = ({favResults, loading}) => {
	const [name, setName] = useState(favResults.name);

	const onUpdate = () => {
		const db = firebase.firestore()
		db.collection('favResults').doc(favResults.id).set({ ...favResults, name }) //! eftersom vi hämtade ID't och assignade det till id så kan vi använda det (favorite.id) för att firestore ska veta vilken som ska uppdateras
	}
	const onDelete = (person) => {
		console.log(person);
		
		const db = firebase.firestore()
		console.log(person.id);
		
		person.isFavorite = false;
		db.collection('peopleResults').doc(person.id).set(person)
		db.collection('favResults').doc(person.id).delete()
	}
	if(loading){
		return <div class="loader">
		<div class="loader-wheel"></div>
		<div class="loader-text"></div>
	  </div>
	}
	return (
		<ul className="favSection">	{/* this is the new */}
			{favResults.map(favResults => (
					
				<li key={favResults.id}>
					
					<input type="text" value={favResults.name} onChange={ e => {setName(e.target.value)}}/>
					<button onClick={onUpdate}>Update</button>
					<button onClick={onDelete(favResults)}>Delete</button>
				</li>
						
			))}
		</ul> 
	)
}


export default ShowFavResults
