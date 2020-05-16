import React, {useState} from 'react'
import './CSSfolder/Favorites.css'
import './CSSfolder/Loader.css'
import firebase from './firebase/Firebase'

//! listan med favoriter kommer med props
export const FavoriteInput = ({favorite, loading}) => { 
	const [name, setName] = useState(favorite.name);
	const [brodcastDelMsg, setBrodcastDelMsg] = useState(null)
	const [brodcastUpdateMsg, setBrodcastUpdateMsg] = useState(null)
	const [isOK, setIsOK] = useState(null)

	const onUpdate = (e) => {
		const db = firebase.firestore()
		
		db.collection('favResults').doc(favorite.id).set({ ...favorite, name }) //! eftersom vi hämtade ID't och assignade det till id så kan vi använda det (favorite.id) för att firestore ska veta vilken som ska uppdateras
		.catch(error => {
			console.log('You got an error', error);
			setIsOK(false)
			setBrodcastUpdateMsg('Something went wrong, please try again later.', error)
		})
		setIsOK(true)
		setBrodcastUpdateMsg('Successfully Updated!')
		e.preventDefault();
	}
	
	const onDelete = (e, person) => {
		const db = firebase.firestore()
		console.log(person.id);
		console.log(favorite.id);
		
		person.isFavorite = false;
		db.collection('favResults').doc(favorite.id).delete()
		.catch(error => {
			console.log('You got this error', error);	
			setIsOK(false)
			setBrodcastDelMsg('Something went wrong, please try again later.', error)
		  });
		  setIsOK(true)
		  setBrodcastDelMsg('Successfully deleted!')
		  e.preventDefault();
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
				<span className="brodcast-error" style={name.trim('') ? {display: 'none'} : {display: 'block'}}>Name cannot be empty</span>
				<input  type="text" value={name} onChange={ e => {setName(e.target.value)}}/> {/* defaultValue för inputfältet blir värdet på favoriten man vill ändra på */}
				<button className="update-input-button" disabled={!name.trim('')} onClick={(e) => onUpdate(e)}>Update</button>
				<button className="delete-input-button" onClick={(e) => onDelete(e, favorite)}>Delete</button>
				<span className={isOK ? 'brodcast-OK' : 'brodcast-error'}> { brodcastUpdateMsg } </span>
				<span className={isOK ? 'brodcast-OK' : 'brodcast-error'}> { brodcastDelMsg } </span>
				
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


