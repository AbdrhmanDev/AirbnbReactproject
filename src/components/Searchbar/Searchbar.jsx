import React from "react";
import "./Searchbar.css";
import { IoSearch } from "react-icons/io5";
import { useTranslation } from "react-i18next";

const Searchbar = () => {
  const { t } = useTranslation();
  return (
    <>
      <div
        className="d-flex align-items-center bg-white border  rounded-pill shadow-sm px-3 py-1 ms-5 "
        style={{ maxWidth: "500px" }}
      >
        <button className="btn btn-link text-dark fw-semibold text-decoration-none edit-with-search">
          {t("anywhere")}
        </button>
        <div className="vr mx-1"></div>
        <button className="btn btn-link text-dark fw-semibold text-decoration-none edit-with-search">
          {t("any_week")}
        </button>
        <div className="vr mx-1"></div>
        <button className="btn btn-link text-secondary text-decoration-none edit-with-search">
          {t("add_guests")}
        </button>

        <button
          className="btn btn-sm ms-2 rounded-circle d-flex align-items-center justify-content-center"
          style={{ backgroundColor: "#f43f5e", width: "32px", height: "32px" }}
        >
          <IoSearch color="white" />
        </button>
      </div>
    </>
  );
};

export default Searchbar;
