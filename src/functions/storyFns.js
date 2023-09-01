// handle next page
export const handleIncrement = (setActivePage, viewType, pages) => {
  const increment = viewType === "single" ? 1 : 2;
  setActivePage((prev) => (prev + increment > pages.length ? pages.length : prev + increment));
};

// handle prev page
export const handleDecrement = (setActivePage, viewType) => {
  const decrement = viewType === "single" ? 1 : 2;
  setActivePage((prev) => (prev - decrement < 1 ? 1 : prev - decrement));
};

// handle font size onchange
export const handleFontSize = ({ value }, setFontSize) => {
  setFontSize(() => (value < 16 ? 16 : value > 100 ? 100 : parseInt(value)));
};

// track current page
export const handleActivePage = ({ value }, setActivePage, pages) => {
  const newPage = parseInt(value);
  setActivePage(newPage < 1 ? 1 : newPage > pages.length ? pages.length : newPage);
};

// toggle can see filter or customizations
export const handleCustomizationsVisible = (setCustomizationsVisible) => {
  setCustomizationsVisible((prev) => !prev);
};

// handle view type if single or double per page
export const handleViewType = (type, setViewType) => {
  setViewType(type);
};
