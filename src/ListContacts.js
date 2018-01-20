import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'


class ListContacts extends Component {
	// PropTypes guarantees types to our props, otherwise shows error
	// using static we don't need to instantiate the class to access the property and it is the same for all instantiated  objects
	static propTypes = {
		contacts: PropTypes.array.isRequired,
		onDeleteContact: PropTypes.func.isRequired
	}

	state = {
		query: ''
	}

	updateQuery = query => {
		this.setState(
			// trim removes white spaces
			{ query: query.trim() }
		)
	}

	clearQuery = () => {
		this.setState(
			{ query: '' }
		)
	}

	render() {
		// this ables us to change this.state.query to just query
		const { contacts, onDeleteContact } = this.props 
		const { query } = this.state

		let showingContacts
		if (query) {
			// escapeRegExp does not consider special characters like /, $,ˆ, etc..., in order to use string literal (example: "string") 
			// i ignores case
			const match = new RegExp(escapeRegExp(query), 'i')
			showingContacts = contacts.filter((contact) => match.test(contact.name))
		} else {
			showingContacts = contacts
		}

		showingContacts.sort(sortBy('name'))

		// Link component permits a declarative navigation
		return (
			<div className='list-contacts'>
				<div className='list-contacts-top'>
					<input
						className='search-contacts'
						type='text'
						placeholder='Search contacts'
						value={query}
						// event.target.value gives the specif value of the input field
						onChange={(event) => this.updateQuery(event.target.value)}
					/>
					<Link
						to='/create'
						className='add-contact'
					>
						Add Contact
					</Link>
				</div>

				{showingContacts.length !== contacts.length && ( // Short-Circuit -> this is the same as if (showingContacts.length !== contacts.length) {
					// div is a block element, span is inline.
					<div className='showing-contacts'>
						<span>Now showing {showingContacts.length} of {contacts.length} total</span> 
						<button onClick={this.clearQuery}>Show all</button>
					</div>
				)}

				<ol className='contact-list'>
					{showingContacts.map(contact =>
						<li key={contact.id} className='contact-list-item'>
							<div className='contact-avatar' style={{
								backgroundImage: `url(${contact.avatarURL})`
							}} />
							<div className='contact-details'>
								<p>{contact.name}</p>
								<p>{contact.email}</p>
							</div>
							<button onClick={() => onDeleteContact(contact)} className='contact-remove'>
								Remove
							</button>
						</li>)}
				</ol>
			</div>
		)
	}
}

export default ListContacts
