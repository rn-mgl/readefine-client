export const selectedFileViewer = (e, setState) => {
  const file = e.target.files;

  if (!file || file.length < 1) {
    return null;
  }
  const details = file[0];
  const name = details.name;
  const src = URL.createObjectURL(details);

  setState((prev) => {
    return {
      ...prev,
      file: { src, name },
      rawFile: file,
    };
  });
};

export const selectedAudioViewer = (e, setState) => {
  const file = e.target.files;

  if (!file || !file.length) {
    return null;
  }

  const details = file[0];
  const name = details.name;
  const src = URL.createObjectURL(details);

  setState((prev) => {
    return {
      ...prev,
      audio: { src, name },
      rawAudio: file,
    };
  });
};

// special case because pages are in an array
export const selectedPageFileViewer = (page, e, setState) => {
  const file = e.target.files;

  if (!file || file.length < 1) {
    return null;
  }

  const details = file[0];
  const name = details.name;
  const src = URL.createObjectURL(details);

  setState((prev) =>
    prev.map((p) => {
      if (p.pageNumber === page) {
        return {
          ...p,
          file: { src, name },
          rawFile: file,
        };
      }
      return p;
    })
  );
};

export const selectedUploadFileViewer = (page, e, setState) => {
  const file = e.target.files;

  if (!file || file.length < 1) {
    return null;
  }

  const details = file[0];
  const name = details.name;
  const src = URL.createObjectURL(details);

  setState((prev) =>
    prev.map((p) => {
      if (p.page === page) {
        return {
          ...p,
          file: { src, name },
          rawFile: file,
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

export const clearAudio = (setState) => {
  setState((prev) => {
    return {
      ...prev,
      audio: { name: null, src: null },
      rawAudio: null,
    };
  });
};

export const clearPageFile = (page, setState) => {
  setState((prev) =>
    prev.map((p) => {
      if (p.pageNumber === page) {
        return {
          ...p,
          file: { src: null, name: null },
          rawFile: null,
        };
      }
      return p;
    })
  );
};

export const clearUpload = (setState) => {
  setState((prev) => {
    return {
      ...prev,
      file: { name: null, src: null },
      rawFile: null,
    };
  });
};

export const clearPageUpload = (page, setState) => {
  setState((prev) =>
    prev.map((p) => {
      if (p.page === page) {
        return {
          ...p,
          image: null,
          file: { src: null, name: null },
          rawFile: null,
        };
      }
      return p;
    })
  );
};

export const uploadFile = async (url, files, token, axios) => {
  const file = files[0];

  const size = file.size;

  if (size >= 10000000) return null;

  const formData = new FormData();
  formData.append("file", file);

  try {
    const { data } = await axios.post(url, formData, {
      headers: { Authorization: token },
      "Content-Type": "multipart/form-data",
    });
    if (data) {
      return data.url;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};
