import fetch from 'node-fetch';

type Params = {
	method: string;
	api: string;
	input?: Record<string, any>;
	headers?: Record<string, any>;
};

const ENDPOINT = '';

const getData = async function(params: Params, ctx: any) {
	const token = ctx.getCookie('token');
	const requestOptions = {
		method: params.method || 'POST',
	};

	if (params.headers) {
		requestOptions.headers = params.headers;
	}

	if (params.method === 'POST') {
		requestOptions.body = params.input ? JSON.stringify(params.input) : '{}';
	}

	const url = ENDPOINT + params.api;

	const response: any = await fetch(url, requestOptions).catch((error: any) => console.log('error', error));
	const data = await response.json();

	return await data;
};

export default getData;
