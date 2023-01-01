import React from "react";
import styled from "styled-components";
import { Input } from "../components/input";
import { Label } from "../components/label";
import { useForm } from "react-hook-form";
import { IconEyeClose, IconEyeOpen } from "../components/icon";
import { Field } from "../components/field";
import { useState } from "react";
import { Button } from "../components/button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase/firebase-config";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";

const SignUpPageStyles = styled.div`
  min-height: 100vh;
  padding: 40px;
  .logo {
    margin: 0 auto 20px;
  }
  .heading {
    text-align: center;
    color: ${(props) => props.theme.primary};
    font-weight: bold;
    font-size: 40px;
    margin-bottom: 60px;
  }
  .form {
    max-width: 600px;
    margin: 0 auto;
  }
`;

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
    const colRef = collection(db, "users");
    await addDoc(colRef, {
      name: values.fullName,
      email: values.emailAddress,
      password: values.password,
    });
    toast.success("Sign Up successfully!!!", {
      pauseOnHover: false,
    });
    navigate("/");
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve();
    //     console.log(values);
    //     reset({
    //       fullName: "",
    //       emailAddress: "",
    //       password: "",
    //     });
    //   }, 3000);
    // });
  };
  const [togglePassword, setTogglePassword] = useState(false);
  useEffect(() => {
    const arrErrors = Object.values(errors);
    if (arrErrors.length > 0)
      toast.error(arrErrors[0]?.message, {
        pauseOnHover: false,
        delay: 0,
      });
  }, [errors]);
  return (
    <SignUpPageStyles>
      <div className="container">
        <img srcSet="/logo.png 2x" alt="monkey-blogging" className="logo" />
        <h1 className="heading">Monkey Blogging</h1>
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
          <Button
            type="submit"
            style={{
              maxWidth: 300,
              margin: "0 auto",
            }}
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            Sign Up
          </Button>
        </form>
      </div>
    </SignUpPageStyles>
  );
};

export default SignUpPage;
