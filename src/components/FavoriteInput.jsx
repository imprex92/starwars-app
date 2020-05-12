import React, {useState} from 'react'
import './CSSfolder/Favorites.css'
import './CSSfolder/Loader.css'
import firebase from './firebase/Firebase'

//! listan med favoriter kommer med props
export const FavoriteInput = ({favorite, loading}) => { 
	const [name, setName] = useState(favorite.name);

	const onUpdate = () => {
		const db = firebase.firestore()
		db.collection('favResults').doc(favorite.id).set({ ...favorite, name }) //! eftersom vi hämtade ID't och assignade det till id så kan vi använda det (favorite.id) för att firestore ska veta vilken som ska uppdateras
	}
	const onDelete = (person) => {
		const db = firebase.firestore()
		console.log(person.id);
		
		person.isFavorite = false;
		db.collection('peopleResults').doc(person.id).set(person)
		db.collection('favResults').doc(favorite.id).delete()
	}
	if(loading){
		return 	<div class="loader">
					<div class="loader-wheel"></div>
					<div class="loader-text"></div>
	  			</div>
	}
	return (
		<>
			<form>
				{/* onChange: när man ändrar in inputFältet triggas onChange som anropar setName som i sin tur bter ut det gammla namnet mot det nya som finns i Input */}
				<input  type="text" value={name} onChange={ e => {setName(e.target.value)}}/> {/* defaultValue för inputfältet blir värdet på favoriten man vill ändra på */}
				<button disabled={!name} onClick={onUpdate}>Update</button>
				<button onClick={() => onDelete(favorite)}>Delete</button>
			</form>
		</>
	)
}















// function FavoriteInput() {
// 	return (
// 		<div>
// 			<Header/>
// 			<main>
// 				<form>
// 					Name: <br/>
// 					<input type="text" name="" id="" placeholder="Full name"/>
// 					<hr/>
// 					Birth Year: <br/>
// 					<input type="number" name="" id="" placeholder="Year"/>
// 					<hr/>
// 					Homeworld: <br/>
// 					<input type="text" name="" id="" placeholder="Homeworld"/>
// 					<button type="submit">Submit</button>
// 				</form>
// 			</main>
// 			<Footer/>
// 		</div>
// 	)
// }

// export default FavoriteInput


