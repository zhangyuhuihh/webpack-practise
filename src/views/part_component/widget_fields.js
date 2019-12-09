
const widgetFields = {
  FieldInput(label) {
    return {
      type: 'FieldInput',
      formModel: '',
      label
    }
  },

  FieldSelect(label, options) {
    return {
      type: 'FieldSelect',
      formModel: options[0],
      label,
      options
    }
  },

  FieldColorPicker() {
    return {
      type: 'FieldColorPicker',
      formModel: 'rgb(0, 0 , 0)'
    }
  }
}

export default widgetFields