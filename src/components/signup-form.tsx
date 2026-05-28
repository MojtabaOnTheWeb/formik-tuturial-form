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
  const formik = useFormik({
    initialValues: {
      fullName: "Moji",
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values)
    },
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
              <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input
                  name="fullName"
                  value={formik.values.fullName}
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  onChange={formik.handleChange}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  name="email"
                  value={formik.values.email}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  onChange={formik.handleChange}
                />
              </Field>
              <Field>
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    name="password"
                    value={formik.values.password}
                    id="password"
                    type="password"
                    required
                    onChange={formik.handleChange}
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
