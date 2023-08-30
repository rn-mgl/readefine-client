"use client";
import React from "react";
import {
  BsFillPlayFill,
  BsFillPauseFill,
  BsFillStopFill,
  BsVolumeUpFill,
  BsQuestionCircle,
} from "react-icons/bs";
import { RiSpeedFill } from "react-icons/ri";
import ActionLabel from "./ActionLabel";
import { AiFillHighlight } from "react-icons/ai";

const TextToSpeech = (props) => {
  const [utterance, setUtterance] = React.useState("");
  const [highlightedWords, setHighLightedWords] = React.useState("");
  const [status, setStatus] = React.useState("init");
  const [volume, setVolume] = React.useState({ display: 100, apply: 1 });
  const [rate, setRate] = React.useState(1);
  const [SSU, setSSU] = React.useState(null);

  const playVoice = (words) => {
    const synth = speechSynthesis;
    const voices = synth.getVoices();

    if (synth.speaking) {
      synth.cancel();
    }

    const primaryVoices = {
      aria: voices[110],
      ana: voices[111],
      christopher: voices[112],
      eric: voices[113],
      guy: voices[114],
      jenny: voices[115],
      michelle: voices[116],
      roger: voices[117],
      steffan: voices[118],
    };

    if (SSU) {
      SSU.addEventListener("start", () => setStatus("playing"));
      SSU.addEventListener("end", () => setStatus("init"));

      SSU.voice = primaryVoices.michelle;
      SSU.text = words;
      SSU.rate = rate;
      SSU.volume = volume.apply;

      synth.speak(SSU);
    }
  };

  const pause = () => {
    setStatus("paused");
    speechSynthesis.pause();
  };

  const resume = () => {
    setStatus("playing");
    speechSynthesis.resume();
  };

  const cancel = () => {
    setStatus("init");
    speechSynthesis.cancel();
  };

  const handleRate = ({ value }) => {
    setRate(parseFloat(value));
  };

  const handleVolume = ({ value }) => {
    setVolume({ display: parseInt(value), apply: parseFloat(value / 100) });
  };

  React.useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setSSU(new SpeechSynthesisUtterance());
    }
  }, []);

  React.useEffect(() => {
    if (props.utterance) {
      setUtterance(props.utterance);
    }
  }, [setUtterance, props.utterance]);

  React.useEffect(() => {
    if (SSU) {
      SSU.volume = volume.apply;
      SSU.rate = rate;
    }
  }, [SSU, volume, rate]);

  React.useEffect(() => {
    const highlight = () => {
      const text = window.getSelection().toString();
      const prevHighlighted = highlightedWords;
      setHighLightedWords(text === "" ? prevHighlighted : text);
    };

    window.addEventListener("mouseup", highlight);

    return () => window.removeEventListener("mouseup", highlight);
  }, [highlightedWords]);

  return (
    <div className="cstm-flex-col w-full gap-5 t:cstm-flex-row t:w-fit t:gap-2">
      <div className="cstm-flex-row gap-2 w-full">
        <button
          className="relative cstm-bg-hover group"
          onClick={() => playVoice(highlightedWords)}
        >
          <ActionLabel label="Play Highlighted Word" />
          <AiFillHighlight className="text-prmColor scale-125" />
        </button>

        {status === "init" ? (
          <button className="relative cstm-bg-hover group" onClick={() => playVoice(utterance)}>
            <ActionLabel label="Play" />
            <BsFillPlayFill className="text-prmColor scale-125" />
          </button>
        ) : status === "playing" ? (
          <button className="relative cstm-bg-hover group" onClick={pause}>
            <ActionLabel label="Pause" />
            <BsFillPauseFill className="text-prmColor scale-125" />
          </button>
        ) : status === "paused" ? (
          <button className="relative cstm-bg-hover group" onClick={resume}>
            <ActionLabel label="Resume" />
            <BsFillPlayFill className="text-prmColor scale-125" />
          </button>
        ) : (
          <button className="relative cstm-bg-hover group" onClick={() => playVoice(utterance)}>
            <ActionLabel label="Play" />
            <BsFillPlayFill className="text-prmColor scale-125" />
          </button>
        )}

        <button className="relative cstm-bg-hover group" onClick={cancel}>
          <ActionLabel label="Stop" />

          <BsFillStopFill className="text-prmColor scale-125" />
        </button>

        <div className="relative group p-2">
          <ActionLabel label="Speed" />

          <div className="cstm-flex-row gap-2">
            <RiSpeedFill className="text-prmColor" />

            <select
              value={rate}
              onChange={(e) => handleRate(e.target)}
              className="text-xs p-2 py-1 rounded-md focus:outline-prmColor underline underline-offset-2 cursor-pointer"
            >
              <option value={0.25}>0.25x</option>
              <option value={0.5}>0.50x</option>
              <option value={0.75}>0.75x</option>
              <option value={1.0}>1.00x</option>
              <option value={1.25}>1.25x</option>
              <option value={1.5}>1.50x</option>
              <option value={1.75}>1.75x</option>
              <option value={2.0}>2.00x</option>
            </select>
          </div>
        </div>
      </div>

      <div className="cstm-separator t:hidden" />

      <div className="cstm-flex-col gap-2">
        <div className="cstm-flex-row gap-2 relative group">
          <ActionLabel label="Volume" />

          <BsVolumeUpFill className="text-prmColor" />

          <input
            type="range"
            onChange={(e) => handleVolume(e.target)}
            value={volume.display}
            className="cursor-pointer"
            min={0}
            max={100}
            step={1}
          />

          <input
            type="number"
            value={volume.display}
            className="w-12 focus:outline-prmColor p-1 px-2 text-xs text-center underline underline-offset-2"
            onChange={(e) => handleVolume(e.target)}
          />
        </div>
      </div>
    </div>
  );
};

export default TextToSpeech;
