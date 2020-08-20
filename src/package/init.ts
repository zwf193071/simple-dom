import { Module } from './modules/module'
import { vnode, VNode } from './vnode'
import * as is from './is'
import { htmlDomApi, DOMAPI } from './htmldomapi'

type NonUndefined<T> = T extends undefined ? never : T

function isUndef(s: any): boolean {
    return s === undefined
}
function isDef<A>(s: A): s is NonUndefined<A> {
    return s !== undefined
}

type VNodeQueue = VNode[]

const emptyNode = vnode('', {}, [], undefined, undefined)

function sameVnode(vnode1: VNode, vnode2: VNode): boolean {
    return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel
}

function isVnode(vnode: any): vnode is VNode {
    return vnode.sel !== undefined
}
type ArraysOf<T> = {
    [K in keyof T]: Array<T[K]>;
}

type ModuleHooks = ArraysOf<Required<Module>>

const hooks: Array<keyof Module> = ['create', 'update', 'remove', 'destroy', 'pre', 'post']
export function init(domApi?: DOMAPI) {
    let i: number
    let j: number
    const cbs: ModuleHooks = {
        create: [],
        update: [],
        remove: [],
        destroy: [],
        pre: [],
        post: []
    }
    const api: DOMAPI = domApi !== undefined ? domApi : htmlDomApi

    // for (i = 0; i < hooks.length; ++i) {
    //     cbs[hooks[i]] = []
    //     for (j = 0; j < modules.length; ++j) {
    //         const hook = modules[j][hooks[i]]
    //         if (hook !== undefined) {
    //             (cbs[hooks[i]] as any[]).push(hook)
    //         }
    //     }
    // }

    function emptyNodeAt(elm: Element) {
        const id = elm.id ? '#' + elm.id : ''
        const c = elm.className ? '.' + elm.className.split(' ').join('.') : ''
        return vnode(api.tagName(elm).toLowerCase() + id + c, {}, [], undefined, elm)
    }

    function createRmCb(childElm: Node, listeners: number) {
        return function rmCb() {
            if (--listeners === 0) {
                const parent = api.parentNode(childElm) as Node
                api.removeChild(parent, childElm)
            }
        }
    }
    function createElm(vnode: VNode): Node {
        let i: any
        let data = vnode.data
        const children = vnode.children
        const sel = vnode.sel
        console.log('vnode')
        console.log(vnode)
        if (sel !== undefined) {
            // Parse selector
            const hashIdx = sel.indexOf('#')
            const hash = hashIdx > 0 ? hashIdx : sel.length
            const tag = hashIdx !== -1 ? sel.slice(0, hash) : sel
            const elm = vnode.elm = isDef(data) && isDef(i = data.ns)
                ? api.createElementNS(i, tag)
                : api.createElement(tag)
            elm.setAttribute('id', sel.slice(hash + 1, sel.length))
            // if (is.array(children)) {
            //     for (i = 0; i < children.length; ++i) {
            //         const ch = children[i]
            //         if (ch != null) {
            //             api.appendChild(elm, createElm(ch as VNode))
            //         }
            //     }
            // }
        } else {
            vnode.elm = api.createTextNode(vnode.text!)
        }
        return vnode.elm
    }
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
    function removeVnodes(parentElm: Node,
        vnodes: VNode[],
        startIdx: number,
        endIdx: number): void {
        for (; startIdx <= endIdx; ++startIdx) {
            let listeners: number
            const ch = vnodes[startIdx]
            if (ch != null) {
                if (isDef(ch.sel)) {
                    console.log('cbs')
                    console.log(cbs)
                    listeners = cbs.remove.length + 1
                    createRmCb(ch.elm!, listeners)()
                    // for (let i = 0; i < cbs.remove.length; ++i) cbs.remove[i](ch, rm)
                    // const removeHook = ch?.data?.hook?.remove
                    // console.log('removeHook')
                    // console.log(removeHook)
                    // if (isDef(removeHook)) {
                    //     removeHook(ch, rm)
                    // } else {
                    //     rm()
                    // }
                }
            }
        }
    }
    function patchVnode(oldVnode: VNode, vnode: VNode) {
        // const hook = vnode.data?.hook
        // hook?.prepatch?.(oldVnode, vnode)
        const elm = vnode.elm = oldVnode.elm!
        const ch = vnode.children as VNode[]
        if (isUndef(vnode.text)) {
            if (isDef(ch)) {
                addVnodes(elm, null, ch, 0, ch.length - 1)
            }
        }
        // hook?.postpatch?.(oldVnode, vnode)
    }
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
            console.log(222)
            if (parent !== null) {
                api.insertBefore(parent, vnode.elm!, api.nextSibling(elm))
                removeVnodes(parent, [oldVnode], 0, 0)
            }
            
        }
        return vnode;
    }
}