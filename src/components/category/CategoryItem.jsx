import React from "react";
import { buttonType } from "../../constans/buttonType";
import { CategoryItemStyles } from "../../styles/category/CategoryItemStyles";
import { Title } from "../typography/Title";
import Button from "../buttons/Button";
import MyPortableText from "../MyPortableText";

const CategoryItem = ({ title, description, slug }) => {
  return (
    <CategoryItemStyles>
      <Title className="title">{title}</Title>
      <div className="text">
        <MyPortableText value={description} />
      </div>
      <Button to={`/categories/${slug.current}`} variant={buttonType.outline}>
        Explore Category
      </Button>
    </CategoryItemStyles>
  );
};

export default CategoryItem;
