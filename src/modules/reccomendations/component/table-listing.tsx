import { FC, useState } from "react";
import { DynamicTable } from "../../../components/DynamicTable";
import { createColumnHelper } from "@tanstack/react-table";
import dayjs from "dayjs";
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { ReccomendationItem } from "../../../contracts/reccomendation";
import UserInfoAvatar from "../../../utils/user-info";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin5Line } from "react-icons/ri";
import useDialog from "../../../hooks/useDialog";
import ReusableModal from "../../../components/ReusableModal";
import { toast } from "react-toastify";
import { deletePlace } from "../../../services/api/place-api";
import UpdatePlaceStatus from "./update-place-status";

interface Props {
  data: ReccomendationItem[];
  count: number;
  page: number;
  next: () => void;
  prev: () => void;
  refetch: () => void;
}
const ReccomendationsTableListing: FC<Props> = ({
  data,
  page,
  count,
  next,
  prev,
  refetch,
}) => {
  const navigate = useNavigate();

  // delete modal and action
  const [isBusy, setIsBusy] = useState(false);
  const { Dialog, setShowModal } = useDialog();
  const [selectedId, setSelectedId] = useState("");

  const openDelete = (id: string) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    setIsBusy(true);
    await deletePlace(selectedId || "")
      .then(() => {
        toast.success("Deleted successfully");
        refetch();
        setShowModal(false);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setIsBusy(false);
      });
  };

  // table column configuration and formating
  const columnHelper = createColumnHelper<ReccomendationItem>();
  const columns = [
    columnHelper.accessor((row) => row?.user?.picture, {
      id: "Guest Name",
      cell: (info) => (
        <>
          {" "}
          <UserInfoAvatar
            url={info.getValue() || ""}
            fname={info.row.original?.user?.firstName || ""}
            lname={info.row.original?.user?.lastName || ""}
          />
        </>
      ),
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.spot?.name, {
      id: "Reccomemdation Type",
      cell: (info) => info.getValue(),
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.name, {
      id: "Place Name",
      cell: (info) => info.getValue(),
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.location, {
      id: "Location",
      cell: (info) => info.getValue(),
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.createdDate, {
      id: "Created Date",
      cell: (info) => dayjs(info.getValue()).format("DD-MMM-YYYY"),
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.isDisclosed, {
      id: "Status",
      cell: (info) => (
        <div>
          <UpdatePlaceStatus
            status={info.getValue()}
            id={info.row.original.id}
          />
        </div>
      ),
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.id, {
      id: "Action",
      cell: (info) => (
        <Menu placement="bottom-start">
          <MenuHandler>
            <Button className="call-btn text-black dark:text-white text-lg">
              <BsThreeDotsVertical />
            </Button>
          </MenuHandler>
          <MenuList>
            <MenuItem
              className="flex gap-x-2 items-center"
              onClick={() => navigate(`/reccomendations/${info.getValue()}`)}
            >
              <BiEdit className="text-lg" />
              View Details
            </MenuItem>
            <MenuItem
              className="flex gap-x-2 items-center"
              onClick={() => openDelete(info.getValue())}
            >
              <RiDeleteBin5Line className="text-red-500 text-lg" />
              Delete
            </MenuItem>
          </MenuList>
        </Menu>
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
          page={page}
          count={count}
        />
      </div>
      <Dialog title="" size="sm">
        <ReusableModal
          title="Are you sure you want to delete this area guide reccomendation?"
          action={handleDelete}
          actionTitle="Yes, Delete"
          cancelTitle="No, Close"
          closeModal={() => setShowModal(false)}
          isBusy={isBusy}
        />
      </Dialog>
    </div>
  );
};

export default ReccomendationsTableListing;
