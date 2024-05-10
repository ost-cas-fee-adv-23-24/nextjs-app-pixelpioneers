const user_followers_a = require('../../users_followers_a');

module.exports = [
    {
        id: 'get-followers_a',
        url: '/api/users/:id/followers',
        method: 'GET',
        variants: [
            {
                id: 'success',
                type: 'json',
                options: {
                    status: 200,
                    body: user_followers_a,
                },
            },
            {
                id: 'all',
                type: 'json',
                options: {
                    status: 200,
                    body: user_followers_a,
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
