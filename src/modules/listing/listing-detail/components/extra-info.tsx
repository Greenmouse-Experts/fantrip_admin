import { FC } from "react";
import { StayItem } from "../../../../contracts/stay";
import {
  formatAsNgnMoney,
} from "../../../../utils/formatHelp";
import ProfileAvatar from "../../../../components/ProfileAvatar";
import dayjs from "dayjs";

interface Props {
  stay: StayItem;
}
const ExtraInfo: FC<Props> = ({ stay }) => {
  return (
    <div className="border rounded-lg p-2">
      <p className="fw-500 text-lg">Extra Information</p>
      <div className="mt-5 grid gap-3">
        <div>
          <div className="mt-2">
            <div className="flex items-center gap-x-2 min-w-[180px]">
              <ProfileAvatar
                url={stay.host.picture}
                name={`${stay.host.firstName} ${stay.host.lastName}`}
                font={18}
                size={44}
                type="dark"
              />
              <p className="fw-500">{`${stay.host.firstName} ${stay.host.lastName}`}</p>
            </div>
          </div>
        </div>
        <div className="flex gap-x-3">
          <p>Approval Status:</p>
          <div>
            {stay.approved ? (
              <p className="flex gap-x-2 capitalize fw-400 fs-600 items-center">
                <span className="w-3 h-3 bg-green-600 circle"></span>{" "}
                <span className="text-green-600">Approved</span>
              </p>
            ) : (
              <p className="flex gap-x-2 capitalize fw-400 fs-600 items-center">
                <span className="w-3 h-3 bg-orange-600 circle"></span>{" "}
                <span className="text-orange-600">Pending</span>
              </p>
            )}
          </div>
        </div>
        <div className="flex gap-x-3">
          <p>Stay Status:</p>
          <div>
            {stay.isDisclosed ? (
              <p className="flex gap-x-2 capitalize fw-400 fs-600 items-center">
                <span className="w-3 h-3 bg-green-600 circle"></span>{" "}
                <span className="text-green-600">Approved</span>
              </p>
            ) : (
              <p className="flex gap-x-2 capitalize fw-400 fs-600 items-center">
                <span className="w-3 h-3 bg-orange-600 circle"></span>{" "}
                <span className="text-orange-600">Pending</span>
              </p>
            )}
          </div>
        </div>
        <div className="flex gap-x-3">
          <p>Pricing:</p>
          <p className="fw-500">
            {stay.currency}
            {formatAsNgnMoney(stay.price)} /night
          </p>
        </div>
        <div className="flex gap-x-3">
          <p>Available From:</p>
          <p className="fw-500">{stay.availableFrom}</p>
        </div>
        <div className="flex gap-x-3">
          <p>Available To:</p>
          <p className="fw-500">{stay.availableFrom}</p>
        </div>
        <div className="flex gap-x-3">
          <p>Maximum Guest(s):</p>
          <p className="fw-500">{stay.maxGuests}</p>
        </div>
        <div className="flex gap-x-3">
          <p>Maximum Night(s):</p>
          <p className="fw-500">{stay.maxNights}</p>
        </div>
        <div className="flex gap-x-3">
          <p>Created At:</p>
          <p className="fw-500">
            {dayjs(stay.createdDate).format("DD/MM/YYYY")}
          </p>
        </div>
        <div className="flex gap-x-3">
          <p>Total Review(s):</p>
          <p className="fw-500">{stay.totalReviews}</p>
        </div>
        <div className="flex gap-x-3">
          <p>Average Rating:</p>
          <p className="fw-500">{stay.avgRating}</p>
        </div>
      </div>
    </div>
  );
};

export default ExtraInfo;
