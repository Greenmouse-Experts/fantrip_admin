import { FC, useState } from "react";
import { PropertyItem } from "../../../../contracts/routine";
import { DynamicTable } from "../../../../components/DynamicTable";
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
import useDialog from "../../../../hooks/useDialog";
import EditPropertyModal from "./edit-property";
import ReusableModal from "../../../../components/ReusableModal";
import { deleteProperty } from "../../../../services/api/properties-api";
import { toast } from "react-toastify";
import { useRefetch } from "../../../../hooks/useRefetch";

interface Props {
  data: PropertyItem[];
}
const PropertyTableListing: FC<Props> = ({ data }) => {
  const { revalidateRoute } = useRefetch();
  const [selected, setSelected] = useState<PropertyItem>();
  const [selectedId, setSelectedId] = useState<string>();
  const [isBusy, setIsBusy] = useState<boolean>(false);
  const { Dialog: Edit, setShowModal: ShowEdit } = useDialog();
  const { Dialog: Delete, setShowModal: ShowDelete } = useDialog();

  const openEdit = (item: PropertyItem) => {
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
    await deleteProperty(selectedId || "")
      .then(() => {
        toast.success("Property deleted Successfully");
        setIsBusy(false);
        ShowDelete(false);
        revalidateRoute("get-properties");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setIsBusy(false);
        ShowDelete(false);
      });
  };
  const columnHelper = createColumnHelper<PropertyItem>();
  const columns = [
    columnHelper.accessor((row) => row.name, {
      id: "Property Type",
      cell: (info) => info.getValue(),
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.imageUrl, {
      id: "Image",
      cell: (info) =>
        info.getValue() && (
          <img src={info.getValue() || ""} alt="property" className="w-28" />
        ),
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.by, {
      id: "Created By",
      cell: (info) => info.getValue(),
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.createdDate, {
      id: "Created Date",
      cell: (info) => dayjs(info.getValue()).format("DD-MMM-YYYY"),
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.isPublished, {
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
            <Button className="call-btn text-black text-lg">
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
      <Edit title="Edit Property Info" size="lg">
        <EditPropertyModal item={selected} close={() => ShowEdit(false)} />
      </Edit>
      <Delete title="" size="sm">
        <ReusableModal
          title="Are you sure you want to delete this property info"
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

export default PropertyTableListing;
