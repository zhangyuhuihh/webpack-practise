import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/index.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './components/draggable/vue-draggable-resizable.css'
import VueDraggableResizable from './components/draggable/vue-draggable-resizable.vue'

Vue.component('vue-draggable-resizable', VueDraggableResizable)

Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
