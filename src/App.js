import React, { useEffect, useCallback } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css';

//  Component
import Layout from "./Layout";
import Register from "./Components/Register";
import Login from "./Components/Login";
import CreateFeedback from "./Components/Feedback/Create";
import FeedbackList from "./Components/Feedback/Index";

//  Api
import { fetchUserDetail } from "./services/AuthApis";

//  Redux
import { useDispatch, useSelector } from "react-redux";

const UserRoutes = ({ user }) => {

  if (user) {
    return (
      <Routes>
        {(user) && (
          <Route index path="/*" element={<Navigate to="/dashboard" />} />
        )}
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<FeedbackList />} />
          <Route path="create-feedback" element={<CreateFeedback />} />
        </Route>
      </Routes>
    );
  }

  else if (user === null) {
    return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    );
  }
};

function App() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  const getUserDetail = useCallback(() => {
    dispatch(fetchUserDetail()).unwrap();
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      getUserDetail();
    }
  }, [isLoggedIn, getUserDetail]);

  const user = JSON.parse(localStorage.getItem("loggedUser"));

  return (
    <BrowserRouter>
      <UserRoutes user={user} />
    </BrowserRouter>
  );
}

export default App;
