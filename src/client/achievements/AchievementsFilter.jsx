import React from "react";

import SearchFilter from "../../components/filter/SearchFilter";
import SortFilter from "../../components/filter/SortFilter";
import RangeFilter from "../../components/filter/RangeFilter";
import SelectFilter from "../../components/filter/SelectFilter";

const AchievementsFilter = (props) => {
  return (
    <div className="cstm-flex-row gap-2 justify-start relative w-full overflow-x-auto p-2 cstm-scrollbar-2 h-fit min-h-fit">
      <SearchFilter
        searchFilter={props.searchFilter}
        handleSearchFilter={props.handleSearchFilter}
        labelValue={[
          { label: "Name", value: "achievement_name" },
          { label: "Goal", value: "goal" },
        ]}
      />

      <SelectFilter
        onChange={props.handleTypeFilter}
        selectValue={props.typeFilter}
        name="achievement_type"
        label="Type"
        labelValue={[
          { label: "All", value: "" },
          { label: "Sessions", value: "user_session" },
          { label: "Lexile", value: "user_lexile" },
          { label: "Read Stories", value: "read_story" },
          { label: "Answered Tests", value: "answered_tests" },
          { label: "Test Score", value: "test_score" },
          { label: "Dangle Plays", value: "dangle_plays" },
          { label: "Decipher Plays", value: "decipher_plays" },
          { label: "Riddle Plays", value: "riddle_plays" },
          { label: "Dangle Wins", value: "dangle_wins" },
          { label: "Decipher Wins", value: "decipher_wins" },
          { label: "Riddle Wins", value: "riddle_wins" },
        ]}
      />

      <SortFilter
        sortFilter={props.sortFilter}
        handleSortFilter={props.handleSortFilter}
        labelValue={[
          { label: "Name", value: "achievement_name" },
          { label: "Goal", value: "goal" },
        ]}
      />

      <RangeFilter
        fromLabel="Goal From"
        handleRangeFilter={props.handleGoalRangeFilter}
        fromRange={props.goalRangeFilter.from}
        type="number"
        toLabel="Goal To"
        toRange={props.goalRangeFilter.to}
      />
    </div>
  );
};

export default AchievementsFilter;
