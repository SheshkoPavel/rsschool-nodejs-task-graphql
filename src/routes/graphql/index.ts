import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema, querySchema } from './schemas.js';
import { graphql, validate, parse } from 'graphql';
import depthLimit from 'graphql-depth-limit';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const parsed = parse(req.body.query);
      const validationErrors = validate(querySchema, parsed, [depthLimit(5)]);

      if (validationErrors.length) {
        return { errors: validationErrors };
      }

      return await graphql({
        schema: querySchema,
        source: req.body.query,
        rootValue: {},
        variableValues: req.body.variables,
        contextValue: {},
      });
    },
  });
};

export default plugin;
