import { getAllUsers } from "@/service/asyncStore/action/user";
import { UserDataType } from "@/types/userTypes";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import UserCard from "./UserCard";

type UserMainPropType = {
  setTotalCount: React.Dispatch<React.SetStateAction<number>>
}

const UserMain = ({setTotalCount}: UserMainPropType) => {
  const [userData, setUserData] = useState<UserDataType[]>([]);
 
  useEffect(() => {
    getAllUsers().then((res) => {
      if (res.success) {
        setUserData(res.data);
        setTotalCount(res?.data?.length || 0)
      }
    });
  }, []);

  return (
    <section>
      <Row>
        {userData.map((user) => (
          <Col xl={3} xxl={2} className="mb-4">
            <UserCard
              user={user}
            />
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default UserMain;
