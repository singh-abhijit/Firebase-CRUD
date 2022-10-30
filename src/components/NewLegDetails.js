import { Button, NumberField, SelectField, Tabs } from "components";
import {
  AVAILABLE_SEGMENTS,
  EXPIRY_DURATION,
  OPTION_TYPES,
  POSITIONS,
  STRIKE_CRITERIAS,
  STRIKE_TYPES,
} from "constants";
import { useState } from "react";

const defaultLegData = {
  lots: 1,
  segment: AVAILABLE_SEGMENTS[1],
  position: POSITIONS[0].value,
  type: OPTION_TYPES[0].value,
  expiry: EXPIRY_DURATION[1].value,
  strikeCriteria: STRIKE_CRITERIAS[0].value,
  strikeType: STRIKE_TYPES[1].value,
};

const NewLegDetails = ({ toggleNewLeg, addNewLeg }) => {
  const [legData, setLegData] = useState(defaultLegData);

  const {
    lots,
    segment: selectedSegment,
    position: selectedPosition,
    type: selectedType,
    expiry,
    strikeCriteria: selectedStrikeCriteria,
    strikeType: selectedStrikeType,
  } = legData;

  const updateLegData = (field, value) => {
    setLegData((currentLegData) => ({
      ...currentLegData,
      [field]: value,
    }));
  };
  const addLeg = () => {
    addNewLeg(legData);
  };

  return (
    <div className="p-8 flex-col justify-center items-center gap-2">
      <div className="flex justify-center items-center gap-4">
        {/* Select Segments */}
        <p className="label">Select Segments</p>
        <Tabs
          options={AVAILABLE_SEGMENTS}
          value={selectedSegment}
          handleChange={(value) => updateLegData("segment", value)}
        />
      </div>
      <div className="flex justify-center gap-8 my-6">
        {/* Select Features */}
        <NumberField
          label="Total lot"
          value={lots}
          onChange={(value) => {
            updateLegData("lots", value);
          }}
          min="1"
        />
        <SelectField
          options={POSITIONS}
          value={selectedPosition}
          handleChange={(selectedValue) =>
            updateLegData("position", selectedValue)
          }
          label="Position"
        >
          Sell
        </SelectField>
        <SelectField
          options={OPTION_TYPES}
          value={selectedType}
          handleChange={(selectedValue) => updateLegData("type", selectedValue)}
          label="Option Type"
        >
          Call
        </SelectField>
        <SelectField
          options={EXPIRY_DURATION}
          value={expiry}
          handleChange={(selectedValue) =>
            updateLegData("expiry", selectedValue)
          }
          label="Expiry"
        >
          Weekly
        </SelectField>
        <SelectField
          options={STRIKE_CRITERIAS}
          value={selectedStrikeCriteria}
          handleChange={(selectedValue) =>
            updateLegData("strikeCriteria", selectedValue)
          }
          label="Select Strike Criteria"
        >
          Strike Criteria
        </SelectField>
        <SelectField
          options={STRIKE_TYPES}
          value={selectedStrikeType}
          handleChange={(selectedValue) =>
            updateLegData("strikeType", selectedValue)
          }
          label="Strike Type"
        >
          Strike type
        </SelectField>
      </div>
      <div className="flex justify-center gap-4">
        {/* Confirm buttons */}
        <Button variant="contained" onClick={addLeg}>
          Add Leg
        </Button>

        <Button variant="outlined" onClick={toggleNewLeg}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default NewLegDetails;
