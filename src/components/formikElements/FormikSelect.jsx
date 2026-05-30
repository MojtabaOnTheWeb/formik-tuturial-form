import React from "react"
import { FastField as FormikField } from "formik"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"

const FormikSelect = (props) => {
  const { name, label, options, placeholder } = props
  return (
    <FormikField name={name}>
      {({ field, meta, form }) => {
        return (
          <>
            <FieldLabel
              className={`${meta.touched && meta.error ? "text-red-400" : null}`}
              htmlFor={name}
            >
              {label}
            </FieldLabel>
            <Select
              value={field.value}
              onValueChange={(value) => form.setFieldValue(name, value)}
            >
              <SelectTrigger
                aria-invalid={meta.touched && meta.error ? true : undefined}
                className="w-full"
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>{placeholder}</SelectLabel>
                  {options.map((option) => (
                    <SelectItem key={option.id} value={option.value}>
                      {option.value}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
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

export default FormikSelect
