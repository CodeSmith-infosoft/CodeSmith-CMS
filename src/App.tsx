import "@/assets/sass/index.scss";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import RequireAuth from "./routes/RequireAuth";
import RejectAuth from "./routes/RejectAuth";
import Login from "./pages/Login";
import { MainProvider } from "./context/mainContext";
import HomeBanner from "./pages/HomeBanner";
import BlogPage from "./pages/Blog";
import SingleBlogPage from "./pages/AddBlog";
import Techstack from "./pages/Techstack";
import CaseStudy from "./pages/CaseStudy";
import AddCaseStudy from "./pages/AddCaseStudy";
import TeamMember from "./pages/TeamMember";
import SingleTeamMember from "./pages/AddTeamMember";
import Subscribers from "./pages/Subscribe";
import CareerPage from "./pages/Career";
import AddCareer from "./pages/AddCareer";
import Portfolio from "./pages/Portfolio";
import AddPortfolio from "./pages/AddPortfolio";
import HireDeveloper from "./pages/HireDeveloper";
import Gallery from "./pages/Gallery";
import GetInTouch from "./pages/GetInTouch";
import Testimonial from "./pages/Testimonial";
import SingleTestimonial from "./components/single-testimonial/SingleTestimonial";
import BusinessInquiry from "./pages/BusinessInquiry";
import SuccessStory from "./pages/SuccessStory";

function App() {
  return (
    <>
      <MainProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<RequireAuth />}>
              <Route path="/" element={<HomeBanner />} />
              <Route path="/techstack" element={<Techstack />} />
              <Route path="/success-story" element={<SuccessStory />} />
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
              <Route path="/career" element={<CareerPage />} />
              <Route path="/add-career" element={<AddCareer />} />
              <Route path="/update-career/:id" element={<AddCareer />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/add-portfolio" element={<AddPortfolio />} />
              <Route path="/update-portfolio/:id" element={<AddPortfolio />} />
              <Route path="/hire-developer" element={<HireDeveloper />} />
              <Route path="/career" element={<CareerPage />} />
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
