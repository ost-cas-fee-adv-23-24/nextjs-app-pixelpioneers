const replies = require('../fixtures/replies');

module.exports = [
    {
        id: 'get-replies',
        url: '/api/replies',
        method: 'GET',
        variants: [
            {
                id: 'success',
                type: 'json',
                options: {
                    status: 200,
                    body: replies,
                },
            },
            {
                id: 'all',
                type: 'json',
                options: {
                    status: 200,
                    body: replies,
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
