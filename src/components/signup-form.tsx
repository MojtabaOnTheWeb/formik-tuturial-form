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
import FormikControl from "./formikElements/FormikControl"
import { useEffect, useState } from "react"

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
const onSubmit = (values, submitProps) => {
  console.log(submitProps)

  setTimeout(() => {
    submitProps.resetForm({
      values: initialValues,
    })
    submitProps.setSubmitting(false)
  }, 3000)
}

const dangerousPatterns = [
  /<script.*?>.*?<\/script>/i, // XSS
  /('|--|;|\/\*|\*\/|xp_)/i, // SQL injection
  /\b(SELECT|INSERT|DELETE|UPDATE|DROP|UNION)\b/i,
  /(\||&&|;)/, // command injection
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

  const [savedData, setSavedData] = useState(null)
  const [myValues, setMyValues] = useState(null)

  const handleSaveData = (formik) => {
    localStorage.setItem("savedData", JSON.stringify(formik.values))
  }

  const handleGetSaveData = () => {
    setMyValues(savedData)
  }

  useEffect(() => {
    setSavedData(JSON.parse(localStorage.getItem("savedData")))
  }, [])

  return (
    <Formik
      initialValues={myValues || initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      validateOnBlur={false}
      validateOnChange={false}
      enableReinitialize
    >
      {(formik) => {
        console.log(formik)

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
                      <FormikControl
                        control="input"
                        type="text"
                        label="Full Name"
                        name="fullName"
                        placeholder="John Smith"
                      />
                    </Field>
                    <Field>
                      <FormikControl
                        control="input"
                        type="text"
                        label="Email"
                        name="email"
                        placeholder="m@example.com"
                      />
                    </Field>
                    <FieldGroup className="grid max-w-md grid-cols-2">
                      <Field>
                        <FormikControl
                          control="input"
                          type="text"
                          label="City"
                          name="address.city"
                          placeholder="New York"
                        />
                      </Field>
                      <Field>
                        <FormikControl
                          control="input"
                          type="text"
                          label="Postal Code"
                          name="address.postalCode"
                          placeholder="4040"
                        />
                      </Field>
                    </FieldGroup>
                    <FieldGroup className="grid max-w-md grid-cols-2">
                      <Field>
                        <FormikControl
                          control="input"
                          type="text"
                          label="Mobile Phone"
                          name="phone[0]"
                          placeholder="09122131223"
                        />
                      </Field>
                      <Field>
                        <FormikControl
                          control="input"
                          type="text"
                          label="Telephone"
                          name="phone[1]"
                          placeholder="01221312233"
                        />
                      </Field>
                    </FieldGroup>
                    <Field>
                      <FieldArray name="favorites">
                        {(props) => <FavoritesField {...props} />}
                      </FieldArray>
                    </Field>
                    <Field>
                      <FormikControl
                        control="password"
                        type="password"
                        label="Password"
                        name="password"
                        placeholder=""
                      />
                    </Field>
                    <Field>
                      <RippleButton
                        type="submit"
                        disabled={formik.isSubmitting}
                      >
                        Submit
                      </RippleButton>
                    </Field>
                    {formik.isValid && formik.dirty ? (
                      <Field>
                        <RippleButton
                          type="button"
                          onClick={() => handleSaveData(formik)}
                        >
                          Save on the system
                        </RippleButton>
                      </Field>
                    ) : undefined}
                    {savedData ? (
                      <Field>
                        <RippleButton type="button" onClick={handleGetSaveData}>
                          Get system info
                        </RippleButton>
                      </Field>
                    ) : undefined}
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
