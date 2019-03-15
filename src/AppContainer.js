import React from "react";
import { createStackNavigator } from "react-navigation";
import BooksDashboard from "./views/booksdashboard/BooksDashboard";
import BookForm from "./components/bookform/BookForm";

export default createStackNavigator({
  Dashboard: { screen: BooksDashboard },
  Form: { screen: BookForm }
});
