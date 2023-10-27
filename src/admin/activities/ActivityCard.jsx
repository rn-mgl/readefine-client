const ActivityCard = (props) => {
  return (
    <div
      className="w-full cstm-flex-col gap-4 rounded-2xl  
                      bg-white p-4 h-[30rem] l-s:h-[40rem]"
    >
      <div
        className="cstm-flex-col w-full bg-prmColor p-2 
                        rounded-md t:w-fit t:px-10 t:mr-auto"
      >
        <p className="font-medium text-white text-sm">{props.activityLabel}</p>
      </div>
      <div
        className="w-full grid grid-cols-1 t:grid-cols-2 l-l:grid-cols-3 gap-2 
                  overflow-y-auto cstm-scrollbar-2 justify-start mb-auto"
      >
        {props.mappedActivities}
      </div>
    </div>
  );
};

export default ActivityCard;
