import { FC } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/authUser";
import { toast } from "react-toastify";
import Button from "../../components/Button";

interface Props {
  CloseModal: () => void;
}

const LogoutModal: FC<Props> = ({ CloseModal }) => {
  const navigate = useNavigate();
  const {signOut} = useAuth()
  const logoutUser = () => {
    signOut();
    toast.success('Logout Successful')
    navigate("/login");
  };
  return (
    <div>
      <p className="fw-500 text-center text-black pt-3">Are you sure you want to log out</p>
      <div className="flex justify-between mt-10">
        <Button
          title="Cancel"
          onClick={CloseModal}
          altClassName="px-6 py-2 fw-600 text-grad border rounded-full text-primary hover:scale-x-110 duration-100"
        />
        <Button
          title="Logout"
          altClassName="w-24 py-2 btn-primary hover:scale-x-110 duration-100"
          onClick={logoutUser}
        />
      </div>
    </div>
  );
};

export default LogoutModal;
