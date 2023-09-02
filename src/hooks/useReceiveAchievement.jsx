import React from "react";

export const useReceiveAchievement = () => {
  const [achievementUrl, setAchievementUrl] = React.useState("/archives");
  const [accomplishedAchievement, setAccomplishedAchievement] = React.useState({
    accomplished: false,
    achievements: [],
  });

  const claimNewAchievement = React.useCallback((achievements) => {
    setAccomplishedAchievement({ accomplished: true, achievements });
  }, []);

  // reset accomplished achievement to close popup
  const resetAchievement = () => {
    setAccomplishedAchievement({
      accomplished: false,
      data: {},
    });
  };

  const setNewAchievementUrl = React.useCallback((url) => {
    setAchievementUrl(url);
  }, []);

  return {
    achievementUrl,
    accomplishedAchievement,
    claimNewAchievement,
    resetAchievement,
    setNewAchievementUrl,
  };
};
