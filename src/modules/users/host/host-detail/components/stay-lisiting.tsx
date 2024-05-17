import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoExpandSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const HostStayListing = () => {
  const stays = [
    {
      intro:
        "Hey there, I’m Chris! Been a die-hard Liverpool fan since ‘02, it’s more than a passion, it’s family heritage.",
      img: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1711979997/fantrip/Rectangle_20107_afabg0.png",
      room_img:
        "https://res.cloudinary.com/greenmouse-tech/image/upload/v1711980003/fantrip/Rectangle_20108_ycmk5u.png",
      perks: [
        "2 Twin Beds ",
        "Game Day Décor",
        "Sporty Suite",
        "Short Walk to Arena",
      ],
      name: "Arsenal Condo",
    },
    {
      intro:
        "Hey there, I’m Elena, representing the La Albiceleste with pride. My love for football is intertwined with my Argentinian roots.",
      img: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1711979997/fantrip/Rectangle_20107_1_qy0z9z.png",
      room_img:
        "https://res.cloudinary.com/greenmouse-tech/image/upload/v1711980000/fantrip/Rectangle_20108_1_uuqyhw.png",
      perks: ["Soccer Star Stay", "Modern Condo", "I Double Bed"],
      name: "City Crib",
    },
    {
      intro:
        "Hey there, I’m Greg!Die-hard Blue Jays enthusiast. True to the blue and white. Always cheering for the Toronto ball club.",
      img: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1711979996/fantrip/Rectangle_20107_2_tahwx2.png",
      room_img:
        "https://res.cloudinary.com/greenmouse-tech/image/upload/v1711980002/fantrip/Rectangle_20108_2_otb6sq.png",
      perks: ["Medium sized Bed", "Wall 2 Wall Insp...", "15 Min to Arena"],
      name: "Red Devil's Cage",
    },
  ];
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-xl fw-500">Stay Listing</p>
        <p className="fs-400 fw-500 syne text-primary cursor-pointer">
          See All
        </p>
      </div>
      <div className="mt-4">
        <div className="grid gap-3">
          {stays.map((item) => (
            <div className="bg-[#fbdfe7] dark:bg-[#1d1d1d] fs-500 flex gap-x-2 rounded drop-shadow-sm p-1">
              <img
                src={item.room_img}
                alt="room-img"
                className="w-16 h-16 shrink-0"
              />
              <div className="w-full">
                <div className="flex justify-between items-center pr-3">
                  <p className="fw-500">{item.name} (€70)</p>
                  <Link to={""}>
                    <IoExpandSharp className="text-primary" />
                  </Link>
                </div>
                <p className="opacity-60 fs-400">Hotel</p>
                <div className="fs-300 flex gap-x-1 items-center opacity-60">
                  <HiOutlineLocationMarker />
                  Schele, Liverpool, England.
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HostStayListing;
