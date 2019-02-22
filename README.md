# react-apollo-gql
react, apollo, graphQL을 활용한 샘플코드입니다

# 구성
## 서버
Node.js 기반으로 graphQL 서버를 구성합니다.

### 설치 목록
```
> npm install graphql express express-graphql
> npm install cors
```

### 중요 파일
* app.js (소스 코드)
* dummyData.js (더미 데이터 파일)

### 실행
```
> node app.js  //localhost:4000
```

## 클라이언트
Node.js와 react, apollo client를 기반으로 클라이언트 서버를 구성합니다.

### 설치 목록
```
> create-react-app client
> npm i --save react-router-dom apollo-boost react-apollo graphql-tag graphql
```

### 중요 파일
* app.js (메인)
* apolloClient.js (apollo 설정)
* SnackList.js (apollo 쿼리 결과를 보여주는 컴포넌트)

### 실행
```
> npm start //localhost:3000
```
