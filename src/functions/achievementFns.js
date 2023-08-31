// reset accomplished achievement to close popup
export const handleAccomplishedAchievement = (setAccomplishedAchievement) => {
  setAccomplishedAchievement({
    accomplished: false,
    data: {},
  });
};
