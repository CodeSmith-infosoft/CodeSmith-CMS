import PageTitle from "@/components/CommonComponents/PageTitle";
import OrderData from "@/components/user-details-components/orderData";
import Profile from "@/components/user-details-components/Profile";

const UserDetails = () => {
  return (
    <section>
      <PageTitle title="Customers Details" subTitle="Customers" subRedirect="/users" isExport={false} />
      <Profile />
      <OrderData />
    </section>
  );
};

export default UserDetails;
