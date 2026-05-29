import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { ShineBorder } from "./ui/shine-border"
import { RippleButton } from "./ui/ripple-button"
import { ErrorMessage, Form, Formik, FastField as FormikField } from "formik"
import * as Yup from "yup"

/* const emailReg =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ */

const initialValues = {
  fullName: "",
  email: "",
  password: "",
}
const onSubmit = (values: object) => {
  console.log(values)
}

const validationSchema = Yup.object({
  fullName: Yup.string().required("Please enter your full name!"),
  email: Yup.string()
    .required("Please enter your email!")
    .email("Please enter a correct email!"),
  password: Yup.string()
    .required("Please enter your password!")
    .min(8, "Password must be at least 8 characters!"),
})

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  /* const formik = useFormik({
    initialValues,
    onSubmit,
    // validate,
    validationSchema,
  }) */

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card className="relative">
          <ShineBorder />
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Create your account</CardTitle>
          </CardHeader>
          <CardContent>
            <Form>
              <FieldGroup>
                <Field>
                  <FormikField name="fullName">
                    {({ field, form, meta }) => {
                      return (
                        <>
                          <FieldLabel
                            className={`${meta.touched && meta.error ? "text-red-400" : null}`}
                            htmlFor="fullName"
                          >
                            Full Name
                          </FieldLabel>
                          <Input
                            type="text"
                            placeholder="John Doe"
                            id="fullName"
                            {...field}
                            aria-invalid={
                              meta.touched && meta.error ? true : null
                            }
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
                </Field>
                <Field>
                  <FormikField name="email">
                    {({ field, form, meta }) => {
                      return (
                        <>
                          <FieldLabel
                            className={`${meta.touched && meta.error ? "text-red-400" : null}`}
                            htmlFor="email"
                          >
                            Email
                          </FieldLabel>
                          <Input
                            type="text"
                            placeholder="m@example.com"
                            id="email"
                            {...field}
                            aria-invalid={
                              meta.touched && meta.error ? true : null
                            }
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
                </Field>
                <Field>
                  <Field>
                    <FormikField name="password">
                      {({ field, form, meta }) => {
                        return (
                          <>
                            <FieldLabel
                              className={`${meta.touched && meta.error ? "text-red-400" : null}`}
                              htmlFor="password"
                            >
                              Password
                            </FieldLabel>
                            <Input
                              type="password"
                              id="password"
                              {...field}
                              aria-invalid={
                                meta.touched && meta.error ? true : null
                              }
                            />
                            {meta.touched && meta.error ? (
                              <FieldDescription className="text-red-400">
                                {meta.error}
                              </FieldDescription>
                            ) : meta.value.length >= 8 ? (
                              <FieldDescription>
                                Password is okay!
                              </FieldDescription>
                            ) : (
                              <FieldDescription>
                                Must be at least 8 characters long.
                              </FieldDescription>
                            )}
                          </>
                        )
                      }}
                    </FormikField>
                  </Field>
                </Field>
                <Field>
                  {/* <Button type="submit">Create Account</Button> */}
                  <RippleButton type="submit">Submit</RippleButton>
                </Field>
              </FieldGroup>
            </Form>
          </CardContent>
        </Card>
      </div>
    </Formik>
  )
}
