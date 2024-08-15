import React from "react";
import { graphql } from "gatsby";
import PageSpace from "../components/PageSpace";
import PageHeader from "../components/PageHeader";
import BlogGrid from "../components/blog/BlogGrid";
import Pagination from "../components/Pagination";

import { SEO } from "../components/seo";

export const query = graphql`
  query blogListQuery($limit: Int!, $offset: Int!) {
    allSanityBlog(sort: { publishedAt: DESC }, limit: $limit, skip: $offset) {
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

const BlogList = ({ data, pageContext }) => {
  const { currentPage, numberOfPages } = pageContext;
  const blogs = data.allSanityBlog.nodes;

  return (
    <>
      <PageSpace top={80} bottom={100}>
        <div className="container">
          <PageHeader
            title="All Blog Posts"
            description="Lorem Ipsum jest tekstem stosowanym jako przykładowy wypełniacz w przemyśle poligraficznym. Został po raz pierwszy użyty w XV w. przez nieznanego drukarza do wypełnienia tekstem próbnej książki. Pięć wieków później zaczął być używany przemyśle elektronicznym, pozostając praktycznie niezmienionym. Spopularyzował się w latach 60. XX w. wraz z publikacją arkuszy Letrasetu, zawierających fragmenty Lorem Ipsum, a ostatnio z zawierającym różne wersje Lorem Ipsum oprogramowaniem przeznaczonym do realizacji druków na komputerach osobistych, jak Aldus PageMaker"
          />
          <BlogGrid blogs={blogs} />
          {numberOfPages > 1 && (
            <Pagination
              currentPage={currentPage}
              numberOfPages={numberOfPages}
              baseURL="/blogs"
            />
          )}
        </div>
      </PageSpace>
    </>
  );
};

export default BlogList;

export const Head = () => <SEO title="Blogs" />;
