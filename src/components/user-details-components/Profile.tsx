import { getUserById } from "@/service/asyncStore/action/user";
import { UserDataType } from "@/types/userTypes";
import { calculateAgeDetails, formatUserAddress } from "@/utils/helper";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Profile = () => {
  const [profileData, setProfileData] = useState<UserDataType | null>(null);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getUserById(id).then(res => {
        if (res.success) {
          setProfileData(res.data)
        }
      });
    }
  }, []);
  return (
    <div className="dashboard-container">
      {/* Main Profile Card */}
      <div className="profile-card">
        <div className="profile-header">
          <div className="avatar">
            <span>R</span>
          </div>
          <div className="user-details">
            <h3 className="name">{profileData?.fname} {profileData?.lname}</h3>
            <div className="location">
              <span className="bullet">•</span>
              <span>{profileData?.country}</span>
            </div>
            <div className="customer-duration">
              <span className="bullet">•</span>
              <span>Customer for {calculateAgeDetails(profileData?.createdAt || '')}</span>
            </div>
          </div>
        </div>

        <div className="customer-details">
          <div className="section-title">Customer</div>

          <div className="details-list">
            <div className="detail-item">
              <span className="label">Email</span>
              <input
                type="text"
                readOnly
                value={profileData?.email}
                className="profile-input"
              />
            </div>

            <div className="detail-item">
              <span className="label">Address</span>
              <input
                type="text"
                readOnly
                value={formatUserAddress({address: profileData?.address, state: profileData?.state})}
                className="profile-input"
              />
            </div>

            <div className="detail-item">
              <span className="label">Phone Number</span>
              <input
                type="text"
                readOnly
                value={profileData?.mobile}
                className="profile-input"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="right-column">
        {/* Orders Card */}
        <div className="orders-card">
          <div className="card-header">
            <div className="orders-info">
              <span className="total-orders-label">Total Orders</span>
              <span className="total-orders-value">{profileData?.orderCount}</span>
              <div className="order-stats">
                <span className="percentage">{((profileData?.monthlyOrderCount || 0)*100)/(profileData?.orderCount || 0)}%</span>
                <span className="separator">•</span>
                <span className="timeframe">{profileData?.monthlyOrderCount} this month</span>
              </div>
            </div>
            <div className="cart-icon">🛒</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
