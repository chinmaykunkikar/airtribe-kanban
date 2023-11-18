import { useEffect, useReducer } from "react";
import Board from "./components/Board";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AppContext from "./contexts/AppContext";
import data from "./data.json";
import { reducer } from "./reducer";

export default function App() {
  const [state, dispatch] = useReducer(reducer, data);

  useEffect(() => {
    const storedState = localStorage.getItem("kanbanAppState");
    if (storedState) {
      const parsedState = JSON.parse(storedState);
      dispatch({ type: "INITIALIZE_STATE", payload: parsedState });
    }
  }, [dispatch]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <div className="container mx-auto mt-8 max-w-screen-lg">
        <Header />
        <Board />
        <Footer />
      </div>
    </AppContext.Provider>
  );
}
