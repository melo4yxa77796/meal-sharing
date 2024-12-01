import React from "react";

import TopMeals from "./TopMeals";
import "./Contacts.css";

const Contacts = () => {
  return (
    <div className="contacts">
      <h1 className="contacts-title">Top 3 Meals This Month</h1>
      
      <TopMeals />
    </div>
  );
};

export default Contacts;
