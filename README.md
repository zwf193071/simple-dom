
# simple-dom

The simple Virtual Dom which includes vnode & h & patch and so on.

> Author：zwf193071

> E-mail: 997131679@qq.com

> date: 2020/08/13

## Preface
  How can I learn to write the Virtual Dom by myself? I am a green-hand, not having much experience, even the simplest Virtual Dom can puzzle me...
  Do you have the same questions above? If you do, please just look at this simple-dom, I will explain anything in detail during the process when I learn to write the Virtual Dom.

## Documentation

  我们如何开始学习一个npm包，很简单，从它的test测试包出发。看测试文件里测试哪些功能，我们便可以开始从最简单的点写起。
  以下是我在实际开发中所搜集到的知识点，希望对大家有所帮助。

  ### ttypescript
  `Currently TypeScript doesn't support custom transformers in the tsconfig.json, but supports it programmatically.`
  
  这是`ttypescript`出来的初衷，为了方便根据配置文件进行自定义编译。`package.json`内有一条`compile`脚本，执行`npm run compile`会运行`ttsc`命令，再根据`src/test/tsconfig.json`里的配置文件输出到build文件夹下

## Thanks to
* [snabbdom](https://github.com/snabbdom/snabbdom)

## License
This repo is released under the [MIT](https://opensource.org/licenses/MIT).





