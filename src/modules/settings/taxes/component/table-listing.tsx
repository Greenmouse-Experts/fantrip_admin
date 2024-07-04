import { FC, useState } from "react";
import { TaxItem } from "../../../../contracts/routine";
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
import ReusableModal from "../../../../components/ReusableModal";
import { toast } from "react-toastify";
import { useRefetch } from "../../../../hooks/useRefetch";
import { deleteTax } from "../../../../services/api/taxes-api";
import EditTaxModal from "./edit-tax";

interface Props {
  data: TaxItem[];
}
const TaxTableListing: FC<Props> = ({ data }) => {
  const { revalidateRoute } = useRefetch();
  const [selected, setSelected] = useState<TaxItem>();
  const [selectedId, setSelectedId] = useState<string>();
  const [isBusy, setIsBusy] = useState<boolean>(false);
  const { Dialog: Edit, setShowModal: ShowEdit } = useDialog();
  const { Dialog: Delete, setShowModal: ShowDelete } = useDialog();

  const openEdit = (item: TaxItem) => {
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
    await deleteTax(selectedId || "")
      .then(() => {
        toast.success("Tax record deleted Successfully");
        setIsBusy(false);
        ShowDelete(false);
        revalidateRoute("get-taxes");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setIsBusy(false);
        ShowDelete(false);
      });
  };
  const columnHelper = createColumnHelper<TaxItem>();
  const columns = [
    columnHelper.accessor((row) => row.country, {
      id: "Country",
      cell: (info) => info.getValue(),
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.rate, {
      id: "Tax Rate (%)",
      cell: (info) => info.getValue(),
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.isActive, {
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
    columnHelper.accessor((row) => row.createdDate, {
      id: "Created Date",
      cell: (info) => dayjs(info.getValue()).format("DD-MMM-YYYY"),
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.id, {
      id: "Action",
      cell: (info) => (
        <Menu placement="bottom-start">
          <MenuHandler>
            <Button className="call-btn dark:text-white text-black text-lg">
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
      <Edit title="Edit Tax Info" size="lg">
        <EditTaxModal item={selected} close={() => ShowEdit(false)} />
      </Edit>
      <Delete title="" size="sm">
        <ReusableModal
          title="Are you sure you want to delete this tax info"
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

export default TaxTableListing;
