import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";
import BlogGrid from "../components/blog/BlogGrid";
import MyPortableText from "../components/MyPortableText";
import PageSpace from "../components/PageSpace";
import { Title } from "../components/typography/Title";
import { SingleAuthorStyles } from "../styles/author/SingleAuthorStyles";
import { SEO } from "../components/seo";

export const query = graphql`
  query SingleAuthorQuery($id: String!) {
    sanityAuthor(id: { eq: $id }) {
      name
      _rawBio
      profileImage {
        asset {
          gatsbyImageData
        }
        alt
      }
    }
    allSanityBlog(filter: { author: { id: { eq: $id } } }) {
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

function SingleAuthor({ data }) {
  const author = data.sanityAuthor;
  const blogs = data.allSanityBlog.nodes;

  return (
    <PageSpace top={80} bottom={100}>
      <div className="container">
        <SingleAuthorStyles>
          <div className="author-header">
            <GatsbyImage
              image={author.profileImage.asset.gatsbyImageData}
              alt={author.profileImage.alt}
              className="profileImage"
            />
            <Title className="name">{author.name}</Title>
            <div className="bio">
              <MyPortableText value={author._rawBio} />
            </div>
          </div>
          <hr className="hr" />
          <BlogGrid blogs={blogs} />
        </SingleAuthorStyles>
      </div>
    </PageSpace>
  );
}

export default SingleAuthor;

export const Head = ({ data }) => {
  const dataSeo = data.sanityAuthor.seo || {};

  const title = dataSeo.title;
  const description = dataSeo.description;

  return <SEO title={title} description={description} />;
};
