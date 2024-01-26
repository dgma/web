import { useState, type FC } from "react";
import Typewriter from "typewriter-effect";
import { SocialIcons } from "components/SocialIcons";

const writerOptions = {
  delay: 85,
};

const MainBanner: FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <h1 className="text-center text-3xl font-bold dark:text-white text-black">
        <Typewriter
          onInit={(typewriter) => {
            typewriter
              .typeString("Welcome to Dogma Labs")
              .callFunction(() => setIsVisible(true))
              .start();
          }}
          options={writerOptions}
        />
      </h1>
      <SocialIcons invisible={!isVisible} />
    </>
  );
};

export default MainBanner;
