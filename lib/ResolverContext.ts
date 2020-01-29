import express from 'express';
import {CookieOptions} from 'express-serve-static-core';

export type Ctx = {
	req: express.Request & {span?: any; _resolverContext?: ResolverContext};
	res: express.Response;
};

class ResolverContext {
	constructor(public ctx: Ctx) {}

	setCookie = (name: string, val: string, options?: CookieOptions): express.Response => {
		const {req, res} = this.ctx;

		req.cookies[name] = val;

		return res.cookie(name, val, {
			httpOnly: true,
			sameSite: 'lax',
			...options,
		});
	};
	getCookie = (name: string) => {
		return this.ctx.req.cookies[name];
	};
}

export {ResolverContext};

export default ResolverContext;
