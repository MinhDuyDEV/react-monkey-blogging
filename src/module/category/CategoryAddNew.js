import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import slugify from "slugify";
import { Button } from "../../components/button";
import { Radio } from "../../components/checkbox";
import { Field, FieldCheckboxes } from "../../components/field";
import { Input } from "../../components/input";
import { Label } from "../../components/label";
import { db } from "../../firebase/firebase-config";
import { categoryStatus } from "../../utils/constants";
import DashboardHeading from "../dashboard/DashboardHeading";

const CategoryAddNew = () => {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      slug: "",
      status: 1,
      createdAt: new Date(),
    },
  });

  const handleAddNewCategory = async (values) => {
    if (!isValid) return;
    const newValues = { ...values };
    newValues.slug = slugify(newValues.name || newValues.slug, { lower: true });
    newValues.status = Number(newValues.status);
    const colRef = collection(db, "categories");
    try {
      await addDoc(colRef, {
        ...newValues,
        createdAt: serverTimestamp(),
      });
      toast.success("Create new category successfully!!!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      reset({
        name: "",
        slug: "",
        status: 1,
        createdAt: new Date(),
      });
    }
  };
  const watchStatus = watch("status");
  return (
    <div>
      <DashboardHeading
        title="New category"
        desc="Add new category"
      ></DashboardHeading>
      <form autoComplete="off" onSubmit={handleSubmit(handleAddNewCategory)}>
        <div className="form-layout">
          <Field>
            <Label>Name</Label>
            <Input
              control={control}
              name="name"
              placeholder="Enter your category name"
              required
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              name="slug"
              placeholder="Enter your slug"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Status</Label>
            <FieldCheckboxes>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === categoryStatus.APPROVED}
                value={categoryStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === categoryStatus.UNAPPROVED}
                value={categoryStatus.UNAPPROVED}
              >
                Unapproved
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <Button
          kind="primary"
          className="mx-auto w-full max-w-[250px]"
          type="submit"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Add new category
        </Button>
      </form>
    </div>
  );
};

export default CategoryAddNew;
