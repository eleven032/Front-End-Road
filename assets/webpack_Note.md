# webpack性能优化
* 开发环境性能优化
* 生产环境性能优化


## 开发环境性能优化
* 优化打包构建速度
  
  * HRM : 当只有一个模块发生变化,则只构建单独的那个模块, 其余模块使用之前的缓存 
  > js文件需要单独编写配置  
  > css文件使用style-loader就可以  
  > html单独一个, 不需要配置

* 优化代码调试
  * source-map: 用来找到源代码的出错位置,具体配置如下:
  
  | devtool	| 构建速度 |	重新构建速度 | 生产环境	| 品质(quality) |
  | ----- | ----- | ----- | ----- | ----- | 
  | (none) |	+++ |	+++ |	yes |	打包后的代码 |
  | eval	|+++	| +++	| no	| 生成后的代码|
  | cheap-eval-source-map	|+	| ++ |	no |	转换过的代码（仅限行）|
  | cheap-module-eval-source-map|	o	|++|	no	|原始源代码（仅限行）|
  | eval-source-map	|–|	+|	no|	原始源代码|
  | cheap-source-map|	+|	o	|no	| 转换过的代码（仅限行）|
  | cheap-module-source-map|	o|	-	|no|	原始源代码（仅限行）|
  | inline-cheap-source-map	|+	|o	|no|	转换过的代码（仅限行）|
  | inline-cheap-module-source-map|	o	|-	|no|	原始源代码（仅限行）|
  | source-map|	– |	–	|yes	|原始源代码|
  | inline-source-map|	–|	–|	no|	原始源代码|
  | hidden-source-map|	–	|–|	yes|	原始源代码|
  | nosources-source-map|	–	|–	|yes|	无源代码内容|  


  >
      +++ 非常快速, ++ 快速, + 比较快, o 中等, - 比较慢, -- 慢


 > 品质(quality)说明
 
    打包后的代码 - 将所有生成的代码视为一大块代码。你看不到相互分离的模块。

    生成后的代码 - 每个模块相互分离，并用模块名称进行注释。可以看到 webpack 生成的代码。示例：你会看到类似 var module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(42); module__WEBPACK_IMPORTED_MODULE_1__.a();，而不是 import {test} from "module"; test();。

    转换过的代码 - 每个模块相互分离，并用模块名称进行注释。可以看到 webpack 转换前、loader 转译后的代码。示例：你会看到类似 import {test} from "module"; var A = function(_test) { ... }(test);，而不是 import {test} from "module"; class A extends test {}。

    原始源代码 - 每个模块相互分离，并用模块名称进行注释。你会看到转译之前的代码，正如编写它时。这取决于 loader 支持。

    无源代码内容 - source map 中不包含源代码内容。浏览器通常会尝试从 web 服务器或文件系统加载源代码。你必须确保正确设置 output.devtoolModuleFilenameTemplate，以匹配源代码的 url。

    （仅限行） - source map 被简化为每行一个映射。这通常意味着每个语句只有一个映射（假设你使用这种方式）。这会妨碍你在语句级别上调试执行，也会妨碍你在每行的一些列上设置断点。与压缩后的代码组合后，映射关系是不可能实现的，因为压缩工具通常只会输出一行。

> 不同环境下的选择
    
  * 开发环境: 速度快,调试更友好
    >
        eval - 每个模块都使用 eval() 执行，并且都有 //@ sourceURL。此选项会非常快地构建。主要缺点是，由于会映射到转换后的代码，而不是映射到原始代码（没有从 loader 中获取 source map），所以不能正确的显示行数。

        eval-source-map: 内部写入, 构建文件一一对应(eval), 错误代码准确信息, 源代码错误位置

        cheap-eval-source-map - 类似 eval-source-map，每个模块使用 eval() 执行。这是 “cheap(低开销)” 的 source map，因为它没有生成列映射(column mapping)，只是映射行数。它会忽略源自 loader 的 source map，并且仅显示转译后的代码，就像 eval devtool。

        cheap-module-eval-source-map - 类似 cheap-eval-source-map，并且，在这种情况下，源自 loader 的 source map 会得到更好的处理结果。然而，loader source map 会被简化为每行一个映射(mapping)。

        建议: eval-source-map / cheap-module-eval-source-map
  * 生产环境:
    >  
        (none)(省略 devtool 选项): 不生成source map.

        source-map: 单独外部生成文件, 错误代码准确信息, 源代码错误位置

        hidden-source-map: 单独外部生成文件, 错误代码原因, 没有错误位置信息, 不能追踪源代码错误, 构建后文件错误位置

        nosources-source-map: 单独外部生成文件, 错误代码准确信息, 没有任何源代码信息
        
        建议: source-map / cheap-module-source-map

[详细解释](https://blog.csdn.net/zwkkkk1/article/details/88758726)


## 生产环境性能优化
* 优化打包构建速度  
  * oneOf: 省略不必要loader过程
  * Babel缓存: 对JS文件打包进行缓存,只更新新的JS代码文件
  * 多进程打包: 每个进程的开启都与要开销
  * externals: 制止某些库打包行为, 以链接形式引入
  * dll: 制止某些库打包行为, 提前单独打包, 之后直接使用就行 
* 优化代码运行性能
  * 缓存(hash-chunkhash-contenthash): 通过哈希值进行判断是否需要更新
    > hash-无论文件变化与否,值都会改变  
    > chunkhash-同一个chunk共享同一个值, 一个文件引入另一个文件,这也会被视为在同一个chunk里,两个文件中的任意一个文件改变,值都会改变  
    > contenHash-文件内容改变才会变化值
  * tree shaking: 负责判断并去除程序中那些存在着但并没有被使用的冗余modules
  * code split: 单入口/多入口
  * 懒加载/预加载: 如字面意思
