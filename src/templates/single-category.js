import React from "react";

import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import BlogGrid from "../components/blog/BlogGrid";
import MyPortableText from "../components/MyPortableText";
import PageHeader from "../components/PageHeader";
import PageSpace from "../components/PageSpace";
import { SingleCategoryStyles } from "../styles/category/SingleCategoryStyles";
import { SEO } from "../components/seo";

export const query = graphql`
  query Singlecategory($id: String!) {
    sanityCategory(id: { eq: $id }) {
      title
      _rawDescription
      coverImage {
        asset {
          gatsbyImageData
        }
      }
    }
    allSanityBlog(filter: { categories: { elemMatch: { id: { eq: $id } } } }) {
      nodes {
        id
        title
        publishedAt
        slug {
          current
        }
        categories {
          title
          slug {
            current
          }
        }
        coverImage {
          asset {
            gatsbyImageData
          }
        }
      }
    }
  }
`;
const SingleCategory = ({ data }) => {
  const category = data.sanityCategory;
  const blogs = data.allSanityBlog.nodes;

  return (
    <PageSpace top={80} bottom={100}>
      <SingleCategoryStyles>
        <div className="container">
          <PageHeader title={category.title} className="pageHeader">
            <MyPortableText value={category._rawDescription} />
            <GatsbyImage
              image={category.coverImage.asset.gatsbyImageData}
              alt={category.coverImage.alt}
              className="coverImage"
            />
          </PageHeader>
          <BlogGrid blogs={blogs} />
        </div>
      </SingleCategoryStyles>
    </PageSpace>
  );
};

export default SingleCategory;

export const Head = ({ data }) => {
  const dataSeo = data.sanityCategory.seo || {};

  const title = dataSeo.title;
  const description = dataSeo.description;

  return <SEO title={title} description={description} />;
};
