# node-server-base

This is a base implementation of a nodejs express server.

It features an abstract CRUD database using lowdb, and an abstract set of REST routes which connect to the CRUD database. You can extend both of these to create routes and databases for any type of json data. See the examples test-db.ts and test-routes.ts if you're curious about how to do that.

It has configuration set up for HTTPS (with HTTP commented out), and you can generate your own self-signed certificates by using the scripts in my cert-generator project at https://github.com/bjanderson/cert-generator

I was going to include this boilerplate as part of my cli-tool (https://github.com/bjanderson/cli-tool) project, but it is just easier to understand and maintain as a standalone project. I do recommend using the cli-tool to generate the models for use in this project, though.

This project comes complete with Jest for unit testing, eslint, and prettier.

I built it using VS Code, and I recommend installing the following extensions to make the existing configurations work as intended.

- EditorConfig for VS Code (https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
- ESLint (https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- Prettier - Code formatter (https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
