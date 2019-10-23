# FamilyPanel - Back End

This is the back end for the FamilyPanel application.

## Getting Started

First, install the required packages.

```
npm install
```

Then, you can choose to provide your own environment variables.  A .env.example file is included as a template.  These environment variables have backups included in config.js incase those are not provided.

Since this application uses MongoDB for its database, if the MONGODB_URL environment variable is not populated, the application will default to a locally hosted instance.  If this is the case, make sure you have MongoDB installed and running.  [Here is a link if you need help with that.](https://docs.mongodb.com/manual/installation/)

With that done, you can start the back end application.

```
npm start
```

## License
[MIT](https://choosealicense.com/licenses/mit/)