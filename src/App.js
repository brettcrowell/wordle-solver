import { useState, useRef, useEffect } from "react";
import { getOptionsDictionary as getOptions } from "./get-options-dictionary";
import "./styles.css";

export default function App() {
  const [inFlight, setInFlight] = useState(false);
  const [selections, setSelections] = useState(["", "", "", "", ""]);
  const [omissions, setOmissions] = useState("");
  const [known, setKnown] = useState("");
  const [options, setOptions] = useState([]);

  const omissionsRef = useRef(null);

  useEffect(() => {
    if (omissionsRef.current) {
      omissionsRef.current.value = omissions;
    }
  }, [omissions]);

  const knownRef = useRef(null);

  useEffect(() => {
    if (knownRef.current) {
      knownRef.current.value = known;
    }
  }, [known]);

  useEffect(() => {
    setInFlight(true);
    setOptions(getOptions(selections, omissions, [...known], 5));
    setInFlight(false);
  }, [selections, omissions, known]);

  const handleSetSelection = (index) => ({ target: { value } }) =>
    setSelections((options) => [
      ...options.slice(0, index),
      value.toLowerCase(),
      ...options.slice(index + 1)
    ]);

  const handleOmissionsBlur = ({ target: { value } }) =>
    setOmissions(value.toLowerCase());

  const handleKnownBlur = ({ target: { value } }) =>
    setKnown(value.toLowerCase());

  return (
    <div className="App">
      <div className="selections">
        {selections.map((value, posn) => (
          <label key={posn}>
            <input
              maxLength={1}
              value={value}
              disabled={inFlight}
              onChange={handleSetSelection(posn)}
            />
          </label>
        ))}
      </div>
      <div className="omissions">
        <textarea
          rows={5}
          ref={omissionsRef}
          disabled={inFlight}
          placeholder="Known misses..."
          onBlur={handleOmissionsBlur}
        ></textarea>
      </div>
      <div className="known">
        <input
          type="text"
          name="known"
          ref={knownRef}
          placeholder="In puzzle..."
          onBlur={handleKnownBlur}
        />
      </div>
      <pre>{options.length.toLocaleString()} options</pre>
      <pre>{JSON.stringify(options.slice(0, 1000), null, 2)}</pre>
    </div>
  );
}
