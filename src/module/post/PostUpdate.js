import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "../../components/button";
import { Radio } from "../../components/checkbox";
import { Dropdown } from "../../components/dropdown";
import { Field, FieldCheckboxes } from "../../components/field";
import ImageUpload from "../../components/image/ImageUpload";
import { Input } from "../../components/input";
import { Label } from "../../components/label";
import Toggle from "../../components/toggle/Toggle";
import { db } from "../../firebase/firebase-config";
import useFirebaseImage from "../../hooks/useFirebaseImage";
import { postStatus } from "../../utils/constants";
import DashboardHeading from "../dashboard/DashboardHeading";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const PostUpdate = () => {
  const [params] = useSearchParams();
  const postId = params.get("id");
  const navigate = useNavigate();
  const [categories, setCategories] = useState();
  const [content, setContent] = useState("");
  // const [selectCategory, setSelectCategory] = useState("");
  const {
    control,
    handleSubmit,
    watch,
    reset,
    setValue,
    getValues,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: "onChange",
  });
  const watchHot = watch("hot");
  const watchStatus = watch("status");
  const imageUrl = getValues("image");
  const imageName = getValues("image_name");
  const { image, setImage, progress, handleDeleteImage, handleSelectImage } =
    useFirebaseImage(setValue, getValues, imageName, deleteImagePost);
  const updatePostHandler = async (values) => {
    if (!isValid) return;
    try {
      const colRef = doc(db, "posts", postId);
      await updateDoc(colRef, {
        ...values,
        image,
        content,
      });
      toast.success("Update post successfully!!!");
    } catch (error) {
      console.log(error.message);
      toast.error("Update post failed!!!");
    }
    navigate("/manage/posts");
  };
  async function deleteImagePost() {
    const colRef = doc(db, "posts", postId);
    await updateDoc(colRef, {
      image: "",
    });
  }
  useEffect(() => {
    setImage(imageUrl);
  }, [imageUrl, setImage]);
  useEffect(() => {
    async function fetchData() {
      if (!postId) return;
      const colRef = doc(db, "posts", postId);
      const singleDoc = await getDoc(colRef);
      reset(singleDoc && singleDoc.data());
    }
    fetchData();
  }, [postId, reset]);
  useEffect(() => {
    async function getCategoriesData() {
      const colRef = collection(db, "categories");
      const q = query(colRef, where("status", "==", 1));
      const querySnapshot = await getDocs(q);
      let results = [];
      querySnapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategories(results);
    }
    getCategoriesData();
  });
  // const handleClickOption = async (item) => {
  //   const colRef = doc(db, "categories", item.id);
  //   const docData = await getDoc(colRef);
  //   setValue("category", {
  //     id: docData.id,
  //     ...docData.data(),
  //   });
  //   setSelectCategory(item);
  // };
  if (!postId) return;
  return (
    <div>
      <DashboardHeading
        title="Update post"
        desc="Update post content"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(updatePostHandler)}>
        <div className="form-layout">
          <Field>
            <Label>Title</Label>
            <Input
              control={control}
              placeholder="Enter your title"
              name="title"
              required
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              placeholder="Enter your slug"
              name="slug"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Image</Label>
            <ImageUpload
              onChange={handleSelectImage}
              handleDeleteImage={handleDeleteImage}
              className="h-[250px]"
              progress={progress}
              image={image}
            ></ImageUpload>
          </Field>
          <Field>
            <Label>Category</Label>
            <Dropdown>
              <Dropdown.Select placeholder="Select the category"></Dropdown.Select>
              <Dropdown.List>
                {categories?.length > 0 &&
                  categories.map((item) => (
                    <Dropdown.Option
                      key={item.id}
                      // onClick={() => handleClickOption(item)}
                    >
                      {item.name}
                    </Dropdown.Option>
                  ))}
              </Dropdown.List>
            </Dropdown>
            {/* {selectCategory?.name && (
              <span className="inline-block p-3 text-sm font-medium text-green-600 rounded-lg bg-green-50">
                {selectCategory?.name}
              </span>
            )} */}
          </Field>
        </div>
        <div className="mb-10">
          <Field>
            <Label>Content</Label>
            <div className="w-full entry-content">
              <ReactQuill theme="snow" value={content} onChange={setContent} />;
            </div>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Feature post</Label>
            <Toggle
              on={watchHot === true}
              onClick={() => {
                setValue("hot", !watchHot);
              }}
            ></Toggle>
          </Field>
          <Field>
            <Label>Status</Label>
            <FieldCheckboxes>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.APPROVED}
                value={postStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.PENDING}
                value={postStatus.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.REJECTED}
                value={postStatus.REJECTED}
              >
                Reject
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <Button
          type="submit"
          className="mx-auto w-full max-w-[250px]"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Update post
        </Button>
      </form>
    </div>
  );
};

export default PostUpdate;
