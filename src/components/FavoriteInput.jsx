import React, {useState} from 'react'
import firebase from './firebase/Firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-regular-svg-icons'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import './CSSfolder/Favorites.css'
import './CSSfolder/Loader.css'

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
	return (
		<>
			<form>
				<span className="brodcast-error-input" style={name.trim('') ? {display: 'none'} : {display: 'block'}}><small>Name cannot be empty</small></span>

				<FontAwesomeIcon className="delete-input-button" onClick={(e) => onDelete(e, favorite)} icon={ faTrashAlt }/>
				<button className="update-input-button" disabled={!name.trim('')} onClick={(e) => onUpdate(e)}><FontAwesomeIcon   icon={ faEdit }/></button>
				{/* onChange: när man ändrar in inputFältet triggas onChange som anropar setName som i sin tur bter ut det gammla namnet mot det nya som finns i Input */}
				<input  type="text" value={name} onChange={ e => {setName(e.target.value)}}/> {/* defaultValue för inputfältet blir värdet på favoriten man vill ändra på */}


				<span className={isOK ? 'brodcast-OK' : 'brodcast-error'}> { brodcastUpdateMsg } </span>
				<span className={isOK ? 'brodcast-OK' : 'brodcast-error'}> { brodcastDelMsg } </span>
				
			</form>
		</>
	)
}


