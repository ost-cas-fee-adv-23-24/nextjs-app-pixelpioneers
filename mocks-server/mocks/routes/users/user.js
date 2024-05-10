const user_a = require('../../user_a');

module.exports = [
    {
        id: 'get-user_a',
        url: '/api/users/:id',
        method: 'GET',
        variants: [
            {
                id: 'success',
                type: 'json',
                options: {
                    status: 200,
                    body: user_a,
                },
            },
            {
                id: 'all',
                type: 'json',
                options: {
                    status: 200,
                    body: user_a,
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
