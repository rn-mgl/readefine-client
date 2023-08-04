import Link from "next/link";

const ButtonLink = (props) => {
  return (
    <Link
      href={props.to}
      className={`text-center font-poppins text-sm font-extrabold ${props.fontColor} ${props.bgColor} ${props.css} p-2 px-4 t:w-fit t:px-10`}
    >
      {props.label}
    </Link>
  );
};

export default ButtonLink;
