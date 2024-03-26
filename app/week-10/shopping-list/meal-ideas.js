"use client";

import { useState, useEffect } from "react";

const fetchMealIdeas = async (ingredient) => {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
  );
  const data = await response.json();
  return data.meals;
};

const fetchMealDetails = async (mealId) => {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
  );
  const data = await response.json();
  return data.meals[0];
};

export default function MealIdeas({ ingredient }) {
  const [meals, setMeals] = useState([]);
  const [ingredientSelected, setIngredientSelected] = useState("");
  const [selectedMeal, setSelectedMeal] = useState(null);

  const loadMealIdeas = async (ingredient) => {
    if (!ingredient) {
      setMeals([]);
      setIngredientSelected("");
      return;
    }
    const data = await fetchMealIdeas(ingredient);
    if (data) {
      setMeals(data);
      setIngredientSelected(ingredient);
    } else {
      setMeals([]);
      setIngredientSelected(ingredient);
    }
  };

  useEffect(() => {
    loadMealIdeas(ingredient);
  }, [ingredient]);

  const handleMealClick = async (mealId) => {
    const mealDetails = await fetchMealDetails(mealId);
    setSelectedMeal(mealDetails);
  };

  return (
    <div>
      <h3 className="text-xl font-bold">Meal Ideas</h3>
      {ingredientSelected && meals.length > 0 && (
        <p>Here are some meal ideas using {ingredient}:</p>
      )}
      {meals.map((meal) => (
        <div
          key={meal.idMeal}
          className="flex flex-col cursor-pointer bg-slate-300 hover:bg-orange-500"
        >
          <div
            className="p-1 m-1 max-w-sm"
            onClick={() => handleMealClick(meal.idMeal)}
          >
            {meal.strMeal}
          </div>
          {selectedMeal && selectedMeal.idMeal === meal.idMeal && (
            <div className="text-xs text-gray-600 p-1 m-1 max-w-sm">
              <div className="ml-3">Ingredients needed:</div>
              <ul>
                {Object.keys(selectedMeal).map((key) => {
                  if (key.includes("strIngredient") && selectedMeal[key]) {
                    const measureKey = key.replace(
                      "strIngredient",
                      "strMeasure"
                    );
                    const measure = selectedMeal[measureKey];
                    return (
                      <li className="ml-6" key={key}>
                        {selectedMeal[key]} {measure && `(${measure})`}
                      </li>
                    );
                  }
                  return null;
                })}
              </ul>
            </div>
          )}
        </div>
      ))}
      {ingredientSelected && meals.length === 0 && (
        <p>No meal ideas found for {ingredient}</p>
      )}
    </div>
  );
}
