import React from "react";
import InputComp from "@/components/input/InputComp";
import { CiUser } from "react-icons/ci";

const NamePos = (props) => {
  return (
    <>
      {/* name */}
      <InputComp
        id="name"
        placeholder="Name"
        type="text"
        spellCheck={false}
        icon={<CiUser />}
        value={props.userData.name}
        required={true}
        onChange={(e) => props.handleUserData(e.target)}
      />

      {/* surname */}
      <InputComp
        id="surname"
        type="text"
        placeholder="Surname"
        spellCheck={false}
        icon={<CiUser />}
        value={props.userData.surname}
        required={true}
        onChange={(e) => props.handleUserData(e.target)}
      />
    </>
  );
};

export default NamePos;
