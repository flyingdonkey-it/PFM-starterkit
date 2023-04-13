# Personal Finance App v3.0 : Supporting Open Banking
### Supporting Open Banking 

This starter kit takes a user through the personal finance app using the Basiq API. This project has been to built with three main technologies:

1. [Basiq API](https://api.basiq.io)
   Basiq is a Consumer Data Right accredited API platform that provides the building blocks of financial services.
2. [Next.js](https://github.com/vercel/next.js/)
   A framework for React, Next.js gives you the best developer experience with all the features you need for production: hybrid static & server rendering, TypeScript support, smart bundling, route pre-fetching, and more. No config needed.
3. [Tailwind](https://github.com/tailwindlabs/tailwindcss)
   A utility-first CSS framework that can be composed to build any design, directly in your markup.

## Getting started

#### This Starter Kit specifically supports v3.0 of the API and the Open Banking flow

:warning: Please ensure you have enabled Basiq v3.0 for your API key before using this Starter Kit. If you do not wish to use v3.0 then please check out the v2.0 Starter Kit [here](https://github.com/basiqio/account-verification). 

### 1. Use the template to create your own repository

To get started, you will need click the "Use this template" button on the main page of the repo - this will generate a new repository.

![template repository screenshot](https://user-images.githubusercontent.com/92170066/205834638-0818b86f-4ddb-4c34-8e0e-fefef5ba18fa.png)

Then you will need to clone the repository you have just generated. 

```sh
git clone git@github.com:<your_username>/personal-finance-app-API-v3.0.git
cd personal-finance-app-API-v3.0
```

### 2. API key setup

If you haven't already, [Sign-up](https://dashboard.basiq.io/login) to the Basiq API service and grab your API key for your application (via the [Developer Dashboard](https://dashboard.basiq.io/)).

:warning: Don't forget to configure your dashboard appropriately - especially your redirect URL. Read more about that [here](https://api.basiq.io/docs/dash-configuration). 

Once you have a Basiq API key, move the sample `.env.sample` file to `.env.local` and paste in your Basiq API key next to `BASIQ_API_KEY=`

```sh
mv .env.sample .env.local
```

```diff
- BASIQ_API_KEY=
+ BASIQ_API_KEY=abc123
```

### 3. Install dependencies

Install dependencies with [`yarn`](https://github.com/yarnpkg/yarn). If you don't have this installed, please read their [installation guide](https://yarnpkg.com/en/docs/install) for detailed instructions.

```sh
yarn
```

### 4. Start the development server

```sh
yarn dev
```

🎉 You should now see the website running at `http://localhost:3000`

## Testing

### Linting

This project uses `eslint` to enforce code quality and code formatting. For more information about using NextJS and ESLint, please refer to [this guide](https://nextjs.org/docs/basic-features/eslint).

### End-to-End tests

[Cypress](https://github.com/cypress-io/cypress) is a test runner used for End-to-End (E2E) and Integration Testing. This project includes a simple E2E test which is used to test the account verification form flow.

To run the E2E tests locally, you will first need have the website up and running. This can be done by either running `yarn dev` or `yarn build && yarn start`. The latter can be used when you want to run the tests againts the production build of the website. Once you have the website running in another terminal window run `yarn cypress`.

## Theming

This started kit uses [TailwindCSS](https://tailwindcss.com/docs/configuration) for all styling. Easily customise the theme in `tailwind.config.js` (colours, font etc) and `styles.css` (font import, CSS variables used for icon gradients etc).

Follow these steps to make your Account Verification experience your own.

### 1. Colours

This starter kit has a custom naming convention, aiming to communicate semantic intent. All the colours the app uses are defined and can be customised in `tailwind.config.js`.

### 2. Font

This starter kit uses Inter font family.

1. Change the font @import in `styles.css`
2. Change the fontFamily in `tailwind.config.js` (`'Inter'`) to match the font name

### 3. Product logos

You can simply replace these SVG files, using the same file name.

- `product-full-logo.svg` - used in `index.js` only
- `product-square-logo.svg` - used for Account Verification Form

NOTE: Out-of-the-box, the Account Verification Form layout works best with a perfectly square logo, since it uses the square institution logo on some steps.

### 4. Product copywriting

Search for `PRODUCT-COPY` in the codebase to find all the places that needs product-specific copywriting.

Make sure to read through all copywriting in the files to make sure it's accurate with the product you are building.

## Icons

All icons used in this starter kit are exported from [heroicons.com](https://heroicons.com/).

You can easily see which icon is which if you search the codebase for `Icon: `.
