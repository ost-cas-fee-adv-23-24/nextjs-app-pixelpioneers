const posts = require('../../posts');
const postsUpdated = require('../../posts_updated');
const postsLastUpdated = require('../../posts_last_updated');

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
                id: 'lastUpdated',
                type: 'json',
                options: {
                    status: 200,
                    body: postsLastUpdated,
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
