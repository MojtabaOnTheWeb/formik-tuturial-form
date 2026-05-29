import { form } from "motion/react-client"
import React from "react"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { FastField as FormikField } from "formik"
import { PlusIcon, CircleMinus } from "lucide-react"

const FavoritesField = (props) => {
  const { form, push, remove } = props
  const { favorites } = form.values
  console.log(favorites)

  return (
    <>
      <FieldLabel htmlFor="favorites">
        Favorites
        <span
          className="cursor-pointer opacity-80 hover:opacity-100"
          onClick={() => push("")}
        >
          <PlusIcon />
        </span>
      </FieldLabel>
      {favorites.map((fav, i) => {
        return (
          <FormikField name={`favorites[${i}]`}>
            {({ field, meta }) => {
              return (
                <div key={i}>
                  <FieldGroup className="flex flex-row">
                    <Input
                      type="text"
                      placeholder=""
                      {...field}
                      aria-invalid={
                        meta.touched && meta.error ? true : undefined
                      }
                    />
                    {meta.touched && meta.error ? (
                      <FieldDescription className="text-red-400">
                        {meta.error}
                      </FieldDescription>
                    ) : null}
                    {favorites.length > 1 && (
                      <span
                        className="translate-y-1 opacity-80 hover:opacity-100"
                        onClick={() => {
                          console.log(i)

                          remove(i)
                        }}
                      >
                        <CircleMinus />
                      </span>
                    )}
                  </FieldGroup>
                </div>
              )
            }}
          </FormikField>
        )
      })}
    </>
  )
}

export default FavoritesField
