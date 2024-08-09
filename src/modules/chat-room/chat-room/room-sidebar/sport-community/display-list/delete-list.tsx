import { FC } from "react";
import Button from "../../../../../../components/Button";

interface Props {
  handleDelete: () => void;
}
const DeleteList: FC<Props> = ({ handleDelete }) => {
  return (
    <div className="flex justify-between items-center bg-blue-gray-50 p-3 rounded-lg">
      <div className="w-7/12">
        <p>Are you sure you want to delete this community</p>
      </div>
      <div className="flex justify-end">
        <Button
          title={"Yes, Delete"}
          altClassName="btn-primary py-2 px-5"
          onClick={handleDelete}
        />
      </div>
    </div>
  );
};

export default DeleteList;
