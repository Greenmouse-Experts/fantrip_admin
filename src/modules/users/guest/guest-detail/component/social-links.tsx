import { FC } from "react";
import { FaFacebookF, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { SlSocialInstagram } from "react-icons/sl";
import { Link } from "react-router-dom";

interface Props {
  tweet: string;
  fb: string;
  insta: string;
  link: string;
}
const SocialLinks: FC<Props> = ({ tweet, fb, insta, link }) => {
  return (
    <div>
      <p>Social Links</p>
      <div className="mt-3">
        <ul className="flex gap-x-2">
          {fb && (
            <li>
              <Link
                to={fb}
                className="w-9 h-9 text-white place-center border border-white cursor-pointer circle"
              >
                <FaFacebookF />
              </Link>
            </li>
          )}
          {insta && (
            <li>
              <Link
                to={insta}
                className="w-9 h-9 text-white place-center border border-white cursor-pointer circle"
              >
                <SlSocialInstagram />
              </Link>
            </li>
          )}
          {link && (
            <li>
              <Link
                to={link}
                className="w-9 h-9 text-white place-center border border-white cursor-pointer circle"
              >
                <FaLinkedinIn />
              </Link>
            </li>
          )}
          {tweet && (
            <li>
              <Link
                to={tweet}
                className="w-9 h-9 text-white place-center border border-white cursor-pointer circle"
              >
                <FaXTwitter />
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SocialLinks;
