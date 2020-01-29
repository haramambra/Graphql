import getData from '../lib/getData';

export default {
    Query: {
        getDog: async (parent: any, input: any, ctx: any) => {
            const data = await getData(
                {
                    api: 'https://dog.ceo/api/breeds/image/random',
                    method: 'GET',
                },
                ctx
            );

            return data.message;
        },
    },
};
