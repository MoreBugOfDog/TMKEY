<div align="center">

  <h1>TMKEY</h1>

  Quickly Build Tampermonkey Scripts.

  

  English · [中文](README-zh.md)

</div>

# Install
```bash
npm install tmkey
```

# Project Description
This Npm package can be used to develop Tampermonkey scripts. A scaffolding environment is built.

# How to use it
1. In your **empty** project (without any files or folders other than .git), install this package
    ```bash
    npm install tmkey
    ```
2. Initialize the project
    ```bash
    tmkey init
    ```
    Then fill out the CLI questionnaire
3. Write the code
    Write the code in the ``src/index.js`` file. **Support the introduction of npm packages**.
4. Packaging
    ``bash
    tmkey build
    ``
    The packaged files are in the ``dist`` folder.

