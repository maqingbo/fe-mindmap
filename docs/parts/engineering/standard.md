[[toc]]

## 为什么需要开发规范

- 提高开发效率、团队协作效率，降低沟通成本
- 实现高度统一的代码风格，方便 review, 另外一方面可以提高项目的可维护性
- 规范是实现自动化的基础
- 降低新成员融入团队的成本，同时也一定程度避免挖坑

## 工作流规范

### Git 分支模型

- master 分支
  - 表示一个稳定的发布版本。
  - 场景：项目在 dev 分支测试稳定后，会合并到 master 分支，并使用 tag 标记应用版本。
  - tag 规范：`v{APP_version}`, 例如 `v0.1.0`。
  - 人员：由项目负责人进行审核合并，普通开发者没有权限。
- dev 分支
  - 开发者主要工作分支，最新的特性或 bug 修复都会提交到这个分支。
  - tag 规范：在 dev 分支中也可能会经历发布过程，例如 bug 修复版本。这里 tag 规范与 master 相同。
- feature 分支
  - 涉及多人协作或者大功能的开发，应该从 dev 分支 checkout 出独立的 feature 分支，避免干扰 dev 分支。
  - 命名规范
    - 以功能命名：`feature/name: name`。（例如：feature/map:map_compare）
    - 以版本号命名：`feature/<project_name>_version`，当无法使用一个功能名称来描述时，可以使用项目版本号。（例如：`feature/suzhou_version:0.2.1`）
  - 合并时机：当 feature 分支功能开发完成时，合并到 dev 分支。后续 bug 修复或功能优化直接在 dev 分支开发或拉取新分支。
  - 合并方式：不要使用 fast-forward 方式，这样可以在分支图上查看分支历史。
- fix 分支
  - 当版本发布后，某个修复需要同时提交到 dev 和 master 时，可新建 fix 分支。
  - 命名规则：参考 feature 分支命名规则。

### Git commit message

- 一个好的 commit message
  - 可以自动化的生成 changelog
  - 可以完整地记录项目开发记录
  - 有助于后来者/协作者快速学习和回顾代码
