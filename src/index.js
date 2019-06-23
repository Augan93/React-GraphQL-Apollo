import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import gql from "graphql-tag";
import { ApolloProvider } from 'react-apollo';
import { Query } from "react-apollo";

const client = new ApolloClient({
    uri: "http://localhost:8000/graphql"
});


const GET_DOGS = gql`
  {
    dogs {
      id
      breed
    }
  }
`;

const Dogs = ({ onDogSelected }) => (
    <Query query={GET_DOGS}>
        {({ loading, error, data }) => {
            if (loading) return "Loading...";
            if (error) return `Error! ${error.message}`;

            return (
                <select name="dog" onChange={onDogSelected}>
                    {data.dogs.map(dog => (
                        <option key={dog.id} value={dog.breed}>
                            {dog.breed}
                        </option>
                    ))}
                </select>
            );
        }}
    </Query>
);

const GET_DOG_PHOTO = gql`
    query Dog($breed: String!) {
        dog(breed: $breed){
            id
            displayImage
        }
    }
`;

const DogPhoto = ({ breed }) => (
    <Query query={GET_DOG_PHOTO} variables={{ breed }}>
        {({ loading, error, data }) => {
            if (loading) return null;
            if (error) return `Error! ${error}`;

            return (
                <img src={'http://127.0.0.1:8000/media/' + data.dog.displayImage} style={{ height: 200, width: 200 }}/>
            );
        }}
    </Query>
);

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selectedDog: null
        };
    }

    onDogSelected = ({ target }) => {
        this.setState(() => (
            {
                selectedDog: target.value
            }
        ))
    };

    render() {
        return (
            <ApolloProvider client={client}>
                <div>
                    <h2>Building Query components</h2>
                    {this.state.selectedDog && (
                        <DogPhoto breed={this.state.selectedDog}/>
                    )}
                    <Dogs onDogSelected={this.onDogSelected}/>
                </div>
            </ApolloProvider>
        );
    }
}

//a
// const ExchangeRates = () => (
//     <Query
//         query={gql`
//             {
//                 rates(currency: "USD") {
//                     currency
//                     rate
//                 }
//             }
//         `}
//     >
//         {({ loading, error, data }) => {
//             if (loading) return <p>Loading...</p>
//             if (error) return <p>Error :(</p>;
//
//             return data.rates.map(({ currency, rate }) => (
//                 <div key={currency}>
//                     <p>{currency}: {rate}</p>
//                 </div>
//             ));
//         }}
//     </Query>
// );

// const App = () => (
//     <ApolloProvider client={client}>
//         <div>
//             <h2>My first Apollo app 🚀</h2>
//             <Dogs/>
//         </div>
//     </ApolloProvider>
// );

// client
//     .query({
//         query: gql`
//             {
//                 rates(currency: "USD") {
//                     currency
//                 }
//             }
//         `
//     })
//     .then(result => console.log(result));

ReactDOM.render(<App/>,
    document.getElementById("root"));












// import React from 'react';
// import ReactDOM from 'react-dom';
// // import App from './App';
// import * as serviceWorker from './serviceWorker';
//
// import { ApolloProvider } from "react-apollo";
// import ApolloClient from 'apollo-boost';
// import { Query } from "react-apollo";
// import { gql } from 'apollo-boost'
//
// const client = new ApolloClient({
//     uri: "https://48p1r2roz4.sse.codesandbox.io"
// });
//
// const ExchangeRates = () => (
//     <Query
//         query={gql`
//             {
//                 rates(currency: "USD") {
//                     currency
//                     rate
//                 }
//             }
//         `}
//     >
//         {({ loading, error, data }) => {
//             if (loading) return <p>Loading...</p>;
//             if (error) return <p>Error :(</p>;
//
//             return data.rates.map(({ currency, rate }) => (
//                 <div key={currency}>
//                     <p>{currency}: {rate}</p>
//                 </div>
//             ));
//         }}
//     </Query>
// );
//
// const App = () => (
//     <ApolloProvider client={client}>
//         <div>
//             <ExchangeRates/>
//             <h2>My first Apollo app</h2>
//         </div>
//     </ApolloProvider>
// );
//
// ReactDOM.render(<App />, document.getElementById('root'));
//
// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
//
// // client
// //     .query({
// //         query: gql`
// //             {
// //                 rates(currency: "USD") {
// //                     currency
// //                 }
// //             }
// //         `
// //     })
// //     .then(result => console.log(result));
//
//
//
