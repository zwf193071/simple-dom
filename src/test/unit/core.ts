import { assert } from 'chai'

import { init } from '../../package/init'
import { h } from '../../package/h'
import { VNode } from '../../package/vnode'

var patch = init()

describe('simpledom', function () {
    var elm: any, vnode0: any
    beforeEach(function () {
        elm = document.createElement('div')
        vnode0 = elm
    })
    // describe('hyperscript', function () {
    //     it('can create vnode with proper tag', function () {
    //         assert.strictEqual(h('div').sel, 'div')
    //         assert.strictEqual(h('a').sel, 'a')
    //     });
    //     it('can create vnode with children', function () {
    //         var vnode = h('div', [h('span#hello'), h('b.world')])
    //         assert.strictEqual(vnode.sel, 'div')
    //         const children = vnode.children as [VNode, VNode]
    //         assert.strictEqual(children[0].sel, 'span#hello')
    //         assert.strictEqual(children[1].sel, 'b.world')
    //     });
    //     it('can create vnode with one child vnode', function () {
    //         var vnode = h('div', h('span#hello'))
    //         assert.strictEqual(vnode.sel, 'div')
    //         const children = vnode.children as [VNode]
    //         assert.strictEqual(children[0].sel, 'span#hello')
    //     });
    //     it('can create vnode with props and one child vnode', function () {
    //         var vnode = h('div', {}, h('span#hello'))
    //         assert.strictEqual(vnode.sel, 'div')
    //         const children = vnode.children as [VNode]
    //         assert.strictEqual(children[0].sel, 'span#hello')
    //     });
    // });
    describe('created element', function () {
        // it('has tag', function () {
        //     elm = patch(vnode0, h('div')).elm
        //     assert.strictEqual(elm.tagName, 'DIV')
        // });
        // it('has different tag and id', function () {
        //     var elm = document.createElement('div')
        //     vnode0.appendChild(elm)
        //     var vnode1 = h('span#id')
        //     const patched = patch(elm, vnode1).elm as HTMLSpanElement
        //     assert.strictEqual(patched.tagName, 'SPAN')
        //     assert.strictEqual(patched.id, 'id')
        // });
        // it('has id', function () {
        //     elm = patch(vnode0, h('div', [h('div#unique')])).elm
        //     assert.strictEqual(elm.firstChild.id, 'unique')
        // });
    });
});