import { FC, useState } from "react";
import { PlaceItemLocation } from "../../../contracts/routine";
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
import { RiDeleteBin5Fill } from "react-icons/ri";
import useDialog from "../../../hooks/useDialog";
import { toast } from "react-toastify";
import { useRefetch } from "../../../hooks/useRefetch";
import ReusableModal from "../../../components/ReusableModal";
import { deleteTopPlace } from "../../../services/api/place-api";
import EditPlaceModal from "./edit-place";

interface Props {
  data: PlaceItemLocation[];
}
const PlacesTableListing: FC<Props> = ({ data }) => {
  const { revalidateRoute } = useRefetch();
  const [selected, setSelected] = useState<PlaceItemLocation>();
  const [selectedId, setSelectedId] = useState<string>();
  const [isBusy, setIsBusy] = useState<boolean>(false);
  const { Dialog: Edit, setShowModal: ShowEdit } = useDialog();
  const { Dialog: Delete, setShowModal: ShowDelete } = useDialog();

  const openEdit = (item: PlaceItemLocation) => {
    setSelected(item);
    ShowEdit(true);
  };
  // handle delete
  const openDelete = (id: string) => {
    setSelectedId(id);
    ShowDelete(true);
  };
  const handleDelete = async () => {
    setIsBusy(true);
    await deleteTopPlace(selectedId || "")
      .then(() => {
        toast.success("Place deleted Successfully");
        setIsBusy(false);
        ShowDelete(false);
        revalidateRoute("get-top-places");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setIsBusy(false);
        ShowDelete(false);
      });
  };

  // table column configuration and formating
  const columnHelper = createColumnHelper<PlaceItemLocation>();
  const columns = [
    columnHelper.accessor((row) => row.location, {
      id: "Location Name",
      cell: (info) => info.getValue(),
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.picture, {
      id: "Image",
      cell: (info) =>
        info.getValue() && (
          <img
            src={info.getValue() || ""}
            alt="property"
            className="w-28 h-16 object-cover"
          />
        ),
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.createdDate, {
      id: "Created Date",
      cell: (info) => dayjs(info.getValue()).format("DD-MMM-YYYY"),
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.published, {
      id: "Status",
      cell: (info) => (
        <div>
          {info.getValue() ? (
            <p className="flex gap-x-2 items-center">
              <span className="w-3 h-3 bg-green-600 circle"></span>{" "}
              <span className="text-green-600">Active</span>
            </p>
          ) : (
            <p className="flex gap-x-2 items-center">
              <span className="w-3 h-3 bg-orange-600 circle"></span>{" "}
              <span className="text-orange-600">Inactive</span>
            </p>
          )}
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
              onClick={() => openEdit(info.row.original)}
            >
              <BiEdit className="text-lg" />
              Edit
            </MenuItem>
            <MenuItem
              className="flex gap-x-2 items-center"
              onClick={() => openDelete(info.getValue())}
            >
              <RiDeleteBin5Fill className="text-lg" />
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
          next={() => false}
          prev={() => false}
          page={1}
          count={5}
        />
      </div>
      <Edit title="Edit Spot Category Info" size="lg">
        <EditPlaceModal item={selected} close={() => ShowEdit(false)} />
      </Edit>
      <Delete title="" size="sm">
        <ReusableModal
          title="Are you sure you want to delete this place info"
          action={() => handleDelete()}
          actionTitle="Yes, Delete"
          closeModal={() => ShowDelete(false)}
          cancelTitle="No, Close"
          isBusy={isBusy}
        />
      </Delete>
    </div>
  );
};

export default PlacesTableListing;
