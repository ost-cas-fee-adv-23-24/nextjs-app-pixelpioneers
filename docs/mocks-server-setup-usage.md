# Getting Started (Setup and Usage of Mocks Server)

This document will guide you through the setup of Mocks Server (Mocking). Mocks Server is a Node.js mock server running live, interactive mocks in place of real APIs, also based on Docker available.

## Prerequisites

- Node.js
- NPM mocks-server: [mocks-server](https://www.mocks-server.org/)
- Docker: [Integration Docker](https://www.mocks-server.org/docs/integrations/docker/)
- Docs (mocks-server): [mocks-server Docs](https://www.mocks-server.org/docs/overview/)

## Installation and Setup

1. Install Docker
2. Use Docker Images (Docker Hub - mockserver/main). This Docker images contain all of the needed dependencies and automatically start Mocks Server when executed - Login to Docker for the installation is needed!
3. Go to: `https://hub.docker.com/r/mocksserver/main`
4. Note: The mocksserver/main Docker image includes the @mocks-server/main NPM distribution
5. For test: Go to: `./mocks-server` directory
6. Via Terminal: `docker run -ti -p 3100:3100 -p 3110:3110 mocksserver/main`

When we did build a self contained image, so we can skep these steps until to 12.

7. Pulling from `mocksserver/main` (it needs for the local machine)
8. Message will appears: Configuration file was not found. A scaffold was created. We can continue.
9. The Mocks Server is started:
10. It starts Mocks Server, and, as no /mocks folder nor the configuration file were provided, it will create a scaffold. If you hit the next URLs you'll see:

`[info][server] Server started and listening at http://localhost:3100`

`[info][plugins:adminApi:server] Server started and listening at http://localhost:3110`

http://localhost:3100/api/users - An example route response contained in the scaffold.

http://localhost:3110 or http://localhost:3110/docs/ - The Swagger UI of the administration REST API.

Note: This API is provided by the Mocks Server's plugin @mocks-server/plugin-admin-api. It allows to administrate the mock server while it is running, allowing to change its configuration, etc.

10. Mocks Server structure
11. Providing routes, collections and config files

project-root/
├── mocks/
│ ├── routes/
│ │ ├── common.js
│ │ ├── books.js
│ │ └── users.js
│ └── collections.js
└── mocks.config.js

This case: Simply mount the same structure in the /input folder of the Docker container.
(Docker container is pre-configured to search for the mocks folder (which contains routes and collections) and the configuration file in the /input folder)

More info see there: [mocks-server: Organizing files](https://www.mocks-server.org/docs/guides/organizing-files/)

12. Building a self contained image [Doc - Building a self container image](https://www.mocks-server.org/docs/integrations/docker/#building-a-self-contained-image)

## Getting started

13. Build mock test (after modification in the mocks server structure)

`docker build -t mock:test .`

14. Run mock test

`docker run -ti -p 3100:3100 -p 3110:3110 mock:test`

15. Test Mock Data via API Browser or via CURL (Terminal)

Via Browser:
`http://localhost:3100/api/posts`

`http://localhost:3100/api/posts/01HVTHCF8B2KHT0FBG04QAGTHR/replies`

`http://127.0.0.1:3100/api/users`

`http://127.0.0.1:3100/api/users/245809311459051537`

Via Terminal: (CURL)
`curl http://localhost:3100/api/posts`

`curl http://localhost:3100/posts/01HVTHCF8B2KHT0FBG04QAGTHR/replies`

`curl http://127.0.0.1:3100/api/users`

`curl http://127.0.0.1:3100/api/users/245809311459051537`

16. Create file: `.env.test` and add this, see also below:

`NEXT_PUBLIC_API_BASE_URL=http://localhost:3100/api`

17. Check if in the file `playwright.config.ts` is configured properly.

18. Start Next.js Mumble App with the Test environment

`npm run dev:testmock`

The Web App should be started with the mock data.

19. Start playwright test or playwright test debug

`npm run test:pw` or `npm run test:pw:debug`

## Additional information

Sometimes this command can be useful for cleaning the cache (remove .next folder and rebuild again):

For the directory: `/nextjs-app-pixelmator/`

`"dev:testmock": "rm -rf .next && NODE_ENV=test next dev`

For the directory: `/mocks-server/`

`docker build --no-cache -t mock:test .`

## e2e Test files

All e2e Test files are located in `tests/` folder.

## Explanation

`NODE_ENV`

As you see we have in the package.json for running dev mock `NODE_ENV=test next dev` "NODE_ENV" added.
NODE_ENV is an environment variable that stands for Node environment in the server. The NODE_ENV environment variable specifies the environment in which an application is running (test, development or production).

Docs (environment-variables): [Docs environment-variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)

## Some useful information

[Docs REST API](https://www.mocks-server.org/docs/integrations/rest-api/)

[Docs Mock Browser-APIs](https://playwright.dev/docs/mock-browser-apis/)

[Postman](https://www.postman.com/)
Once mocks server is running, you can use their postman public collection to interact with the administration API.
