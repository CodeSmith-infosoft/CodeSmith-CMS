import { Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { getPopularProductList } from "@/service/asyncStore/action/hireDev";
import { ProductDataType } from "@/types/hireDevTypes";
import { useNavigate } from "react-router-dom";

const BestSellers = () => {
  const [productData, setProductData] = useState<ProductDataType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getPopularProductList().then((res) => {
      if (res.success) {
        const mainProducts = res.data.slice(0, 3);
        setProductData(mainProducts);
      }
    });
  }, []);

  return (
    <section className="best-sellers">
      <div className="title">
        Best Sellers
        <button onClick={() => navigate("/product")}>See All</button>
      </div>
      <Table>
        <thead>
          <tr>
            <th>
              <div className="pro-menu">Product </div>
            </th>
            <th>Sales</th>
            <th>
              <div className="pro-menu">SKU </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {productData.length ? (
            productData.map((data) => (
              <tr>
                <td>
                  <div className="product">
                    <img
                      src={import.meta.env.VITE_IMAGE_DOMAIN + data.image[0]}
                      alt="avatar"
                    />
                    <div className="product-title">
                      <h5 className="two-line-clamp">{data.title}</h5>
                    </div>
                  </div>
                </td>
                <td>{data.salesCount}</td>
                <td>
                  <div className="total">
                    <span>{data.sku}</span>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <></>
          )}
        </tbody>
      </Table>
    </section>
  );
};

export default BestSellers;
