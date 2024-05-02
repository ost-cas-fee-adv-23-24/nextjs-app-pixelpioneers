const reply = require('../../01HVTHCF8B2KHT0FBG04QAGTHR');

module.exports = [
    {
        id: 'get-reply-1',
        url: '/api/posts/:id/replies',
        method: 'GET',
        variants: [
            {
                id: 'success',
                type: 'json',
                options: {
                    status: 200,
                    body: reply,
                },
            },
            {
                id: 'all',
                type: 'json',
                options: {
                    status: 200,
                    body: reply,
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
