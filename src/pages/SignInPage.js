import React from "react";
import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Field } from "../components/field";
import { Label } from "../components/label";
import { Input } from "../components/input";
import { IconEyeClose, IconEyeOpen } from "../components/icon";
import { Button } from "../components/button";
import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AuthenticationPage from "./AuthenticationPage";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase-config";

const schema = yup.object({
  email: yup
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

const SignInPage = () => {
  const [togglePassword, setTogglePassword] = useState(false);
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onchange",
    resolver: yupResolver(schema),
  });
  const handleSignIn = async (values) => {
    if (!isValid) return;
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      toast.success("Sign In successfully!!!", {
        pauseOnHover: false,
      });
      navigate("/");
    } catch (error) {
      if (error.message.includes("wrong-password"))
        toast.error("It seems your password was wrong");
    }
  };
  useEffect(() => {
    const arrError = Object.values(errors);
    if (arrError.length > 0)
      toast.error(arrError[0]?.message, {
        pauseOnHover: false,
        delay: 0,
      });
  }, [errors]);
  useEffect(() => {
    document.title = "Login Page";
    if (userInfo?.email) navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);
  return (
    <AuthenticationPage>
      <form
        className="form"
        onSubmit={handleSubmit(handleSignIn)}
        autoComplete="off"
      >
        <Field>
          <Label htmlFor="email">Email address</Label>
          <Input
            type="email"
            name="email"
            placeholder="Please enter your email address"
            control={control}
          />
        </Field>
        <Field>
          <Label htmlFor="password">Password</Label>
          <Input
            type={togglePassword ? "text" : "password"}
            name="password"
            placeholder="Please enter your password"
            control={control}
          >
            {togglePassword ? (
              <IconEyeOpen
                onClick={() => setTogglePassword(!togglePassword)}
              ></IconEyeOpen>
            ) : (
              <IconEyeClose
                onClick={() => setTogglePassword(!togglePassword)}
              ></IconEyeClose>
            )}
          </Input>
        </Field>
        <div className="have-account">
          You already have an account?{" "}
          <NavLink to={"/sign-up"}>Register</NavLink>
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
          Sign In
        </Button>
      </form>
    </AuthenticationPage>
  );
};

export default SignInPage;
