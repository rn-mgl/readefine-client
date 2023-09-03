import React from "react";

export const usePageFileControls = (params) => {
  const [pageImages, setPageImages] = React.useState([{ pageImage: { src: null, name: null } }]);
  const rawPageImages = React.useRef([]);

  const selectedPageImageViewer = (e, pageNumber) => {
    const currPageImage = e.target.files;

    if (!currPageImage || currPageImage.length < 1) {
      return null;
    }

    const details = currPageImage[0];
    const name = details.name;
    const src = URL.createObjectURL(details);

    const updatedPageImages = [...pageImages];

    updatedPageImages.splice(pageNumber - 1, 0, { pageImage: { src, name } });

    setPageImages(updatedPageImages);

    rawPageImages.current[pageNumber].files = currPageImage;
  };

  const removeSelectedPageImage = (pageNumber) => {
    const updatedPageImages = [...pageImages];

    updatedPageImages[pageNumber - 1].pageImage = { src: null, name: null };

    setPageImages(updatedPageImages);

    if (rawPageImages.current) {
      rawPageImages.current[pageNumber].value = null;
    }
  };

  const deletePageRef = (pageNumber) => {
    rawPageImages.current.splice(pageNumber, 1);
  };

  const addImagePage = () => {
    const updatedPageImages = [...pageImages];
    updatedPageImages.push({ pageImage: { src: null, name: null } });
    setPageImages(updatedPageImages);
  };

  const deleteImagePage = (pageNumber) => {
    const updatedPageImages = [...pageImages];
    updatedPageImages.splice(pageNumber, 1);
    setPageImages(updatedPageImages);
  };

  return {
    pageImages,
    rawPageImages,
    selectedPageImageViewer,
    removeSelectedPageImage,
    deletePageRef,
    addImagePage,
    deleteImagePage,
  };
};
