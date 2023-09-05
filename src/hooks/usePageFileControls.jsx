import React from "react";

export const usePageFileControls = () => {
  const rawPageImages = React.useRef([]);

  const setRawPageImage = (e, pageNumber) => {
    const currPageImage = e.target.files;

    if (!currPageImage || currPageImage.length < 1) {
      return null;
    }

    if (rawPageImages.current) {
      const updatedRawImages = [...rawPageImages.current];

      updatedRawImages.map((rawImage) => {
        if (rawImage.pageNumber === pageNumber) {
          rawImage.fileRef.files = currPageImage;
        }
        return rawImage;
      });
    }
  };

  const removeRawPageImage = (pageNumber) => {
    if (rawPageImages.current) {
      const updatedRawImages = [...rawPageImages.current];

      updatedRawImages.map((rawImage) => {
        if (rawImage.pageNumber === pageNumber) {
          rawImage.fileRef.value = null;
        }
        return rawImage;
      });
    }
  };

  const deleteRawImagePage = (pageNumber) => {
    if (rawPageImages.current) {
      const updatedRawImages = rawPageImages.current.filter((rawImage) => rawImage.pageNumber !== pageNumber);
      rawPageImages.current = updatedRawImages;
    }
  };

  const hasRawPageImage = (index) => {
    const file = rawPageImages.current[index]?.fileRef?.files;

    if (!file || file.length < 0) {
      return false;
    }

    if (!file[0]) {
      return false;
    }

    return true;
  };

  return {
    rawPageImages,
    setRawPageImage,
    removeRawPageImage,
    hasRawPageImage,
    deleteRawImagePage,
  };
};
