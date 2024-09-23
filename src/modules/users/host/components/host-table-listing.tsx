import { FC, useState } from "react";
import { UserItem } from "../../../../contracts/users";
import { DynamicTable } from "../../../../components/DynamicTable";
import { createColumnHelper } from "@tanstack/react-table";
import ProfileAvatar from "../../../../components/ProfileAvatar";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { MdReadMore } from "react-icons/md";
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { FcApproval } from "react-icons/fc";
import useDialog from "../../../../hooks/useDialog";
import { unverifyHost, verifyHost } from "../../../../services/api/users-api";
import { toast } from "react-toastify";
import ReusableModal from "../../../../components/ReusableModal";
import SuspendUser from "../../user-action/suspend-user";
import { TbUserCancel } from "react-icons/tb";
import { checkIfIsoAndFormat } from "../../../../utils/helper-function";

interface Props {
  data: UserItem[];
  count: number;
  prev: () => void;
  next: () => void;
  refetch: () => void;
}
const HostTableListing: FC<Props> = ({ data, count, next, prev, refetch }) => {
  const [selectedId, setSelectedId] = useState("");
  const [isBusy, setIsBusy] = useState(false);
  const { Dialog: Verify, setShowModal: ShowVerify } = useDialog();
  const { Dialog: Unverify, setShowModal: ShowUnverify } = useDialog();

  const openVerify = (id: string) => {
    setSelectedId(id);
    ShowVerify(true);
  };


  const openUnverify = (id: string) => {
    setSelectedId(id);
    ShowUnverify(true);
  };

  // function to verify host
  const verifyHostAction = async () => {
    setIsBusy(true);
    await verifyHost(selectedId)
      .then((res) => {
        setIsBusy(false);
        toast.success(res.message);
        refetch();
        ShowVerify(false);
      })
      .catch((err: any) => {
        setIsBusy(false);
        toast.error(err.response.data.message);
      });
  };

  // function to unverify host
  const unverifyHostAction = async () => {
    setIsBusy(true);
    await unverifyHost(selectedId)
      .then((res) => {
        setIsBusy(false);
        toast.success(res.message);
        refetch();
        ShowUnverify(false);
      })
      .catch((err: any) => {
        setIsBusy(false);
        toast.error(err.response.data.message);
      });
  };

  const columnHelper = createColumnHelper<UserItem>();
  const columns = [
    columnHelper.accessor((row) => row.picture, {
      id: "Host Name",
      cell: (info) => (
        <div className="flex items-center gap-x-2 min-w-[180px]">
          <ProfileAvatar
            url={info.getValue()}
            name={`${info.row.original.firstName} ${info.row.original.lastName}`}
            font={18}
            size={40}
            type="dark"
          />
          <p>{`${info.row.original.firstName} ${info.row.original.lastName}`}</p>
        </div>
      ),
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.email, {
      id: "Email",
      cell: (info) => info.getValue(),
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.country, {
      id: "Country",
      cell: (info) => checkIfIsoAndFormat(info.getValue()),
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.isSuspended, {
      id: "Status",
      cell: (info) => (
        <SuspendUser id={info.row.original.id} status={info.getValue()} />
      ),
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.verifiedAsHost, {
      id: "Verification",
      cell: (info) => (
        <div>
          <Menu placement="bottom-start">
            <MenuHandler>
              <Button className="call-btn text-black dark:text-white text-lg">
                {info.getValue() ? (
                  <p className="flex gap-x-2 capitalize fw-400 fs-600 items-center">
                    <span className="w-3 h-3 bg-green-600 circle"></span>{" "}
                    <span className="text-green-600">Verified</span>
                  </p>
                ) : (
                  <p className="flex gap-x-2 capitalize fw-400 fs-600 items-center">
                    <span className="w-3 h-3 bg-orange-600 circle"></span>{" "}
                    <span className="text-orange-600">Awaiting</span>
                  </p>
                )}
              </Button>
            </MenuHandler>
            <MenuList>
              {!info.getValue() ? (
                <MenuItem
                  className="flex text-black gap-x-2 items-center"
                  onClick={() => openVerify(info.row.original.id)}
                >
                  <FcApproval className="text-xl relative top-[1px]" />
                  Verify Host
                </MenuItem>
              ) : (
                <MenuItem
                  className="flex text-red-600 gap-x-2 items-center"
                  onClick={() => openUnverify(info.row.original.id)}
                >
                  <TbUserCancel className="text-xl tex-red-600 relative top-[1px]" />
                  Unverify Host
                </MenuItem>
              )}
            </MenuList>
          </Menu>
        </div>
      ),
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.createdDate, {
      id: "Date Joined",
      cell: (info) => dayjs(info.getValue()).format("DD-MMM-YYYY"),
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.id, {
      id: "Action",
      cell: (info) => (
        <Link
          to={`/users/host/${info.getValue()}`}
          className="flex items-center gap-x-1"
        >
          View Details <MdReadMore className="text-xl" />
        </Link>
      ),
      header: (info) => info.column.id,
    }),
  ];
  return (
    <div>
      <div>
        <DynamicTable
          columns={columns}
          data={data}
          next={next}
          prev={prev}
          page={1}
          count={count}
        />
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
      <Unverify title="" size="md">
        <ReusableModal
          title="Do you want to unverify this host?"
          action={() => unverifyHostAction()}
          actionTitle="Unverify Host"
          cancelTitle="Close"
          closeModal={() => ShowUnverify(false)}
          isBusy={isBusy}
        />
      </Unverify>
    </div>
  );
};

export default HostTableListing;
