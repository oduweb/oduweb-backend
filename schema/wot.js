export default `
  type Wot {
    Id: Int!
    TankName: String!
    userId: ID!
    users: User!
    posts: Post!
  }

  type Query {
    allWots: [Wot!]!
    getWot(Id: Int!):Wot!
  }

  type CreateWotResponse {
    ok: Boolean!
    errors: [Error!]
  }

  type Mutation {
    createWot(userId: Int!, postId: Int!, TankName: String!): CreateWotResponse!
  }
`;
