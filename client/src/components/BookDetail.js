import React from "react";
import { useQuery } from '@apollo/react-hooks';
import { getSingleBookQuery } from "../queries/queries";


const BookItem = ({bookId})=>{
	const { loading, error, data } = useQuery(getSingleBookQuery,{
		variables: {id: bookId}
	})

	if(loading){return <h3>Loading .....</h3>}
	if (error){return <h3>An Error occured</h3>}
	const { name, genre, author } = data.book;
	return (
		<div id="book-detail-wrapper">
			<h3>Name: {name}</h3>
			<h4>Genre: {genre}</h4>
			<p>Author Name: <strong>{author.name}</strong></p>
			<p>All books by this author</p>
			<ul className="other-books">
				{
					author.books.map(book=>{
						return <li key={book.id}>
							{ book.name } <small>
							(Genre: <strong>{ book.genre })</strong>
							</small>
						</li>
					})
				}
			</ul>
		</div>
	)
}

const BookDetail = ({bookId})=>{
	return(
		<div className="book-detail">
			<h2>Book Detail</h2>
			{
				bookId ? <BookItem bookId={bookId}/>
				: <h3>No book selected....</h3>
			}
		</div>
	);
}

export default BookDetail
