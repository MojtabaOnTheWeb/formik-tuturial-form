import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { FastField as FormikField } from "formik"

import React from "react"

const FormikRadio = (props) => {
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
            <RadioGroup
              className="flex h-1/2 w-full flex-row justify-baseline"
              value={field.value}
              onValueChange={(value) => form.setFieldValue(name, value)}
            >
              {options.map((option) => (
                <div key={option.id} className="flex items-center gap-3">
                  <RadioGroupItem
                    value={option.value}
                    id={option.id}
                    aria-invalid={meta.touched && meta.error ? true : undefined}
                  />
                  <Label htmlFor="r2">
                    {option.value[0].toUpperCase() + option.value.slice(1)}
                  </Label>
                </div>
              ))}
            </RadioGroup>
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

export default FormikRadio

{
  /* <RadioGroup defaultValue="comfortable" className="w-fit">
      <div className="flex items-center gap-3">
        <RadioGroupItem value="default" id="r1" />
        <Label htmlFor="r1">Default</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="comfortable" id="r2" />
        <Label htmlFor="r2">Comfortable</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="compact" id="r3" />
        <Label htmlFor="r3">Compact</Label>
      </div>
    </RadioGroup> */
}
