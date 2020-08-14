
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
  
  ```
  Currently TypeScript doesn't support custom transformers in the tsconfig.json, but supports it programmatically.

  And there is no way to compile your files using custom transformers using tsc command.

  TTypescript (Transformer TypeScript) solves this problem by patching on the fly the compile module to use transformers from tsconfig.json.
  ```

  这是`ttypescript`出来的初衷，为了方便根据配置文件进行自定义编译。`package.json`内有一条`compile`脚本，执行`npm run compile`会运行`ttsc`命令，再根据`src/test/tsconfig.json`里的配置文件输出到build文件夹下

### h
  h函数，采用重载方式，对其实现进行定义，见下面代码：
  ```
  export function h (sel: string): VNode
  export function h (sel: string, data: VNodeData | null): VNode
  export function h (sel: string, children: VNodeChildren): VNode
  export function h (sel: string, data: VNodeData | null, children: VNodeChildren): VNode
  export function h (sel: any, b?: any, c?: any): VNode {
    ...
    return vnode(sel, data, children, text, undefined)
  }
  ```
  h函数有三个参数，分别是sel（一般是html标签，但也可能为"svg."或"svg#"），b，c
  - b参数：可选，类型为VNodeData或VNodeChildren或null
  - c参数：可选，类型为VNodeChildren

  h函数的返回值，为vnode函数，而vnode函数的定义及返回值如下所示：
  ```
  export function vnode(sel: string | undefined,
    data: any | undefined,
    children: Array<VNode | string> | undefined,
    text: string | undefined,
    elm: Element | Text | undefined): VNode {
    const key = data === undefined ? undefined : data.key
    return { sel, data, children, text, elm, key }
  }
  
  ```
  vnode函数有5个参数，皆为必填项。我在编写代码的过程中，先编写unit下core.ts的测试代码。
  1. 测试h创建的`vnode`是否有合适的`tag`
  ```
  assert.strictEqual(h('div').sel, 'div')
  assert.strictEqual(h('a').sel, 'a')
  ```
  2. 测试h创建的`vnode`是否有`children`
  ```
  var vnode = h('div', [h('span#hello'), h('b.world')])
  assert.strictEqual(vnode.sel, 'div')
  const children = vnode.children as [VNode, VNode]
  assert.strictEqual(children[0].sel, 'span#hello')
  assert.strictEqual(children[1].sel, 'b.world')
  ```
## Thanks to
* [snabbdom](https://github.com/snabbdom/snabbdom)

## License
This repo is released under the [MIT](https://opensource.org/licenses/MIT).





