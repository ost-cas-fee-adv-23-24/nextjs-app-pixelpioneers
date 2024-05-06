const reply_1 = require('../../reply_1');
const reply_2 = require('../../reply_2');

module.exports = [
    {
        id: 'get-reply_1',
        url: '/api/posts/:id/replies',
        method: 'GET',
        variants: [
            {
                id: 'success',
                type: 'json',
                options: {
                    status: 200,
                    body: reply_1,
                },
            },
            {
                id: 'all',
                type: 'json',
                options: {
                    status: 200,
                    body: reply_1,
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
        id: 'get-reply_2',
        url: '/api/posts/:id/replies',
        method: 'GET',
        variants: [
            {
                id: 'success',
                type: 'json',
                options: {
                    status: 200,
                    body: reply_2,
                },
            },
            {
                id: 'all',
                type: 'json',
                options: {
                    status: 200,
                    body: reply_2,
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
