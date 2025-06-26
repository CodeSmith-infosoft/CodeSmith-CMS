import Categories from "@/components/categories-components/Categories";
import PageTitle from "@/components/CommonComponents/PageTitle";
import { useState } from "react";

const CategoriesPage = () => {
  const [openCategories, setOpenCategories] = useState(false);
  const [totalCount, setTotalCount] = useState(0)

  const handleCategories = (
    isOpen: boolean,
    setFileList?: React.Dispatch<any>
  ) => {
    setOpenCategories(isOpen);
    if (setFileList) {
      setFileList(null);
    }
  };

  return (
    <>
      <PageTitle
        isExport={false}
        title="Categories"
        button="Categories"
        openCategories={handleCategories}
        totalCount={totalCount}
      />
      <Categories
        openCategories={openCategories}
        handleCategories={handleCategories}
        setTotalCount={setTotalCount}
      />
    </>
  );
};

export default CategoriesPage;
