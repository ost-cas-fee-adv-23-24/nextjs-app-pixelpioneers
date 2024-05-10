const addNewReplyInPost = require('../../addNewReplyInPost');
const updateAddedPost = require('../../updateAddedPost');
const post_1 = require('../../post_1');
const post_2 = require('../../post_2');

module.exports = [
    {
        id: 'get-post_1',
        url: '/api/posts/:id',
        method: 'GET',
        variants: [
            {
                id: 'success',
                type: 'json',
                options: {
                    status: 200,
                    body: post_1,
                },
            },
            {
                id: 'newAddedPost',
                type: 'json',
                options: {
                    status: 200,
                    body: addNewReplyInPost,
                },
            },
            {
                id: 'updateAddedPost',
                type: 'json',
                options: {
                    status: 200,
                    body: updateAddedPost,
                },
            },
            {
                id: 'all',
                type: 'json',
                options: {
                    status: 200,
                    body: post_1,
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
    {
        id: 'get-post_2',
        url: '/api/posts/:id',
        method: 'GET',
        variants: [
            {
                id: 'success',
                type: 'json',
                options: {
                    status: 200,
                    body: post_2,
                },
            },
            {
                id: 'all',
                type: 'json',
                options: {
                    status: 200,
                    body: post_2,
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
    {
        id: 'put-like-a-post_1',
        url: '/api/posts/:id/likes',
        method: 'PUT',
        variants: [
            {
                id: 'success',
                type: 'json',
                options: {
                    status: 204,
                    body: {},
                },
            },
            {
                id: 'all',
                type: 'json',
                options: {
                    status: 204,
                    body: {},
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
    {
        id: 'delete-like-a-post_1',
        url: '/api/posts/:id/likes',
        method: 'DELETE',
        variants: [
            {
                id: 'success',
                type: 'json',
                options: {
                    status: 204,
                    body: {},
                },
            },
            {
                id: 'all',
                type: 'json',
                options: {
                    status: 204,
                    body: {},
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
    {
        id: 'create-a-post',
        url: '/api/posts',
        method: 'POST',
        variants: [
            {
                id: 'success',
                type: 'json',
                options: {
                    status: 200,
                    body: {},
                },
            },
            {
                id: 'error',
                type: 'json',
                options: {
                    status: 400,
                    body: {
                        message: 'Error by creating a post',
                    },
                },
            },
        ],
    },
];
