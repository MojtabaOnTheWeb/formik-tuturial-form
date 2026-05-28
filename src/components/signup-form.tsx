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

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const emailReg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values)
    },
    validate: (values) => {
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
      } else if (!emailReg.test(values.email)) {
        errors.email = "invalidEmail"
      }
      if (!values.password) {
        errors.password = "Please enter your password!"
      }
      return errors
    },
  })

  console.log(formik.errors)

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
                  name="fullName"
                  value={formik.values.fullName}
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
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
                  name="email"
                  value={formik.values.email}
                  id="email"
                  type="text"
                  placeholder="m@example.com"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
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
                    name="password"
                    value={formik.values.password}
                    id="password"
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
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
