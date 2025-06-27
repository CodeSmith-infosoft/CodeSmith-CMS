import PageTitle from "@/components/CommonComponents/PageTitle";
import TestimonialComponent from "@/components/TestimonialComponent/TestimonialComponent";
import { useState } from "react";

const Testimonial = () => {
  const [totalCount, setTotalCount] = useState(0);

  return (
    <>
      <PageTitle
        title="Testimonial"
        button="Testimonial"
        path="/add-testimonial"
        totalCount={totalCount}
      />
      <TestimonialComponent setTotalCount={setTotalCount} />
    </>
  );
};

export default Testimonial;
