import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Form from "./pages/form";
import Header from "./companents/header";
import api from "./utils/api";
import { useDispatch } from "react-redux";
import { setError, setJobs, setLoading } from "./redux/slices/jobSlice";

const App = () => {
  //Dispatch kurulumu
  const dispatch = useDispatch();

  //Api'dan iş verilerini al ve reducer'daki state'e aktar
  useEffect(() => {
    dispatch(setLoading());
    api
      .get("/jobs")
      .then((res) => dispatch(setJobs(res.data)))
      .catch((err) => dispatch(setError(err)));
  }, []);
  return (
    <BrowserRouter>
      <div className="layout">
        <Header />
        <div className="page">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/job/:mode" element={<Form />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
