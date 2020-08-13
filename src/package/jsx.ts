import { VNode } from './vnode'
import { ArrayOrElement } from './h'

export type JsxVNodeChild = VNode | string | number | boolean | undefined | null
export type JsxVNodeChildren = ArrayOrElement<JsxVNodeChild>

export type FunctionComponent = (props: { [prop: string]: any } | null, children?: VNode[]) => VNode
