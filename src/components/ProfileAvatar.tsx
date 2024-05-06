import React from "react";

interface Props {
  url?: string;
  name?: string;
  size?: number;
  font?: number;
  type?: 'dark' | 'normal'
}
const ProfileAvatar: React.FC<Props> = ({ url, name, size, font, type }) => {
  const nameRow = name?.split(" ");
  const firstLetter = nameRow && nameRow[0]?.charAt(0);
  const lastLetter = nameRow && nameRow?.length > 1 && nameRow[1]?.charAt(0);
  if (url) {
    return (
      <img
        src={url}
        alt="profile"
        width={size? size + 5 : size}
        height={size}
        className="circle aspect-square border-2 border-white"
      />
    );
  } else
    return (
      <div
        className={`circle flex gap-x-[1px] justify-center items-center fw-600 ${type === "dark"? 'bg-primary text-white' : 'bg-white text-primary'}`}
        style={{ width: size, height: size }}
      >
        <p style={{ fontSize: font }} className="uppercase">
          {firstLetter}
        </p>
        <p style={{ fontSize: font }} className="uppercase">
          {lastLetter}
        </p>
      </div>
    );
};

export default ProfileAvatar;
