import React, { Component } from 'react';
import { Query } from "react-apollo";
import gql from 'graphql-tag';

//graphQL query
const SNACKS = gql`
query {
  snacks {
    name
    price
    manufacturer
  }
}
`;

class SnackList extends Component {
  render(){
    return (
      <div>
        <h1>과자 항목</h1>
        <Query query={SNACKS}>
        {
          ({ loading, data, error }) => {
              if(loading) { //true or false
                return <span>불러오는 중...</span>;
              } else if(error) { //error 출럭
                return <span>{error}</span>;
              }

              return data.snacks.map((snack, idx)=>{
                return (
                  <p key={idx}>
                    {snack.manufacturer} - {snack.name}, 가격 : {snack.price}원
                  </p>
                );
              });
          }
        }
        </Query>
      </div>
    );
  }
}

export default SnackList;
