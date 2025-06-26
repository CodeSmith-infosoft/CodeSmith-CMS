import "@/assets/sass/index.scss";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import ProductsPage from "./pages/products";
import SingleProductPage from "./pages/single-product";
import CategoriesPage from "./pages/Categories";
import OrdersPage from "./pages/orders";
import { Slide, ToastContainer } from "react-toastify";
import RequireAuth from "./routes/RequireAuth";
import RejectAuth from "./routes/RejectAuth";
import Login from "./pages/Login";
import { MainProvider } from "./context/mainContext";
import SubCategoriesPage from "./pages/Categories/subCategory";
import OrderDetails from "./components/orders-components/OrderDetails";
import User from "./pages/User";
import UserDetails from "./pages/UserDetails";
import CouponDetails from "./pages/CouponDetails";
import AddCoupon from "./pages/AddCoupon";
import MarketplaceManager from "./pages/MarketplaceManager";
import SocialMedia from "./pages/SocialMedia";
import HomeBanner from "./pages/HomeBanner";
import Subscription from "./pages/Subscription";
import BlogPage from "./pages/Blog";
import SingleBlogPage from "./pages/AddBlog";
import Techstack from "./pages/Techstack";
import CaseStudy from "./pages/CaseStudy";
import AddCaseStudy from "./pages/AddCaseStudy";

function App() {
  return (
    <>
      <MainProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<RequireAuth />}>
              <Route path="/" element={<HomeBanner />} />
              <Route path="/techstack" element={<Techstack />} />
              {/* <Route path="/product" element={<ProductsPage />} />
              <Route path="/add-product" element={<SingleProductPage />} />
              <Route
                path="/update-product/:id"
                element={<SingleProductPage />}
              />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route
                path="/sub-categories/:id"
                element={<SubCategoriesPage />}
              />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/order/:id" element={<OrderDetails />} />
              <Route path="/users" element={<User />} />
              <Route path="/user/:id" element={<UserDetails />} />
              <Route path="/coupons" element={<CouponDetails />} />
              <Route path="/coupon" element={<AddCoupon />} />
              <Route path="/coupon/:id" element={<AddCoupon />} />
              <Route path="/market-place" element={<MarketplaceManager />} />
              <Route path="/social-media" element={<SocialMedia />} />
              <Route path="/home-banner" element={<HomeBanner />} />
              <Route path="/subscription" element={<Subscription />} /> */}
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/add-blog" element={<SingleBlogPage />} />
              <Route path="/update-blog/:id" element={<SingleBlogPage />} />
              <Route path="/casestudy" element={<CaseStudy />} />
              <Route path="/add-casestudy" element={<AddCaseStudy />} />
              <Route path="/update-casestudy/:id" element={<AddCaseStudy />} />
            </Route>
            <Route element={<RejectAuth />}>
              <Route path="/login" element={<Login />} />
            </Route>
          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            transition={Slide}
          />
        </BrowserRouter>
      </MainProvider>
    </>
  );
}

export default App;
