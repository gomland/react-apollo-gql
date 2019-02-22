var express = require("express");
var graphqlHTTP = require("express-graphql");
var Graphql = require("graphql");
var cors = require('cors');
var dummyDatabase = require("./dummyData.js");

 //더미 데이터의 스키마
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
    //요청 타입 1 : id를 argument로 받아 조건 매칭
    snack : {
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
    //요청 타입 2 : 모든 과자의 정보
    snacks : {
      type: new Graphql.GraphQLList(snackType),
      resolve: function(obj, args, context, info) {
        return dummyDatabase;
      }
    }
  }
});

var schema = new Graphql.GraphQLSchema({ query: queryType });

var app = express();

app.use(cors());  //로컬 테스트를 위하여 크로스 도메인 허용 설정
app.use(
  "/graphql", //라우트 경로 지정
  graphqlHTTP({
    schema: schema,
    graphiql: true //검색도구 노출 여부
  })
);

app.listen(4000); //4000 포트로 실행

console.log("Running a GraphQL server");
