import React from "react"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { FastField as FormikField } from "formik"
const FormikCheckbox = (props) => {
  const { name, label, options, placeholder } = props
  return (
    <FormikField name={name}>
      {({ field, meta, form }) => {
        console.log(field)

        return (
          <>
            <FieldLabel
              className={`${meta.touched && meta.error ? "text-red-400" : null}`}
              htmlFor={name}
            >
              {label}
            </FieldLabel>
            <FieldGroup className="flex flex-row items-center justify-baseline">
              {options.map((option) => (
                <Field key={option.id} orientation="horizontal">
                  <Checkbox
                    id={option.id}
                    checked={field.value.includes(option.value)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        form.setFieldValue(name, [...field.value, option.value])
                      } else {
                        form.setFieldValue(
                          name,
                          field.value.filter((v) => v != option.value)
                        )
                      }
                    }}
                  />
                  <FieldLabel htmlFor={option.id}>{option.value}</FieldLabel>
                </Field>
              ))}
            </FieldGroup>
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

export default FormikCheckbox