- 社区上比较流行的提交信息规范是 [Angular 提交信息规范](https://zj-git-guide.readthedocs.io/zh_CN/latest/message/Angular%E6%8F%90%E4%BA%A4%E4%BF%A1%E6%81%AF%E8%A7%84%E8%8C%83/)

提交格式如下：

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

- header 部分
  - type: 下列之一
    - feat：增加新的特征
    - fix：修复 bug
    - style：不影响代码含义的修改，比如空格、格式化、缺失的分号等
    - build：对构建系统或者外部依赖项进行了修改
    - ci：对 CI 配置文件或脚本进行了修改
    - docs：对文档进行了修改
    - pref：提高性能的代码更改
    - refactor：既不是修复 bug 也不是添加特征的代码重构
    - test：增加确实的测试或者矫正已存在的测试
  - scope：用于说明 commit 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同。可忽略。
  - subject：本次 commit 的简短描述，尽量不超过 50 个字符。
- body 部分
  - Body 部分是对本次 commit 的详细描述，可以分成多行。
  - 使用第一人称描述，说明代码变动的动机，以及与改动前代码的对比。
- footer 部分
  - 解决冲突/revert 时使用。

不强制要求使用以上模板，但强烈建议使用，最起码写上 header 部分，示例：

```
feat: 新增地图对比功能。
fix: 修复了地图对比时不能同步的问题。
style: 第三方组件库自定义样式抽离为单独的全局文件。
```

### 版本号

项目的版本号应该根据某些规则进行迭代，推荐使用 [语义化版本规范](https://semver.org/lang/zh-CN/)。

- 主版本号：当你做了不兼容的 API 修改，
- 次版本号：当你做了向下兼容的功能性新增，
- 修订号：当你做了向下兼容的问题修正。

## 技术栈

- Node 版本：建议 16.16.0，同时建议使用 nvm 管理 node 版本（旧项目使用的是 14.20.0）.
- 包管理工具：建议 yarn.
- Lint 工具：ESLint.
- 前端框架：Vue
  - Vue 2.x
    - UI 框架：若依
    - 组件库：[Element-ui 2.15.10](https://element.eleme.io/#/zh-CN/component/installation)
    - 路由：[vue-router 3.x](https://v3.router.vuejs.org/zh/)
    - 状态管理：[vuex 3.x](https://v3.vuex.vuejs.org/zh/)
    - 构建工具：[Vue Cli](https://cli.vuejs.org/zh/)
  - Vue 3.x
    - UI 框架：若依
    - 组件库：[Element-plus](https://element.eleme.io/#/zh-CN/component/installation)
    - 路由：[vue-router 4.x](https://router.vuejs.org/zh/)
    - 状态管理：[pinia](https://pinia.vuejs.org/zh/index.html)
    - 构建工具：[Vite](https://cn.vitejs.dev/guide/)

## 项目组织规范

## 编码规范

统一的编码规范对团队项目的长远维护不无裨益。一致性的代码规范可以增强团队开发协作效率、提高代码质量、减少遗留系统维护的负担。

推荐选择社区沉淀下来的规范和 Lint 工具。

### JavaScript

- 规范：[JavaScript Standard Style](https://standardjs.com/readme-zhcn.html#why-should-i-use-javascript-standard-style)。
- Lint 工具：[ESLint](https://cn.eslint.org/)。

以上两项可在项目初始化时按照以下步骤配置：

```bash
npx eslint --init
```

init 时会显示以下信息，按步骤操作即可。init 完成后根目录下自动生成 eslintrc.js 文件。

```
You can also run this command directly using 'npm init @eslint/config'.
Need to install the following packages:
  @eslint/create-config
Ok to proceed? (y) y
√ How would you like to use ESLint? · style
√ What type of modules does your project use? · esm
√ Which framework does your project use? · vue
√ Does your project use TypeScript? · No / Yes
√ Where does your code run? · browser, node
√ How would you like to define a style for your project? · guide
√ Which style guide do you want to follow? · standard
√ What format do you want your config file to be in? · JavaScript
Checking peerDependencies of eslint-config-standard@latest
The config that you've selected requires the following dependencies:

eslint-plugin-vue@latest eslint-config-standard@latest eslint@^8.0.1 eslint-plugin-import@^2.25.2 eslint-plugin-n@^15.0.0 eslint-plugin-promise@^6.0.0
√ Would you like to install them now? · No / Yes
√ Which package manager do you want to use? · yarn
```

下一步，根目录下手动创建 .eslintignore 文件，添加如下代码：

```
/node_modules
/bin
/dist
```

下一步，vscode 中安装 eslint 插件，插件作者 "Microsoft"。

安装成功后，去 vscode 配置信息中添加一行：

```json
 "eslint.validate": ["javascript", "javascriptreact", "vue"]
```

此时如果允许命令行方式执行 eslint lint 是可以检查代码的，但是 vscode 中还不自动提示错误，因为 vue 中的 js 是包裹在 `<script>` 标签中的，需要安装 eslint-plugin-html 插件。

```
yarn add eslint-plugin-html -D
```

配置完毕。

### HTML

### CSS

- vue 组件内 css 必须添加 scoped 属性！
- 涉及到第三方组件库的样式修改，使用统一的全局样式文件，或 scoped 内使用 deep 修改，不可以在组件内使用全局 style 修改！
- 第三方组件库深色模式，使用 Element-ui 的主题定制。

### 代码格式化

- [Prettier](https://prettier.io/)：HTML、CSS、JS、Markdown 全部搞定，VScode 安装插件即可。

### 框架风格指南

- Vue 最佳实践：[style guide](https://vue.docschina.org/v2/style-guide/)，强烈建议遵循所有！
- 使用路由，不要全部都是 v-if 来显隐组件！
- 使用状态管理，不要全部使用自定义事件来进行传参，真的很混乱！

## 文档规范

没有文档的几大弊端，主要是接口文档：

- 接口文档
  - 接口分类不清晰，哪些接口是干啥的全靠猜；
  - 有没有现成的接口不知道，也不能挨个试，只能新增，造成代码冗余；
  - 前后端协同不顺畅，互相甩锅，不利于项目推进和团队氛围；
- 项目文档
  - 对项目的情况、配置、代码的整体架构和逻辑不清晰
- 需求文档
  - 没有明确的需求的话，就不能够确定代码该怎么写

### 建立文档中心

- 方式一：成套商业方案——飞书云文档、石墨文档、腾讯文档、WPS。
  - 优势：模板多，可以满足多样化的文档处理需求，且非开发人员使用起来也方便；
  - 劣势：毕竟第三方服务，数据是否可完整导出？
- 方式二：Git 仓库 + Markdown 文件
  - 所有项目的所有文档都放置在一个 git 版本库下，按文件夹分类整理。
  - 优势：历史记录跟踪、版本化、问题讨论、权限管理等
  - 劣势：纯文本，不能满足多样化的文档处理需求，比如思维导图、图表、表格、PPT；对非开发人员不太友好。

### 文档格式/模板

如何写好文档，很难通过标准或规范来进行约束，因为主观性比较强。大部分情况下，我们可以为不同类型的文档提供一个模板，通过模板来说明一个文档需要包含哪些内容，对文档的编写者进行引导。

## 前后端协作规范

### 协作流程
### 接口规范

## UI 设计规范

## 参考

- [if 我是前端团队 Leader，怎么制定前端协作规范？](https://juejin.cn/post/6844903897610321934)
- [前端代码规范 - 凹凸实验室](https://guide.aotu.io/index.html)