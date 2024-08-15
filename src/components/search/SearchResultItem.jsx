import React from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import { format } from "date-fns";
import { SearchResultItemStyles } from "../../styles/search/SearchResultItemStyles";
import ParagraphText from "../typography/ParagraphText";
import { Title } from "../typography/Title";

import { SearchModalContext } from "../../context/SearchModalContextProvider";

function BlogSearchResultItem({ blog }) {
  const { closeSearchModal } = React.useContext(SearchModalContext);

  return (
    <SearchResultItemStyles
      to={`/blogs/${blog.slug.current}`}
      onClick={() => closeSearchModal()}
    >
      <GatsbyImage
        image={blog.coverImage.asset.gatsbyImageData}
        alt={blog.coverImage.alt}
        className="img"
      />
      <div>
        <Title className="title">{blog.title}</Title>
        <ParagraphText className="categoriesText">
          {format(new Date(blog.publishedAt), "p, MMMM dd, yyyy")}
        </ParagraphText>
      </div>
    </SearchResultItemStyles>
  );
}

function CategorySearchResultItem({ category }) {
  const { closeSearchModal } = React.useContext(SearchModalContext);
  return (
    <SearchResultItemStyles
      to={`/categories/${category.slug.current}`}
      onClick={() => closeSearchModal()}
    >
      <Title className="title">{category.title}</Title>
    </SearchResultItemStyles>
  );
}

function AuthorSearchResultItem({ author }) {
  const { closeSearchModal } = React.useContext(SearchModalContext);
  return (
    <SearchResultItemStyles
      to={`/authors/${author.slug.current}`}
      onClick={() => closeSearchModal()}
    >
      <GatsbyImage
        image={author.profileImage.asset.gatsbyImageData}
        alt={author.profileImage.alt}
        className="authorProfileImg"
      />
      <Title className="title">{author.name}</Title>
    </SearchResultItemStyles>
  );
}
export {
  CategorySearchResultItem,
  BlogSearchResultItem,
  AuthorSearchResultItem,
};
