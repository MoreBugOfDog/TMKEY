<div align="center">

<h1>TMKEY</h1>

Quickly build Tampermonkey scripts



English · [中文](https://github.com/MoreBugOfDog/TMKEY/blob/main/README-zh.md)

</div>


# Project Introduction
This Npm package can be used to develop Tampermonkey scripts. Set up a scaffolding environment.
### Advantages
1. Quickly generate Tampermonkey script MetaData using CLI questionnaires
2. Metadata is automatically inserted into the script when packaged without manual editing
3. Use tsup, millisecond level packaging
4. Npm packages can be imported and packaged in a unified manner

# Install
```bash
npm install tmkey
` ` `


# How to use
1. Install the package in your empty project (without any files or folders other than.git)
```bash
npm install tmkey
` ` `
2. Initialize the project
```bash
tmkey init
` ` `
Then fill in the CLI questionnaire
3. Write code
Write the code in the 'src/index.js' file. ** Supports the introduction of npm packages **.
Step 4 Pack
```bash
tmkey build
` ` `
The packed files are in the 'dist' folder.