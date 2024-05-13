## Mumble Next.js App: Team PixelPioneers

![](https://img.shields.io/github/issues-pr/ost-cas-fee-adv-23-24/nextjs-app-pixelpioneers)
![](https://img.shields.io/github/discussions/ost-cas-fee-adv-23-24/nextjs-app-pixelpioneers)
![](https://img.shields.io/github/issues/ost-cas-fee-adv-23-24/nextjs-app-pixelpioneers)
![](https://img.shields.io/github/actions/workflow/status/ost-cas-fee-adv-23-24/nextjs-app-pixelpioneers/3-test-playwright.yml?label=test%20e2e)
![](https://img.shields.io/github/license/ost-cas-fee-adv-23-24/nextjs-app-pixelpioneers)
![](https://img.shields.io/github/contributors/ost-cas-fee-adv-23-24/nextjs-app-pixelpioneers)

<section align="center">
  <a href="https://ost-cas-fee-adv-23-24.github.io/design-system-component-library-pixelpioneers">
    <img src="https://raw.githubusercontent.com/ost-cas-fee-adv-23-24/design-system-component-library-pixelpioneers/main/src/docs/assets/mumble-logo.png" alt="PixelPioneers">
  </a>

[Next.js App](https://rococo-churros-9a687a.netlify.app/) 🚀

</section>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#folder-overview">Folder Overview</a></li>
    <li><a href="#available-scripts">Run scripts</a></li>
    <li><a href="#pre-requisites">Pre-requisites</a></li>
    <li><a href="#authentication">Authentication</a></li>
    <li><a href="#built-with">Built with</a></li>
    <li><a href="#bootstrapped-with">Bootstrapped with</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#technology-stack">Technology Stack</a></li>
    <li><a href="#collaboration">Collaboration</a></li>
    <li><a href="#developers">Developers</a></li>
    <li><a href="#licence">Licence</a></li>
  </ol>
</details>

## Getting Started

This is a Mumble project which we attend the CAS Frontend Engineering Advanced course at the OST, University of Applied
Study in Rapperswil SG.

## Folder Overview

- [**src**](src): Components, compositions, helpers, models and services
- [**src/components**](src/components): Components
- [**src/compositions**](src/compositions): Compositions
- [**src/helpers**](src/helpers): Helpers
- [**src/models**](src/models): Models
- [**src/services**](src/services): Services

- [**app/**](app/): Actions, Auth, Home, Create Post, User and Posts

## Run scripts

In the project directory, you can run:

`npm run dev` runs the development server [http://localhost:3000](http://localhost:3000).
<br/>
Open your browser to see the result.

`npm run lint` checks lint.

`npm run lint:fix` fixes lint.

`npm run prettier` runs prettier.

`npm run prettier:check` check code-format with prettier and print out warnings if available.

`npm run build` creates you a `build` directory.

`npm run start` starts the Next.js web application.

`npm run test:pw` runs Playwright tests.

`npm run test:pw:debug` debugs all tests run the Playwright test command followed by `--debug` flag.

`npm run test:pw:headed` will give you the ability to visually see, how Playwright interacts with the website.

### More about Next.js

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions
are welcome!

## Pre-requisites

We need the [npm](https://www.npmjs.com/) package manager to install this library.

```sh
npm install npm@latest -g
```

## Authentication

These two points are used for our Web App:

- [NextAuth.js](https://next-auth.js.org/)
- IdP (Identity Provider): [Zitadel](https://zitadel.com/)

## API (Swagger)

- [Mumble API](https://mumble-api-prod-4cxdci3drq-oa.a.run.app/index.html)

## Built with

[![Netlify][Netlify]][Netlify-url]
[![Nextjs][Nextjs]][Nextjs-url]
[![TypeScript][TypeScript]][TypeScript-url]
[![JavaScript][JavaScript]][JavaScript-url]
[![React][React.js]][React-url]
[![NPM][NPM]][NPM-url]
[![TailwindCSS][TailwindCSS]][TailwindCSS-url]
[![CSS3][CSS3]][CSS3-url]
[![HTML5][HTML5]][HTML5-url]
[![Jest][Jest]][Jest-url]
[![Playwright][Playwright]][Playwright-url]
[![Testing-Library][Testing-Library]][Testing-Library-url]
[![Google Chrome][Google Chrome]][Google Chrome-url]

🔒 next-auth [NextAuth.js](https://authjs.dev/). Authentication for the Next.js web application.

## Bootstrapped with

This is a [Next.js](https://nextjs.org/) project bootstrapped
with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Usage

### How to run locally

1. Cloning

```sh
git clone https://github.com/ost-cas-fee-adv-23-24/nextjs-app-pixelpioneers
```

2. Installing NPM

```bash
npm install
```

3. Adjust environment variables: `.env.local` and `.env.test`

- [.env.local](.env.local)
- [.env.test](.env.test)

4. Run the app in dev mode

```bash
npm run dev
```

Open the browser and run the web with [http://localhost:3000](http://localhost:3000).

For having more information related this configuration, it can be found
here: [Install Tailwind CSS with Next.js](https://tailwindcss.com/docs/guides/nextjs).

## Technology Stack

📎 [Link](https://www.npmjs.com/package/tailwindcss) Get started with Tailwind.
<br/>
`npm install -D tailwindcss postcss autoprefixer`
<br/>
`npx tailwindcss init`

📎 [Link](https://prettier.io/docs/en/install) Prettier
<br/>
`npm install --save-dev --save-exact prettier`

📎 [Link](https://www.npmjs.com/package/postcss) postcss
<br/>
PostCSS is a tool for transforming styles with JS plugins. These plugins can lint your CSS, support variables and
mixins, transpile future CSS syntax, inline images, and more. Installing Tailwind CSS as a PostCSS plugin is the most
seamless way to integrate it with build tools like webpack.
It also supports Autoprefixer. See the part of Tailwind above.

📎 [Link](https://www.npmjs.com/package/husky) husky / Git hooks
<br/>
You can use it to lint your commit messages, run tests, lint code and many more when you commit or push. See
here [husky - github](https://typicode.github.io/husky/).

📎 [Link](https://www.npmjs.com/package/lint-staged) lint-staged
<br/>
Run linters against staged git files and don't let 💩 slip into your code base! Linting makes more sense when run before
committing your code. By doing so you can ensure no errors go into the repository and enforce code style. Check
there [lint-staged - github](https://github.com/okonet/lint-staged).

📎 [Link](https://eslint.org/docs/latest/use/getting-started) ESLint
<br/>
ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code, see
also [ESLint - npm](https://www.npmjs.com/package/eslint).

📎 [Link](https://commitlint.js.org/#/) commitlint
<br/>
commitlint checks if your commit messages meet
the [conventional commit format](commitlint checks if your commit messages meet the conventional commit format). See
also [commitlint - github](https://github.com/conventional-changelog/commitlint).

📎 [Link](https://www.npmjs.com/package/clsx) clsx
<br/>
A tiny (234B) utility for constructing className strings conditionally.
Also serves as a faster & smaller drop-in replacement for the classnames module.

## Collaboration

Development Agreement

### Conventional Commits

> A specification for adding human and machine readable meaning to commit messages, see
> also [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

### Contribution

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any
contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also
simply open an issue with the tag name: **enhancement**.
Don't forget to give the project a star! ⭐️ Thanks! 🙏

1. Fork the Project
2. Create your Feature Branch `git checkout -b feature/amazingFeature`
3. Commit your Changes `git commit -m 'Add some amazingFeature'`
4. Push to the Branch `git push origin feature/amazingFeature`
5. Open a Pull Request

## Developers

👋 Nico Lutz - [write an e-mail to Nico](mailto:nico.lutz@ost.ch) 👨‍💻<br/>
👋 André Ceres - [write an e-mail to André](mailto:andre.ceres@ost.ch) 👨‍💻

<a href='https://github.com/Nigothazine' spellcheck='false'><img src="https://avatars.githubusercontent.com/u/29041124?v=4" width="50;" alt="Nico"/></a>
<a href='https://github.com/aceres' spellcheck='false'><img src="https://avatars.githubusercontent.com/u/1326993?v=4" width="50;" alt="André"/></a>

## Test Mocking

See the setup and usage of Mocks Server in `/docs/mocks-server-getting-started.md`.

## Licence

Distributed under the MIT License. See `LICENSE` for more information.

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[Netlify]: https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white
[Netlify-url]: https://reactjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Google Chrome]: https://img.shields.io/badge/Google%20Chrome-4285F4?style=for-the-badge&logo=GoogleChrome&logoColor=white
[Google Chrome-url]: https://www.google.com/chrome/
[Storybook]: https://img.shields.io/badge/-Storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white
[Storybook-url]: https://storybook.js.org/
[NPM]: https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white
[NPM-url]: https://www.npmjs.com/
[TailwindCSS]: https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white
[TailwindCSS-url]: https://tailwindcss.com/
[CSS3]: https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white
[CSS3-url]: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference
[HTML5]: https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white
[HTML5-url]: https://developer.mozilla.org/en-US/docs/Glossary/HTML5
[JavaScript]: https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E
[JavaScript-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript
[TypeScript]: https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[Nextjs]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Nextjs-url]: https://nextjs.org/
[Playwright]: https://img.shields.io/static/v1?style=for-the-badge&message=Playwright&color=2EAD33&logo=Playwright&logoColor=FFFFFF&label=
[Playwright-url]: https://playwright.dev/
[Testing-Library]: https://img.shields.io/badge/-TestingLibrary-%23E33332?style=for-the-badge&logo=testing-library&logoColor=white
[Testing-Library-url]: https://testing-library.com/
