import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, TextField, Button, Box, Modal } from "@mui/material";
import ReviewsPage from "./ReviewsPage";

const MealDetail = () => {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reservationData, setReservationData] = useState({
    number_of_guests: "",
    contact_name: "",
    contact_phonenumber: "",
    contact_email: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  const fetchMeal = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/meals/${id}`);
      if (response.ok) {
        const data = await response.json();
        setMeal({
          ...data.meal,
          availableReservations: data.availableReservations,
        });
      } else {
        throw new Error("Failed to fetch meal data");
      }
    } catch (error) {
      console.error("Error fetching meal:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeal();
  }, [id]);

  const handleReservationChange = (e) => {
    const { name, value } = e.target;
    setReservationData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleReservationSubmit = async (e) => {
    e.preventDefault();

    const {
      number_of_guests,
      contact_name,
      contact_phonenumber,
      contact_email,
    } = reservationData;

    if (number_of_guests > meal.availableReservations) {
      alert("Number of guests exceeds available reservations.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/api/reservations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          meal_id: id,
          number_of_guests,
          contact_name,
          contact_phonenumber,
          contact_email,
        }),
      });

      if (response.ok) {
        setSuccessMessage("Reservation successfully created!");
        setErrorMessage("");
        setReservationData({
          number_of_guests: "",
          contact_name: "",
          contact_phonenumber: "",
          contact_email: "",
        });
        fetchMeal();
        handleCloseModal();
      } else {
        setErrorMessage("Failed to create reservation.");
      }
    } catch (error) {
      console.error("Error creating reservation:", error);
      setErrorMessage("Failed to create reservation. Please try again.");
      setSuccessMessage("");
    }
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  if (loading) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography variant="h6" color="textSecondary">
          Loading meal details...
        </Typography>
      </Box>
    );
  }

  if (!meal) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography variant="h6" color="error">
          Meal not found.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <Box
        sx={{
          backgroundColor: "#f9e9e5;",
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          padding: 3,
          width: "90%",
          maxWidth: "1200px",
          maxHeight: "800px", 
          overflowY: "auto", 
          marginBottom: "30px",
          border: "1px solid",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 3,
          }}
        >
          <Box
            sx={{
              flex: 2,
              minWidth: "300px",
            }}
          >
            <Box
              component="img"
              src={`http://localhost:3001${meal.image_path}`}
              alt={meal.title}
              sx={{
                width: "100%",
                height: "400px",
                borderRadius: "8px",
                objectFit: "cover",
                border: "1px solid ",
              }}
            />
          </Box>

          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              gap: 3,
            }}
          >
            <Typography variant="h4" gutterBottom sx={{fontFamily:"'Dancing Script', cursive"}}>
              {meal.title}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {meal.description}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Price: ${meal.price}
            </Typography>
            <Typography variant="body1" >
              Available Reservations: {meal.availableReservations}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Button
                variant="contained"
                
                onClick={handleOpenModal}
                sx={{
                  backgroundColor: "#8cc7b4",
                  border: "1px solid black",
                "&:hover": {
              backgroundColor: "#f6ded8",
              color:"black",
              border: "1px solid black",
              
            },}}
              >
                Make a Reservation
              </Button>

              <ReviewsPage mealId={id}  />
            </Box>
          </Box>
        </Box>

        <Box mt={2} color="success.main">
          {successMessage && <div>{successMessage}</div>}
        </Box>
        <Box mt={2} color="error.main">
          {errorMessage && <div>{errorMessage}</div>}
        </Box>
      </Box>

      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            boxShadow: 24,
            padding: 4,
            borderRadius: 2,
            width: 400,
          }}
        >
          <Typography variant="h6" gutterBottom sx={{textAlign:"center",color:"black"}}>
            Make a Reservation
          </Typography>
          <Box
            component="form"
            onSubmit={handleReservationSubmit}
            sx={{ mt: 3 }}
          >
            <TextField
              label="Number of Guests"
              variant="outlined"
              fullWidth
              type="number"
              name="number_of_guests"
              value={reservationData.number_of_guests}
              onChange={handleReservationChange}
              required
              margin="normal"
              inputProps={{
                max: meal.availableReservations,
                min: 1,
              }}
            />
            <TextField
              label="Your Name"
              variant="outlined"
              fullWidth
              name="contact_name"
              value={reservationData.contact_name}
              onChange={handleReservationChange}
              required
              margin="normal"
            />
            <TextField
              label="Phone Number"
              variant="outlined"
              fullWidth
              name="contact_phonenumber"
              value={reservationData.contact_phonenumber}
              onChange={handleReservationChange}
              required
              margin="normal"
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              name="contact_email"
              value={reservationData.contact_email}
              onChange={handleReservationChange}
              required
              margin="normal"
            />
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
            >
              <Button variant="contained"  type="submit" sx={{backgroundColor: "#8cc7b4",
                  color: "white",
                  
                  "&:hover": {
                    backgroundColor: "#f6ded8",
                    color: "black",
                  },}}>
                Submit
              </Button>
              <Button
                variant="outlined"
                
                onClick={handleCloseModal}
                sx={{ backgroundColor: "#f6ded8",
                  color: "black",
                  border:"none",
                  "&:hover": {
                    backgroundColor: "#8cc7b4",
                    color: "black",
                  },}}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default MealDetail;
