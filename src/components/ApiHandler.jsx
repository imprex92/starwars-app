import React, {useState, useEffect}  from 'react'
import firebase from './firebase/Firebase'
import ShowResult from './ShowResult'
import Pagination from './pagination/Pagination'

function ApiHandler() {
	
	const [toShow, setToShow] = useState('Peoples')
	const [peopleResults, setPeopleResults] = useState([]) //! Standard state är tom array
	const [planetResults, setPlanetResults] = useState([]) //! Standard state är tom array
	const [loading, setLoading] = useState(false) //! Texts som visar att sidan laddas när data hämtas från FireStore
	const [currentPage, setCurrentPage] = useState(1) //! Välj vilken sida som ska visas när sidan renderas
	const [postPerPage] = useState(10) //! välj antalresultat per sida som ska visas
	
	const paginatePeoples = (dataFromChild) => {
		setToShow(dataFromChild)		
	}
	const paginatePlanets = (dataFromChild) => {
		setToShow(dataFromChild)
	}
	

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			const db = firebase.firestore()
			const peopleData = await db.collection('peopleResults').get()
			const planetData = await db.collection('planetResults').get()			

			setPeopleResults(peopleData.docs.map(doc => ({...doc.data(), id: doc.id}))) //! ...doc.data(), id: doc.id gör att man får med ID't som firestore assignade detta objektet. (SNAPSHOT) VIKTIGT!
			setPlanetResults(planetData.docs.map(doc => ({...doc.data(), id: doc.id})))
			setLoading(false)
		}
		fetchData()
	}, []) //! använd "[]" eftersom vi bara vill anropa useEffect en gång!
	//? Get current Result
	const indexLastResult = currentPage * postPerPage;
	const indexFirstResult = indexLastResult - postPerPage;
	const currentPeopleResults = peopleResults.slice(indexFirstResult, indexLastResult)
	const currentPlanetResult = planetResults.slice(indexFirstResult, indexLastResult)
	
	//? Change page
	const paginate = pageNumber => setCurrentPage(pageNumber);
	return (
		<body>			
			<ShowResult planetResults={currentPlanetResult}		
			peopleResults={currentPeopleResults}
			loading={loading}
			paginatePlanets={paginatePlanets}
			paginatePeoples={paginatePeoples} />
					{/* skickar med 3st variabler till child */}

			<div style={toShow === 'Peoples' ? {display: 'block'} : {display: 'none'}} >
			<Pagination postPerPage={postPerPage} totalPosts={peopleResults.length} paginate={paginate}
			/> {/* skickar med 3st variabler till child */} 
			</div>
			
			<div style={toShow === 'Planets' ? {display: 'block'} : {display: 'none'}} >			
				<Pagination postPerPage={postPerPage} totalPosts={planetResults.length} paginate={paginate}
			/>
			</div>		
		</body>
	)
}

export default ApiHandler
