export default `
  type Post {
    Id: Int!
    title: String!
    context: String!
    userId: [User!]!
  }

  type User {
    Id: Int!
    firstName: String!
    lastName: String!
    Post: [Post!]!
  }

  type Query {
    getUser(Id: Int!): User!
    allUsers: [User!]!
  }

  type Mutation {
    createUser(firstName: String!, lastName: String!): User!
  }
`;
