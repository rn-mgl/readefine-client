// special case because pages are in an array
export const selectedPageImageViewer = (page, e, setState) => {
  const currPageImage = e.target.files;

  if (!currPageImage || currPageImage.length < 1) {
    return null;
  }

  const details = currPageImage[0];
  const name = details.name;
  const src = URL.createObjectURL(details);

  setState((prev) =>
    prev.map((p) => {
      if (p.pageNumber === page) {
        return {
          ...p,
          pageImage: { src, name },
          rawPageImage: currPageImage,
        };
      }
      return p;
    })
  );
};

export const removeSelectedPageImage = (page, setState) => {
  setState((prev) =>
    prev.map((p) => {
      if (p.pageNumber === page) {
        return {
          ...p,
          pageImage: { src: null, name: null },
          rawPageImage: null,
        };
      }
      return p;
    })
  );
};

// special case because pages are in an array
export const updateUploadedPageImage = (page, e, setState) => {
  const currPageImage = e.target.files;

  if (!currPageImage || currPageImage.length < 1) {
    return null;
  }

  const details = currPageImage[0];
  const name = details.name;
  const src = URL.createObjectURL(details);

  setState((prev) =>
    prev.map((p) => {
      if (p.page === page) {
        return {
          ...p,
          pageImage: { src, name },
          rawPageImage: currPageImage,
        };
      }
      return p;
    })
  );
};

export const removeUploadedPageImage = (page, setState) => {
  setState((prev) =>
    prev.map((p) => {
      if (p.page === page) {
        return {
          ...p,
          image: null,
        };
      }
      return p;
    })
  );
};

export const clearFiles = (setState) => {
  setState((prev) => {
    return {
      ...prev,
      file: { name: null, src: null },
      rawFile: null,
    };
  });
};
