import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { FC, useState } from "react";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { HostDetailItem } from "../../../../../contracts/users";
import useDialog from "../../../../../hooks/useDialog";
import { verifyHost } from "../../../../../services/api/users-api";
import { toast } from "react-toastify";
import { useRefetch } from "../../../../../hooks/useRefetch";
import ReusableModal from "../../../../../components/ReusableModal";

interface Props {
  user: HostDetailItem;
}
const HostKycInformation: FC<Props> = ({ user }) => {
  const {
    verifiedAsHost,
    firstName,
    lastName,
    bio,
    twitterUrl,
    facebookUrl,
    linkedinUrl,
    instagramUrl,
    governmentID,
  } = user;

  const { Dialog: Verify, setShowModal: ShowVerify } = useDialog();
  const { revalidateRoute } = useRefetch();
  const [isBusy, setIsBusy] = useState(false);

  // function to verify host
  const verifyHostAction = async () => {
    setIsBusy(true);
    await verifyHost(user.id)
      .then((res) => {
        setIsBusy(false);
        toast.success(res.message);
        revalidateRoute("get-guests-details");
        ShowVerify(false);
      })
      .catch((err: any) => {
        setIsBusy(false);
        toast.error(err.response.data.message);
      });
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <p className="text-xl fw-500">Host Information</p>
        <Menu>
          <MenuHandler>
            <Button className="call-btn">
              <div className="flex gap-x-2 items-center fw-500 !syne justify-center text-orange-600">
                {verifiedAsHost ? (
                  <>
                    <span className="w-3 h-3 circle bg-green-600 block"></span>
                    <p className="fw-600 text-green-600">Verified</p>
                  </>
                ) : (
                  <>
                    <span className="w-3 h-3 circle bg-orange-600 block"></span>
                    <p className="fw-600 text-orange-600">Not Verified</p>
                  </>
                )}
              </div>
            </Button>
          </MenuHandler>
          <MenuList>
            {!verifiedAsHost && (
              <MenuItem
                className="flex gap-x-2 items-center"
                onClick={() => ShowVerify(true)}
              >
                <RiVerifiedBadgeFill className="text-lg" />
                Verify Host
              </MenuItem>
            )}
          </MenuList>
        </Menu>
      </div>
      <div className="mt-5 grid gap-3 fs-500">
        <div className="flex gap-x-2">
          <p>Fullname:</p>
          <p className="opacity-60">{`${firstName} ${lastName}`}</p>
        </div>
        <div className="flex gap-x-2">
          <p>Bio:</p>
          <p className="opacity-60">{bio}</p>
        </div>
        <div className="flex gap-x-2">
          <p>Facebook:</p>
          <Link className="text-primary" to={facebookUrl} target="_blank">
            {facebookUrl}
          </Link>
        </div>
        <div className="flex gap-x-2">
          <p>Twitter:</p>
          <Link className="text-primary" to={twitterUrl} target="_blank">
            {twitterUrl}
          </Link>
        </div>
        <div className="flex gap-x-2">
          <p>LinkedIn:</p>
          <Link className="text-primary" to={linkedinUrl} target="_blank">
            {linkedinUrl}
          </Link>
        </div>
        <div className="flex gap-x-2">
          <p>Instagram:</p>
          <Link className="text-primary" to={instagramUrl} target="_blank">
            {instagramUrl}
          </Link>
        </div>
        <div className="flex gap-x-2">
          <p className="whitespace-nowrap">Government Id:</p>
          <Link className="text-primary" to={governmentID} target="_blank">
            {governmentID}
          </Link>
        </div>
      </div>
      <Verify title="" size="md">
        <ReusableModal
          title="Do you want to verify this host?"
          action={() => verifyHostAction()}
          actionTitle="Verify Host"
          cancelTitle="Close"
          closeModal={() => ShowVerify(false)}
          isBusy={isBusy}
        />
      </Verify>
    </div>
  );
};

export default HostKycInformation;
