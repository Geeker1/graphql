import { gql } from "apollo-boost"


const getBooksQuery = gql`
	{
		books{
			name
			id
		}
	}
`

const getSingleBookQuery = gql`
	query getSingleBookQuery($id: Int!){
		book(id: $id){
			name
			genre
			id
			author{
				name
				age
				id
				books{
					name
					genre
					id
				}
			}
		}
	}
`


const getAuthorsQuery = gql`
	{
		authors{
			name
			id
		}
	}
`

const addBookMutation = gql`
	mutation($name: String!, $genre: String!, $author: ID!){
		addBook(input:{name: $name, genre: $genre, author: $author}){
			book{
				name
				id
			}
		}
	}
`

export {getAuthorsQuery, getBooksQuery, addBookMutation, getSingleBookQuery};
