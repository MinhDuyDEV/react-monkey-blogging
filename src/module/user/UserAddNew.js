import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "../../components/button";
import { Radio } from "../../components/checkbox";
import { Field, FieldCheckboxes } from "../../components/field";
import { Input } from "../../components/input";
import InputPasswordToggle from "../../components/input/InputPasswordToggle";
import { Label } from "../../components/label";
import { auth, db } from "../../firebase/firebase-config";
import { userStatus, userRole } from "../../utils/constants";
import DashboardHeading from "../dashboard/DashboardHeading";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import slugify from "slugify";

const UserAddNew = () => {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      userName: "",
      avatar: "",
      status: "",
      role: "",
      createdAt: new Date(),
    },
  });
  const watchStatus = watch("status");
  const watchRole = watch("role");
  const handleAddUser = async (values) => {
    if (!isValid) return;
    const newValues = { ...values };
    newValues.status = Number(newValues.status);
    const colRef = collection(db, "users");
    try {
      await addDoc(colRef, {
        username: slugify(values.fullName, { lower: true }),
        ...newValues,
        createdAt: serverTimestamp(),
      });
      await createUserWithEmailAndPassword(
        auth,
        newValues.email,
        newValues.password
      );
      await updateProfile(auth.currentUser, {
        displayName: newValues.fullName,
        photoURL:
          "https://images.unsplash.com/photo-1673340191070-6865e61be364?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80",
      });
      toast.success("Add user successfully!!!", {
        pauseOnHover: false,
        pauseOnFocusLoss: false,
      });
    } catch (error) {
      toast.error(error.message);
    } finally {
      reset({
        fullName: "",
        username: "",
        email: "",
        password: "",
        status: "",
        role: "",
        createdAt: new Date(),
      });
    }
  };
  return (
    <div>
      <DashboardHeading
        title="Add new user"
        desc="Add new user to system"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleAddUser)}>
        <div className="form-layout">
          <Field>
            <Label>Full name</Label>
            <Input
              name="fullName"
              placeholder="Enter your full name"
              control={control}
            ></Input>
          </Field>
          <Field>
            <Label>User name</Label>
            <Input
              name="username"
              placeholder="Enter your username"
              control={control}
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Email</Label>
            <Input
              name="email"
              placeholder="Enter your email"
              control={control}
              type="email"
            ></Input>
          </Field>
          <Field>
            <Label>Password</Label>
            <InputPasswordToggle
              type="password"
              placeholder="Enter your password"
              name="password"
              control={control}
            ></InputPasswordToggle>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Status</Label>
            <FieldCheckboxes>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.ACTIVE}
                value={userStatus.ACTIVE}
              >
                Active
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.PENDING}
                value={userStatus.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.BANNED}
                value={userStatus.BANNED}
              >
                Banned
              </Radio>
            </FieldCheckboxes>
          </Field>
          <Field>
            <Label>Role</Label>
            <FieldCheckboxes>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.ADMIN}
                value={userRole.ADMIN}
              >
                Admin
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.MOD}
                value={userRole.MOD}
              >
                Mod
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.USER}
                value={userRole.USER}
              >
                User
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <Button
          kind="primary"
          className="mx-auto w-[200px]"
          isLoading={isSubmitting}
          disabled={isSubmitting}
          type="submit"
        >
          Add new user
        </Button>
      </form>
    </div>
  );
};

export default UserAddNew;
