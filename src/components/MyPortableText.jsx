import React from "react";
import { PortableText } from "@portabletext/react";
import { ParagraphTextStyles } from "../styles/typography/ParagraphTextStyles";
import { Title } from "./typography/Title";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import theme from "react-syntax-highlighter/dist/esm/styles/prism/vs-dark";
import { getImage, getImageDimensions } from "@sanity/asset-utils";
import sanityConfig from "../../sanity-config";
import { getSanityimageData } from "../utils/getSanityImageData";
import { GatsbyImage } from "gatsby-plugin-image";

const myPortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <ParagraphTextStyles>{children}</ParagraphTextStyles>
    ),
    h1: ({ children }) => <Title>{children}</Title>,
  },
  types: {
    customCode: ({ value }) => (
      <SyntaxHighlighter
        style={theme}
        language={value.code.language}
        className="bodyCode"
      >
        {String(value.code.code).replace(/\n$/, "")}
      </SyntaxHighlighter>
    ),
    customImage: ({ value }) => {
      const imageData = getImage(value.asset, sanityConfig).asset;
      const { width, height } = getImageDimensions(value);

      const image = {
        url: imageData.url,
        height,
        width,
      };

      const gatsbyImageData = getSanityimageData({
        image,
        layout: "constrained",
      });

      return (
        <GatsbyImage
          image={gatsbyImageData}
          alt={value.alt}
          className="bodyImage"
        ></GatsbyImage>
      );
    },
  },
};

const MyPortableText = ({ value }) => {
  return <PortableText value={value} components={myPortableTextComponents} />;
};

export default MyPortableText;
