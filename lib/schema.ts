import {join} from 'path';
import {fileLoader, mergeResolvers, mergeTypes} from 'merge-graphql-schemas';
import {makeExecutableSchema} from 'graphql-tools';

const typeDefs = mergeTypes(fileLoader(join(__dirname, '../schema/**/*.graphql')));
const resolvers = mergeResolvers(fileLoader(join(__dirname, '../schema/**/*.{js,ts}')));

const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
	resolverValidationOptions: {
		requireResolversForResolveType: false,
	},
});

export default schema;
