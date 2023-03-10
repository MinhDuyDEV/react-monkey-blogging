import { doc, getDoc, updateDoc } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
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

const CategoryUpdate = () => {
  const {
    control,
    reset,
    watch,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm({
    mode: "onchange",
    defaultValues: {},
  });
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const categoryId = params.get("id");
  useEffect(() => {
    async function fetchData() {
      const colRef = doc(db, "categories", categoryId);
      const singleDoc = await getDoc(colRef);
      reset(singleDoc.data());
    }
    fetchData();
  }, [categoryId, reset]);
  const watchStatus = watch("status");
  const handleUpdateCategory = async (values) => {
    if (!isValid) return;
    try {
      const colRef = doc(db, "categories", categoryId);
      await updateDoc(colRef, {
        name: values.name,
        slug: slugify(values.name || values.slug, { lower: true }),
        status: Number(values.status),
      });
      toast.success("Update category successfully!!!", {
        pauseOnHover: false,
        pauseOnFocusLoss: false,
      });
    } catch (error) {
      toast.error(error.message);
    } finally {
      navigate("/manage/category");
    }
  };
  if (!categoryId) return null;
  return (
    <div>
      <DashboardHeading
        title="Update category"
        desc={`Update your category id: ${categoryId}`}
      ></DashboardHeading>
      <form autoComplete="off" onSubmit={handleSubmit(handleUpdateCategory)}>
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
          Update category
        </Button>
      </form>
    </div>
  );
};

export default CategoryUpdate;
