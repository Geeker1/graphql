import React, { useState } from 'react';
import {getBooksQuery} from '../queries/queries';
import { useQuery } from '@apollo/react-hooks';
import BookDetail from "./BookDetail";

export default function BookList(props){

	const [bookId, changeSelect] = useState(null)
	const { loading, error, data } = useQuery(getBooksQuery);

	const check_list = ()=>{
		if(loading){return 'Loading Data'}
		else if(error){return "Error connecting to server..."}
		else{
			return data.books.map(book=>{
				return <li
					onClick={()=>changeSelect(book.id)}
					key={book.id}>{book.name}</li>
			})
		}
	}

	return (
		<div className="book-list">
			<div id="book">
				<ul className="book-list-ul">
					{ check_list() }
				</ul>
			</div>
			<BookDetail bookId={bookId} />
		</div>
	)
}
