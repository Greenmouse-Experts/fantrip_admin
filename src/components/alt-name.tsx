import { FC } from "react";

interface Props {
  name: string;
  nick: string;
  useNick: boolean;
}
const AltName: FC<Props> = ({ useNick, name, nick }) => {
  if (useNick) {
    return `${nick}`;
  } else return `${name}`;
};

export default AltName;
