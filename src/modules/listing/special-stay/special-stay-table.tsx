import { FC, useState } from "react";
import { SpecialStayItem, StayItem } from "../../../contracts/stay";
import { DynamicTable } from "../../../components/DynamicTable";
import { createColumnHelper } from "@tanstack/react-table";
import ProfileAvatar from "../../../components/ProfileAvatar";
import dayjs from "dayjs";
import ApproveStay from "../listing-action/approve-stay";
import { formatName, formatNumber } from "../../../utils/formatHelp";
import { removeSpecialStay } from "../../../services/api/stay-api";
import { toast } from "react-toastify";
import { useRefetch } from "../../../hooks/useRefetch";
import useDialog from "../../../hooks/useDialog";
import ReusableModal from "../../../components/ReusableModal";

interface Props {
  data: StayItem[];
  page: number;
  count: number;
  next: () => void;
  prev: () => void;
}
const SpecialStayTable: FC<Props> = ({ data, page, count, next, prev }) => {
  const { revalidateRoute } = useRefetch();
  const [isBusy, setIsBusy] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string>("");
  const { Dialog, setShowModal } = useDialog();

  const openDelete = (id: string) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const removeAction = async () => {
    setIsBusy(true);
    await removeSpecialStay(selectedId)
      .then((res) => {
        toast.success(res.message);
        setIsBusy(false);
        revalidateRoute("get-billboard");
        close();
      })
      .catch((err: any) => {
        setIsBusy(false);
        toast.error(err.response.data.message);
      });
  };

  // table column configuration and formating
  const columnHelper = createColumnHelper<SpecialStayItem>();
  const columns = [
    columnHelper.accessor((row) => row.stay.name, {
      id: "Stay Name",
      cell: (info) => (
        <div className="min-w-[230px] flex gap-x-2 items-center">
          {!!info.row.original.stay.photos.length && (
            <img
              src={info.row.original.stay.photos[0]}
              alt="condo-img"
              className="w-[80px] h-[60px] rounded-lg"
            />
          )}
          <p className="w-[160px] whitespace-nowrap">
            {formatName(info.getValue(), 20)}
          </p>
        </div>
      ),
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.stay.description, {
      id: "Description",
      cell: (info) => (
        <p className="whitespace-normal w-[230px]">{info.getValue()}</p>
      ),
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.stay.address, {
      id: "Location",
      cell: (info) => <p>{info.getValue()}</p>,
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.stay.host?.picture, {
      id: "Host Name",
      cell: (info) => (
        <div className="flex items-center gap-x-2 min-w-[180px]">
          <ProfileAvatar
            url={info.getValue()}
            name={`${info.row.original.stay.host?.firstName} ${info.row.original.stay.host?.lastName}`}
            font={18}
            size={40}
            type="dark"
          />
          <p>{`${info.row.original.stay.host?.firstName} ${info.row.original.stay.host?.lastName}`}</p>
        </div>
      ),
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.createdDate, {
      id: "Created Date",
      cell: (info) => dayjs(info.getValue()).format("DD-MMM-YYYY"),
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.stay.approved, {
      id: "Approval Status",
      cell: (info) => (
        <ApproveStay id={info.row.original.id} status={info.getValue()} />
      ),
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.stay.isDisclosed, {
      id: "Host Status",
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
    columnHelper.accessor((row) => row.stay.price, {
      id: "Price",
      cell: (info) => <p>${formatNumber(info.getValue())}</p>,
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.published, {
      id: "Host Status",
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
    columnHelper.accessor((row) => row.stayId, {
      id: "Action",
      cell: (info) => (
        <div>
          <button
            className="text-red-500"
            onClick={() => openDelete(info.getValue())}
          >
            Remove Stay
          </button>
        </div>
      ),
      header: (info) => info.column.id,
    }),
  ];
  return (
    <div>
      <DynamicTable
        columns={columns}
        data={data}
        next={next}
        prev={prev}
        page={page}
        count={count}
      />
      <Dialog title="" size="sm">
        <ReusableModal
          title="Do you want to remove this stay from billboard"
          action={removeAction}
          actionTitle="Remove"
          cancelTitle="Close"
          closeModal={() => setShowModal(false)}
          isBusy={isBusy}
        />
      </Dialog>
    </div>
  );
};

export default SpecialStayTable;
