const user_followers_andre = require('../../users_followers_andre');

module.exports = [
    {
        id: 'get-followers_andre',
        url: '/api/users/:id/followers',
        method: 'GET',
        variants: [
            {
                id: 'success',
                type: 'json',
                options: {
                    status: 200,
                    body: user_followers_andre,
                },
            },
            {
                id: 'all',
                type: 'json',
                options: {
                    status: 200,
                    body: user_followers_andre,
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
