const post_1 = require('../../post_1');
const post_2 = require('../../post_2');

module.exports = [
    {
        id: 'get-post_1',
        url: '/api/posts/:id',
        method: 'GET',
        variants: [
            {
                id: 'success',
                type: 'json',
                options: {
                    status: 200,
                    body: post_1,
                },
            },
            {
                id: 'all',
                type: 'json',
                options: {
                    status: 200,
                    body: post_1,
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
    {
        id: 'get-post_2',
        url: '/api/posts/:id',
        method: 'GET',
        variants: [
            {
                id: 'success',
                type: 'json',
                options: {
                    status: 200,
                    body: post_2,
                },
            },
            {
                id: 'all',
                type: 'json',
                options: {
                    status: 200,
                    body: post_2,
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
