import Vue from 'vue'
import Counter from '@/views/Counter'
import { mount } from 'vue-test-utils'

// chai断言库
// 相等或不相等
// expect(1 + 1).to.be.equal(2);
// expect(1 + 1).to.be.not.equal(3);

// // 布尔值为true
// expect('hello').to.be.ok;
// expect(false).to.not.be.ok;

// // typeof
// expect('test').to.be.a('string');
// expect({ foo: 'bar' }).to.be.an('object');
// expect(foo).to.be.an.instanceof(Foo);

// // include
// expect([1,2,3]).to.include(2);
// expect('foobar').to.contain('foo');
// expect({ foo: 'bar', hello: 'universe' }).to.include.keys('foo');

// // empty
// expect([]).to.be.empty;
// expect('').to.be.empty;
// expect({}).to.be.empty;

// // match
// expect('foobar').to.match(/^foo/);

describe('counter.vue', () => {
  it('点击按钮之后，count的值应该为1', () => {
    const Constructor = Vue.extend(Counter)
    const vm = new Constructor().$mount()
    const button = vm.$el.querySelector('button')
    const clickEvent = new window.Event('click')
    button.dispatchEvent(clickEvent)
    vm._watcher.run()
    // expect(Number(vm.$el.querySelector('.num').textContent)).to.equal(1)
    expect(Number(vm.$el.querySelector('.num').textContent)).to.equal(1)
  })

  it('count异步更新，count的值应该为1', done => {
    // 获取组件实例
    const Constructor = Vue.extend(Counter)
    // 挂载组件
    const vm = new Constructor().$mount()
    // 获取button
    const button = vm.$el.querySelectorAll('button')[1]
    // 新建点击事件
    const clickEvent = new window.Event('click')
    // 触发点击事件
    button.dispatchEvent(clickEvent)
    // 监听点击事件
    vm._watcher.run()
    window.setTimeout(() => {
      // 断言:count的值应该是数字1
      expect(Number(vm.$el.querySelector('.num').textContent)).to.equal(1)
      done()
    }, 1000)
  })

  it('has a button', () => {
    const wrapper = mount(Counter)
    expect(wrapper.contains('button')).to.be.ok
  })
})

// describe('钩子说明', function() {
//   before(function() {
//     // 在本区块的所有测试用例之前执行
//   })

//   after(function() {
//     // 在本区块的所有测试用例之后执行
//   })

//   beforeEach(function() {
//     // 在本区块的每个测试用例之前执行
//   })

//   afterEach(function() {
//     // 在本区块的每个测试用例之后执行
//   })
// })
