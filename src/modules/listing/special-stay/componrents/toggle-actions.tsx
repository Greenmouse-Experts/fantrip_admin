import { FC, useState } from "react";
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { FcApproval, FcCancel } from "react-icons/fc";
import { toast } from "react-toastify";
import useDialog from "../../../../hooks/useDialog";
import { useRefetch } from "../../../../hooks/useRefetch";
import { toggleSpecialStay } from "../../../../services/api/stay-api";
import ReusableModal from "../../../../components/ReusableModal";
import { IoChevronDownOutline } from "react-icons/io5";

interface Props {
  id: string;
  status: boolean;
}
const ToggleStayStaus: FC<Props> = ({ id, status }) => {
  const [isBusy, setIsBusy] = useState(false);
  const { Dialog, setShowModal } = useDialog();
  const { revalidateRoute } = useRefetch();
  const approveAction = async () => {
    setIsBusy(true);
    const payload = {
      published: !status,
    };
    await toggleSpecialStay(id, payload)
      .then((res) => {
        toast.success(res.message);
        setIsBusy(false);
        revalidateRoute("get-billboard");
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
            {status ? (
              <p className="flex gap-x-2 capitalize fw-400 fs-600 items-center">
                <span className="w-3 h-3 bg-green-600 circle"></span>{" "}
                <span className="text-green-600">Publish</span>
                <IoChevronDownOutline className="text-green-600"/>
              </p>
            ) : (
              <p className="flex gap-x-2 capitalize fw-400 fs-600 items-center">
                <span className="w-3 h-3 bg-orange-600 circle"></span>{" "}
                <span className="text-orange-600">Unpublish</span>
                <IoChevronDownOutline className="text-orange-600"/>
              </p>
            )}
          </Button>
        </MenuHandler>
        <MenuList>
          {!status ? (
            <MenuItem
              className="flex text-green-600 hover:text-green-700 gap-x-2 items-center"
              onClick={() => setShowModal(true)}
            >
              <FcApproval className="text-xl relative top-[1px]" />
              Publish Stay
            </MenuItem>
          ) : (
            <MenuItem
              className="flex text-red-600 hover:text-red-700 gap-x-2 items-center"
              onClick={() => setShowModal(true)}
            >
              <FcCancel className="text-xl relative top-[1px]" />
              Unpublish Stay
            </MenuItem>
          )}
        </MenuList>
      </Menu>
      <Dialog title="" size="sm">
        <ReusableModal
          title="Are you sure you want to update the staus of this stay"
          action={() => approveAction()}
          actionTitle={status ? "Unpublish" : "Publish"}
          cancelTitle="Close"
          closeModal={() => setShowModal(false)}
          isBusy={isBusy}
        />
      </Dialog>
    </div>
  );
};

export default ToggleStayStaus;
