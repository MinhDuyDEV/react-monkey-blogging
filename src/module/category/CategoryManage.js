import React from "react";
import { useState } from "react";
import { Button } from "../../components/button";
import DashboardHeading from "../dashboard/DashboardHeading";

const CategoryManage = () => {
  const [categories, setCategories] = useState([]);
  return (
    <div>
      <DashboardHeading title="Categories" desc="Manage your category">
        <Button kind="ghost" height="60px" to="/manage/add-category">
          Create category
        </Button>
      </DashboardHeading>
    </div>
  );
};

export default CategoryManage;
