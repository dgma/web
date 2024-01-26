import { type FC } from "react";
import cn from "classnames";
import LinkedIn from "/linkedin.svg";
import Twitter from "/twitter.svg";
import Telegram from "/telegram.svg";

type SocImgProps = {
  src: string;
  alt: string;
  href?: string;
};

const SocialImg: FC<SocImgProps> = ({ src, alt, href = "#" }) => {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      <img
        alt={alt}
        height={25}
        src={src}
        width={25}
        className="dark:fill-white fill-black"
      />
    </a>
  );
};

const SocialIcons: FC<{ invisible?: boolean }> = ({ invisible }) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-y-6 pt-6 transition-opacity duration-500",
        {
          "opacity-0": invisible,
          "opacity-1": !invisible,
        },
      )}
    >
      <ul className="flex flex-row gap-4">
        <li>
          <SocialImg
            src={Twitter}
            href="https://twitter.com/DogmaLabs"
            alt="Twitter"
          />
        </li>
        <li>
          <SocialImg
            src={LinkedIn}
            href="https://www.linkedin.com/company/dogma-labs/"
            alt="LinkedIn"
          />
        </li>
        <li>
          <SocialImg
            src={Telegram}
            href="https://t.me/dogmaprotocol"
            alt="Telegram"
          />
        </li>
      </ul>
    </div>
  );
};

export default SocialIcons;
