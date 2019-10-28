import _ from 'lodash'
import widgetFields from './widget_fields'

/**
 * uuid: 前端唯一标识
 * dragPosition: 拖动位置信息
 * dragSize: 拖动大小信息
 * fields: 组件表单信息,
 * styleFields: 组件样式信息
 */

class Widget {
  constructor(constructorData) {
    this.uuid = constructorData.uuid
    this.setDragPosition(constructorData)
  }

  setDragPosition(constructorData) {
    switch (constructorData.type) {
      case 'add':
        this.dragPosition = {
          x: 0,
          y: 0
        }
        break
      case 'edit':
        this.dragPosition = {
          x: constructorData.dragPosition.x,
          y: constructorData.dragPosition.y
        }
    }
  }

  setDragSize(constructorData, initDragSize) {
    switch (constructorData.type) {
      case 'add':
        this.dragSize = {
          width: initDragSize.width,
          height: initDragSize.height
        }
        break
      case 'edit':
        this.dragSize = {
          width: constructorData.dragSize.width,
          height: constructorData.dragSize.height
        }
    }
  }

  setFields(constructorData, fields) {
    switch (constructorData.type) {
      case 'add':
        this.fields = { ...fields }
        break
      case 'edit':
        this.fields = _.mapValues(fields, (value, key) => {
          return constructorData[key]
        })
        break
    }
  }

  setStyleFields(constructorData, styleFields) {
    switch (constructorData.type) {
      case 'add':
        this.styleFields = { ...styleFields }
        break
      case 'edit':
        this.styleFields = _.mapValues(styleFields, (value, key) => {
          return constructorData[key]
        })
        break
    }
  }
}

class TestComponentOne extends Widget {
  static initSize = {
    width: 300,
    height: 300
  }
  constructor(constructorData) {
    super(constructorData)

    this.componentKey = 'TestComponentOne'

    this.setDragSize(constructorData, {
      width: TestComponentOne.initSize.width,
      height: TestComponentOne.initSize.height
    })

    this.setFields(constructorData, {
      url: widgetFields.FieldInput('链接'), // 每条数据皆为对象
      ip: widgetFields.FieldInput('地址')
    })
  }
}

class TestComponentTwo extends Widget {
  static initSize = {
    width: 200,
    height: 500
  }
  constructor(constructorData) {
    super(constructorData)

    this.componentKey = 'TestComponentTwo'

    this.setDragSize(constructorData, {
      width: TestComponentTwo.initSize.width,
      height: TestComponentTwo.initSize.height
    })

    this.setStyleFields(constructorData, {
      color: widgetFields.FieldColorPicker(),
      fontSize: widgetFields.FieldSelect('请选择字体大小', ['12px', '20px', '30px'])
    })
  }
}

export { TestComponentOne, TestComponentTwo }
