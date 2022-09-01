import { format } from "date-fns";
const UsersRow = ({
  _id,
  username,
  createdAt,
  liked
}) => {
  return (
    <tr>
      <th scope="row">{_id}</th>
      <td>{username}</td>
      <td>{liked.length}</td>
      <td>{format(new Date(createdAt), "PP")}</td>
    </tr>
  );
};

export default UsersRow;
