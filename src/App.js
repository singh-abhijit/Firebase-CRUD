import { NewLegDetails, UserLegs } from "components";
import { useState } from "react";
import "./App.css";

const defaultLegs = [
  {
    lots: 100,
    segment: 5,
    position: "sell",
    type: "put",
    expiry: "monthly",
    strikeCriteria: "premiumRange",
    strikeType: "ITM20",
    lower: 50,
    upper: 200,
  },
  {
    lots: 10,
    segment: 1,
    position: "buy",
    type: "call",
    expiry: "monthly",
    strikeCriteria: "premiumRange",
    strikeType: "ITM20",
    lower: 50,
    upper: 200,
  },
];

function App() {
  const [newLeg, setNewLeg] = useState(false);
  const [userLegs, setUserLegs] = useState({
    legs: defaultLegs,
    lastUpdated: new Date(),
  });
  /**
   * we can use react-query or make custom util to cache API data
   * and also manage last Updates and other details like error, progress and even fetching status
   * for a backdrop or loader
   *
   * if we use invalidate query of react-query, we won't need to maintain / update data from parent state
   * we could just invalidate 'fetch all legs' query from 'add new leg' component
   */

  const toggleNewLeg = () => {
    setNewLeg((newLegStatus) => !newLegStatus);
  };

  const addNewLeg = (newLegDetails) => {
    setUserLegs((currentLegsDetails) => ({
      legs: [...currentLegsDetails.legs, newLegDetails],
      lastUpdated: new Date(),
    }));
    // append new leg data
    // onSuccess : toggleNewLeg
    // setLastUpdated(new Date())
  };

  const saveLegs = (legs) => {
    setUserLegs(() => ({
      legs: legs,
      lastUpdated: new Date(),
    }));
    // append new leg data
    // onSuccess : toggleNewLeg
    // setLastUpdated(new Date())
  }

  return (
    <div className="container">
      <div className="flex justify-between mb-1 mt-8">
        <p className="label">Legs</p>
        <button onClick={toggleNewLeg} className="button text-md">
          + Add Legs
        </button>
      </div>
      <hr />
      {newLeg && (
        <div className="mt-4">
          <NewLegDetails toggleNewLeg={toggleNewLeg} addNewLeg={addNewLeg} />
        </div>
      )}
      <div className="mt-4">
        <UserLegs
          allLegs={userLegs.legs}
          lastUpdatedAt={userLegs.lastUpdated}
          saveLegs={saveLegs}
        />
      </div>
    </div>
  );
}

export default App;
