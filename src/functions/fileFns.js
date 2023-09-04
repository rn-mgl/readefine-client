// special case because pages are in an array
export const selectedPageImageViewer = (pageNumber, e, setState) => {
  const currPageImage = e.target.files;

  if (!currPageImage || currPageImage.length < 1) {
    return null;
  }

  const details = currPageImage[0];
  const name = details.name;
  const src = URL.createObjectURL(details);

  setState((prev) =>
    prev.map((p) => {
      if (p.pageNumber === pageNumber) {
        return {
          ...p,
          pageImage: { src, name },
        };
      }
      return p;
    })
  );
};

export const removeSelectedPageImage = (pageNumber, setState) => {
  setState((prev) =>
    prev.map((p) => {
      if (p.pageNumber === pageNumber) {
        return {
          ...p,
          pageImage: { src: null, name: null },
        };
      }
      return p;
    })
  );
};

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
          pageImage: { src: null, name: null },
          rawPageImage: null,
        };
      }
      return p;
    })
  );
};
