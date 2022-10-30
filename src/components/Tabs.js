export default function Tabs({ options, value: selectedTab, handleChange }) {
  return (
    <div className="tabs">
      {options.map((tabDetails, tabIndex) => {
        const { name, value } = tabDetails;
        const isSelected = Boolean(value === selectedTab.value);
        return (
          <span
            className={`tab-option  ${isSelected && "tab-selected"}`}
            onClick={() => {
              handleChange(tabDetails);
            }}
            key={`tab-option-${tabIndex}`}
          >
            {name}
          </span>
        );
      })}
    </div>
  );
}
