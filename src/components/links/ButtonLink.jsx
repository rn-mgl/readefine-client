import Link from "next/link";

const ButtonLink = (props) => {
  return (
    <Link
      href={props.to}
      className={`text-center rounded-md font-poppins text-sm font-extrabold ${props.fontColor} ${props.bgColor} w-36 p-2
                m-l:text-base
                t:text-lg t:w-44
                l-s:text-xl l-s:p-3`}
    >
      {props.label}
    </Link>
  );
};

export default ButtonLink;
