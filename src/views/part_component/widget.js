import _ from 'lodash'

const widgetFields = {
  input(label) {
    return {
      type: 'FieldInput',
      formModel: '',
      label
    }
  },
}

/**
 * uuid: 前端唯一标识
 * dragPosition: 拖动位置信息
 * dragSize: 拖动大小信息
 * fields: 组件表单信息
 */

class Widget {
  constructor(constructorData) {
    this.uuid = constructorData.uuid
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
}

class testComponentOne extends Widget {
  static initSize = {
    width: 300,
    height: 300
  }
  constructor(constructorData) {
    super(constructorData)

    this.setDragPosition(constructorData)

    this.setDragSize(constructorData, {
      width: testComponentOne.initSize.width,
      height: testComponentOne.initSize.height
    })

    this.setFields(constructorData, {
      url: widgetFields.input('链接'), // 每条数据皆为对象
      ip: widgetFields.input('地址')
    })
  }
}

class testComponentTwo extends Widget {
  static initSize = {
    width: 200,
    height: 500
  }
  constructor(constructorData) {
    super(constructorData)

    this.setDragPosition(constructorData)

    this.setDragSize(constructorData, {
      width: testComponentTwo.initSize.width,
      height: testComponentTwo.initSize.height
    })

    this.setFields(constructorData, {
      title: widgetFields.input('标题名称')
    })
  }
}

export { testComponentOne, testComponentTwo }
