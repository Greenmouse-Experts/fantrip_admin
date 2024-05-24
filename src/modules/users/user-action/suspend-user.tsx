import { FC, useState } from "react";
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { FcApproval, FcCancel } from "react-icons/fc";
import useDialog from "../../../hooks/useDialog";
import ReusableModal from "../../../components/ReusableModal";
import { toast } from "react-toastify";
import { suspendUser } from "../../../services/api/users-api";
import { useRefetch } from "../../../hooks/useRefetch";

interface Props {
  id: string;
  status: boolean;
}
const SuspendUser: FC<Props> = ({ id, status }) => {
  const [isBusy, setIsBusy] = useState(false);
  const { Dialog, setShowModal } = useDialog();
  const { revalidateRoute } = useRefetch();
  const suspendAction = async () => {
    setIsBusy(true);
    const payload = {
      isSuspended: !status,
    };
    await suspendUser(id, payload)
      .then((res) => {
        toast.success(res.message);
        setIsBusy(false);
        revalidateRoute("get-guests");
        setShowModal(false);
      })
      .catch((err: any) => {
        setIsBusy(false);
        toast.error(err.response.data.message);
      });
  };
  return (
    <div>
      <Menu placement="bottom-start">
        <MenuHandler>
          <Button className="call-btn text-black dark:text-white text-lg">
            {!status ? (
              <p className="flex gap-x-2 capitalize fw-400 fs-600 items-center">
                <span className="w-3 h-3 bg-green-600 circle"></span>{" "}
                <span className="text-green-600">Active</span>
              </p>
            ) : (
              <p className="flex gap-x-2 capitalize fw-400 fs-600 items-center">
                <span className="w-3 h-3 bg-orange-600 circle"></span>{" "}
                <span className="text-orange-600">Inactive</span>
              </p>
            )}
          </Button>
        </MenuHandler>
        <MenuList>
          {!status ? (
            <MenuItem
              className="flex text-red-600 hover:text-red-700 gap-x-2 items-center"
              onClick={() => setShowModal(true)}
            >
              <FcCancel className="text-xl relative top-[1px]" />
              Suspend User
            </MenuItem>
          ) : (
            <MenuItem
              className="flex text-green-600 hover:text-green-700 gap-x-2 items-center"
              onClick={() => setShowModal(true)}
            >
              <FcApproval className="text-xl relative top-[1px]" />
              Unsuspend User
            </MenuItem>
          )}
        </MenuList>
      </Menu>
      <Dialog title="" size="md">
        <ReusableModal
          title={`Are you sure you wat to ${
            !status ? "Suspend" : "Unsuspend"
          } this user`}
          action={() => suspendAction()}
          actionTitle="Suspend User"
          cancelTitle="Close"
          closeModal={() => setShowModal(false)}
          isBusy={isBusy}
        />
      </Dialog>
    </div>
  );
};

export default SuspendUser;
