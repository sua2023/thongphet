import React from "react";

interface IAddPropsType {
  newExpertise: string;
  setNewExpertise: (expertise: string) => void;
  handleAddExpertise: () => void;
}
export default function AddSpcialist(props: IAddPropsType) {
  const { newExpertise, setNewExpertise, handleAddExpertise } = props;
  return (
    <>
      <div className="text-start py-5">
        <p className="text-base">Add new expertise</p>
        <div className="mt-5">
          <label
            htmlFor="base-input"
            className="block mb-1 text-sm font-medium text-gray700"
          >
            Expertise <span className="text-red">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="Expertise"
            value={newExpertise}
            id="base-input"
            onChange={(e) => setNewExpertise(e.target.value)}
            className="bg-white border border-gray300 text-gray700 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary block w-full p-2.5"
          />
        </div>
        <div className="mt-5 pt-2">
          <button
            type="button"
            className="mt-2 py-2 px-3 bg-primary text-white w-32 flex items-center justify-center text-sm rounded-lg"
            onClick={handleAddExpertise}
          >
            Add new
          </button>
        </div>
      </div>
    </>
  );
}
