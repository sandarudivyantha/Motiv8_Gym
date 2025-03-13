// src/features/users/User.jsx
import { useGetUsersQuery } from "./usersApiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { memo } from "react";

const User = ({ userId }) => {
  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[userId],
    }),
  });

  const navigate = useNavigate();

  if (user) {
    const handleEdit = () => navigate(`/dash/users/${userId}`);
    const userRoles = user.roles.join(", ");
    const cellStatus = user.active ? "" : "text-gray-400";

    return (
      <tr className="hover:bg-gray-50">
        <td className={`px-6 py-4 whitespace-nowrap ${cellStatus}`}>
          {user.username}
        </td>
        <td className={`px-6 py-4 whitespace-nowrap ${cellStatus}`}>
          {userRoles}
        </td>
        <td className={`px-6 py-4 whitespace-nowrap`}>
          <span
            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
    ${user.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
          >
            {user.active ? "Active" : "Inactive"}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <button
            onClick={handleEdit}
            className="text-blue-600 hover:text-blue-900"
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
      </tr>
    );
  } else return null;
};

const memoizedUser = memo(User);
export default memoizedUser;
