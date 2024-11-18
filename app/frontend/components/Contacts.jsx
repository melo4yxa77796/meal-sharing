import React from "react";
import { Link } from "react-router-dom";
import AddMealForm from "./AddFormMeal";


const Contacts = () => {
    return (
        <div className="contacts">
            <h1>Contacts</h1>
            <Link to="/">Home</Link>
            <AddMealForm />
        </div>
    );
};

export default Contacts;


