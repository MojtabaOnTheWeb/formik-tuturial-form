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
import {
  Form,
  Formik,
  FieldArray,
  FastField as FormikField,
  type FieldProps,
} from "formik"
import * as Yup from "yup"
import FavoritesField from "./FavoritesField"

/* const emailReg =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ */

const initialValues = {
  fullName: "",
  email: "",
  password: "",
  address: {
    city: "",
    postalCode: "",
  },
  phone: ["", ""],
  favorites: [""],
}
const onSubmit = (values: object, submitProps: object) => {
  console.log(values, submitProps)
  setTimeout(() => {
    submitProps.setSubmitting(false)
  }, 3000)
}

const dangerousPatterns = [
  /<script.*?>.*?<\/script>/gi, // XSS
  /('|--|;|\/\*|\*\/|xp_)/gi, // SQL injection
  /\b(SELECT|INSERT|DELETE|UPDATE|DROP|UNION)\b/gi,
  /(\||&&|;)/g, // command injection
]

const isSafeString = (value: string) => {
  return !dangerousPatterns.some((pattern) => pattern.test(value))
}

const validationSchema = Yup.object({
  fullName: Yup.string()
    .required("Please enter your full name!")
    .test("safe-string", "Incorrect characters!", (value) =>
      isSafeString(value || "")
    ),
  email: Yup.string()
    .required("Please enter your email!")
    .email("Please enter a correct email!")
    .test("safe-string", "Incorrect characters!", (value) =>
      isSafeString(value || "")
    ),
  password: Yup.string()
    .required("Please enter your password!")
    .min(8, "Password must be at least 8 characters!")
    .test("safe-string", "Incorrect characters!", (value) =>
      isSafeString(value || "")
    ),
  address: Yup.object({
    city: Yup.string()
      .required("Please enter your city!")
      .test("safe-string", "Incorrect characters!", (value) =>
        isSafeString(value || "")
      ),
    postalCode: Yup.string()
      .required("Please enter your postal code!")
      .test("safe-string", "Incorrect characters!", (value) =>
        isSafeString(value || "")
      ),
  }),
  phone: Yup.array().of(
    Yup.string()
      .test("safe-string", "Incorrect characters!", (value) =>
        isSafeString(value || "")
      )
      .required("Please enter your number!")
  ),
  favorites: Yup.array().of(
    Yup.string()
      .test("safe-string", "Incorrect characters!", (value) =>
        isSafeString(value || "")
      )
      .required("Please fill this part!")
  ),
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
      validateOnBlur={false}
      validateOnChange={false}
    >
      {(formik) => {
        return (
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
                        {({ field, meta /* form */ }: FieldProps) => {
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
                                  meta.touched && meta.error ? true : undefined
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
                        {({ field, meta /* form */ }: FieldProps) => {
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
                                  meta.touched && meta.error ? true : undefined
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
                    <FieldGroup className="grid max-w-md grid-cols-2">
                      <Field>
                        <FormikField name="address.city">
                          {({ field, meta /* form */ }: FieldProps) => {
                            return (
                              <>
                                <FieldLabel
                                  className={`${meta.touched && meta.error ? "text-red-400" : null}`}
                                  htmlFor="city"
                                >
                                  City
                                </FieldLabel>
                                <Input
                                  type="text"
                                  placeholder="New York"
                                  id="city"
                                  {...field}
                                  aria-invalid={
                                    meta.touched && meta.error
                                      ? true
                                      : undefined
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
                        <FormikField name="address.postalCode">
                          {({ field, meta /* form */ }: FieldProps) => {
                            return (
                              <>
                                <FieldLabel
                                  className={`${meta.touched && meta.error ? "text-red-400" : null}`}
                                  htmlFor="postalCode"
                                >
                                  Postal Code
                                </FieldLabel>
                                <Input
                                  type="text"
                                  placeholder="1234"
                                  id="postalCode"
                                  {...field}
                                  aria-invalid={
                                    meta.touched && meta.error
                                      ? true
                                      : undefined
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
                    </FieldGroup>
                    <FieldGroup className="grid max-w-md grid-cols-2">
                      <Field>
                        <FormikField name="phone[0]">
                          {({ field, meta /* form */ }: FieldProps) => {
                            return (
                              <>
                                <FieldLabel
                                  className={`${meta.touched && meta.error ? "text-red-400" : null}`}
                                  htmlFor="mobilePhone"
                                >
                                  Mobile Phone
                                </FieldLabel>
                                <Input
                                  type="text"
                                  placeholder="0912345678"
                                  id="mobilePhone"
                                  {...field}
                                  aria-invalid={
                                    meta.touched && meta.error
                                      ? true
                                      : undefined
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
                        <FormikField name="phone[1]">
                          {({ field, meta /* form */ }: FieldProps) => {
                            return (
                              <>
                                <FieldLabel
                                  className={`${meta.touched && meta.error ? "text-red-400" : null}`}
                                  htmlFor="telePhone"
                                >
                                  Telephone
                                </FieldLabel>
                                <Input
                                  type="text"
                                  placeholder="0123456789"
                                  id="telePhone"
                                  {...field}
                                  aria-invalid={
                                    meta.touched && meta.error
                                      ? true
                                      : undefined
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
                    </FieldGroup>
                    <Field>
                      <Field>
                        <FieldArray name="favorites">
                          {(props) => <FavoritesField {...props} />}
                        </FieldArray>
                      </Field>
                    </Field>
                    <Field>
                      <Field>
                        <FormikField name="password">
                          {({ field, meta /* form */ }: FieldProps) => {
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
                                    meta.touched && meta.error
                                      ? true
                                      : undefined
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
                      <RippleButton
                        type="submit"
                        disabled={formik.isSubmitting}
                      >
                        Submit
                      </RippleButton>
                    </Field>
                  </FieldGroup>
                </Form>
              </CardContent>
            </Card>
          </div>
        )
      }}
    </Formik>
  )
}
