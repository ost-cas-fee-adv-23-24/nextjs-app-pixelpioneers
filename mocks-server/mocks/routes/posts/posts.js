const posts = require('../fixtures/posts');

[
    {
        id: 'get-posts',
        url: '/api/posts',
        method: 'GET',
        variants: [
            {
                id: 'success',
                type: 'json',
                options: {
                    status: 200,
                    body: posts,
                },
            },
            {
                id: 'all',
                type: 'json',
                options: {
                    status: 200,
                    body: posts,
                },
            },
            {
                id: 'error',
                type: 'json',
                options: {
                    status: 400,
                    body: {
                        message: 'Error',
                    },
                },
            },
        ],
    },
];
