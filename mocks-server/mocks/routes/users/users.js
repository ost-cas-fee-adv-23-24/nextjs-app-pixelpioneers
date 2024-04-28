const users = require('../fixtures/users');

module.exports = [
    {
        id: 'get-users',
        url: '/api/users',
        method: 'GET',
        variants: [
            {
                id: 'success',
                type: 'json',
                options: {
                    status: 200,
                    body: users,
                },
            },
            {
                id: 'all',
                type: 'json',
                options: {
                    status: 200,
                    body: users,
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
