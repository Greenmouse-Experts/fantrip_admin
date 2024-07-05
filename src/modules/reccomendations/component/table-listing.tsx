import { FC } from "react";
import { PlaceItem } from "../../../contracts/routine";
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

interface Props {
  data: PlaceItem[];
}
const ReccomendationsTableListing: FC<Props> = ({ data }) => {

  // table column configuration and formating
  const columnHelper = createColumnHelper<PlaceItem>();
  const columns = [
    columnHelper.accessor((row) => row.name, {
      id: "Place Name",
      cell: (info) => info.getValue(),
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.imageUrl, {
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
    columnHelper.accessor((row) => row.isDisclosed, {
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
              onClick={() => console.log(info.row.original)}
            >
              <BiEdit className="text-lg" />
              Edit
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
    </div>
  );
};

export default ReccomendationsTableListing;
