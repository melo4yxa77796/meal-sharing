import React from "react";
import { Link } from "react-router-dom";
import TopMeals from "./TopMeals";


const Contacts = () => {
    return (
        <div className="contacts">
            <h1>Contacts</h1>
            <Link to="/">Home</Link>
            <TopMeals />
        </div>
    );
};

export default Contacts;


