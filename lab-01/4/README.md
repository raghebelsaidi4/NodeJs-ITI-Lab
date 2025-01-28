# What is NPM?
NPM (Node Package Manager) is a tool that helps developers manage libraries, frameworks, and dependencies for Node.js applications. It allows you to:

Install packages (libraries or modules) from the NPM registry.
Manage project dependencies via package.json.
Run scripts and automate workflows.

# Installing Packages Locally vs. Globally
**Locally**:
Installs the package only for the current project.
The package is placed in the `node_modules` folder in your project directory.
Command:
`npm install <package_name>`
**Globally**:
Installs the package system-wide and makes it available to all projects on your machine.
Useful for command-line tools like nodemon.
Command:
`npm install -g <package_name>`

# Why Use --save?
Before NPM 5, using `--save` was necessary to add the package to the dependencies section of `package.json`.
As of NPM 5 (released in 2017), npm install automatically saves dependencies to `package.json` without requiring `--save`.
If you're using a pre-NPM 5 version, include `--save` to ensure the package is listed in dependencies for future installs.