/* eslint-disable no-console */
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import {ApolloServer} from 'apollo-server-express';
import schema from './lib/schema';
import createResolverContext from './lib/createResolverContext';
import {GraphQLExtension} from 'graphql-extensions';

const PORT = 4000;

process
	.on('unhandledRejection', (err: any) => {
		console.log(err);
	})
	.on('uncaughtException', err => {
		console.log(err);
		process.exit(1);
	});

const app = express();

app.disable('x-powered-by');

/**
 * http://expressjs.com/ru/api.html#trust.proxy.options.table
 */
app.set('trust proxy', 'loopback, linklocal, uniquelocal');

const extensions: Array<() => GraphQLExtension<any>> = [];

const apolloServer = new ApolloServer({
	schema,
	context: createResolverContext,

	playground: {
		settings: {
			'general.betaUpdates': false,
			'editor.cursorShape': 'line',
			'editor.fontSize': 14,
			'editor.fontFamily': "'Source Code Pro', 'Consolas', 'Inconsolata', 'Droid Sans Mono', 'Monaco', monospace",
			'editor.theme': 'light',
			'editor.reuseHeaders': true,
			'request.credentials': 'include',
			'tracing.hideTracingResponse': true,
			['schema.polling.enable' as any]: false,
		} as const,
	},
	formatError(err) {
		const originalError: any = err.originalError;
		return {
			message: err.message,
			code: originalError && originalError.code,
			locations: undefined,
			path: err.path,
			serviceException: originalError && originalError.serviceException && originalError.serviceException.message,
		};
	},
	extensions,
});

app.use(
	'/graphql',
	bodyParser.json({
		limit: '5mb',
		verify: (req, res: express.Response, buf, encoding) => {
			res.locals.bodySize = Buffer.byteLength(buf, encoding as any);
		},
	}),
	cookieParser()
);

apolloServer.applyMiddleware({
	path: '/graphql',
	app,
});

app.listen(PORT, () => {
	console.log(`GraphQL ready on http://localhost:${PORT}/graphql`);
});
