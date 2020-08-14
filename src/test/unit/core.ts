import { assert } from 'chai'
import { h } from '../../package/h'
import { VNode } from '../../package/vnode'

describe('simpledom', function () {
    describe('hyperscript', function () {
        it('can create vnode with proper tag', function () {
            assert.strictEqual(h('div').sel, 'div')
            assert.strictEqual(h('a').sel, 'a')
        });
        it('can create vnode with children', function () {
            var vnode = h('div', [h('span#hello'), h('b.world')])
            assert.strictEqual(vnode.sel, 'div')
            const children = vnode.children as [VNode, VNode]
            assert.strictEqual(children[0].sel, 'span#hello')
            assert.strictEqual(children[1].sel, 'b.world')
        });
    });
});