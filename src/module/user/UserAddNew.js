import { doc, serverTimestamp, setDoc } from "firebase/firestore";
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
import { createUserWithEmailAndPassword } from "firebase/auth";
import slugify from "slugify";
import ImageUpload from "../../components/image/ImageUpload";
import useFirebaseImage from "../../hooks/useFirebaseImage";

const UserAddNew = () => {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    setValue,
    getValues,
    formState: { isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      username: "",
      avatar: "",
      status: "",
      role: "",
      createdAt: new Date(),
    },
  });
  const {
    image,
    progress,
    handleDeleteImage,
    handleResetUpload,
    handleSelectImage,
  } = useFirebaseImage(setValue, getValues);
  const watchStatus = watch("status");
  const watchRole = watch("role");
  const handleCreateUser = async (values) => {
    if (!isValid) return;
    const newValues = { ...values };
    try {
      await createUserWithEmailAndPassword(
        auth,
        newValues.email,
        newValues.password
      );
      await setDoc(doc(db, "users", auth.currentUser.uid), {
        fullName: newValues.fullName,
        email: newValues.email,
        password: newValues.password,
        username: slugify(newValues.username || newValues.fullName, {
          lower: true,
          replacement: " ",
          trim: true,
        }),
        avatar: image,
        status: Number(newValues.status),
        role: Number(newValues.role),
        createdAt: serverTimestamp(),
      });
      toast.success(`Create new user with ${values.email} successfully!!!`, {
        pauseOnHover: false,
        pauseOnFocusLoss: false,
      });
    } catch (error) {
      console.log(error.message);
      toast.error("Can not create new user!!!");
    } finally {
      reset({
        fullName: "",
        email: "",
        password: "",
        username: "",
        avatar: "",
        status: "",
        role: "",
        createdAt: new Date(),
      });
      handleResetUpload();
    }
  };
  return (
    <div>
      <DashboardHeading
        title="Add new user"
        desc="Add new user to system"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleCreateUser)}>
        <div className="mb-10 text-center">
          <ImageUpload
            className="w-[200px] h-[200px] !rounded-full min-h-0 mx-auto"
            onChange={handleSelectImage}
            image={image}
            progress={progress}
            handleDeleteImage={handleDeleteImage}
          ></ImageUpload>
        </div>
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
                checked={Number(watchStatus) === userStatus.BAN}
                value={userStatus.BAN}
              >
                Ban
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
