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

## 项目组织规范

## 编码规范
### JavaScript
### HTML
### CSS
### 代码格式化
### 框架风格指南

## 文档规范

### 建立文档中心
### 文档格式/模板

## 前后端协作规范

### 协作流程
### 接口规范

## UI 设计规范

## 参考

- [if 我是前端团队 Leader，怎么制定前端协作规范？](https://juejin.cn/post/6844903897610321934)
- [前端代码规范 - 凹凸实验室](https://guide.aotu.io/index.html)