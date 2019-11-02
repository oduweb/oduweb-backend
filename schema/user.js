export default `
  type User {
    Id: Int!
    firstName: String!
    lastName: String!
    posts: [Post!]!
  }

  type Query {
    getUser(Id: Int!): User!
    allUsers: [User!]!
  }

  type Mutation {
    createUser(firstName: String!, lastName: String!): User!
  }
`;
