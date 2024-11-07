import React from "react";
import hyfLogo from "../../assets/hyf.svg";
import "./HomePage.css";
import MealsList from "../../../frontend/components/MealsList";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Footer from "../../../frontend/components/Footer";
import Navbar from "../../../frontend/components/Navbar";

// Feel free to replace the content of this component with your own
function HomePage() {
  return (
    <>
      <Navbar />
      <div className="home-page">
        <header className="header">
          <Typography variant="h1" gutterBottom>
            Welcome to Meal-Sharing
          </Typography>
          <Typography variant="h5" gutterBottom>
            Discover delicious dishes from around the world!
          </Typography>
        </header>

        {}
        <section className="meals-section">
          <MealsList limit={6} /> {}
        </section>

        {}
        <section className="">
          <Link to="/meals">
            <Button variant="contained" color="primary">
              View All Meals
            </Button>
          </Link>
        </section>
        <Footer />
      </div>
    </>
  );
}

export default HomePage;
