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
  password: Yup.string().required("Please enter your password!").min(8),
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
                  <FieldLabel htmlFor="name">Full Name</FieldLabel>
                  <FormikField
                    component={Input}
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    name="fullName"
                  />
                  <ErrorMessage name="fullName" />
                </Field>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <FormikField
                    component={Input}
                    id="email"
                    type="text"
                    placeholder="m@example.com"
                    name="email"
                  />
                  <ErrorMessage name="email" />
                </Field>
                <Field>
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <FormikField
                      component={Input}
                      id="password"
                      type="password"
                      name="password"
                    />
                    <ErrorMessage name="password" />
                  </Field>
                  <FieldDescription>
                    Must be at least 8 characters long.
                  </FieldDescription>
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
