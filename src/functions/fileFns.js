// these are not in the usePageFileControls hook because it uses a different state for the preview
// the hook handles the rawFiles for upload in cloudinary, these functions handle the UI and UX or viewing before uploading a file

// for add story page because pageNumber is used as variable property
export const selectedPageImageViewer = (pageNumber, e, setState, setMessageStatus) => {
  const currPageImage = e.target.files;

  if (!currPageImage || currPageImage.length < 1) {
    return null;
  }

  const details = currPageImage[0];
  const size = details.size;
  const name = details.name;
  const src = URL.createObjectURL(details);

  if (size > 10000000) {
    setMessageStatus(true, "The selected file is too large. Please choose below 10MB.", "error");
    throw new Error("The selected file is too large. Please choose below 10mb.");
  }

  setState((prev) =>
    prev.map((p) => {
      if (p.pageNumber === pageNumber) {
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

// for add story page because pageNumber is used as variable property
export const removeSelectedPageImage = (pageNumber, setState) => {
  setState((prev) =>
    prev.map((p) => {
      if (p.pageNumber === pageNumber) {
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

// for edit story page because page is used as variable property
export const updateUploadedPageImage = (page, e, setState, setMessageStatus) => {
  const currPageImage = e.target.files;

  if (!currPageImage || currPageImage.length < 1) {
    return null;
  }

  const details = currPageImage[0];
  const size = details.size;
  const name = details.name;
  const src = URL.createObjectURL(details);

  if (size > 10000000) {
    setMessageStatus(true, "The selected file is too large. Please choose below 10MB.", "error");
    throw new Error("The selected file is too large. Please choose below 10mb.");
  }

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

// for edit story page because page is used as variable property
export const removeUpdatedUploadedPageImage = (page, setState) => {
  setState((prev) =>
    prev.map((p) => {
      if (p.page === page) {
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

// for edit story page because page is used as variable property
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
