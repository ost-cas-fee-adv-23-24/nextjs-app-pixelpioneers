const reply_1 = require('../../reply_1');
const reply_2 = require('../../reply_2');
const reply_3_add = require('../../reply_3_add');
const reply_3_added = require('../../reply_3_added');

module.exports = [
    {
        id: 'get-reply_1',
        url: '/api/posts/:id/replies',
        method: 'GET',
        variants: [
            {
                id: 'success',
                type: 'json',
                options: {
                    status: 200,
                    body: reply_1,
                },
            },
            {
                id: 'all',
                type: 'json',
                options: {
                    status: 200,
                    body: reply_1,
                },
            },
            {
                id: 'addNewReply',
                type: 'json',
                options: {
                    status: 200,
                    body: reply_3_add,
                },
            },
            {
                id: 'addedNewReply',
                type: 'json',
                options: {
                    status: 200,
                    body: reply_3_added,
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
        id: 'post-reply_1',
        url: '/api/posts/:id/replies',
        method: 'POST',
        variants: [
            {
                id: 'success',
                type: 'json',
                options: {
                    status: 200,
                    body: {
                        parentId: '01HXC25TE4SQNMQHHZZ5VP8BPR',
                        id: '01HXC25TE4SQNMQHHZZ5VP8BPR',
                        creator: {
                            id: '245809311459051537',
                            username: 'andre',
                            avatarUrl:
                                'https://storage.googleapis.com/mumble-api-data/28e17313-a62b-411f-8128-f005b908a853',
                        },
                        text: 'Ich habe eine andere Meinung',
                        mediaUrl: null,
                        mediaType: null,
                        likes: 0,
                        likedBySelf: null,
                    },
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
        id: 'get-reply_2',
        url: '/api/posts/:id/replies',
        method: 'GET',
        variants: [
            {
                id: 'success',
                type: 'json',
                options: {
                    status: 200,
                    body: reply_2,
                },
            },
            {
                id: 'all',
                type: 'json',
                options: {
                    status: 200,
                    body: reply_2,
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
