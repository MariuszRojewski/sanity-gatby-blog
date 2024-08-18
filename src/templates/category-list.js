import React from "react";
import { graphql } from "gatsby";
import PageSpace from "../components/PageSpace";
import PageHeader from "../components/PageHeader";
import CategoryGrid from "../components/category/CategoryGrid";
import Pagination from "../components/Pagination";

import { SEO } from "../components/seo";

export const query = graphql`
  query categoryListQuery($limit: Int!, $offset: Int!) {
    allSanityCategory(
      sort: { _createdAt: DESC }
      limit: $limit
      skip: $offset
    ) {
      nodes {
        id
        title
        slug {
          current
        }
        _rawDescription
      }
    }
  }
`;

const CategoryList = ({ data, pageContext }) => {
  const { currentPage, numberOfPages } = pageContext;
  const categories = data.allSanityCategory.nodes;

  return (
    <>
      <PageSpace top={80} bottom={100}>
        <div className="container">
          <PageHeader
            title="All Categories"
            description="This month will bring about the 88th Academy Awards. Starting in 1928, this prestigious award ceremony..."
          />
          <CategoryGrid categories={categories} />
          {numberOfPages > 1 && (
            <Pagination
              currentPage={currentPage}
              numberOfPages={numberOfPages}
              baseURL="/categories"
            />
          )}
        </div>
      </PageSpace>
    </>
  );
};

export default CategoryList;

// Trzeba ogarnąć lokalizacje tych danych, obecnie sa pobierane na czuja
// i nie minstancji w Sanity Studio

export const Head = ({ data }) => {
  const dataSeo = data.allSanityCategory.seo || {};

  const title = dataSeo.title;
  const description = dataSeo.description;

  return <SEO title={title} description={description} />;
};
