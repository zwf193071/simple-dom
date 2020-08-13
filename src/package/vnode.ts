import { Props } from './modules/props'
import { Attrs } from './modules/attributes'
import { Classes } from './modules/class'
import { VNodeStyle } from './modules/style'

export type Key = string | number

export interface VNode {
    sel: string | undefined
    children: Array<VNode | string> | undefined
    elm: Node | undefined
    text: string | undefined
    key: Key | undefined
}

export interface VNodeData {
    props?: Props
    attrs?: Attrs
    class?: Classes
    style?: VNodeStyle
    key?: Key
    ns?: string // for SVGs
    fn?: () => VNode // for thunks
    args?: any[] // for thunks
    [key: string]: any // for any other 3rd party module
}
