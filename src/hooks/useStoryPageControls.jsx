import React from "react";

export const useStoryPageControls = () => {
  const [story, setStory] = React.useState({});
  const [pages, setPages] = React.useState([]);

  const [activePage, setActivePage] = React.useState(1);
  const [fontSize, setFontSize] = React.useState(16);

  const [viewType, setViewType] = React.useState("single");
  const [customizationsVisible, setCustomizationsVisible] = React.useState(true);

  // handle next page
  const handleIncrement = () => {
    const increment = viewType === "single" ? 1 : 2;
    setActivePage((prev) => (prev + increment > pages.length ? pages.length : prev + increment));
  };

  // handle prev page
  const handleDecrement = () => {
    const decrement = viewType === "single" ? 1 : 2;
    setActivePage((prev) => (prev - decrement < 1 ? 1 : prev - decrement));
  };

  // handle font size onchange
  const handleFontSize = ({ value }) => {
    setFontSize(() => (value < 16 ? 16 : value > 100 ? 100 : parseInt(value)));
  };

  // track current page
  const handleActivePage = ({ value }) => {
    const newPage = parseInt(value);
    setActivePage(newPage < 1 ? 1 : newPage > pages.length ? pages.length : newPage);
  };

  // toggle can see filter or customizations
  const handleCustomizationsVisible = () => {
    setCustomizationsVisible((prev) => !prev);
  };

  // handle view type if single or double per page
  const handleViewType = (type) => {
    setViewType(type);
  };

  const setNewPages = React.useCallback((pages) => {
    setPages(pages);
  }, []);

  const setNewStory = React.useCallback((story) => {
    setStory(story);
  }, []);

  return {
    activePage,
    fontSize,
    viewType,
    customizationsVisible,
    story,
    pages,
    handleIncrement,
    handleDecrement,
    handleFontSize,
    handleActivePage,
    handleCustomizationsVisible,
    handleViewType,
    setPages,
    setStory,
    setNewPages,
    setNewStory,
  };
};
