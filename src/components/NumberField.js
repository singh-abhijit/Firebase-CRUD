import { FormField } from "components";

const NumberField = ({ label, labelDirection, onChange, ...rest }) => {
  return (
    <FormField label={label} labelDirection={labelDirection}>
      <input
        type="number"
        onChange={(event) => onChange(event.target.valueAsNumber)}
        {...rest}
      />
    </FormField>
  );
};

export default NumberField;
