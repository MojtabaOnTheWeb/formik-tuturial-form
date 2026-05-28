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
import { useFormik } from "formik"
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
    .email("invalidEmail"),
  password: Yup.string().required("Please enter your password!").min(8),
})

/* const validate = (values) => {
  let errors = {
    fullName: "",
    email: "",
    password: "",
  }
  if (!values.fullName) {
    errors.fullName = "Please enter your full name!"
  }
  if (!values.email) {
    errors.email = "Please enter your email!"
  } else if (!emailReg.test(values.email.trim())) {
    errors.email = "invalidEmail"
  }
  if (!values.password) {
    errors.password = "Please enter your password!"
  }
  return errors
} */

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const formik = useFormik({
    initialValues,
    onSubmit,
    // validate,
    validationSchema,
  })

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="relative">
        <ShineBorder />
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <FieldGroup>
              <Field
                data-invalid={
                  formik.errors.fullName && formik.touched.fullName
                    ? "true"
                    : undefined
                }
              >
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  {...formik.getFieldProps("fullName")}
                  aria-invalid={
                    formik.errors.fullName && formik.touched.fullName
                      ? "true"
                      : undefined
                  }
                />
              </Field>
              <Field
                data-invalid={
                  formik.errors.email && formik.touched.email
                    ? "true"
                    : undefined
                }
              >
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="text"
                  placeholder="m@example.com"
                  {...formik.getFieldProps("email")}
                  aria-invalid={
                    formik.errors.email && formik.touched.email
                      ? "true"
                      : undefined
                  }
                />
                {formik.errors.email === "invalidEmail" ? (
                  <FieldDescription className="text-red">
                    Please enter a valid email!
                  </FieldDescription>
                ) : undefined}
              </Field>
              <Field>
                <Field
                  data-invalid={
                    formik.errors.password && formik.touched.password
                      ? "true"
                      : undefined
                  }
                >
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    id="password"
                    type="password"
                    {...formik.getFieldProps("password")}
                    aria-invalid={
                      formik.errors.password && formik.touched.password
                        ? "true"
                        : undefined
                    }
                  />
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
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
