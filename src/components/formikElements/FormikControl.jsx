import React from "react"
import FormikInput from "./FormikInput"
import FormikPassword from "./FormikPassword"
import FormikSelect from "./FormikSelect"
import FormikRadio from "./FormikRadio"
import FormikCheckbox from "./FormikCheckbox"

const FormikControl = (props) => {
  switch (props.control) {
    case "input":
      return <FormikInput {...props} />
    case "password":
      return <FormikPassword {...props} />
    case "select":
      return <FormikSelect {...props} />
    case "radio":
      return <FormikRadio {...props} />
    case "checkbox":
      return <FormikCheckbox {...props} />
    default:
      break
  }
}

export default FormikControl
