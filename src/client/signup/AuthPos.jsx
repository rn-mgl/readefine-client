import InputComp from "@/components/input/InputComp";
import PasswordStrength from "@/src/components/global/PasswordStrength";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { CiMail, CiUser } from "react-icons/ci";

const AuthPos = (props) => {
  return (
    <>
      {/* email */}
      <InputComp
        id="email"
        placeholder="E Mail"
        type="email"
        spellCheck={false}
        icon={<CiMail />}
        value={props.userData.email}
        required={true}
        onChange={(e) => props.handleUserData(e.target)}
      />
      {/* username */}
      <InputComp
        id="username"
        placeholder="Username"
        type="text"
        spellCheck={false}
        icon={<CiUser />}
        value={props.userData.username}
        required={true}
        onChange={(e) => props.handleUserData(e.target)}
      />
      {/* password*/}
      <InputComp
        id="password"
        placeholder="Password"
        type={props.visiblePassword ? "text" : "password"}
        spellCheck={false}
        icon={
          props.visiblePassword ? (
            <AiOutlineEyeInvisible onClick={props.handleVisiblePassword} />
          ) : (
            <AiOutlineEye onClick={props.handleVisiblePassword} />
          )
        }
        value={props.userData.password}
        required={true}
        onChange={(e) => props.handleUserData(e.target)}
      />

      <div className="bg-accntColor p-2 rounded-md w-full">
        <PasswordStrength password={props.userData.password} />
      </div>
    </>
  );
};

export default AuthPos;
