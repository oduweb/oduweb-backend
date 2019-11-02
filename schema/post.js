export default `
  type Post {
    Id: Int!
    title: String!
    content: String!
    userId: ID!
    users: User!
  }

  type Query {
    allPosts: [Post!]!
    getPost(Id: Int!): Post!
  }

  type Mutation {
    createPost(userId: Int!, title: String!, content: String!): Boolean!
  }
`;
