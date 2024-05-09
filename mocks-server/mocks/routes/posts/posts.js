const posts = require('../../posts');
const postsUpdated = require('../../posts_updated');

module.exports = [
    {
        id: 'get-posts',
        url: '/api/posts',
        method: 'GET',
        variants: [
            {
                id: 'success',
                type: 'json',
                options: {
                    status: 200,
                    body: posts,
                },
            },
            {
                id: 'updated',
                type: 'json',
                options: {
                    status: 200,
                    body: postsUpdated,
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
