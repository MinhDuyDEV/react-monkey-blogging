import React from "react";
import { useState } from "react";
import { Button } from "../../components/button";
import { LabelStatus } from "../../components/label";
import { Table } from "../../components/table";
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
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>01</td>
            <td>Frontend Developer</td>
            <td>
              <span className="italic text-gray-400">frontend-developer</span>
            </td>
            <td>
              <LabelStatus type="success">Approved</LabelStatus>
            </td>
            <td></td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default CategoryManage;
