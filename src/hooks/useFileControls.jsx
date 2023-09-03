import React from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/src/context";

export const useFileControls = () => {
  const [imageFile, setImageFile] = React.useState({ src: null, name: null });
  const [rawImage, setRawImage] = React.useState(null);

  const [audioFile, setAudioFile] = React.useState({ src: null, name: null });
  const [rawAudio, setRawAudio] = React.useState(null);

  const { url } = useGlobalContext();
  const { data: session } = useSession();
  const user = session?.user?.name;

  const selectedImageViewer = (e) => {
    const currImageFile = e.target.files;

    if (!currImageFile || currImageFile.length < 1) {
      return null;
    }

    const details = currImageFile[0];
    const size = details.size;
    const name = details.name;
    const src = URL.createObjectURL(details);

    if (size > 10000000) {
      throw new Error("The selected file is too large. Please choose below 10mb.");
    }

    setImageFile({ src, name });
    setRawImage(currImageFile);
  };

  const selectedAudioViewer = (e) => {
    const currAudioFile = e.target.files;

    if (!currAudioFile || currAudioFile.length < 1) {
      return null;
    }

    const details = currAudioFile[0];
    const size = details.size;
    const name = details.name;
    const src = URL.createObjectURL(details);

    if (size > 10000000) {
      throw new Error("The selected file is too large. Please choose below 10mb.");
    }

    setAudioFile({ src, name });
    setRawAudio(currAudioFile);
  };

  const removeSelectedImage = () => {
    setImageFile({ src: null, name: null });
    setRawImage(null);
  };

  const removeSelectedAudio = () => {
    setAudioFile({ src: null, name: null });
    setRawAudio(null);
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
  };
};
