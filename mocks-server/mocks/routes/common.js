module.exports = [
    {
        id: 'add-headers', //route id
        url: '*', // url in express format
        method: ['GET', 'POST', 'PUT', 'PATCH'], // HTTP methods
        variants: [
            {
                id: 'enabled', // variant id
                type: 'middleware', // variant handler id
                options: {
                    // Express middleware to execute
                    middleware: (_req, res, next, core) => {
                        res.set('x-mocks-server-example', 'some-value');
                        core.logger.info('Custom header added by route variant middleware');
                        next();
                    },
                },
            },
            {
                id: 'disabled', // variant id
                disabled: true,
            },
        ],
    },
];
