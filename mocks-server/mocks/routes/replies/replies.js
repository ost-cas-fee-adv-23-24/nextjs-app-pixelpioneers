const replyId = require('../../reply');

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
                    body: replyId,
                },
            },
            {
                id: 'all',
                type: 'json',
                options: {
                    status: 200,
                    body: replyId,
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
