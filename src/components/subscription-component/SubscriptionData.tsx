import { getAllSubscribedUsers } from "@/service/asyncStore/action/subscription";
import { subscriptionItemType } from "@/types/subscriptionTypes";
import { useEffect, useState } from "react";
import CommonTable from "../CommonComponents/CommonTable";

type SubscriptionDataPropType = {
  setTotalCount: React.Dispatch<React.SetStateAction<number>>
}

const SubscriptionData = ({setTotalCount}: SubscriptionDataPropType) => {
  const [subscriptionData, setSubscriptionData] = useState<
    subscriptionItemType[]
  >([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalPages: 0,
    totalRecords: 0,
  });

  const columns = [
    {
      title: "User Email",
      dataIndex: "email",
      key: "email",
      cellClass: "product-list-fade-color",
    },
    {
      title: "User Status",
      dataIndex: "isRegistered",
      key: "isRegistered",
      cellClass: "",
      render: (value: boolean) => <span className={`subscription-status ${value}`}>{value ? "• Registered" : "• Non-Registered"}</span>
    },
  ];

  useEffect(() => {
    getAllSubscribedUsers({
      page: pagination.page,
      limit: pagination.limit,
    }).then((res) => {
      if (res.success) {
        setSubscriptionData(res.data.records);
        setPagination({
          page: res.data.page,
          limit: 10,
          totalPages: res.data.totalPages,
          totalRecords: res.data.totalRecords,
        });
        setTotalCount(res.data.totalRecords || 0)
      }
    });
  }, [pagination.page]);
  return (
    <section>
      <CommonTable
        header={columns}
        data={subscriptionData}
        isPagination
        limit={pagination.limit}
        page={pagination.page}
        totalPages={pagination.totalPages}
        totalRecords={pagination.totalRecords}
        onPageChange={setPagination}
      />
    </section>
  );
};

export default SubscriptionData;
