const ADD_WIDGET = 'ADD_WIDGET'
const UPDATE_WIDGET_POS = 'UPDATE_WIDGET_POS'
const UPDATE_WIDGET_SIZE = 'UPDATE_WIDGET_SIZE'
const REMOVE_WIDGET = 'REMOVE_WIDGET'
const SET_ACTIVEDWIDGET = 'SET_ACTIVEDWIDGET'
const FIELDS_CHANGE = 'FIELDS_CHANGE'

export default {
  namespaced: true,
  state: {
    widgetList: [],
    activedWidget: {},
    bigScreenRatio: {
      width: 1920,
      height: 1080
    },
    magnification: 1
  },
  getters: {
    editorAreaSize: state => {
      return {
        width: (state.bigScreenRatio.width / 2) * state.magnification,
        height: (state.bigScreenRatio.height / 2) * state.magnification
      }
    },

    requestDataList: (state, getters) => {
      const { width, height } = getters.editorAreaSize
      return state.widgetList.map(item => {
        return {
          ...item,
          requestDataPosition: {
            x: item.dragPosition.x / width,
            y: item.dragPosition.y / height
          },
          requestDataSize: {
            width: item.dragSize.width / width,
            height: item.dragSize.height / height
          }
        }
      })
    }
  },
  mutations: {
    [ADD_WIDGET]: (state, oneWidget) => {
      state.widgetList.push(oneWidget)
    },

    [UPDATE_WIDGET_POS]: (state, newDragPosMsg) => {
      const widget = state.widgetList.find(v => v.uuid === newDragPosMsg.uuid)
      widget.dragPosition.x = newDragPosMsg.x
      widget.dragPosition.y = newDragPosMsg.y
    },

    [UPDATE_WIDGET_SIZE]: (state, newDragSizeMsg) => {
      const widget = state.widgetList.find(v => v.uuid === newDragSizeMsg.uuid)
      widget.dragSize.width = newDragSizeMsg.width
      widget.dragSize.height = newDragSizeMsg.height
    },

    [REMOVE_WIDGET]: (state, oneWidget) => {
      state.widgetList = state.widgetList.filter(v => v.uuid === oneWidget.uuid)
    },

    [SET_ACTIVEDWIDGET]: (state, activeWidget) => {
      state.activedWidget = activeWidget
    },

    [FIELDS_CHANGE]: (state, { uuid, fieldType, fieldKey, fieldValue }) => {
      const widget = state.widgetList.find(v => v.uuid === uuid)
      widget[fieldType][fieldKey].formModel = fieldValue
    },

    setBigScreenRatioWidth: (state, width) => {
      state.bigScreenRatio.width = width
    },

    setBigScreenRatioHeight: (state, height) => {
      state.bigScreenRatio.height = height
    },

    increaseMagnification: state => {
      state.magnification = state.magnification + 0.1
    },

    decreaseMagnification: state => {
      state.magnification =
        state.magnification - 0.1 <= 0.1 ? 1 : state.magnification - 0.1
    }
  },
  actions: {
    addWidget: ({ commit }, oneWidget) => {
      commit('ADD_WIDGET', oneWidget)
    },

    removeWidget: ({ commit }, oneWdiget) => {
      commit('REMOVE_WIDGET', oneWdiget)
    },

    setActivedWidget: ({ commit }, activeWdiget) => {
      commit('SET_ACTIVEDWIDGET', activeWdiget)
    },

    updateWidgetDragPos({ commit }, newDragPosMsg) {
      commit('UPDATE_WIDGET_POS', newDragPosMsg)
    },

    updateWidgetDragSize({ commit }, newDragSizeMsg) {
      commit('UPDATE_WIDGET_SIZE', newDragSizeMsg)
    },

    fieldsChange({ commit }, { uuid, fieldType, fieldKey, fieldValue }) {
      commit('FIELDS_CHANGE', { uuid, fieldType, fieldKey, fieldValue })
    }
  }
}
