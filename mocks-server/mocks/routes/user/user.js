const user = require('../../user');

module.exports = [
    {
        id: 'get-user-andre',
        url: '/api/users/:id',
        method: 'GET',
        variants: [
            {
                id: 'success',
                type: 'json',
                options: {
                    status: 200,
                    body: user,
                },
            },
            {
                id: 'all',
                type: 'json',
                options: {
                    status: 200,
                    body: user,
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
