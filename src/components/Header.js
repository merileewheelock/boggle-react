import React, { Component } from 'react';

class Header extends Component{
	render(){
		return(
			<div className="logo text-center">
				<img src="/images/logo.png" alt="boggle-logo" />
			</div>
		)
	}
}

export default Header;