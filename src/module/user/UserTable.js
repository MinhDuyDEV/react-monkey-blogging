import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ActionDelete, ActionEdit } from "../../components/action";
import { LabelStatus } from "../../components/label";
import { Table } from "../../components/table";
import { db } from "../../firebase/firebase-config";
import { userRole, userStatus } from "../../utils/constants";

const UserTable = () => {
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  const [filter, setFilter] = useState("");
  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, "users");
      const newRef = filter
        ? query(
            colRef,
            where("name", ">=", filter),
            where("name", "<=", filter + "utf8")
          )
        : colRef;
      onSnapshot(newRef, (snapshot) => {
        const results = [];
        snapshot.forEach((user) => {
          results.push({
            id: user.id,
            ...user.data(),
          });
        });
        setUserList(results);
      });
    }
    fetchData();
  }, [filter]);
  const handleDeleteUser = async (id) => {
    const colRef = doc(db, "users", id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        await deleteDoc(colRef);
      }
    });
  };
  const renderRoleLabel = (role) => {
    switch (role) {
      case userRole.ADMIN:
        return "Admin";
      case userRole.MOD:
        return "Mod";
      case userRole.USER:
        return "User";
      default:
        break;
    }
  };
  const renderLabelStatus = (status) => {
    switch (status) {
      case userStatus.ACTIVE:
        return <LabelStatus type="success">Active</LabelStatus>;
      case userStatus.PENDING:
        return <LabelStatus type="warning">Pending</LabelStatus>;
      case userStatus.BAN:
        return <LabelStatus type="danger">Ban</LabelStatus>;
      default:
        break;
    }
  };
  return (
    <Fragment>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Info</th>
            <th>UserName</th>
            <th>Email address</th>
            <th>Status</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userList.length > 0 &&
            userList.map((user) => (
              <tr key={user.id}>
                <td title={user.id}>{user.id.slice(0, 5) + "..."}</td>
                <td className="whitespace-nowrap">
                  <div className="flex items center gap-x-3">
                    <img
                      src={user.avatar}
                      alt="avatar"
                      className="flex-shrink-0 object-cover w-10 h-10 rounded-lg"
                    />
                    <div className="flex-1">
                      <h3>{user.fullName}</h3>
                      <time className="text-sm text-gray-400">
                        {new Date(
                          user.createdAt.seconds * 1000
                        ).toLocaleDateString("vi-VI")}
                      </time>
                    </div>
                  </div>
                </td>
                <td>{user.username}</td>
                <td>
                  <span title={user.email} className="italic text-gray-400">
                    {user.email.slice(0, 8) + "..."}
                  </span>
                </td>
                <td>{renderLabelStatus(Number(user.status))}</td>
                <td>{renderRoleLabel(Number(user.role))}</td>
                <td>
                  <div className="flex items-center gap-x-3">
                    <ActionEdit
                      onClick={() => navigate(`/profile?id=${user.id}`)}
                    ></ActionEdit>
                    <ActionDelete
                      onClick={() => handleDeleteUser(user.id)}
                    ></ActionDelete>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Fragment>
  );
};

export default UserTable;
