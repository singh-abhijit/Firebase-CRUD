import FormField from "./FormField";

const SelectField = ({
  label,
  options,
  value: selectedOption,
  handleChange,
  ...rest
}) => {
  return (
    <FormField label={label}>
      <select
        defaultValue={selectedOption}
        onChange={(event) => handleChange(event.target.value)}
        {...rest}
      >
        {options.map((optionDetails, optionIndex) => {
          const { name, value } = optionDetails;
          return (
            <option
              value={value}
              key={`select-option-${optionIndex}`}
            >
              {name}
            </option>
          );
        })}
      </select>
    </FormField>
  );
};

export default SelectField;
