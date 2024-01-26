import { type FC } from "react";
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
        height={40}
        src={src}
        width={40}
        className="dark:fill-white fill-black"
      />
    </a>
  );
};

const Contribution = () => {
  return (
    <div className="flex flex-col items-center gap-y-6">
      <h4 className="font-extrabold text-primary-500">
        Our WEB 3.0 contribution
      </h4>
      <ul className="flex flex-row gap-4">
        <li>
          <a
            href="https://github.com/dgma/hardhat-sol-bundler"
            target="_blank"
            rel="noreferrer"
          >
            hardhat-sol-bundler
          </a>
        </li>
        <li>
          <a href="#" target="_blank" rel="noreferrer">
            Tyche
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Contribution;
