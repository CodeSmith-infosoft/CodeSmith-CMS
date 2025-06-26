import PageTitle from "@/components/CommonComponents/PageTitle";
import ExportDatePopup from "@/components/ExportDatePopup";
import UserMain from "@/components/userComponents";
import { downloadUsersCSV } from "@/service/asyncStore/action/user";
import { parseAndExportCSV } from "@/utils/helper";
import { useState } from "react";
import { toast } from "react-toastify";

const User = () => {
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0)

  const handleExport = (startDate: Date | null, endDate: Date | null) => {
    setLoading(true);
    downloadUsersCSV({ startDate, endDate })
      .then((res) => {
        if (!res.success) {
          toast.error(res.message);
        }
        if (!res.includes("Error")) {
          parseAndExportCSV(res, "User_List");
        }
      })
      .finally(() => {
        setLoading(false);
        setIsExportOpen(false);
      });
  };

  return (
    <>
      <div>
        <PageTitle title="Customers" handleExort={() => setIsExportOpen(true)} totalCount={totalCount} />
        <UserMain setTotalCount={setTotalCount} />
      </div>
      <ExportDatePopup
        isOpen={isExportOpen}
        setIsOpen={() => setIsExportOpen(false)}
        handleExport={handleExport}
        loading={loading}
      />
    </>
  );
};

export default User;
