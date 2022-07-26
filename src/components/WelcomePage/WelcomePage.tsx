import Menu from "../Menu/Menu";
import "./WelcomePage.scss";
import { useLocation } from "react-router-dom";
import clsx from "clsx";

const WelcomePage = () => {
  const location = useLocation();
  return (
    <>
      <div
        className={clsx(
          "welcome-page-container",
          location.pathname !== "/Control-Your-Health-App/" &&
            "welcome-page-container--column"
        )}
      >
        <div className="logo">
          <h1
            className={clsx(
              "logo__title",
              location.pathname !== "/Control-Your-Health-App/" &&
                "logo__title--hide"
            )}
          >
            control your health
          </h1>
          <p
            className={clsx(
              "logo__description",
              location.pathname !== "/Control-Your-Health-App/" &&
                "logo__description--hide"
            )}
          >
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis,
            repudiandae repellendus. Laudantium facilis itaque unde consectetur.
            Quas adipisci error aliquam inventore, aliquid commodi dolorum
            tempora, assumenda iusto possimus officiis placeat.
          </p>
        </div>
        <Menu />
      </div>
    </>
  );
};

export default WelcomePage;
