###从 RequireJS 到 SeaJS

从定位谈起
首先，从 requirejs.org 首页可以得知，RequireJS 的定位是：

RequireJS 是一个 JavaScript 文件和模块加载器，特别为浏览器优化，同时也可运行在 Rhino 和 Node 环境中。

SeaJS 的定位是：

SeaJS 是一个适用于浏览器端的 JavaScript 模块加载器。

不要小看这两句话，任何类库/框架的定位，或者说愿景/目标，最终会决定该类库/框架的方方面面。比如：

RequireJS 的定位中，除了是模块加载器，还是文件加载器，这决定了 RequireJS 需要实现类似 LABjs 等 script loader 的功能。LABjs 的核心功能是异步加载脚本并提供运行的依赖等待。
