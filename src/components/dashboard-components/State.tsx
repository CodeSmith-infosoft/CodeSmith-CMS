import { dashboardStatsType } from "@/types/dashboardTypes";
import { Col, Row } from "react-bootstrap";
import { FaCopy } from "react-icons/fa";

const State = ({ dashboardData }: { dashboardData: dashboardStatsType | null }) => {
  return (
    <section className="state">
      <Row>
        <Col>
          <div className="state-card">
            <div className="state-title">
              <h4>Total Orders</h4>
              <h2>{dashboardData?.totalOrders}</h2>
            </div>
            <div className="state-icon" style={{ backgroundColor: "#F4ECFB" }}>
              <FaCopy color="#883DCF" size={18} />
            </div>
          </div>
        </Col>
        <Col>
          <div className="state-card">
            <div className="state-title">
              <h4>Active Orders</h4>
              <h2>{dashboardData?.activeOrders}</h2>
            </div>
            <div className="state-icon" style={{ backgroundColor: "#FFF0EA" }}>
              <FaCopy color="#F86624" size={18} />
            </div>
          </div>
        </Col>
        <Col>
          <div className="state-card">
            <div className="state-title">
              <h4>Completed Orders</h4>
              <h2>{dashboardData?.completedOrders}</h2>
            </div>
            <div className="state-icon" style={{ backgroundColor: "#E9FAF7" }}>
              <FaCopy color="#22CAAD" size={18} />
            </div>
          </div>
        </Col>
        <Col>
          <div className="state-card">
            <div className="state-title">
              <h4>Return Orders</h4>
              <h2>{dashboardData?.returnedOrders}</h2>
            </div>
            <div className="state-icon" style={{ backgroundColor: "#FEECEE" }}>
              <FaCopy color="#EB3D4D" size={18} />
            </div>
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default State;
