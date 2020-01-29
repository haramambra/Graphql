import ResolverContext, {Ctx} from './ResolverContext';

function createResolverContext(ctx: Ctx) {
	if (ctx.req._resolverContext) {
		return ctx.req._resolverContext;
	}
	const resolverContext = new ResolverContext(ctx);
	ctx.req._resolverContext = resolverContext;
	return resolverContext;
}

export default createResolverContext;
