import React from "react";
import { Button } from "../../components/button";
import { Dropdown } from "../../components/dropdown";
import DashboardHeading from "../dashboard/DashboardHeading";
import PostTable from "./PostTable";

const PostManage = () => {
  return (
    <div>
      <DashboardHeading
        title="All posts"
        desc="Manage all posts"
      ></DashboardHeading>
      <div className="flex justify-end gap-5 mb-10">
        <div className="w-full max-w-[200px]">
          <Dropdown>
            <Dropdown.Select placeholder="Category"></Dropdown.Select>
          </Dropdown>
        </div>
        <div className="w-full max-w-[300px]">
          <input
            type="text"
            className="w-full p-4 border border-gray-300 border-solid rounded-lg"
            placeholder="Search post..."
          />
        </div>
      </div>
      <PostTable></PostTable>
      <div className="mt-10 text-center">
        {/* <Pagination></Pagination> */}
        <Button kind="ghost" className="mx-auto w-[200px]">
          See more+
        </Button>
      </div>
    </div>
  );
};

export default PostManage;
