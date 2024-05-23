import { FaStar } from "react-icons/fa6";
import { RiVerifiedBadgeFill } from "react-icons/ri";

const CondoRatings = () => {
  return (
    <div className="pb-6 border-b border-[#D2D2D2]">
      <div>
        <p className="fw-600 lg:text-lg">Ratings and Reviews</p>
      </div>
      <div className="mt-5 flex gap-x-4 items-end">
        <p className="text-lg lg:text-4xl fw-600">4.8</p>
        <div className="flex gap-x-1 relative -top-2">
          <FaStar className="text-[#9847FE] text-sm" />
          <FaStar className="text-[#9847FE] text-sm" />
          <FaStar className="text-[#9847FE] text-sm" />
          <FaStar className="text-[#9847FE] text-sm" />
          <FaStar className="text-[#9847FE] text-sm" />
        </div>
        <p className="fw-500 pb-1">. 89 ratings</p>
      </div>
      <div className="mt-6 grid gap-5">
        <div>
          <div className="flex gap-x-2 items-center">
            <p className="fw-600">Victor O.</p>
            <RiVerifiedBadgeFill className="text-[#9847FE]" />
          </div>
          <div className="flex gap-x-1 mt-1">
            <FaStar className="text-[#9847FE] text-sm" />
            <FaStar className="text-[#9847FE] text-sm" />
            <FaStar className="text-[#9847FE] text-sm" />
            <FaStar className="text-[#E0E0E0] text-sm" />
            <FaStar className="text-[#E0E0E0] text-sm" />
          </div>
          <p className="mt-6 fs-500">
            "Lovely property! Comfortable and wonderful views."
          </p>
          <p className="mt-2 text-[#9C9C9C] fs-400">Reviewed on 10/12/2023</p>
        </div>
        <div>
          <div className="flex gap-x-2 items-center">
            <p className="fw-600">Tonia H.</p>
            <RiVerifiedBadgeFill className="text-[#9847FE]" />
          </div>
          <div className="flex gap-x-1 mt-1">
            <FaStar className="text-[#9847FE] text-sm" />
            <FaStar className="text-[#9847FE] text-sm" />
            <FaStar className="text-[#9847FE] text-sm" />
            <FaStar className="text-[#E0E0E0] text-sm" />
            <FaStar className="text-[#E0E0E0] text-sm" />
          </div>
          <p className="mt-6 fs-500">
            "The stay here was exactly as advertised. The home was very
            welcoming and clean. My kids will have memories from this place for
            the rest of their lives! Thank you."
          </p>
          <p className="mt-2 text-[#9C9C9C] fs-400">Reviewed on 10/12/2023</p>
        </div>
      </div>
    </div>
  );
};

export default CondoRatings;
