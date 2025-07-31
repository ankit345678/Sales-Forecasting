import React, { useState, useMemo } from "react";
import { Package, ArrowRight } from "lucide-react";
import { Icon } from "./shared/Icon";
import { FormInput } from "./shared/FormInput";

/**
 * PredictionForm Component
 * Renders the input form for the user to enter item and outlet details.
 * Handles form state and submission.
 */
const PredictionForm = ({
  setPrediction,
  setHistory,
  setLoading,
  setError,
}) => {
  // State to hold all form input values
  const [formData, setFormData] = useState({
    Item_Weight: 10,
    Item_Fat_Content: "Low Fat",
    Item_Visibility: 0.05,
    Item_Type: "Snack Foods",
    Item_MRP: 150,
    Outlet_Identifier: "OUT049",
    Outlet_Establishment_Year: 1999,
    Outlet_Size: "Medium",
    Outlet_Location_Type: "Tier 1",
    Outlet_Type: "Supermarket Type1",
    Item_Category: "FD",
  });

  // Handler for form input changes
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) : value,
    }));
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPrediction(null);

    try {
      // API call to the FastAPI backend
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Prediction failed");
      }

      const result = await response.json();
      const newPredictionValue = result.prediction;

      // Update the main prediction and the history
      setPrediction(newPredictionValue);
      setHistory((prevHistory) => {
        const newEntry = {
          name: `Pred #${prevHistory.length + 1}`,
          sales: newPredictionValue,
        };
        return [...prevHistory, newEntry].slice(-10); // Keep last 10
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Memoizing options to prevent re-creation on each render
  const itemTypeOptions = useMemo(
    () => [
      "Baking Goods",
      "Breads",
      "Breakfast",
      "Canned",
      "Dairy",
      "Frozen Foods",
      "Fruits and Vegetables",
      "Hard Drinks",
      "Health and Hygiene",
      "Household",
      "Meat",
      "Others",
      "Seafood",
      "Snack Foods",
      "Soft Drinks",
      "Starchy Foods",
    ],
    []
  );
  const outletIdentifierOptions = useMemo(
    () => [
      "OUT010",
      "OUT013",
      "OUT017",
      "OUT018",
      "OUT019",
      "OUT027",
      "OUT035",
      "OUT045",
      "OUT046",
      "OUT049",
    ],
    []
  );

  return (
    <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
        <Icon icon={Package} className="mr-3 text-blue-400" />
        Enter Item & Outlet Details
      </h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {/* Item Details */}
        <FormInput
          id="Item_Weight"
          label="Item Weight"
          type="number"
          value={formData.Item_Weight}
          onChange={handleChange}
        />
        <FormInput
          id="Item_Visibility"
          label="Item Visibility"
          type="number"
          value={formData.Item_Visibility}
          onChange={handleChange}
        />
        <FormInput
          id="Item_MRP"
          label="Item MRP ($)"
          type="number"
          value={formData.Item_MRP}
          onChange={handleChange}
        />
        <FormInput
          id="Item_Fat_Content"
          label="Fat Content"
          type="select"
          value={formData.Item_Fat_Content}
          onChange={handleChange}
        >
          <option>Low Fat</option>
          <option>Regular</option>
        </FormInput>
        <FormInput
          id="Item_Type"
          label="Item Type"
          type="select"
          value={formData.Item_Type}
          onChange={handleChange}
        >
          {itemTypeOptions.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </FormInput>
        <FormInput
          id="Item_Category"
          label="Item Category"
          type="select"
          value={formData.Item_Category}
          onChange={handleChange}
        >
          <option>FD</option>
          <option>NC</option>
          <option>DR</option>
        </FormInput>

        {/* Outlet Details */}
        <FormInput
          id="Outlet_Identifier"
          label="Outlet ID"
          type="select"
          value={formData.Outlet_Identifier}
          onChange={handleChange}
        >
          {outletIdentifierOptions.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </FormInput>
        <FormInput
          id="Outlet_Establishment_Year"
          label="Establishment Year"
          type="number"
          value={formData.Outlet_Establishment_Year}
          onChange={handleChange}
        />
        <FormInput
          id="Outlet_Size"
          label="Outlet Size"
          type="select"
          value={formData.Outlet_Size}
          onChange={handleChange}
        >
          <option>Small</option>
          <option>Medium</option>
          <option>High</option>
        </FormInput>
        <FormInput
          id="Outlet_Location_Type"
          label="Location Type"
          type="select"
          value={formData.Outlet_Location_Type}
          onChange={handleChange}
        >
          <option>Tier 1</option>
          <option>Tier 2</option>
          <option>Tier 3</option>
        </FormInput>
        <FormInput
          id="Outlet_Type"
          label="Outlet Type"
          type="select"
          value={formData.Outlet_Type}
          onChange={handleChange}
        >
          <option>Grocery Store</option>
          <option>Supermarket Type1</option>
          <option>Supermarket Type2</option>
          <option>Supermarket Type3</option>
        </FormInput>

        {/* Submit Button */}
        <div className="md:col-span-2 lg:col-span-3 flex justify-end mt-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 flex items-center"
          >
            Predict Sales
            <Icon icon={ArrowRight} className="ml-2 w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default PredictionForm;
