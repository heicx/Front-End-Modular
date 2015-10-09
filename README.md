## 从 RequireJS 到 SeaJS

### Part1
---
从 requirejs.org 首页可以得知，RequireJS 是一个 JavaScript 文件和模块加载器，特别为浏览器优化，同时也可运行在 Rhino 和 Node 环境中。

SeaJS 的定位是一个适用于浏览器端的 JavaScript 模块加载器。

不要小看这两句话，任何类库/框架的定位，或者说愿景/目标，最终会决定该类库/框架的方方面面。比如：

RequireJS 的定位中，除了是模块加载器，还是文件加载器，这决定了 RequireJS 需要实现类似 LABjs 等 script loader 的功能。LABjs 的核心功能是异步加载脚本并提供运行的依赖等待。

``` javascript
    $LAB
    .script("a.js")
    .script("b.js").wait()
    .script("c.js");
```

为了提供类似功能，RequireJS 开发了 order 插件:

``` javascript
    require(["order!one.js", "order!two.js", "order!three.js"], function () {
        //This callback is called after the three scripts finish loading.
    });
```

order 功能是 JavaScript 文件加载器必备的功能，RequireJS 有文件加载器的定位，因此才有了 order 插件的设计。

而对于 SeaJS 来说，定位为很纯粹的模块加载器，因此不需要考虑普通脚本的 order 加载，如果需要脚本加载功能，直接和 LABjs 一块用就好：

``` javascript
    define(function(require) {
    var $LAB = require('labjs/2.0.3/lab.js');
    $LAB
      .script('a.js')
      .script('b.js').wait()
      .scrpt('c.js');
    );
```

SeaJS 推荐用组合的思路解决问题：LABjs + SeaJS = JavaScript 文件和模块加载器。

### Part2
---

- RequireJS 提供了三个文件：

    require.js — 这是核心文件，提供 JavaScript 文件和模块加载功能。

    require-jquery.js — 打包了 jquery 最新版本的 require.js

     r.js — 优化工具，以及让 RequireJS 的模块可运行于 Node 和 Rhino 环境。

- SeaJS 提供的内容，目前也有三部分：

     sea.js — 模块加载器。

     modules — 可运行在 seajs 环境中的推荐模块，在这里下载 modules.seajs.com

    spm 等优化和支持工具。
    

### Part3
---
    
- 插件

RequireJS 提供了一系列插件：text, order, domReady, cs, i18n.

SeaJS 默认只支持 js 和 css 模块，通过 text、coffee 和 less 插件来扩展支持的模块类型。

SeaJS 还提供了 map 插件，方便开发调试：在线本地调试大观。对于 order 功能，推荐组合使用 LABjs 来实现。需要 domReady 时，则使用 jQuery 库。至于 i18n, 感觉放在模块加载框架里不太合适，可以做成独立的国际化模块。

插件实现机制上，RequireJS 采用的是钩子模式：在 require.js 源码中，主动判断并调用插件代码。

``` javascript
    // require.js
    function callPlugin(pluginName, depManager) {
    //...
    }
```

SeaJS 的实现方式是，和原生 JavaScript 类似，暴露 prototype, 插件开发者通过给 prototype 添加新方法或覆盖原有方法来实现插件功能：

``` javascript
    // plugin-xx.js
    define(funtion(require, exports, module) {
        var Require = require.constructor;
        var Module = module.constructor;
 
        // 覆盖原有方法
        Require.prototype.resolve = ...
 
        // 添加新方法
        Module.prototype.extend = ...
    });
```

Sea.js官方提供了7个插件，对Sea.js的功能进行了补充。

- seajs-text：用来加载HTML或者模板文件。

- seajs-style：提供了importStyle，动态地向页面中插入css。

- seajs-combo：该插件提供了依赖combo的功能，能把多个依赖的模块uri combo，减少HTTP请求。

- seajs-flush：该插件是对seajs-combo的补充，或者是大杀器，可以先hold住前面的模块请求，最后将请求的模块combo成一个url，一次加载hold住的模块。

- seajs-debug：Fiddler用过么？这个插件基本就是提供了这样一种功能，可以通过修改config，将线上文件proxy到本地服务器，便于线上开发调试和排错。

- seajs-log：提供一个seajs.log API，私觉得比较鸡肋。

- seajs-health：目标功能是，分析当前网页的模块健康情况。

由此可见，Sea.js的插件主要是解决一些附加问题，或者是给Sea.js添加一些额外的功能。私觉得有些功能并不合适让Sea.js来处理。

### Part4
---

- 模块书写格式

作为模块加载器，需要明确模块应该怎样写，这就是模块书写格式（Module Authoring Format）。

对于文件加载器来说，约定非常少，比如 LABjs 只约定文件里不能有 document.write 等语句。

RequireJS 遵守的是 [AMD](http://wiki.commonjs.org/wiki/Modules/AsynchronousDefinition) 规范，SeaJS 遵守的是 [Simple Wrappings](http://www.seajs.org) 规范。

从表面上看，AMD 规范和 Wrappings 规范最大的不同是 factory 函数的参数不一样：

``` javascript
    // 两者的基本格式都是：
    define(id?, denpendencies?, factory);

    // 在 AMD 中，factory 的参数由 dependencies 指定：
    define(['a'], function(a) {
    });

    // 在 Wrappings 中，factory 的参数始终是 require, exports, module 三个：
    define(function(require, exports, module) {
         var a = require('a');
    });
```

### Part5
---

- 前端项目打包发布脚手架的使用

The JavaScript Task Runner [grunt.js](http://www.gruntjs.com)，上千个插件供于选择，基于Node环境，可以通过NPM安装。可以单独安装，也可以通过对package.json的配置来安装。
在针对sea.js前端项目压缩合并打包时，需要将alias依赖关系注入到package.json文件中，在执行grunt xxx命令式时会自动解析补全 define 的 CommonJS规范语法。

grunt.js是健壮，扩展性强，支持全面的一个前端构建脚手架，具有类似实现的有FIS及Gulp.js等等。
FIS的使用，目前有针对require.js版本项目实现打包方案的mod.js.
