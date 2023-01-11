import React, { Fragment, useState } from "react";
import { IconEyeClose, IconEyeOpen } from "../icon";
import Input from "./Input";

const InputPasswordToggle = ({
  control,
  type = "",
  placeholder = "Please enter your password",
}) => {
  const [togglePassword, setTogglePassword] = useState(false);
  if (!control) return null;
  type = togglePassword ? "text" : "password";
  return (
    <Fragment>
      <Input
        type={type}
        name="password"
        placeholder={placeholder}
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
    </Fragment>
  );
};

export default InputPasswordToggle;
