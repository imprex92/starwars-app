import React from 'react'
import './The404Page.css'

const changePic = (e) => {
	e.target.setAttribute('src', 'https://www.reactiongifs.com/r/sbbn.gif')
	e.target.setAttribute('alt', 'crying-man')
	e.target.setAttribute('width', '500')
	e.target.setAttribute('height', '300')
}

const The404Page = () => {
	const h1Msg = 'Ohno! Something went wrong..!'
	// eslint-disable-next-line no-useless-concat
	const h2Msg = "- This is the work of the creater of this page!"
	const h2SubMsg = "Wouldn't you love to punish him!?"
	const h3Msg = 'Press the picture of the creator to punish!'
	return (
		<div>
			<section>
				<h1>
					{h1Msg}
				</h1>
				<h2>
					{h2Msg} <br/> {h2SubMsg}
				</h2>
				<div>
					{h3Msg} <br/>
				<img onClick={changePic} src = "https://media.giphy.com/media/haMBsSmJPgjSg/giphy.gif" width="289" height="468" alt="Sad-man"/>
				</div>
			</section>
		</div>
	)
}


export default The404Page