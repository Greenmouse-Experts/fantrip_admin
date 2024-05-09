import { FC } from "react";
import { UserItem } from "../../../../contracts/users";
import { DynamicTable } from "../../../../components/DynamicTable";
import { createColumnHelper } from "@tanstack/react-table";
import ProfileAvatar from "../../../../components/ProfileAvatar";
import dayjs from "dayjs";

interface Props {
  data: UserItem[];
  count: number;
}
const GuestTableListing: FC<Props> = ({ data, count }) => {
  const columnHelper = createColumnHelper<UserItem>();
  const columns = [
    columnHelper.accessor((row) => row.picture, {
      id: "Guest Name",
      cell: (info) => (
        <div className="flex items-center gap-x-2 min-w-[180px]">
          <ProfileAvatar
            url={info.getValue()}
            name={`${info.row.original.firstName} ${info.row.original.lastName}`}
            font={18}
            size={40}
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
      cell: (info) => info.getValue(),
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.isSuspended, {
      id: "Status",
      cell: (info) => (
        <div>
          {!info.getValue() ? (
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
      id: "Date Joined",
      cell: (info) => dayjs(info.getValue()).format("DD-MMM-YYYY"),
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
          count={count}
        />
      </div>
    </div>
  );
};

export default GuestTableListing;
