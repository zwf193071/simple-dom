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
        // it('has correct namespace', function () {
        //     var SVGNamespace = 'http://www.w3.org/2000/svg'
        //     var XHTMLNamespace = 'http://www.w3.org/1999/xhtml'

        //     elm = patch(vnode0, h('div', [h('div', { ns: SVGNamespace })])).elm
        //     assert.strictEqual(elm.firstChild.namespaceURI, SVGNamespace)

        //     // verify that svg tag automatically gets svg namespace
        //     elm = patch(vnode0, h('svg', [
        //         h('foreignObject', [
        //             h('div', ['I am HTML embedded in SVG'])
        //         ])
        //     ])).elm
        //     assert.strictEqual(elm.namespaceURI, SVGNamespace)
        //     assert.strictEqual(elm.firstChild.namespaceURI, SVGNamespace)
        //     assert.strictEqual(elm.firstChild.firstChild.namespaceURI, XHTMLNamespace)

        //     // verify that svg tag with extra selectors gets svg namespace
        //     elm = patch(vnode0, h('svg#some-id')).elm
        //     assert.strictEqual(elm.namespaceURI, SVGNamespace)

        //     // verify that non-svg tag beginning with 'svg' does NOT get namespace
        //     elm = patch(vnode0, h('svg-custom-el')).elm
        //     assert.notStrictEqual(elm.namespaceURI, SVGNamespace)
        // })
        it('receives classes in selector', function () {
            elm = patch(vnode0, h('div', [h('i.am.a.class')])).elm
            assert(elm.firstChild.classList.contains('am'))
            assert(elm.firstChild.classList.contains('a'))
            assert(elm.firstChild.classList.contains('class'))
        })
        it('receives classes in class property', function () {
            elm = patch(vnode0, h('i', { class: { am: true, a: true, class: true, not: false } })).elm
            assert(elm.classList.contains('am'))
            assert(elm.classList.contains('a'))
            assert(elm.classList.contains('class'))
            assert(!elm.classList.contains('not'))
        })
    });
});