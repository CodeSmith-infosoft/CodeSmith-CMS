import logo from "@/assets/image/logo.svg";
import { ReactNode, useEffect, useState } from "react";
import { Collapse, Container } from "react-bootstrap";
import { GiCube } from "react-icons/gi";
import { AiFillInstagram } from "react-icons/ai";
import { FaAngleDown, FaAngleUp, FaCommentAlt, FaFolderMinus, FaPlus, FaUserCircle } from "react-icons/fa";
import { IoLogOutSharp } from "react-icons/io5";
import { RiCoupon5Fill, RiLayoutBottom2Fill, RiNotificationFill } from "react-icons/ri";
import { MdAddLocationAlt, MdDashboard, MdNoteAlt, MdOutlineSupportAgent, MdPersonAddAlt1, MdSubscriptions } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import { BsGlobeCentralSouthAsia, BsStack } from "react-icons/bs";
import { HiChartBar, HiUserGroup } from "react-icons/hi";
import { TfiInfoAlt } from "react-icons/tfi";
import { IoMdClock } from "react-icons/io";
import { HiMiniPhoto } from "react-icons/hi2";
import { PiClockUserBold } from "react-icons/pi";
import { BiSolidPhoneCall } from "react-icons/bi";

type LayoutProps = {
  children: ReactNode;
};

const Layouts = ({ children }: LayoutProps) => {
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  console.log(pathname);

  return (
    <>
      <div className="layout">
        <div className="sidebar">
          <div className="app-menu h-100">
            <div className="menu-logo">
              <img src={logo} alt={logo} />
            </div>
            <div className="menu-items">
              <ul className="mt-5">
                <li className={pathname === "/" ? "active-menu" : ""}>
                  <Link to="/">
                    <MdDashboard size={22} /> Dashboard
                  </Link>{" "}
                </li>
                <li className={pathname === "/techstack" ? "active-menu" : ""}>
                  <Link to="/techstack">
                    <BsStack size={22} /> TechStack
                  </Link>{" "}
                </li>
                <li
                  className={
                    pathname === "/casestudy" ||
                    pathname.split("-")[1] === "casestudy"
                      ? "active-menu"
                      : ""
                  }
                >
                  <Link to="/casestudy">
                    <BsGlobeCentralSouthAsia size={22} /> CaseStudy
                  </Link>{" "}
                </li>
                <li
                  className={
                    pathname === "/career" ||
                    pathname.split("-")[1] === "career"
                      ? "active-menu"
                      : ""
                  }
                >
                  <Link to="/career">
                    <HiChartBar size={22} /> Career
                  </Link>{" "}
                </li>
                <li
                  className={
                    pathname === "/portfolio" ||
                    pathname.split("-")[1] === "portfolio"
                      ? "active-menu"
                      : ""
                  }
                >
                  <Link to="/portfolio">
                    <FaFolderMinus size={22} /> Portfolio
                  </Link>{" "}
                </li>
                <li
                  className={
                    pathname === "/testimonial" ||
                    pathname.split("-")[1] === "testimonial"
                      ? "active-menu"
                      : ""
                  }
                >
                  <Link to="/testimonial">
                    <FaCommentAlt size={22} /> Testimonials
                  </Link>{" "}
                </li>
                <li
                  className={pathname === "/about-us" ? "active-menu" : ""}
                >
                  <Link to="/about-us">
                    <TfiInfoAlt size={22} /> About Us
                  </Link>{" "}
                </li>
                <li
                  className={pathname === "/success-story" ? "active-menu" : ""}
                >
                  <Link to="/success-story">
                    <PiClockUserBold size={22} /> Success Story
                  </Link>{" "}
                </li>
                <li
                  className={
                    pathname === "/business-inquiry" ||
                    pathname === "/hire-inquiry" ||
                    pathname === "/job-application"
                      ? "active-menu"
                      : ""
                  }
                  onClick={() => setOpen(!open)}
                >
                  <div className="d-flex align-items-center menu-items">
                    <Link to="#">
                      <MdOutlineSupportAgent width={22} /> Contact
                    </Link>{" "}
                    <span>
                      {open ? (
                        <FaAngleUp size={18} />
                      ) : (
                        <FaAngleDown size={18} />
                      )}{" "}
                    </span>
                  </div>
                  <Collapse in={open}>
                    <div className="drop-items">
                      <label
                        className={`category-checkbox ${
                          pathname === "/business-inquiry" ? "active" : ""
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/business-inquiry`);
                        }}
                      >
                        <FaPlus /> Business Inquiry
                      </label>
                      <label
                        className={`category-checkbox ${
                          pathname === "/job-application" ? "active" : ""
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/job-application`);
                        }}
                      >
                        <FaPlus /> Job Application
                      </label>
                      <label
                        className={`category-checkbox ${
                          pathname === "/hire-inquiry" ? "active" : ""
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/hire-inquiry`);
                        }}
                      >
                        <FaPlus /> Hire Inquiry
                      </label>
                    </div>
                  </Collapse>
                </li>
                <li className={pathname === "/gallery" ? "active-menu" : ""}>
                  <Link to="/gallery">
                    <HiMiniPhoto size={22} /> Gallery
                  </Link>{" "}
                </li>
                <li
                  className={pathname === "/team-member" || pathname.split("-")[1] === "team" ? "active-menu" : ""}
                >
                  <Link to="/team-member">
                    <HiUserGroup size={22} /> Team Member
                  </Link>{" "}
                </li>
                <li
                  className={
                    pathname === "/blog" || pathname.split("-")[1] === "blog"
                      ? "active-menu"
                      : ""
                  }
                >
                  <Link to="/blog">
                    <MdNoteAlt size={22} /> Blog
                  </Link>{" "}
                </li>
                <li
                  className={pathname === "/get-in-touch" ? "active-menu" : ""}
                >
                  <Link to="/get-in-touch">
                    <BiSolidPhoneCall size={22} /> Get In Touch
                  </Link>{" "}
                </li>
                <li
                  className={pathname === "/subscribers" ? "active-menu" : ""}
                >
                  <Link to="/subscribers">
                    <RiNotificationFill size={22} /> Subscriber
                  </Link>{" "}
                </li>
                <li
                  className={
                    pathname === "/hire-developer" ? "active-menu" : ""
                  }
                >
                  <Link to="/hire-developer">
                    <MdPersonAddAlt1 size={22} /> HireOurDeveloper
                  </Link>{" "}
                </li>
              </ul>
              <div className="logout-btn">
                <button onClick={handleLogout}>
                  <IoLogOutSharp size={22} />
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
        <Container className="main-content">
          <div className="top-bar"></div>

          <div className="children">{children}</div>
        </Container>
      </div>
    </>
  );
};

export default Layouts;
