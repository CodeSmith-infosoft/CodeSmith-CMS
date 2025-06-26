import CommonTable from "@/components/CommonComponents/CommonTable";
import PageTitle from "@/components/CommonComponents/PageTitle";
import { getAllSubscribe } from "@/service/asyncStore/action/subscribe";
import { SubscribeItemType } from "@/types/SubscribeType";
import { useEffect, useState } from "react";

const Subscribers = () => {
  const [totalCount, setTotalCount] = useState(0);
  const [productData, setProductData] = useState<SubscribeItemType[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalPages: 0,
    totalRecords: 0,
  });
  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
  ];

  useEffect(() => {
    getBlogData();
  }, [pagination.page]);

  const getBlogData = () => {
    getAllSubscribe({ page: pagination.page, limit: pagination.limit }).then(
      (res) => {
        setProductData(res.data.records);
        setPagination({
          page: res.data.page,
          limit: 10,
          totalPages: res.data.totalPages,
          totalRecords: res.data.totalRecords,
        });
        setTotalCount(res.data.totalRecords || 0);
      }
    );
  };
  return (
    <>
      <PageTitle title="Subscribers" totalCount={totalCount}  />
      <section>
        <CommonTable
          header={columns}
          data={productData}
          isPagination
          limit={pagination.limit}
          page={pagination.page}
          totalPages={pagination.totalPages}
          totalRecords={pagination.totalRecords}
          onPageChange={setPagination}
        />
      </section>
    </>
  );
};

export default Subscribers;
