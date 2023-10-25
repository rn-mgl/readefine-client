import ActionLabel from "@/src/components/global/ActionLabel";
import { localizeDate } from "@/src/functions/localDate";
import Image from "next/image";
import { AiFillDelete, AiFillStar } from "react-icons/ai";

const AdministratorCards = (props) => {
  const isSelected = props.selectedCard === props.admin.admin_id;
  const isVerified = props.admin.is_verified;

  return (
    <div className="w-full h-fit p-5 rounded-lg bg-white cstm-flex-col gap-4 justify-start transition-all">
      <div className="cstm-flex-row w-full items-center justify-center">
        <div className="relative mr-auto">
          <Image src={props.admin.image} alt="profile" width={50} height={50} className="rounded-full " />
          {isVerified ? (
            <div className="ml-auto cstm-flex-col group absolute right-0 bottom-0">
              <ActionLabel label="Verified" />
              <AiFillStar className="text-scndColor scale-125 " />
            </div>
          ) : null}
        </div>
        <div className="cstm-flex-col items-end">
          <p className="font-light italic text-xs">Date Joined</p>
          <p className="text-sm">{localizeDate(props.admin.date_joined)}</p>
        </div>
      </div>

      <div className="cstm-separator" />

      <div className="cstm-flex-col gap2 w-full">
        <div className="cstm-flex-col gap2 mr-auto items-start w-full">
          <p className="font-semibold">
            {props.admin.name} {props.admin.surname}
          </p>
          <p className="text-xs font-medium">{props.admin.email}</p>
          <p className="font-normal text-xs">{props.admin.username}</p>
        </div>

        <button
          onClick={() => {
            props.handleCanDeleteAdmin();
            props.handleAdminToDelete();
          }}
          className="ml-auto cstm-bg-hover cstm-flex-col relative group"
        >
          <ActionLabel label="Delete" />
          <AiFillDelete className="text-red-500" />
        </button>
      </div>
    </div>
  );
};

export default AdministratorCards;
