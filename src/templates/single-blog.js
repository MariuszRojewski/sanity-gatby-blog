import { graphql, Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";
import { format } from "date-fns";
import { BiCategory } from "react-icons/bi";
import { FiCalendar, FiUser } from "react-icons/fi";
import PageSpace from "../components/PageSpace";
import ParagraphText from "../components/typography/ParagraphText";
import { Title } from "../components/typography/Title";
import { SingleBlogStyles } from "../styles/blog/SingleBlogStyles";
import MyPortableText from "../components/MyPortableText";
import { SEO } from "../components/seo";

// Alt nie chodzi poprawnie
export const query = graphql`
  query SingleBlogQuery($id: String!) {
    sanityBlog(id: { eq: $id }) {
      title
      publishedAt
      _rawBody
      coverImage {
        asset {
          gatsbyImageData
          altText
        }
      }
      categories {
        title
        slug {
          current
        }
      }
      author {
        name
        slug {
          current
        }
      }

      seo {
        title
        description
        image {
          asset {
            gatsbyImageData
          }
        }
        twitterUsername
      }
    }
  }
`;

const SingleBlog = ({ data }) => {
  const blog = data.sanityBlog;

  return (
    <SingleBlogStyles>
      <PageSpace top={80} bottom={100}>
        <div className="container">
          <div className="blog-header">
            <GatsbyImage
              image={blog.coverImage.asset.gatsbyImageData}
              alt={blog.coverImage?.altText}
              className="blog-cover-image"
            />
            <Title className="title">{blog.title}</Title>
            <ParagraphText className="publishedAt">
              <FiCalendar />
              {format(new Date(blog.publishedAt), "p, MMMM dd, yyyy")}
            </ParagraphText>
            <ParagraphText className="categoriesText">
              <BiCategory />
              <span>
                {blog.categories.map((item, index) => (
                  <span key={item.slug.current}>
                    <Link to={`/categories/${item.slug.current}`}>
                      {item.title}
                    </Link>
                    {index < blog.categories.length - 1 ? ", " : ""}
                  </span>
                ))}
              </span>
            </ParagraphText>
            <ParagraphText className="author">
              <FiUser />
              <Link to={`/authors/${blog.author.slug.current}`}>
                {blog.author.name}
              </Link>
            </ParagraphText>
          </div>
          <hr className="hr" />
          <div className="body">
            <MyPortableText value={blog._rawBody} />
          </div>
        </div>
      </PageSpace>
    </SingleBlogStyles>
  );
};

export default SingleBlog;

export const Head = ({ data }) => {
  const dataSeo = data.sanityBlog.seo || {};

  const title = dataSeo.title;
  const description = dataSeo.description;

  return <SEO title={title} description={description} />;
};
