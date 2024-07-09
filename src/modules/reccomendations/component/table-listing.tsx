import { FC } from "react";
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

interface Props {
  data: ReccomendationItem[];
  count: number;
  page: number;
  next: () => void;
  prev: () => void;
}
const ReccomendationsTableListing: FC<Props> = ({
  data,
  page,
  count,
  next,
  prev,
}) => {
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
              View Details
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
    </div>
  );
};

export default ReccomendationsTableListing;
