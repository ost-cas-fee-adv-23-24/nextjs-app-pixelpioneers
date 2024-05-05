const postId = require('../../post');

module.exports = [
    {
        id: 'get-post-id',
        url: '/api/posts/:id',
        method: 'GET',
        variants: [
            {
                id: 'success',
                type: 'json',
                options: {
                    status: 200,
                    body: postId,
                },
            },
            {
                id: 'all',
                type: 'json',
                options: {
                    status: 200,
                    body: postId,
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
