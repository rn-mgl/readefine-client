import React from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/src/context";

export const useFileControls = () => {
  const [imageFile, setImageFile] = React.useState({ src: "", name: "" });
  const rawImage = React.useRef(null);

  const [audioFile, setAudioFile] = React.useState({ src: "", name: "" });
  const rawAudio = React.useRef(null);

  const { url } = useGlobalContext();
  const { data: session } = useSession();
  const user = session?.user?.name;

  const selectedImageViewer = (e, setMessageStatus) => {
    const currImageFile = e.target.files;

    if (!currImageFile || currImageFile.length < 1) {
      return null;
    }

    const details = currImageFile[0];
    const size = details.size;
    const name = details.name;
    const src = URL.createObjectURL(details);

    if (size > 10000000) {
      setMessageStatus(true, "The selected file is too large. Please choose below 10MB.", "error");
      throw new Error("The selected file is too large. Please choose below 10mb.");
    }

    setImageFile({ src, name });
    if (rawImage.current) {
      rawImage.current.files = currImageFile;
    }
  };

  const selectedAudioViewer = (e, setMessageStatus) => {
    const currAudioFile = e.target.files;

    if (!currAudioFile || currAudioFile.length < 1) {
      return null;
    }

    const details = currAudioFile[0];
    const size = details.size;
    const name = details.name;
    const src = URL.createObjectURL(details);

    if (size > 10000000) {
      setMessageStatus("The selected file is too large. Please choose below 10MB.", true, "error");
      throw new Error("The selected file is too large. Please choose below 10mb.");
    }

    setAudioFile({ src, name });
    if (rawAudio.current) {
      rawAudio.current.files = currAudioFile;
    }
  };

  const removeSelectedImage = () => {
    setImageFile({ src: null, name: null });
    if (rawImage.current) {
      rawImage.current.value = null;
    }
  };

  const removeSelectedAudio = () => {
    setAudioFile({ src: null, name: null });
    if (rawAudio.current) {
      rawAudio.current.value = null;
    }
  };

  const hasRawImage = () => {
    const file = rawImage.current?.files;

    if (!file || file.length < 1) {
      return false;
    }

    if (!file[0]) {
      return false;
    }

    return true;
  };

  const hasRawAudio = () => {
    const file = rawAudio.current?.files;

    if (!file || file.length < 1) {
      return false;
    }

    if (!file[0]) {
      return false;
    }

    return true;
  };

  const uploadFile = async (path, file) => {
    const currFile = file[0];

    const size = currFile.size;

    if (size > 10000000) {
      throw new Error("The selected file is too large. Please choose below 10mb.");
    }

    const formData = new FormData();
    formData.append("file", currFile);

    try {
      const { data } = await axios.post(`${url}/${path}`, formData, { headers: { Authorization: user?.token } });
      if (data) {
        return data.url;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    imageFile,
    rawImage,
    audioFile,
    rawAudio,
    selectedImageViewer,
    selectedAudioViewer,
    removeSelectedImage,
    removeSelectedAudio,
    uploadFile,
    hasRawImage,
    hasRawAudio,
  };
};
