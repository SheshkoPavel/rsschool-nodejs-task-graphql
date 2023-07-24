import { Type } from '@fastify/type-provider-typebox';
import { GraphQLSchema, GraphQLObjectType } from 'graphql';

export const gqlResponseSchema = Type.Partial(
  Type.Object({
    data: Type.Any(),
    errors: Type.Any(),
  }),
);

export const createGqlResponseSchema = {
  body: Type.Object(
    {
      query: Type.String(),
      variables: Type.Optional(Type.Record(Type.String(), Type.Any())),
    },
    {
      additionalProperties: false,
    },
  ),
};

const query =  new GraphQLObjectType({ name: 'Query', fields: {}});
const mutation = new GraphQLObjectType({ name: 'Mutation', fields: () => ({})});

export const querySchema = new GraphQLSchema({ query, mutation });
