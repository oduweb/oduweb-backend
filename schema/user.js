export default `
  type User {
    Id: Int!
    firstName: String!
    lastName: String!
    userName: String!
    password: String!
    email: String!
    posts: [Post!]!
  }

  type Query {
    getUser(Id: Int!): User!
    allUsers: [User!]!
  }

  type Mutation {
    registerUser(firstName: String!, lastName: String!, userName: String!, password: String!, email: String!): Boolean!
  }
`;
