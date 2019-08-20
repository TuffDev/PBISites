## Flexware Innovation PBISites Frontend
This repository contains frontend code for the PBISites project.  

When built, this site can be hosted on any hosting provider.  The backend was created in
Azure.  Here is a diagram of how it works:

![Image of Azure Architecture](https://github.com/TuffDev/PBISites/tree/master/demo_images/pbiarch.svg)

Run the build script to recompile the app and incorporate any updates.  The 'build' folder will contain the necessary files to get the site up and running.

Contact Gage Toschlog for any backend/API questions.  

### Description of project

This project was initiated when a need arose to allow PowerBI admins to grant specific people access to specific PowerBI reports.  There is currently (as of August 2019) no way to share reports/dashboards with users outside of a PowerBI tenant.

An earlier iteration of the project allowed an admin to share a specific report, hosted in their PowerBI tenant, with a user email.  It gave the person a password and directed them to the report assigned to them.

This iteration allows administrators to manage their users, sites, and tenant on separate pages, and gives them more control over who has access to what.  Future iterations could include more control over the embedded report (extracting elements, mobile views, etc.), and more 'whitelabling' control for admins.


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

