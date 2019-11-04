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

  type RegisterResponse {
    ok: Boolean!
    user: User
    errors: [Error!]
  }

  type Mutation {
    registerUser(firstName: String!, lastName: String!, userName: String!, password: String!, email: String!): RegisterResponse!
  }
`;
