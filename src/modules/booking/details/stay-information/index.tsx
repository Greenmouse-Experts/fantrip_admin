import { FC } from "react";
import { formatNumber, formatStatus } from "../../../../utils/formatHelp";
import { FaStar } from "react-icons/fa6";

interface Props {
  status: string;
  currency: string;
  amount: number;
}
const StayInformation: FC<Props> = ({ status, currency, amount }) => {
  return (
    <div>
      <div className="mb-2">
        <p className="text-lg lg:text-xl fw-600 syne flex gap-x-2 items-center">
          <span className="bg-pri block w-4 h-4"></span>Stay Info
        </p>
      </div>
      <div>
        <div className="border rounded-xl p-5 grid gap-2">
          <div className="flex gap-x-4 items-center">
            <p className="opacity-75">
              <span className="w-3 h-3 bg-primary inline-block mr-2"></span>
              Booking Status:
            </p>
            <p className="fw-600 text-lg uppercase">
              {formatStatus[status as keyof typeof formatStatus]}
            </p>
          </div>
          <div className="flex gap-x-4 items-top">
            <p className="opacity-75 whitespace-nowrap relative top-[1px]">
              <span className="w-3 h-3 bg-primary inline-block mr-2"></span>
              Booking Review:
            </p>
            <div className="">
              <p className="fw-500 text-lg lg:w-6/12">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam
                odit aliquid hic placeat, doloremque vel aut autem neque
                explicabo saepe minima ad consequatur voluptate molestiae enim
                impedit facilis illo quo!
              </p>
              <div className="flex gap-x-2 mt-2">
                <FaStar className="text-pri" />
                <FaStar className="text-pri" />
                <FaStar className="text-pri" />
                <FaStar className="text-pri" />
                <FaStar className="text-pri" />
              </div>
            </div>
          </div>
          <div className="flex gap-x-4 items-center">
            <p className="opacity-75">
              <span className="w-3 h-3 bg-primary inline-block mr-2"></span>
              Payout Amount:
            </p>
            <p className="fw-600 text-lg uppercase">
              {currency}
              {formatNumber(amount)}
            </p>
          </div>
          <div className="flex gap-x-4 items-center">
            <p className="opacity-75">
              <span className="w-3 h-3 bg-primary inline-block mr-2"></span>
              Payout Status:
            </p>
            <p className="fw-600 text-lg uppercase">
              {formatStatus[status as keyof typeof formatStatus]}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StayInformation;
