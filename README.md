<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [simple-dom](#simple-dom)
  - [Preface](#preface)
  - [Documentation](#documentation)
    - [ttypescript](#ttypescript)
    - [h](#h)
    - [patch](#patch)
      - [新旧节点是否有一样的tagName](#%E6%96%B0%E6%97%A7%E8%8A%82%E7%82%B9%E6%98%AF%E5%90%A6%E6%9C%89%E4%B8%80%E6%A0%B7%E7%9A%84tagname)
      - [新旧节点是否有不同的tag和id](#%E6%96%B0%E6%97%A7%E8%8A%82%E7%82%B9%E6%98%AF%E5%90%A6%E6%9C%89%E4%B8%8D%E5%90%8C%E7%9A%84tag%E5%92%8Cid)
      - [新节点的子元素是否有id](#%E6%96%B0%E8%8A%82%E7%82%B9%E7%9A%84%E5%AD%90%E5%85%83%E7%B4%A0%E6%98%AF%E5%90%A6%E6%9C%89id)
      - [updateChildren(diff算法的最最最核心功能)](#updatechildrendiff%E7%AE%97%E6%B3%95%E7%9A%84%E6%9C%80%E6%9C%80%E6%9C%80%E6%A0%B8%E5%BF%83%E5%8A%9F%E8%83%BD)
        - [是否移除根节点下的老children节点](#%E6%98%AF%E5%90%A6%E7%A7%BB%E9%99%A4%E6%A0%B9%E8%8A%82%E7%82%B9%E4%B8%8B%E7%9A%84%E8%80%81children%E8%8A%82%E7%82%B9)
        - [是否移除text元素](#%E6%98%AF%E5%90%A6%E7%A7%BB%E9%99%A4text%E5%85%83%E7%B4%A0)
    - [个人项目地址](#%E4%B8%AA%E4%BA%BA%E9%A1%B9%E7%9B%AE%E5%9C%B0%E5%9D%80)
  - [Thanks to](#thanks-to)
  - [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

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
  以下是我在实际开发中(仿照snabbdom)所搜集到的知识点，希望对大家有所帮助。

  ### ttypescript
  
  ```
  Currently TypeScript doesn't support custom transformers in the tsconfig.json, but supports it programmatically.

  And there is no way to compile your files using custom transformers using tsc command.

  TTypescript (Transformer TypeScript) solves this problem by patching on the fly the compile module to use transformers from tsconfig.json.
  ```

  这是`ttypescript`出来的初衷，为了方便根据配置文件进行自定义编译。`package.json`内有一条`compile`脚本，执行`npm run compile`会运行`ttsc`命令，再根据`src/test/tsconfig.json`以及`src/package/tsconfig.json`里的配置文件信息将编译之后的代码输出到build文件夹下

完成编译后，即可运行`npm run unit`命令，开始愉快的码转之旅啦~~~
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
 为了方便大家理解`h`，下面有一段完整功能的简单代码
 ```
 	   function Sdom(tag, data, children) {
            this.tag = tag;
            this.data = data;
            this.children = children
        }
        Sdom.prototype.render = function() {
            const el = document.createElement(this.tag);
            for (let attr in this.data) {
                el.setAttribute(attr, this.data[attr]);
            }
            this.children.forEach(child => {
                let childEl = child instanceof Sdom ? child.render() : document.createTextNode(child);
                el.appendChild(childEl);
            });
            return el;
        }
        function el(tagName, attrs, children) {
            return new Sdom(tagName, attrs, children)
        }
        let ul = el('ul', { id: 'list' }, [
            el('li', { class: 'item' }, ['Item 1']),
            el('li', { class: 'item' }, ['Item 2']),
            el('li', { class: 'item' }, ['Item 3'])
        ])
        let ulRoot = ul.render()
        document.body.appendChild(ulRoot);
 ```
`Sdom`从某种意义上来讲，便是上面的`h`，上面的代码会在浏览器界面生成ul标签，如下图所示：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200814161105380.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3p3ZjE5MzA3MQ==,size_16,color_FFFFFF,t_70#pic_center)

`h`函数易于理解，这里我便不再赘述了，在`Virtual Dom`里，`patch`才是重点，因其实现了`diff`算法，下面会根据测试例子一一剖析源码。
### patch
#### 新旧节点是否有一样的tagName
通过测试案例，为大家一步一步讲解源码原理

在`test/unit`文件夹下的`core.ts`里新增以下代码：

```javascript
import { init } from '../../package/init'
var patch = init()

describe('simpledom', function () {
    var elm: any, vnode0: any
    // 在每个测试前，创建一个DOM节点div
    beforeEach(function () {
        elm = document.createElement('div')
        vnode0 = elm
    })
	describe('created element', function () {
        it('has tag', function () {
            elm = patch(vnode0, h('div')).elm
            assert.strictEqual(elm.tagName, 'DIV')
        });
	 });
});  
```
patch函数的作用是，比较新旧vnode节点的差异，对新vnode做处理后，返回新vnode

为了实现测试代码的功能，首先，我们需要在`src/package`目录下新建`init.ts`文件

```javascript
import { htmlDomApi, DOMAPI } from './htmldomapi'

function isUndef(s: any): boolean {
    return s === undefined
}
// DOMAPI是document的一些创建插入节点等操作
export function init(domApi?: DOMAPI) {
	const api: DOMAPI = domApi !== undefined ? domApi : htmlDomApi
	return function patch(oldVnode: VNode | Element, vnode: VNode): VNode {
		let i: number, elm: Node, parent: Node
        if (!isVnode(oldVnode)) {
            oldVnode = emptyNodeAt(oldVnode)
        }
        if (sameVnode(oldVnode, vnode)) {
            patchVnode(oldVnode, vnode)
        }
		return vnode;
	}
}
```
`isVnode(oldVnode)`判断旧节点是否为vnode节点，若不是，便创建一个空vnode，`isVnode`和`emptyNodeAt`代码如下所示：

```javascript
function isVnode(vnode: any): vnode is VNode {
    return vnode.sel !== undefined
}
// Element在这里指创建的dom元素
function emptyNodeAt(elm: Element) {
    const id = elm.id ? '#' + elm.id : ''
    const c = elm.className ? '.' + elm.className.split(' ').join('.') : ''
    return vnode(api.tagName(elm).toLowerCase() + id + c, {}, [], undefined, elm)
}
```
将老节点即测试前创建的`div`转变为`vnode`后，将其与新的`vnode`比较

```javascript
function sameVnode(vnode1: VNode, vnode2: VNode): boolean {
    return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel
}
```
由于新旧节点的key皆没有定义，为`undefined`，`sel`值皆为`div`，故上面等式相等

为实现patch后返回的节点有elm属性，需在`patchVnode`里进行下一步操作

```javascript
function patchVnode(oldVnode: VNode, vnode: VNode) {
	// 将老节点的elm属性赋值给新节点vnode里的elm属性，并保存该值，供后续代码使用
	const elm = vnode.elm = oldVnode.elm!
}
```
实现`assert.strictEqual(elm.tagName, 'DIV')`这个功能，`patchVnode`里只需上面这一行代码即可

注意：`tagName`是dom元素的属性

#### 新旧节点是否有不同的tag和id
测试代码如下：

```javascript
it('has different tag and id', function () {
	var elm = document.createElement('div')
    vnode0.appendChild(elm)
    var vnode1 = h('span#id')
    const patched = patch(elm, vnode1).elm as HTMLSpanElement
    assert.strictEqual(patched.tagName, 'SPAN')
    assert.strictEqual(patched.id, 'id')
});
```
`vnode0`下新增一个子节点`div`，vnode1为`h('span#id')`，很明显，`vnode0`和`vnode1`不是相同的vnode节点，如此，我们便需要修改`patch`函数

```javascript
	return function patch(oldVnode: VNode | Element, vnode: VNode): VNode {
        let i: number, elm: Node, parent: Node
        if (!isVnode(oldVnode)) {
            oldVnode = emptyNodeAt(oldVnode)
        }
        if (sameVnode(oldVnode, vnode)) {
            patchVnode(oldVnode, vnode)
        } else {
            elm = oldVnode.elm!
            parent = api.parentNode(elm) as Node
            
            createElm(vnode)

            if (parent !== null) {
                api.insertBefore(parent, vnode.elm!, api.nextSibling(elm))
                removeVnodes(parent, [oldVnode], 0, 0)
            }
        }
        return vnode;
    }
```
如上图所示，此时我们需要获取到`oldVnode.elm`，即`document.createElement('div')`，通过`api.parentNode(elm)`获取到`parent `节点，即`vnode0`，将其存为变量。
`createElm(vnode)`这段代码主要是根据`h('span#id')`生成`vnode`节点的`elm`属性，即dom属性，如下所示：

```javascript
	function createElm(vnode: VNode): Node {
        let i: any
        let data = vnode.data
        const sel = vnode.sel
        // sel为'span#id'
        if (sel !== undefined) {
            // Parse selector
            const hashIdx = sel.indexOf('#')
            const hash = hashIdx > 0 ? hashIdx : sel.length
            const tag = hashIdx !== -1 ? sel.slice(0, hash) : sel //tag为span
            // 由于data.ns(namespace)为undefined，执行api.createElement(tag)，生成span元素
            const elm = vnode.elm = isDef(data) && isDef(i = data.ns)
                ? api.createElementNS(i, tag)
                : api.createElement(tag)
            elm.setAttribute('id', sel.slice(hash + 1, sel.length))//为span元素添加属性id
        } else {
            vnode.elm = api.createTextNode(vnode.text!)
        }
        return vnode.elm
    }
```
之后进行下一步，在`oldVnode.elm`的兄妹节点(`null`)前插入`vnode.elm`，`removeVnodes`是移除`parent`里面的旧节点，这两步操作之后，`parent`变为`<div><span id="id"></span></div>`，再patch函数返回新vnode即可。
#### 新节点的子元素是否有id
测试代码如下：

```javascript
		it('has id', function () {
            elm = patch(vnode0, h('div', [h('div#unique')])).elm
            assert.strictEqual(elm.firstChild.id, 'unique')//firstChild为dom元素属性
        });
```
很明显，新旧节点为同一vnode节点，我们需修改`patchVnode`函数

```javascript
	function patchVnode(oldVnode: VNode, vnode: VNode) {
        const elm = vnode.elm = oldVnode.elm!
        const ch = vnode.children as VNode[]
        // 新节点没有text
        if (isUndef(vnode.text)) {
        	// 新节点有children
            if (isDef(ch)) {
                addVnodes(elm, null, ch, 0, ch.length - 1)
            }
        }
    }
```
`addVnodes`在`div`里插入`vnode.children`元素，代码如下：

```javascript
	function addVnodes(
        parentElm: Node,
        before: Node | null,
        vnodes: VNode[],
        startIdx: number,
        endIdx: number
    ) {
        for (; startIdx <= endIdx; ++startIdx) {
            const ch = vnodes[startIdx]
            if (ch != null) {
                api.insertBefore(parentElm, createElm(ch), before)
            }
        }
    }
```

#### updateChildren(diff算法的最最最核心功能)
##### 是否移除根节点下的老children节点
测试代码如下所示
```
it('can remove previous children of the root element', function () {
    var h2 = document.createElement('h2')
    h2.textContent = 'Hello'
    var prevElm = document.createElement('div')
    prevElm.id = 'id'
    prevElm.className = 'class'
    prevElm.appendChild(h2)
    var nextVNode = h('div#id.class', [h('span', 'Hi')])
    elm = patch(toVNode(prevElm), nextVNode).elm
    assert.strictEqual(elm, prevElm)
    assert.strictEqual(elm.tagName, 'DIV')
    assert.strictEqual(elm.id, 'id')
    assert.strictEqual(elm.className, 'class')
    assert.strictEqual(elm.childNodes.length, 1)
    assert.strictEqual(elm.childNodes[0].tagName, 'SPAN')
    assert.strictEqual(elm.childNodes[0].textContent, 'Hi')
})
```
该测试代码所测得功能是，把`<div id="id" class="class"><h2>Hello</h2></div>`用`toVNode`方法转成Vnode节点，接着与`nextVNode`进行`patch`比较。

`patch(toVNode(prevElm), nextVNode).elm`这段代码生成的便是`<div id="id" class="class"><span>Hi</span></div>`

根据上述代码分析，我们应修改`patchVnode`方法，新增代码如下
```
function patchVnode(oldVnode: VNode, vnode: VNode) {
    ...
    if (isUndef(vnode.text)) {
        if (isDef(oldCh) && isDef(ch)) {
            if (oldCh !== ch) updateChildren(elm, oldCh, ch)
        }...
    }
    ...
    
}
```
`updateChildren`代码如下所示：
```
    function updateChildren(parentElm: Node,
        oldCh: VNode[],
        newCh: VNode[]) {
        let oldStartIdx = 0
        let newStartIdx = 0
        let oldEndIdx = oldCh.length - 1
        let oldStartVnode = oldCh[0]
        let oldEndVnode = oldCh[oldEndIdx]
        let newEndIdx = newCh.length - 1
        let newStartVnode = newCh[0]
        let newEndVnode = newCh[newEndIdx]
        let oldKeyToIdx: KeyToIndexMap | undefined
        let idxInOld: number
        let elmToMove: VNode
        let before: any

        while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
            if (oldStartVnode == null) {
                oldStartVnode = oldCh[++oldStartIdx] // Vnode might have been moved left
            } else if (oldEndVnode == null) {
                oldEndVnode = oldCh[--oldEndIdx]
            } else if (newStartVnode == null) {
                newStartVnode = newCh[++newStartIdx]
            } else if (newEndVnode == null) {
                newEndVnode = newCh[--newEndIdx]
            } else if (sameVnode(oldStartVnode, newStartVnode)) {
                patchVnode(oldStartVnode, newStartVnode)
                oldStartVnode = oldCh[++oldStartIdx]
                newStartVnode = newCh[++newStartIdx]
            } else if (sameVnode(oldEndVnode, newEndVnode)) {
                patchVnode(oldEndVnode, newEndVnode)
                oldEndVnode = oldCh[--oldEndIdx]
                newEndVnode = newCh[--newEndIdx]
            } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
                patchVnode(oldStartVnode, newEndVnode)
                api.insertBefore(parentElm, oldStartVnode.elm!, api.nextSibling(oldEndVnode.elm!))
                oldStartVnode = oldCh[++oldStartIdx]
                newEndVnode = newCh[--newEndIdx]
            } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
                patchVnode(oldEndVnode, newStartVnode)
                api.insertBefore(parentElm, oldEndVnode.elm!, oldStartVnode.elm!)
                oldEndVnode = oldCh[--oldEndIdx]
                newStartVnode = newCh[++newStartIdx]
            } else {
                if (oldKeyToIdx === undefined) {
                    oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx)
                }
                idxInOld = oldKeyToIdx[newStartVnode.key as string]
                if (isUndef(idxInOld)) { // 若新节点没有key，则直接根据新节点生成dom元素，并插入到老节点原第一节点的前面
                    api.insertBefore(parentElm, createElm(newStartVnode), oldStartVnode.elm!)
                } else {
                    elmToMove = oldCh[idxInOld]
                    if (elmToMove.sel !== newStartVnode.sel) { // 新节点若不在老节点队伍里面，则插入到老节点原第一节点的前面
                        api.insertBefore(parentElm, createElm(newStartVnode), oldStartVnode.elm!)
                    } else {
                        // 新节点若在老节点队伍里面，则进行patchNode操作，并将该节点插入到老节点原第一节点的前面
                        patchVnode(elmToMove, newStartVnode)
                        oldCh[idxInOld] = undefined as any
                        api.insertBefore(parentElm, elmToMove.elm!, oldStartVnode.elm!)
                    }
                }
                newStartVnode = newCh[++newStartIdx]
            }
        }
        if (oldStartIdx <= oldEndIdx || newStartIdx <= newEndIdx) {
            if (oldStartIdx > oldEndIdx) {
                before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].elm
                addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx)
            } else {
                removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx)
            }
        }
    }
```
该方法有一篇博客分析的很好，感兴趣的同学可以[点击查看](https://blog.csdn.net/qq2276031/article/details/106407647)进一步明白原理。

##### 是否移除text元素
测试代码如下：
```
it('can remove text elements', function () {
    var h2 = document.createElement('h2')
    h2.textContent = 'Hello'
    var prevElm = document.createElement('div')
    prevElm.id = 'id'
    prevElm.className = 'class'
    var text = document.createTextNode('Foobar')
    prevElm.appendChild(text)
    prevElm.appendChild(h2)
    var nextVNode = h('div#id.class', [h('h2', 'Hello')])
    elm = patch(toVNode(prevElm), nextVNode).elm
    assert.strictEqual(elm, prevElm)
    assert.strictEqual(elm.tagName, 'DIV')
    assert.strictEqual(elm.id, 'id')
    assert.strictEqual(elm.className, 'class')
    assert.strictEqual(elm.childNodes.length, 1)
    assert.strictEqual(elm.childNodes[0].nodeType, 1)
    assert.strictEqual(elm.childNodes[0].textContent, 'Hello')
})
```
需要在原`removeVnodes`方法里添加一段代码
```
function removeVnodes(parentElm: Node,
    vnodes: VNode[],
    startIdx: number,
    endIdx: number): void {
        ...
        if (isDef(ch.sel)) {
            ...
        } else { // Text node
            api.removeChild(parentElm, ch.elm!) // text元素没有sel标签（如div,span）
        }
}
```

### 个人项目地址
* [simple-dom](https://github.com/zwf193071/simple-dom)
## Thanks to
* [snabbdom](https://github.com/snabbdom/snabbdom)

## License
This repo is released under the [MIT](https://opensource.org/licenses/MIT).





