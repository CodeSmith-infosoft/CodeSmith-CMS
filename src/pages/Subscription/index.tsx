import PageTitle from "@/components/CommonComponents/PageTitle";
import ExportDatePopup from "@/components/ExportDatePopup";
import SubscriptionData from "@/components/subscription-component/SubscriptionData";
import { downloadSubscribedUsersCSV } from "@/service/asyncStore/action/subscription";
import { parseAndExportCSV } from "@/utils/helper";
import { useState } from "react";
import { toast } from "react-toastify";

const Subscription = () => {
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0)

  const handleExport = (startDate: Date | null, endDate: Date | null) => {
    downloadSubscribedUsersCSV({ startDate, endDate })
      .then((res) => {
        if (!res.success) {
          toast.error(res.message);
        }
        if (!res.includes("Error")) {
          parseAndExportCSV(res, "user_subscription_list");
        }
      })
      .finally(() => {
        setLoading(false);
        setIsExportOpen(false);
      });
  };
  return (
    <>
      <section>
        <PageTitle
          title="Subscribers"
          handleExort={() => setIsExportOpen(true)}
          totalCount={totalCount}
        />
        <SubscriptionData setTotalCount={setTotalCount} />
      </section>
      <ExportDatePopup
        isOpen={isExportOpen}
        setIsOpen={() => setIsExportOpen(false)}
        handleExport={handleExport}
        loading={loading}
      />
    </>
  );
};

export default Subscription;
