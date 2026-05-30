import React from "react"
import FormikInput from "./FormikInput"
import FormikPassword from "./FormikPassword"

const FormikControl = (props) => {
  switch (props.control) {
    case "input":
      return <FormikInput {...props} />
    case "password":
      return <FormikPassword {...props} />
  }
}

export default FormikControl
