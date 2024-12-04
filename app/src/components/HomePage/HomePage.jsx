

import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "./HomePage.css";
import Meal from "../../../frontend/components/Meal";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function HomePage() {
  const [meals, setMeals] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/all-meals`);
        const data = await response.json();

        const sanitizedData = data.map((meal) => ({
          ...meal,
          title: typeof meal.title === "string" ? meal.title : "Unknown Meal",
          price: meal.price || 0,
        }));

        setMeals(sanitizedData);
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
    };

    fetchData();
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="home-page">
      <header
        className="header"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px",
        }}
      >
        <div className="text-column" style={{ flex: 1, marginRight: "20px" }}>
          <Typography
            variant="h1"
            gutterBottom
            sx={{
              fontSize: "5.5rem",
              fontFamily: "'Dancing Script', cursive",
            }}
          >
            Welcome to Meal-Sharing
          </Typography>
          <Typography
            variant="h5"
            gutterBottom
            className="description"
            sx={{ fontSize: "1.35rem" }}
          >
            Discover delicious dishes from around the world! Enjoy exclusive
            discounts on your favorite meals and reserve a table at your
            preferred restaurant with ease. Experience the joy of enjoying
            culinary delights with special offers tailored just for you. Don’t
            wait, book your table now and savor in a world of flavors!
          </Typography>
          <section className="button-section" style={{ marginTop: "20px" }}>
            <Link to="/meals">
              <Button
                variant="contained"
                sx={{
                  borderRadius: "10px",
                  backgroundColor: "#fcd1cf",
                  color: "black",
                  marginRight: "30px",
                  "&:hover": {
                    backgroundColor: "#8cc7b4",
                    color: "white",
                  },
                }}
              >
                View All Meals
              </Button>
            </Link>
            <Link to="/contacts" style={{ marginLeft: "10px" }}>
              <Button
                variant="contained"
                sx={{
                  borderRadius: "10px",
                  backgroundColor: "#fcd1cf",
                  color: "black",
                  marginLeft: "30px",
                  width: "170px",
                  "&:hover": {
                    backgroundColor: "#8cc7b4",
                    color: "white",
                  },
                }}
              >
                Get More
              </Button>
            </Link>
          </section>
        </div>

        <div className="image-column" style={{ flex: 1 }}>
          <img
            src="/uploads/newburger2.png"
            alt="Delicious meals"
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "10px",
              backgroundColor: "transparent",
              display: "block",
              objectFit: "cover",
            }}
          />
        </div>
      </header>

      <section className="meals-slider-section">
        <h2
          style={{
            textAlign: "center",
            padding: "30px",
            fontSize: "3em",
            color: "#333",
            fontFamily: "'Dancing Script', cursive",
          }}
        >
          Popular Meals
        </h2>
        <div style={{ padding: "30px", 
    }}>
          <Slider {...sliderSettings}>
            {meals.slice(0, 8).map((meal) => (
              <div key={meal.id} >
                <Meal meal={meal} />
              </div>
            ))}
          </Slider>
        </div>
      </section>
      <section className="meals-section">
        <Link to="/meals">
          <Box
            sx={{
              display: "grid",
              gridTemplateRows: "1fr auto",
            }}
          >
            <Box />
            <Box sx={{ textAlign: "center", padding: "30px" }}>
              <Button
                variant="contained"
                sx={{
                  borderRadius: "10px",
                  padding: "10px 20px",
                }}
              >
                View All Meals
              </Button>
            </Box>
          </Box>
        </Link>
      </section>
    </div>
  );
}

export default HomePage;
