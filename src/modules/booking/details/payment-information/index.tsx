import { FC } from "react";
import { TransactItem } from "../../../../contracts/booking";
import { formatNumber, formatStatus } from "../../../../utils/formatHelp";
import dayjs from "dayjs";

interface Props{
    trx: TransactItem;
    service_fee: number;
    currency: string;
}
const PaymentInformation:FC<Props> = ({trx, service_fee, currency}) => {
    const {reference, gateway, subAmount, status, amount, narration, createdDate} = trx
  return (
    <div>
        <div className="mb-2">
        <p className="text-lg lg:text-xl fw-600 syne flex gap-x-2 items-center">
          <span className="bg-pri block w-4 h-4"></span>Payment Info
        </p>
      </div>
      <div>
        <div className="border rounded-xl p-5 grid gap-2">
            <div className="flex gap-x-4 items-center">
                <p className="opacity-75"><span className="w-3 h-3 bg-primary inline-block mr-2"></span>Payment Platform:</p>
                <p className="fw-600 text-lg uppercase text-primary">{gateway}</p>
            </div>
            <div className="flex gap-x-4 items-center">
                <p className="opacity-75"><span className="w-3 h-3 bg-primary inline-block mr-2"></span>Payment Reference:</p>
                <p className="fw-600 text-lg uppercase">{reference}</p>
            </div>
            <div className="flex gap-x-4 items-center">
                <p className="opacity-75"><span className="w-3 h-3 bg-primary inline-block mr-2"></span>Payment Status:</p>
                <p className="fw-600 text-lg uppercase">{formatStatus[status as keyof typeof formatStatus]}</p>
            </div>
            <div className="flex gap-x-4 items-center">
                <p className="opacity-75"><span className="w-3 h-3 bg-primary inline-block mr-2"></span>Stay Amount:</p>
                <p className="fw-600 text-lg uppercase">{currency}{formatNumber(subAmount)}</p>
            </div>
            <div className="flex gap-x-4 items-center">
                <p className="opacity-75"><span className="w-3 h-3 bg-primary inline-block mr-2"></span>Fantrip Service Amount:</p>
                <p className="fw-600 text-lg uppercase">{currency}{formatNumber(service_fee)}</p>
            </div>
            <div className="flex gap-x-4 items-center">
                <p className="opacity-75"><span className="w-3 h-3 bg-primary inline-block mr-2"></span>Total Amount:</p>
                <p className="fw-600 text-lg uppercase">{currency}{formatNumber(amount)}</p>
            </div>
            <div className="flex gap-x-4 items-center">
                <p className="opacity-75"><span className="w-3 h-3 bg-primary inline-block mr-2"></span>Transaction Date:</p>
                <p className="fw-600 text-lg uppercase">{dayjs(createdDate).format('MM:HH ~ DD-MM-YYYY')}</p>
            </div>
            <div className="flex gap-x-4 items-center">
                <p className="opacity-75"><span className="w-3 h-3 bg-primary inline-block mr-2"></span>Payment Naration:</p>
                <p className="fw-600 text-lg">{narration}</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentInformation;
