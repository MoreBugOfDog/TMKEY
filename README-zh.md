<div align="center">

  <h1>TMKEY</h1>

  快速构建Tampermonkey脚本

  

  中文 · [English](README.md)

</div>


# 项目介绍
这个Npm包可以用来开发Tampermonkey脚本。搭建了一个脚手架环境。
### 优点
1. 通过CLI问卷，快速生成Tampermonkey脚本元数据（MetaData）
2. 元数据无需手动编辑，打包时自动插入脚本中
3. 使用tsup，毫秒级打包
4. 支持引入Npm包并统一打包

# 安装
```bash
npm install tmkey
```


# 使用方法
1. 在您的**空**项目(没有任何除.git外的文件或文件夹)中，安装这个包
    ```bash
    npm install tmkey
    ```
2. 初始化项目
    ```bash
    tmkey init
    ```
    然后填写CLI问卷
3. 编写代码
    在`src/index.js`文件中编写代码。**支持引入npm包**。
4. 打包
    ```bash
    tmkey build
    ```
    打包后的文件在`dist`文件夹中。


