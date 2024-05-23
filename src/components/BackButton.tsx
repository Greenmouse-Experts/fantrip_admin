import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(-1)}
      className="flex gap-x-2 items-center cursor-pointer"
    >
      <IoArrowBack />
      <span>Back</span>
    </div>
  );
};

export default BackButton;
