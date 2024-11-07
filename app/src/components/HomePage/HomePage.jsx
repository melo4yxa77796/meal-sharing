import React from "react";
import hyfLogo from "../../assets/hyf.svg";
import "./HomePage.css";
import MealsList from "../../../frontend/components/MealsList";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom"; 

// Feel free to replace the content of this component with your own
function HomePage() {
  return (
    <>
      <div className="home-page">
     
      <header className="header">
        
        <Typography variant="h1" gutterBottom>
         Welcome to Meal-Sharing
         
        </Typography>
        <Typography variant="h5" gutterBottom>
        Discover delicious dishes from around the world!
        </Typography>
      </header>

      {/* Секция со списком блюд */}
      <section className="meals-section">
        <MealsList limit={4} /> {/* Отобразить только ограниченное количество блюд */}
      </section>

      {/* Кнопка для перехода к списку блюд */}
      <footer className="footer">
        <Link to="/meals">
          <Button variant="contained" color="primary">
            View All Meals
          </Button>
        </Link>
      </footer>
    </div>
    </>
  );
}

export default HomePage;
