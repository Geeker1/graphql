import React, { useState } from 'react';
import {getAuthorsQuery, addBookMutation, getBooksQuery} from '../queries/queries'
import { useQuery, useMutation } from '@apollo/react-hooks';


const showAuthors = ({ loading, error, data})=>{
	if(loading){return <option disabled>Loading Authors.....</option>}
	else if(error){return 'Error fetching data'}
	else{
		return data.authors.map(author=>{
			return <option value={author.id} key={author.id}>{author.name}</option>
		})
	}
}



export default function AddBook(props){

	const [input, setInput] = useState({name:"",genre:"",author:""});
	const { loading, error, data } = useQuery(getAuthorsQuery);
	const [addBook] = useMutation(addBookMutation,{
		refetchQueries: [{query:getBooksQuery}]
	});

	const handleSubmit = async (e) =>{
		e.preventDefault();
		try{
			await addBook({variables: {...input}})
		}catch(err){
			console.log("Error adding Book >>>>", err)
		}
	}

	return(
		<div className="add-form">
		<form id="add-book" onSubmit={handleSubmit}>
			<div className="field">
				<label>Book:</label>
				<input
					onChange={(e)=>setInput({...input, name:e.target.value})}
					type="text"
				/>

			</div>
			<div className="field">
				<label>Genre</label>
				<input
					onChange={(e)=>setInput({...input, genre:e.target.value})}
					type="text"/>
			</div>
			<div className="field">
				<label>Author:</label>
				<select onChange={(e)=>setInput({...input, author:e.target.value})}>
					<option>Select author</option>
					{ showAuthors({loading, error, data}) }
				</select>
			</div>
			<button type="submit" className="btn">
				Add Book
			</button>
		</form>
		</div>
		)
}




