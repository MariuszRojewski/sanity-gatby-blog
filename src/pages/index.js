import React from "react";
import { SEO } from "../components/seo";
import HeroSection from "../components/homepage/HeroSection";
import FeaturedBlogs from "../components/homepage/FeaturedBlogs";
import TopCategories from "../components/homepage/TopCategories";

const IndexPage = () => (
  <>
    <HeroSection />
    <div className="container">
      <FeaturedBlogs />
      <TopCategories />
    </div>
  </>
);

export default IndexPage;

export const Head = () => <SEO title="Page Two" />;
