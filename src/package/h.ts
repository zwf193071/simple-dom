import { vnode, VNode, VNodeData } from './vnode'
import * as is from './is'

export type VNodeChildElement = VNode | string | number | undefined | null
export type ArrayOrElement<T> = T | T[]
export type VNodeChildren = ArrayOrElement<VNodeChildElement>

export function h(sel: string): VNode
export function h(sel: string, children: VNodeChildren): VNode
export function h(sel: any, b?: any): VNode {
    var data: VNodeData = {}
    var children: any
    var text: any
    if (b !== undefined && b !== null) {
        if (is.array(b)) {
            children = b
        } else if (is.primitive(b)) {
            text = b
        } else if (b && b.sel) {
            children = [b]
        } else { data = b }
    }
    return vnode(sel, data, children, text, undefined)
}