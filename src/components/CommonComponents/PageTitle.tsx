import { FaCaretRight, FaPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

type PageTitleType = {
  title: string;
  subTitle?: string;
  cancelBtn?: boolean;
  openCategories?: (isOpen: boolean) => void;
  button?: string;
  path?: string;
  onSubmit?: (data: any) => void;
  onCancel?: () => void;
  handleProductPopup?: React.Dispatch<React.SetStateAction<boolean>>;
  totalCount?: number;
  subRedirect?: string;
  cancelPath?: string;
};

const PageTitle = ({
  path,
  title,
  subTitle,
  cancelBtn,
  cancelPath,
  button,
  openCategories,
  onSubmit,
  onCancel,
  totalCount,
  subRedirect,
}: PageTitleType) => {
  const navigate = useNavigate();
  return (
    <section className="page-title">
      <div className="title">
        <h2>
          {title} {totalCount ? `(${totalCount})` : ""}
        </h2>
        <div className="sub-title">
          <Link to="/">
            {" "}
            <span className="sub-title-1">Dashboard</span>
          </Link>
          {subTitle && (
            <>
              <FaCaretRight />
              <span
                className="sub-title-1 cursor-pointer"
                onClick={() => navigate(subRedirect ? subRedirect : `/${subTitle.toLowerCase()}`)}
              >
                {subTitle}
              </span>
            </>
          )}
          <FaCaretRight />
          <span>{title}</span>
        </div>
      </div>
      <div className="title-btn">
        {cancelBtn ? (
          <>
            <Link to={cancelPath || "/"}>
              {" "}
              <button className="btn-1-cancel">Cancel</button>
            </Link>
            <button className="btn-1-save" onClick={onSubmit}>
              Save
            </button>
          </>
        ) : button === "subCategories" ? (
          <>
            <button className="btn-1-cancel" onClick={onCancel}>
              Cancel{" "}
            </button>
            <button className="btn-1-save" onClick={onSubmit}>
              Save{" "}
            </button>
          </>
        ) : (
          <>
            {path ? (
              <Link rel="stylesheet" to={path}>
                {" "}
                <button>
                  <FaPlus /> Add {button}{" "}
                </button>{" "}
              </Link>
            ) : button ? (
              <button onClick={() => openCategories && openCategories(true)}>
                <FaPlus /> Add {button}{" "}
              </button>
            ) : (
              <></>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default PageTitle;
