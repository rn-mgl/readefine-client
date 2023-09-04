import React from "react";

export const usePageFileControls = () => {
  const rawPageImages = React.useRef([]);

  const setRawPageImage = (e, index) => {
    const currPageImage = e.target.files;

    if (!currPageImage || currPageImage.length < 1) {
      return null;
    }

    if (rawPageImages.current && rawPageImages.current[index]) {
      rawPageImages.current[index].files = currPageImage;
    }
  };

  const removeRawPageImage = (index) => {
    if (rawPageImages.current && rawPageImages.current[index]) {
      rawPageImages.current[index].value = null;
    }
  };

  const hasRawPageImage = (index) => {
    const file = rawPageImages.current[index]?.files;

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
  };
};
