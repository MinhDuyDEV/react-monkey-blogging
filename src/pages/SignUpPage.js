import React from "react";
import styled from "styled-components";
import { Input } from "../components/input";
import { Label } from "../components/label";
import { useForm } from "react-hook-form";
import { IconEyeClose, IconEyeOpen } from "../components/icon";
import { Field } from "../components/field";
import { useState } from "react";
import { Button } from "../components/button";
import { LoadingSpinner } from "../components/loading";

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

const SignUpPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    watch,
  } = useForm({});
  const handleSignUp = (values) => {
    console.log(values);
  };
  const [togglePassword, setTogglePassword] = useState(false);
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
          <Button type="submit">Sign Up</Button>
        </form>
      </div>
    </SignUpPageStyles>
  );
};

export default SignUpPage;
