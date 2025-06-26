import EnterpriseCard from '@/components/enterprise-components/EnterpriseCard';
import HomeBannerCard from '@/components/home-banner-components/HomeBannerCard';
import React from 'react';

const HomeBanner: React.FC = () => {

  return (
   <section>
    <HomeBannerCard />
    <EnterpriseCard />
   </section>
  );
};

export default HomeBanner;