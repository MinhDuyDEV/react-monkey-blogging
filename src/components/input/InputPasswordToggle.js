import React, { Fragment, useState } from "react";
import { IconEyeClose, IconEyeOpen } from "../icon";
import Input from "./Input";

const InputPasswordToggle = ({ control }) => {
  const [togglePassword, setTogglePassword] = useState(false);
  if (!control) return null;
  return (
    <Fragment>
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
    </Fragment>
  );
};

export default InputPasswordToggle;
