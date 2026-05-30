import React from "react"
import { FastField as FormikField } from "formik"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

const FormikInput = (props) => {
  const { name, label, type, placeholder } = props
  return (
    <FormikField name={name}>
      {({ field, meta /* form */ }) => {
        return (
          <>
            <FieldLabel
              className={`${meta.touched && meta.error ? "text-red-400" : null}`}
              htmlFor={name}
            >
              {label}
            </FieldLabel>
            <Input
              type={type}
              placeholder={placeholder}
              id={name}
              {...field}
              aria-invalid={meta.touched && meta.error ? true : undefined}
            />
            {meta.touched && meta.error ? (
              <FieldDescription className="text-red-400">
                {meta.error}
              </FieldDescription>
            ) : null}
          </>
        )
      }}
    </FormikField>
  )
}

export default FormikInput
