import { getImageData } from "gatsby-plugin-image";

function urlBuilder({ baseUrl, width, height, format, options }) {
  return `${baseUrl}?w=${width}&h${height}&fmt=${format}&q=${options.quality}`;
}

export function getSanityimageData({ image, ...props }) {
  return getImageData({
    baseUrl: image.url,
    sourceWidth: image.width,
    sourceHeight: image.height,
    urlBuilder,
    pluginName: "gatsby-source-sanity",
    formats: ["auto"],
    options: {
      quality: 50,
    },
    ...props,
  });
}
