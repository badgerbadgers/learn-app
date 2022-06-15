# Learn APP

This is a platform where students could create their own miniature portfolio, checkout their current course details and get access to all the CTD links and resources.
Its also a progressive web application which mean students can download the app on their system and be able to access it offline with the cached data.

## Getting Started
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Installation
* Clone repo => git clone https://github.com/CodeTheDream/learnApp.git
* cd learnApp
* Install dependencies => npm install (We are not using yarn)
* Now run the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

#### Environment Variables
By default all environment variables loaded through .env.local are only available in the Node.js environment, meaning they won't be exposed to the browser.
In order to expose a variable to the browser you have to prefix the variable with NEXT_PUBLIC_.
-We use a handful of environment variables to run the server. They are stored in the .env.local file. Please ask in slack for updated env file.

### Project Folder Structure
All the folders and pages following naming conventions:

#### Components:
All the folders in the Components directory are in camelCasing however files are in PascalCase
-If the component is specific for the page then create a component folder inside the page folder and store the files (PascalCase) in it.
-If the component would be used across multiple pages then store the files under the main component folder. `eg: foldername/FileName.js`

#### Lib:
This is a utility folder to store common functions or database file. Files are named in camelCase. `eg: fileName.js`

#### Pages:
To create pages first create a folder in all lowercase under the pages directory. Then create an index.js for that particular page. `eg: pages/page/index.js.`
Incase the page has compoanents it will look like this: `eg: pages/pagename/components/FileName.js`

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.
The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

#### Public: 
Save all the images inside the public directory.

### Requirements:

Please include the correct layout `Private Layout or Public Layout` on each page/index.js. 
  -Import the layout component inside the page
  - Incase of privateLayout :  `function.getLayout = privateLayout;`

### CSS
We are using MUI for CSS. If one needs to use stylessheet please add your css module to the styles directory (PascalCase)
  
## GitHub Branching strategy 

- `main` branch will be production.
- `dev` will be our development branch and will be PR'd to main when features are done.
- `{feature-branches-dev}` will be the primary branches we do work in and are named after the features we work on. ie - `signin-dev` branch if you are working on signin or `editPortfolio-dev` if you are working on edit functionality.
- When creating new PR ensure we are selecting our base as `dev` branch and not `main`.
- Ensure they are no conflicts with dev. Follow this process: pull the dev branch > create a feature branch for the issue > commit the branch > pull again the dev branch > checkout feature branch > git merge dev > push the branch > create PR 
- There is a PR template that we need to follow:
   - Description,
   - Share links that helped you,
   - Related Issue to link with the PR use these 
   [`keywords`](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/using-keywords-in-issues-and-pull-requests). We normally use closes #issueNumber,
   - Select the Type of Changes,
   - Add images for Before and After,
   - Provide the appropriate Test Steps

## Production
To build the application for production usage.

    ```bash
    npm run build
```
Starts Next.js production server. Note: you need to run npm build in order to be able to run npm start
```bash
    npm run start
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
