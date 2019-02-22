var express = require("express");
var graphqlHTTP = require("express-graphql");
var Graphql = require("graphql");
var cors = require('cors');
var dummyDatabase = require("./dummyData.js");

const snackType = new Graphql.GraphQLObjectType({
  name: "Snack",
  fields: {
    id: { type: Graphql.GraphQLInt },
    name: { type: Graphql.GraphQLString },
    price: { type: Graphql.GraphQLInt },
    manufacturer: { type: Graphql.GraphQLString },
  }
});

var queryType = new Graphql.GraphQLObjectType({
  name: "Query",
  fields: {
    snacks : {
      type: snackType,
      args: {
        id: { type: Graphql.GraphQLInt }
      },
      resolve: function(obj, args, context, info) {
        const data = Object.keys(dummyDatabase).filter(element => {
          if (dummyDatabase[element].id == args.id) {
            return element;
          }
        });
        return dummyDatabase[data];
      }
    },
    allSnacks : {
      type: new Graphql.GraphQLList(snackType),
      resolve: function(obj, args, context, info) {
        return dummyDatabase;
      }
    }
  }
});

var schema = new Graphql.GraphQLSchema({ query: queryType });

var app = express();

app.use(cors());  //로컬 테스트를 위하여 크로스 도메인 허용

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true
  })
);

app.listen(4000);

console.log("Running a GraphQL server");
