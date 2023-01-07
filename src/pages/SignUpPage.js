import React, { useEffect } from "react";
import { Input } from "../components/input";
import { Label } from "../components/label";
import { useForm } from "react-hook-form";
import { Field } from "../components/field";
import { Button } from "../components/button";
import { auth, db } from "../firebase/firebase-config";
import AuthenticationPage from "./AuthenticationPage";
import * as yup from "yup";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { NavLink, useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import InputPasswordToggle from "../components/input/InputPasswordToggle";
import slugify from "slugify";

const schema = yup.object().shape({
  fullName: yup.string().required("Please enter your full name"),
  emailAddress: yup
    .string()
    .email("Please enter valid email address")
    .required("Please enter your email address"),
  password: yup
    .string()
    .min(8, "Your password must be at least 8 characters or greater")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        message:
          "Your password must have at least uppercase, 1 lowercase and 1 special characters",
      }
    )
    .required("Please enter your password"),
});

const SignUpPage = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const handleSignUp = async (values) => {
    if (!isValid) return;
    console.log("🚀 ~ file: SignUpPage.js:64 ~ handleSignUp ~ values", values);
    await createUserWithEmailAndPassword(
      auth,
      values.emailAddress,
      values.password
    );
    await updateProfile(auth.currentUser, {
      displayName: values.fullName,
    });
    await setDoc(doc(db, "users", auth.currentUser.uid), {
      name: values.fullName,
      email: values.emailAddress,
      password: values.password,
      username: slugify(values.fullName, { lower: true }),
    });
    toast.success("Sign Up successfully!!!", {
      pauseOnHover: false,
    });
    navigate("/");
  };
  useEffect(() => {
    const arrErrors = Object.values(errors);
    if (arrErrors.length > 0)
      toast.error(arrErrors[0]?.message, {
        pauseOnHover: false,
        delay: 0,
      });
  }, [errors]);
  useEffect(() => {
    document.title = "Register Page";
  }, []);
  return (
    <AuthenticationPage>
      <form
        className="form"
        onSubmit={handleSubmit(handleSignUp)}
        autoComplete="off"
      >
        <Field>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            type="text"
            name="fullName"
            placeholder="Please enter your full name"
            control={control}
          />
        </Field>
        <Field>
          <Label htmlFor="emailAddress">Email address</Label>
          <Input
            type="email"
            name="emailAddress"
            placeholder="Please enter your email address"
            control={control}
          />
        </Field>
        <Field>
          <Label htmlFor="password">Password</Label>
          <InputPasswordToggle control={control}></InputPasswordToggle>
        </Field>
        <div className="have-account">
          You already have an account? <NavLink to={"/sign-in"}>Login</NavLink>
        </div>
        <Button
          type="submit"
          style={{
            width: "100%",
            maxWidth: 300,
            margin: "0 auto",
          }}
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Sign Up
        </Button>
      </form>
    </AuthenticationPage>
  );
};

export default SignUpPage;
