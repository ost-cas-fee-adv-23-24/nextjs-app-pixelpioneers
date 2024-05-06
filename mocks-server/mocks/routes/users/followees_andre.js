const user_followees_andre = require('../../users_followees_andre');

module.exports = [
    {
        id: 'get-followees_andre',
        url: '/api/users/:id/followees',
        method: 'GET',
        variants: [
            {
                id: 'success',
                type: 'json',
                options: {
                    status: 200,
                    body: user_followees_andre,
                },
            },
            {
                id: 'all',
                type: 'json',
                options: {
                    status: 200,
                    body: user_followees_andre,
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
