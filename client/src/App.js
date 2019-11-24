import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// components
import BookList from './components/BookList';
import AddBook from './components/AddBook';

// apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql'
})


function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>List of Books</h1>
        <h3>A simple React / Django Graphql query system.</h3>
        <div className="book">
          <BookList/>
          <AddBook/>
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
