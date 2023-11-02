import React from "react";
import zxcvbn from "zxcvbn";

const PasswordStrength = (props) => {
  const result = zxcvbn(props.password);
  return (
    <div className="w-full flex flex-row justify-between items-center text-xs">
      <p className="text-prmColor">Password Strength: </p>
      <p
        className={`font-semibold ${
          result.score < 1
            ? "text-sky-500"
            : result.score < 2
            ? "text-amber-500"
            : result.score < 3
            ? "text-orange-500"
            : "text-green-500"
        }`}
      >
        {result.score < 1 ? "Very Weak" : result.score < 2 ? "Weak" : result.score < 3 ? "Medium" : "Strong"}
      </p>
    </div>
  );
};

export default PasswordStrength;
