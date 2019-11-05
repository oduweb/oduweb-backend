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

  type LoginResponse {
    ok: Boolean!
    token: String
    refreshToken: String
    errors: [Error!]
  }

  type Mutation {
    registerUser(firstName: String!, lastName: String!, userName: String!, password: String!, email: String!): RegisterResponse!
    login(email: String!, password: String!): LoginResponse!
  }
`;
