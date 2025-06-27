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
import TeamMember from "./pages/TeamMember";
import SingleTeamMember from "./pages/AddTeamMember";
import Subscribers from "./pages/Subscribe";
import Gallery from "./pages/Gallery";
import GetInTouch from "./pages/GetInTouch";
import Testimonial from "./pages/Testimonial";
import SingleTestimonial from "./components/single-testimonial/SingleTestimonial";
import BusinessInquiry from "./pages/BusinessInquiry";

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
              <Route path="/testimonial" element={<Testimonial />} />
              <Route path="/business-inquiry" element={<BusinessInquiry />} />
              <Route path="/add-testimonial" element={<SingleTestimonial />} />
              <Route
                path="/update-testimonial/:id"
                element={<SingleTestimonial />}
              />
              <Route path="/get-in-touch" element={<GetInTouch />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/add-blog" element={<SingleBlogPage />} />
              <Route path="/update-blog/:id" element={<SingleBlogPage />} />
              <Route path="/team-member" element={<TeamMember />} />
              <Route path="/add-team" element={<SingleTeamMember />} />
              <Route path="/update-team/:id" element={<SingleTeamMember />} />
              <Route path="/subscribers" element={<Subscribers />} />
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
