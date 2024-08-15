import React from "react";
import { TopCategoriesStyles } from "../../styles/homePage/TopCategoriesStyles";
import { SectionTitleStyles } from "../../styles/typography/SectionTitleStyles";
import { ParagraphTextStyles } from "../../styles/typography/ParagraphTextStyles";
import { graphql, useStaticQuery } from "gatsby";
import CategoryGrid from "../category/CategoryGrid";

const TopCategories = () => {
  const data = useStaticQuery(graphql`
    {
      allSanityFeatured(filter: { _id: { eq: "featuredItems" } }) {
        nodes {
          category {
            id
            title
            slug {
              current
            }
            _rawDescription
          }
        }
      }
    }
  `);

  const categories = data.allSanityFeatured.nodes[0].category;

  return (
    <TopCategoriesStyles>
      <SectionTitleStyles>Top Categories</SectionTitleStyles>
      <ParagraphTextStyles className="info">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book.
      </ParagraphTextStyles>
      <CategoryGrid categories={categories} />
    </TopCategoriesStyles>
  );
};

export default TopCategories;
