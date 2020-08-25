import { assert } from 'chai'

import { init } from '../../package/init'
import { classModule } from '../../package/modules/class'
import { propsModule } from '../../package/modules/props'
import { styleModule } from '../../package/modules/style'
import { h } from '../../package/h'
import { toVNode } from '../../package/tovnode'
import { vnode, VNode } from '../../package/vnode'
import { htmlDomApi } from '../../package/htmldomapi'

const hasSvgClassList = 'classList' in SVGElement.prototype

var patch = init([
    classModule,
    propsModule,
])

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
    //     })
    //     it('can create vnode with children', function () {
    //         var vnode = h('div', [h('span#hello'), h('b.world')])
    //         assert.strictEqual(vnode.sel, 'div')
    //         const children = vnode.children as [VNode, VNode]
    //         assert.strictEqual(children[0].sel, 'span#hello')
    //         assert.strictEqual(children[1].sel, 'b.world')
    //     })
    //     it('can create vnode with one child vnode', function () {
    //         var vnode = h('div', h('span#hello'))
    //         assert.strictEqual(vnode.sel, 'div')
    //         const children = vnode.children as [VNode]
    //         assert.strictEqual(children[0].sel, 'span#hello')
    //     })
    //     it('can create vnode with props and one child vnode', function () {
    //         var vnode = h('div', {}, h('span#hello'))
    //         assert.strictEqual(vnode.sel, 'div')
    //         const children = vnode.children as [VNode]
    //         assert.strictEqual(children[0].sel, 'span#hello')
    //     })
    //     it('can create vnode with text content', function () {
    //         var vnode = h('a', ['I am a string'])
    //         const children = vnode.children as [VNode]
    //         assert.strictEqual(children[0].text, 'I am a string')
    //     })
    //     it('can create vnode with text content in string', function () {
    //         var vnode = h('a', 'I am a string')
    //         assert.strictEqual(vnode.text, 'I am a string')
    //     })
    //     it('can create vnode with props and text content in string', function () {
    //         var vnode = h('a', {}, 'I am a string')
    //         assert.strictEqual(vnode.text, 'I am a string')
    //     })
    //     it('can create vnode with null props', function () {
    //         var vnode = h('a', null)
    //         assert.deepEqual(vnode.data, {})
    //         vnode = h('a', null, ['I am a string'])
    //         const children = vnode.children as [VNode]
    //         assert.strictEqual(children[0].text, 'I am a string')
    //     })
    //     it('can create vnode for comment', function () {
    //         var vnode = h('!', 'test')
    //         assert.strictEqual(vnode.sel, '!')
    //         assert.strictEqual(vnode.text, 'test')
    //     })
    // })
    describe('created element', function () {
        // it('has tag', function () {
        //     elm = patch(vnode0, h('div')).elm
        //     assert.strictEqual(elm.tagName, 'DIV')
        // })
        // it('has different tag and id', function () {
        //     var elm = document.createElement('div')
        //     vnode0.appendChild(elm)
        //     var vnode1 = h('span#id')
        //     const patched = patch(elm, vnode1).elm as HTMLSpanElement
        //     assert.strictEqual(patched.tagName, 'SPAN')
        //     assert.strictEqual(patched.id, 'id')
        // })
        // it('has id', function () {
        //     elm = patch(vnode0, h('div', [h('div#unique')])).elm
        //     assert.strictEqual(elm.firstChild.id, 'unique')
        // })
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
        // it('receives classes in selector', function () {
        //     elm = patch(vnode0, h('div', [h('i.am.a.class')])).elm
        //     assert(elm.firstChild.classList.contains('am'))
        //     assert(elm.firstChild.classList.contains('a'))
        //     assert(elm.firstChild.classList.contains('class'))
        // })
        // it('receives classes in class property111', function () {
        //     elm = patch(vnode0, h('div', { class: { am: true, a: true, class: true, not: false } })).elm
        //     assert(elm.classList.contains('am'))
        //     assert(elm.classList.contains('a'))
        //     assert(elm.classList.contains('class'))
        //     assert(!elm.classList.contains('not'))
        // })
        // it('receives classes in selector when namespaced', function () {
        //     if (!hasSvgClassList) {
        //         this.skip()
        //     } else {
        //         elm = patch(vnode0,
        //             h('svg', [
        //                 h('g.am.a.class.too')
        //             ])
        //         ).elm
        //         assert(elm.firstChild.classList.contains('am'))
        //         assert(elm.firstChild.classList.contains('a'))
        //         assert(elm.firstChild.classList.contains('class'))
        //     }
        // })
        // it('receives classes in class property when namespaced', function () {
        //     if (!hasSvgClassList) {
        //         this.skip()
        //     } else {
        //         elm = patch(vnode0,
        //             h('svg', [
        //                 h('g', { class: { am: true, a: true, class: true, not: false, too: true } })
        //             ])
        //         ).elm
        //         assert(elm.firstChild.classList.contains('am'))
        //         assert(elm.firstChild.classList.contains('a'))
        //         assert(elm.firstChild.classList.contains('class'))
        //         assert(!elm.firstChild.classList.contains('not'))
        //     }
        // })
        // it('handles classes from both selector and property', function () {
        //     elm = patch(vnode0, h('div', [h('i.has', { class: { classes: true } })])).elm
        //     assert(elm.firstChild.classList.contains('has'))
        //     assert(elm.firstChild.classList.contains('classes'))
        // })
        // it('can create elements with text content', function () {
        //     elm = patch(vnode0, h('div', ['I am a string'])).elm
        //     assert.strictEqual(elm.innerHTML, 'I am a string')
        // })
        // it('can create elements with span and text content', function () {
        //     elm = patch(vnode0, h('a', [h('span'), 'I am a string'])).elm
        //     assert.strictEqual(elm.childNodes[0].tagName, 'SPAN')
        //     assert.strictEqual(elm.childNodes[1].textContent, 'I am a string')
        // })
        // it('can create elements with props', function () {
        //     elm = patch(vnode0, h('a', { props: { src: 'http://localhost/' } })).elm
        //     assert.strictEqual(elm.src, 'http://localhost/')
        // })
        // it('can create an element created inside an iframe', function (done) {
        //     // Only run if srcdoc is supported.
        //     var frame = document.createElement('iframe')
        //     if (typeof frame.srcdoc !== 'undefined') {
        //         frame.srcdoc = '<div>Thing 1</div>'
        //         frame.onload = function () {
        //             const div0 = frame.contentDocument!.body.querySelector('div') as HTMLDivElement
        //             patch(div0, h('div', 'Thing 2'))
        //             const div1 = frame.contentDocument!.body.querySelector('div') as HTMLDivElement
        //             assert.strictEqual(div1.textContent, 'Thing 2')
        //             frame.remove()
        //             done()
        //         }
        //         document.body.appendChild(frame)
        //     } else {
        //         done()
        //     }
        // })
        // it('is a patch of the root element', function () {
        //     var elmWithIdAndClass = document.createElement('div')
        //     elmWithIdAndClass.id = 'id'
        //     elmWithIdAndClass.className = 'class'
        //     var vnode1 = h('div#id.class', [h('span', 'Hi')])
        //     elm = patch(elmWithIdAndClass, vnode1).elm
        //     assert.strictEqual(elm, elmWithIdAndClass)
        //     assert.strictEqual(elm.tagName, 'DIV')
        //     assert.strictEqual(elm.id, 'id')
        //     assert.strictEqual(elm.className, 'class')
        // })
        it('can create comments', function () {
            elm = patch(vnode0, h('!', 'test')).elm
            console.log('elm')
            console.log(elm)
            assert.strictEqual(elm.nodeType, document.COMMENT_NODE)
            assert.strictEqual(elm.textContent, 'test')
        })
    });
    describe('patching an element', function () {
        // it('changes the elements classes', function () {
        //     var vnode1 = h('i', { class: { i: true, am: true, horse: true } })
        //     var vnode2 = h('i', { class: { i: true, am: true, horse: false } })
        //     patch(vnode0, vnode1)
        //     elm = patch(vnode1, vnode2).elm
        //     assert(elm.classList.contains('i'))
        //     assert(elm.classList.contains('am'))
        //     assert(!elm.classList.contains('horse'))
        // })
        // it('changes classes in selector', function () {
        //     var vnode1 = h('i', { class: { i: true, am: true, horse: true } })
        //     var vnode2 = h('i', { class: { i: true, am: true, horse: false } })
        //     patch(vnode0, vnode1)
        //     elm = patch(vnode1, vnode2).elm
        //     assert(elm.classList.contains('i'))
        //     assert(elm.classList.contains('am'))
        //     assert(!elm.classList.contains('horse'))
        // })
        // it('preserves memoized classes', function () {
        //     var cachedClass = { i: true, am: true, horse: false }
        //     var vnode1 = h('i', { class: cachedClass })
        //     var vnode2 = h('i', { class: cachedClass })
        //     elm = patch(vnode0, vnode1).elm
        //     assert(elm.classList.contains('i'))
        //     assert(elm.classList.contains('am'))
        //     assert(!elm.classList.contains('horse'))
        //     elm = patch(vnode1, vnode2).elm
        //     assert(elm.classList.contains('i'))
        //     assert(elm.classList.contains('am'))
        //     assert(!elm.classList.contains('horse'))
        // })
        // it('removes missing classes', function () {
        //     var vnode1 = h('i', { class: { i: true, am: true, horse: true } })
        //     var vnode2 = h('i', { class: { i: true, am: true } })
        //     patch(vnode0, vnode1)
        //     elm = patch(vnode1, vnode2).elm
        //     assert(elm.classList.contains('i'))
        //     assert(elm.classList.contains('am'))
        //     assert(!elm.classList.contains('horse'))
        // })
        // it('changes an elements props', function () {
        //     var vnode1 = h('a', { props: { src: 'http://other/' } })
        //     var vnode2 = h('a', { props: { src: 'http://localhost/' } })
        //     patch(vnode0, vnode1)
        //     elm = patch(vnode1, vnode2).elm
        //     assert.strictEqual(elm.src, 'http://localhost/')
        // })
        // it('can set prop value to `0`', function () {
        //     var patch = init([propsModule, styleModule])
        //     var view = (scrollTop: number) => h('div',
        //         {
        //             style: { height: '100px', overflowY: 'scroll' },
        //             props: { scrollTop },
        //         },
        //         [h('div', { style: { height: '200px' } })]
        //     )
        //     var vnode1 = view(0)
        //     var mountPoint = document.body.appendChild(document.createElement('div'))
        //     var { elm } = patch(mountPoint, vnode1)
        //     if (!(elm instanceof HTMLDivElement)) throw new Error()
        //     assert.strictEqual(elm.scrollTop, 0)
        //     var vnode2 = view(20)
        //     patch(vnode1, vnode2)
        //     assert.isAtLeast(elm.scrollTop, 18)
        //     assert.isAtMost(elm.scrollTop, 20)
        //     var vnode3 = view(0)
        //     patch(vnode2, vnode3)
        //     assert.strictEqual(elm.scrollTop, 0)
        //     document.body.removeChild(mountPoint)
        // })
        // it('can set prop value to empty string', function () {
        //     var vnode1 = h('p', { props: { textContent: 'foo' } })
        //     var { elm } = patch(vnode0, vnode1)
        //     if (!(elm instanceof HTMLParagraphElement)) throw new Error()
        //     assert.strictEqual(elm.textContent, 'foo')
        //     var vnode2 = h('p', { props: { textContent: '' } })
        //     patch(vnode1, vnode2)
        //     assert.strictEqual(elm.textContent, '')
        // })
        // it('preserves memoized props', function () {
        //     var cachedProps = { src: 'http://other/' }
        //     var vnode1 = h('a', { props: cachedProps })
        //     var vnode2 = h('a', { props: cachedProps })
        //     elm = patch(vnode0, vnode1).elm
        //     assert.strictEqual(elm.src, 'http://other/')
        //     elm = patch(vnode1, vnode2).elm
        //     assert.strictEqual(elm.src, 'http://other/')
        // })
        // it('removes custom props', function () {
        //     var vnode1 = h('a', { props: { src: 'http://other/' } })
        //     var vnode2 = h('a')
        //     patch(vnode0, vnode1)
        //     patch(vnode1, vnode2)
        //     assert.strictEqual(elm.src, undefined)
        // })
        // it('cannot remove native props', function () {
        //     var vnode1 = h('a', { props: { href: 'http://example.com/' } })
        //     var vnode2 = h('a')
        //     var { elm: elm1 } = patch(vnode0, vnode1)
        //     if (!(elm1 instanceof HTMLAnchorElement)) throw new Error()
        //     assert.strictEqual(elm1.href, 'http://example.com/')
        //     var { elm: elm2 } = patch(vnode1, vnode2)
        //     if (!(elm2 instanceof HTMLAnchorElement)) throw new Error()
        //     assert.strictEqual(elm2.href, 'http://example.com/')
        // })
        // it('does not delete custom props', function () {
        //     var vnode1 = h('p', { props: { a: 'foo' } })
        //     var vnode2 = h('p')
        //     const { elm } = patch(vnode0, vnode1)
        //     if (!(elm instanceof HTMLParagraphElement)) throw new Error()
        //     assert.strictEqual((elm as any).a, 'foo')
        //     patch(vnode1, vnode2)
        //     assert.strictEqual((elm as any).a, 'foo')
        // })
        describe('using toVNode()', function () {
            it('can remove previous children of the root element', function () {
                var h2 = document.createElement('h2')
                h2.textContent = 'Hello'
                var prevElm = document.createElement('div')
                prevElm.id = 'id'
                prevElm.className = 'class'
                prevElm.appendChild(h2)
                var nextVNode = h('div#id.class', [h('span', 'Hi')])
                elm = patch(toVNode(prevElm), nextVNode).elm
                console.log('elm')
                console.log(elm)
                assert.strictEqual(elm, prevElm)
                assert.strictEqual(elm.tagName, 'DIV')
                assert.strictEqual(elm.id, 'id')
                assert.strictEqual(elm.className, 'class')
                assert.strictEqual(elm.childNodes.length, 1)
                assert.strictEqual(elm.childNodes[0].tagName, 'SPAN')
                assert.strictEqual(elm.childNodes[0].textContent, 'Hi')
            })
            // it('can support patching in a DocumentFragment', function () {
            //     var prevElm = document.createDocumentFragment()
            //     var nextVNode = vnode('', {}, [
            //         h('div#id.class', [h('span', 'Hi')])
            //     ], undefined, prevElm as any)
            //     elm = patch(toVNode(prevElm), nextVNode).elm
            //     assert.strictEqual(elm, prevElm)
            //     assert.strictEqual(elm.nodeType, 11)
            //     assert.strictEqual(elm.childNodes.length, 1)
            //     assert.strictEqual(elm.childNodes[0].tagName, 'DIV')
            //     assert.strictEqual(elm.childNodes[0].id, 'id')
            //     assert.strictEqual(elm.childNodes[0].className, 'class')
            //     assert.strictEqual(elm.childNodes[0].childNodes.length, 1)
            //     assert.strictEqual(elm.childNodes[0].childNodes[0].tagName, 'SPAN')
            //     assert.strictEqual(elm.childNodes[0].childNodes[0].textContent, 'Hi')
            // })
            // it('can remove some children of the root element', function () {
            //     var h2 = document.createElement('h2')
            //     h2.textContent = 'Hello'
            //     var prevElm = document.createElement('div')
            //     prevElm.id = 'id'
            //     prevElm.className = 'class'
            //     var text = document.createTextNode('Foobar')
            //     const reference = {};
            //     (text as any).testProperty = reference // ensures we dont recreate the Text Node
            //     prevElm.appendChild(text)
            //     prevElm.appendChild(h2)
            //     var nextVNode = h('div#id.class', ['Foobar'])
            //     elm = patch(toVNode(prevElm), nextVNode).elm
            //     assert.strictEqual(elm, prevElm)
            //     assert.strictEqual(elm.tagName, 'DIV')
            //     assert.strictEqual(elm.id, 'id')
            //     assert.strictEqual(elm.className, 'class')
            //     assert.strictEqual(elm.childNodes.length, 1)
            //     assert.strictEqual(elm.childNodes[0].nodeType, 3)
            //     assert.strictEqual(elm.childNodes[0].wholeText, 'Foobar')
            //     assert.strictEqual(elm.childNodes[0].testProperty, reference)
            // })
            // it('can remove text elements', function () {
            //     var h2 = document.createElement('h2')
            //     h2.textContent = 'Hello'
            //     var prevElm = document.createElement('div')
            //     prevElm.id = 'id'
            //     prevElm.className = 'class'
            //     var text = document.createTextNode('Foobar')
            //     prevElm.appendChild(text)
            //     prevElm.appendChild(h2)
            //     var nextVNode = h('div#id.class', [h('h2', 'Hello')])
            //     elm = patch(toVNode(prevElm), nextVNode).elm
            //     assert.strictEqual(elm, prevElm)
            //     assert.strictEqual(elm.tagName, 'DIV')
            //     assert.strictEqual(elm.id, 'id')
            //     assert.strictEqual(elm.className, 'class')
            //     assert.strictEqual(elm.childNodes.length, 1)
            //     assert.strictEqual(elm.childNodes[0].nodeType, 1)
            //     assert.strictEqual(elm.childNodes[0].textContent, 'Hello')
            // })
            // it('can work with domApi', function () {
            //     var domApi = {
            //         ...htmlDomApi,
            //         tagName: function (elm: HTMLElement) { return 'x-' + elm.tagName.toUpperCase() }
            //     }
            //     var h2 = document.createElement('h2')
            //     h2.id = 'hx'
            //     h2.setAttribute('data-env', 'xyz')
            //     var text = document.createTextNode('Foobar')
            //     var elm = document.createElement('div')
            //     elm.id = 'id'
            //     elm.className = 'class other'
            //     elm.setAttribute('data', 'value')
            //     elm.appendChild(h2)
            //     elm.appendChild(text)
            //     var vnode = toVNode(elm, domApi)
            //     assert.strictEqual(vnode.sel, 'x-div#id.class.other')
            //     assert.deepEqual(vnode.data, { attrs: { data: 'value' } })
            //     const children = vnode.children as [VNode, VNode]
            //     assert.strictEqual(children[0].sel, 'x-h2#hx')
            //     assert.deepEqual(children[0].data, { attrs: { 'data-env': 'xyz' } })
            //     assert.strictEqual(children[1].text, 'Foobar')
            // })
        })
    })
});