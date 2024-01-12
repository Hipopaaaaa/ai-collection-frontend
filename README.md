# vue3-talker

## node版本

使用nvm 用以下的版本：

>    18.16.1
>
>   * 16.17.0



## 自动注册组件

将组件放进 /src/components 中时，则会自动注册组件



## 自动注册路由

将页面文件放入 `/src/views` 时，会自动注册组件

以**文件夹名**以及**文件名构成**路由 例如 `/home/a.vue`  即路径 `/home/a`

如果想注册 /home 可以构建文件：`/home/index.vue`  会**自动识别index.vue文件**

如果需要路由传参，则需要将文件名设置为**中括号加参数**的形式，如想要注册 `/chat/:id` ，需要构建 `/chat/[id].vue`

在 `views` 中可以设置 `components` 作为页面的组件，会自动排除出于`components` 中的 组件，不会将其注册为路由。

如果你不想使用 `views` 作为页面 文件夹，可以在配置中更改你喜欢的命名，同理 页面的组件文件夹 `components` 也可以自定义。

在目录的.env 下配置全局变量即可

```env
# 配置自动注册需要的路径

VITE_VIEWS_URL = "views" # 配置页面文件夹名
VITE_VIEWS_COMPONENTS_URL = "components" # 配置页面的组件文件夹名
```













This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
