import React from "react";
import { graphql } from "gatsby";
import AuthorGrid from "../components/author/AuthorGrid";
import PageHeader from "../components/PageHeader";
import PageSpace from "../components/PageSpace";
import Pagination from "../components/Pagination";

import { SEO } from "../components/seo";

export const query = graphql`
  query authorQuery($limit: Int!, $offset: Int!) {
    allSanityAuthor(limit: $limit, skip: $offset) {
      nodes {
        id
        name
        slug {
          current
        }
        profileImage {
          alt
          asset {
            gatsbyImageData
          }
        }
      }
    }
  }
`;

const AuthorList = ({ data, pageContext }) => {
  const authors = data.allSanityAuthor.nodes;
  const { currentPage, numberOfPages } = pageContext;

  return (
    <PageSpace top={80} bottom={100}>
      <div className="container">
        <PageHeader
          title="All Authors"
          description="This month will bring about the 88th Academy Awards. Starting in 1928, this prestigious award ceremony..."
        />
        <AuthorGrid authors={authors} />
        {numberOfPages > 1 && (
          <Pagination
            baseURL="/authors"
            currentPage={currentPage}
            numberOfPages={numberOfPages}
          />
        )}
      </div>
    </PageSpace>
  );
};

export default AuthorList;

// Trzeba ogarnąć lokalizacje tych danych, obecnie sa pobierane na czuja
// i nie minstancji w Sanity Studio

export const Head = ({ data }) => {
  const dataSeo = data.allSanityAuthor.seo || {};

  const title = dataSeo.title;
  const description = dataSeo.description;

  return <SEO title={title} description={description} />;
};
