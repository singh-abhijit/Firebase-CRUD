import { DocumentDuplicateIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Button, NumberField, SelectField } from "components";
import {
  EXPIRY_DURATION,
  OPTION_TYPES,
  POSITIONS,
  SIMPLE_MOMENTUM_OPTIONS,
  STRIKE_CRITERIAS,
  TRAIL_SL_OPTIONS,
} from "constants";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";

const LegItem = ({
  legDetails,
  legIndex,
  handleUpdateLegItem: updateLegData,
  remove,
  append,
}) => {
  const {
    lots,
    position: selectedPosition,
    type: selectedType,
    expiry,
    strikeCriteria: selectedStrikeCriteria,
    lower = 0,
    upper = 1,
    momentumEnabled = false,
    momentumOptions = null,
    momentumValue = 0,
    trailEnabled = false,
    trailOptions = null,
    trailValue1 = 0,
    trailValue2 = 0,
  } = legDetails;

  const removeItem = () => remove(legIndex);

  const copyThisItem = () => append(legDetails);

  return (
    <div className="leg-item-container">
      <div className="leg-item-actions">
        <span
          className="action-button bg-secondary-actions "
          onClick={removeItem}
        >
          <XMarkIcon className="h-4 w-4 text-white " />
        </span>
        <span className="action-button bg-white mt-2" onClick={copyThisItem}>
          <DocumentDuplicateIcon className="h-4 w-4  " />
        </span>
      </div>
      <div className="leg-item-features">
        <div className="flex flex-col md:flex-row justify-center gap-8 my-6 items-center md:items-end">
          {/* Select Features */}
          <NumberField
            labelDirection="horizontal"
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
            handleChange={(selectedValue) =>
              updateLegData("type", selectedValue)
            }
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
          <NumberField
            labelDirection="horizontal"
            label="Lower"
            value={lower}
            onChange={(value) => {
              updateLegData("lower", value);
            }}
            min={1}
            max={upper - 1}
          />
          <NumberField
            labelDirection="horizontal"
            label="Upper"
            value={upper}
            onChange={(value) => {
              updateLegData("upper", value);
            }}
            min={lower + 1}
          />
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          <span className="flex flex-col justify-start  items-start">
            {/* Simple Momentum */}
            <label className="flex gap-2 mb-3">
              <input
                type="checkbox"
                defaultChecked={momentumEnabled}
                onChange={(event) =>
                  updateLegData("momentumEnabled", event.target.checked)
                }
              />
              <p className="label">Simple Momentum</p>
            </label>
            <div className="flex gap-4 items-center">
              <SelectField
                disabled={!momentumEnabled}
                options={SIMPLE_MOMENTUM_OPTIONS}
                value={momentumOptions}
                handleChange={(selectedValue) =>
                  updateLegData("momentumOptions", selectedValue)
                }
              >
                Strike Criteria
              </SelectField>
              <NumberField
                disabled={!momentumEnabled}
                value={momentumValue}
                onChange={(value) => {
                  updateLegData("momentumValue", value);
                }}
              />
            </div>
          </span>
          <span className="flex flex-col justify-start  items-start">
            {/* Trail SL */}
            <label className="flex gap-2 mb-3">
              <input
                type="checkbox"
                defaultChecked={trailEnabled}
                onChange={(event) =>
                  updateLegData("trailEnabled", event.target.checked)
                }
              />
              <p className="label">Trail SL</p>
            </label>
            <div className="flex gap-4 items-center">
              <SelectField
                disabled={!trailEnabled}
                options={TRAIL_SL_OPTIONS}
                value={trailOptions}
                handleChange={(selectedValue) =>
                  updateLegData("trailOptions", selectedValue)
                }
              >
                Strike Criteria
              </SelectField>
              <NumberField
                disabled={!trailEnabled}
                value={trailValue1}
                onChange={(value) => {
                  updateLegData("trailValue1", value);
                }}
              />
              <NumberField
                disabled={!trailEnabled}
                value={trailValue2}
                onChange={(value) => {
                  updateLegData("trailValue2", value);
                }}
              />
            </div>
          </span>
        </div>
      </div>
    </div>
  );
};

const UserLegs = ({ allLegs, lastUpdatedAt, saveLegs }) => {
  const { control, trigger, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      legs: allLegs,
    },
  });

  useEffect(() => {
    setValue("legs", allLegs);
  }, [lastUpdatedAt]);

  const {
    fields: legs,
    append,
    remove,
    update,
  } = useFieldArray({
    control,
    name: "legs",
  });

  const handleUpdateLegItem = (legIndex, field, value) => {
    const watchLegDetails = watch(`legs.${legIndex}`);

    update(legIndex, {
      ...watchLegDetails,
      [field]: value,
    });
  };

  const handleSavePreferences = () => {
    // save to firebase
    console.log(watch().legs);
    saveLegs(watch().legs);
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleSavePreferences)}>
        {legs.map((legDetails, legIndex) => (
          <div key={`leg-item-${legIndex}`} className="my-8">
            <LegItem
              legDetails={legDetails}
              legIndex={legIndex}
              handleUpdateLegItem={(field, value) =>
                handleUpdateLegItem(legIndex, field, value)
              }
              remove={remove}
              append={append}
            />
          </div>
        ))}

        <div className="">
          <Button
            type="button"
            variant="contained"
            onClick={handleSavePreferences}
            className="m-auto"
          >
            Save Preferences
          </Button>
        </div>
      </form>
    </>
  );
};

export default UserLegs;
