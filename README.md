<a name="readme-top"></a>

## Next.js App - PixelPioneers 🐥

![](https://img.shields.io/github/actions/workflow/status/ost-cas-fee-adv-23-24/nextjs-app-pixelpioneers/1-test-jest.yml?label=test%20jest)
![](https://img.shields.io/github/actions/workflow/status/ost-cas-fee-adv-23-24/nextjs-app-pixelpioneers/2-test-playwright.yml?label=test%20e2e)
![](https://img.shields.io/github/license/ost-cas-fee-adv-23-24/nextjs-app-pixelpioneers)
![](https://img.shields.io/github/contributors/ost-cas-fee-adv-23-24/nextjs-app-pixelpioneers)

<section align="center">
  <a href="https://ost-cas-fee-adv-23-24.github.io/nextjs-app-pixelpioneers">
    <img src="public/pixelpioneers.png" alt="PixelPioneers" width="100" height="100">
  </a>
  
  [Next.js App](https://ost-cas-fee-adv-23-24.github.io/nextjs-app-pixelpioneers) 🚀
</section>

> Version: 0.0.0-development

> Distributed under the MIT License. See `LICENSE` for more information.

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#contact">Contact</a></li>
    <li>
      <a href="#available-scripts">Available Scripts</a>
      <a href="#getting-started">Getting started</a>
      <ul>
        <li><a href="#more-about-next.js">More about Next.js</a></li>
        <li><a href="#pre-requisites">Pre-requisites</a></li>
        <li><a href="#built-with">Built with</a></li>
        <li><a href="#bootstrapped-with">Bootstrapped with</a></li>
        <li><a href="#usage">Usage</a></li>
        <li><a href="#technology-stack">Technology Stack</a></li>
        <li><a href="#available-scripts">Available scripts</a></li>
      </ul>
    </li>
    <li><a href="#collaboration">Collaboration</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
  </ol>
</details>

## Contact

Maintaners:

👋 Nico Lutz - [write an e-mail to Nico](mailto:nico.lutz@ost.ch) 👨‍💻
<br/>
👋 André Ceres - [write an e-mail to André](mailto:andre.ceres@ost.ch) 👨‍💻

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Available scripts

In the project directory, you can run:

`npm run dev` runs the development server [http://localhost:3000](http://localhost:3000).
<br/>
Open your browser to see the result.

> The page will reload if you make edits. You will also see any lint errors in the console.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and
load Inter, a custom Google Font.

`npm run lint` checks lint.

`npm run lint:fix` fixes lint.

`npm run prettier` runs prettier.

`npm run prettier:check` check code-format with prettier and print out warnings if available.

`npm run build` ...

`npm run start` ...

`npm run test` launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more
information.

`npm run test:jest` ...

`npm run test:pw` ...

`npm run test:pw:debug` ...

`npm run test:pw:headed` ...

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### More about Next.js

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions
are welcome!

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting Started

Next.js App PixelPioneers is a Next.js App based on with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). This is the second part of the CAS Frontend Engineering Advanced course.

### Pre-requisites

We need the [npm](https://www.npmjs.com/) package manager to install this library and setup this project.

```sh
npm install npm@latest -g
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built with

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

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Bootstrapped with

This is a [Next.js](https://nextjs.org/) project bootstrapped
with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and
load Inter, a custom Google Font.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Usage

...

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Technology Stack

#### husky / Git hooks

You can use it to lint your commit messages, run tests, lint code and many more when you commit or push. See here [husky - github](https://typicode.github.io/husky/) or [husky npm](https://www.npmjs.com/package/husky).

#### prettier

`npm install --save-dev --save-exact prettier`
<br/>
[Link](https://prettier.io/docs/en/install)

#### lint-staged

Run linters against staged git files and don't let 💩 slip into your code base! Linting makes more sense when run before committing your code. By doing so you can ensure no errors go into the repository and enforce code style. Check there [lint-staged - github](https://github.com/okonet/lint-staged) or [lint-staged - npm](https://www.npmjs.com/package/lint-staged).

#### ESLint

ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code, see also [ESLint - npm](https://www.npmjs.com/package/eslint) or [Getting Started with ESLint](https://eslint.org/docs/latest/use/getting-started).

#### commitlint

commitlint checks if your commit messages meet the [conventional commit format](commitlint checks if your commit messages meet the conventional commit format). Or in other words: Get high commit message quality and short feedback cycles by linting commit messages right when they are authored. See also [commitlint - github](https://github.com/conventional-changelog/commitlint) or [commitlint](https://commitlint.js.org/#/).

...

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Collaboration

Development Agreement

#### Conventional Commits

> A specification for adding human and machine readable meaning to commit messages, see also [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

#### Contribution

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag name: **enhancement**.
Don't forget to give the project a star! ⭐️ Thanks! 🙏

1. Fork the Project
2. Create your Feature Branch `git checkout -b feature/amazingFeature`
3. Commit your Changes `git commit -m 'Add some amazingFeature'`
4. Push to the Branch `git push origin feature/amazingFeature`
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Roadmap

- [ ] Check all needed scripts
- [ ] Add LightHouse in YAML config
- [ ] Try with ACT
- [ ] Visualize process flow in picture
- [ ] Check TODOs

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

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
[Jest]: https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white
[Jest-url]: https://jestjs.io/
[Playwright]: https://img.shields.io/static/v1?style=for-the-badge&message=Playwright&color=2EAD33&logo=Playwright&logoColor=FFFFFF&label=
[Playwright-url]: https://playwright.dev/
[Testing-Library]: https://img.shields.io/badge/-TestingLibrary-%23E33332?style=for-the-badge&logo=testing-library&logoColor=white
[Testing-Library-url]: https://testing-library.com/
