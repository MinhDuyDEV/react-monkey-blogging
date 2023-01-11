import React from "react";
import { Button } from "../../components/button";
import DashboardHeading from "../dashboard/DashboardHeading";
import UserTable from "./UserTable";

const UserManage = () => {
  // const handleInputFilter = debounce((e) => {
  //   setFilter(e.target.value);
  // }, 500);
  return (
    <div>
      <DashboardHeading title="Users" desc="Manage your user">
        <Button kind="ghost" height="60px" to="/manage/add-user">
          Add new user
        </Button>
      </DashboardHeading>
      <div className="flex justify-end mb-10">
        <input
          type="text"
          placeholder="Search category..."
          className="px-5 py-4 border border-gray-300 rounded-lg"
          // onChange={handleInputFilter}
        />
      </div>
      <UserTable></UserTable>
    </div>
  );
};

export default UserManage;
