import { NewLegDetails, UserLegs } from "components";
import { useState, useEffect } from "react";
import "./App.css";
import LegDataService from "services/legs";

function App() {
  const [newLeg, setNewLeg] = useState(false);
  const [userLegs, setUserLegs] = useState({
    legs: [],
    lastUpdated: 0,
  });
  /**
   * we can use react-query or make custom util to cache API data
   * and also manage last Updates and other details like error, progress and even fetching status
   * for a backdrop or loader
   *
   * if we use invalidate query of react-query, we won't need to maintain / update data from parent state
   * we could just invalidate 'fetch all legs' query from 'add new leg' component
   */

  const saveLegs = (legs) => {
    setUserLegs(() => ({
      legs: legs,
      lastUpdated: new Date(),
    }));
    // append new leg data
    // onSuccess : toggleNewLeg
    // setLastUpdated(new Date())
  };

  const getAllLegsSaved = async () => {
    const data = await LegDataService.getAllLegs();
    saveLegs(data);
  };

  useEffect(() => {
    getAllLegsSaved();
  }, []);

  const toggleNewLeg = () => {
    setNewLeg((newLegStatus) => !newLegStatus);
  };

  const addNewLeg = (newLegDetails) => {
    LegDataService.addLegs(newLegDetails).then((e) => {
      getAllLegsSaved();
      toggleNewLeg();
    });

    // append new leg data
    // onSuccess : toggleNewLeg
    // setLastUpdated(new Date())
  };

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
        {userLegs && userLegs.lastUpdated ? (
          <>
            <UserLegs
              allLegs={userLegs.legs}
              lastUpdatedAt={userLegs.lastUpdated}
              refetch={getAllLegsSaved}
            />
          </>
        ) : (
          <p className="label m-auto text-center !text-lg mt-8">Fetching...</p>
        )}
      </div>
    </div>
  );
}

export default App;
