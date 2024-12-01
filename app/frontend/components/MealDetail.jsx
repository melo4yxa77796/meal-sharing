
/*import React, { useEffect, useState } from "react";
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
      const response = await fetch("http://localhost:3001/api/reservations", {
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
    <Box
      sx={{
        maxWidth: 1200,
        mx: "auto",
        p: 4,
        backgroundColor: "#f9f9f9",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h3" textAlign="center" color="primary" mb={3}>
        {meal.title}
      </Typography>
      <Box
        component="img"
        src={`http://localhost:3001${meal.image_path}`}
        alt={meal.title}
        sx={{
          display: "block",
          maxWidth: "100%",
          height: "auto",
          borderRadius: 2,
          boxShadow: 2,
          mb: 3,
          mx: "auto",
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
        }}
      >
        <Box
          sx={{
            flex: 1,
            minWidth: 300,
          }}
        >
          <Typography variant="h5" gutterBottom>
            Meal Information
          </Typography>
          <Typography variant="body1" color="textSecondary" mb={2}>
            {meal.description}
          </Typography>
          <Typography variant="body1" color="textSecondary" mb={2}>
            Price: ${meal.price}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Available Reservations: {meal.availableReservations}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            onClick={handleOpenModal}
          >
            Make a Reservation
          </Button>
        </Box>
        <Box
          sx={{
            flex: 1,
            minWidth: 300,
          }}
        >
          <ReviewsPage mealId={id} />
        </Box>
      </Box>

      <Box mt={2} color="success.main">
        {successMessage && <div>{successMessage}</div>}
      </Box>
      <Box mt={2} color="error.main">
        {errorMessage && <div>{errorMessage}</div>}
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
          <Typography variant="h6" gutterBottom>
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
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
              <Button variant="outlined" color="secondary" onClick={handleCloseModal}>
                Cancel
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default MealDetail;*/
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, TextField, Button, Box, Modal } from "@mui/material";

const MealDetail = () => {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);


  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  
  const [reservationData, setReservationData] = useState({
    number_of_guests: "",
    contact_name: "",
    contact_phonenumber: "",
    contact_email: "",
  });

 
  const [reviewData, setReviewData] = useState({
    name: "",
    title: "",
    description: "",
    stars: 5,
  });

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

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReviewData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleReservationSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          meal_id: id,
          ...reservationData,
        }),
      });

      if (response.ok) {
        alert("Reservation successfully created!");
        setReservationData({
          number_of_guests: "",
          contact_name: "",
          contact_phonenumber: "",
          contact_email: "",
        });
        setIsReservationModalOpen(false);
        fetchMeal(); 
      } else {
        alert("Failed to create reservation.");
      }
    } catch (error) {
      console.error("Error creating reservation:", error);
      alert("Failed to create reservation. Please try again.");
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    const createdDate = new Date().toISOString().split("T")[0];
    const reviewPayload = { ...reviewData, meal_id: id, created_date: createdDate };

    try {
      const response = await fetch("http://localhost:3001/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewPayload),
      });

      if (response.ok) {
        alert("Review submitted successfully!");
        setReviewData({ name: "", title: "", description: "", stars: 5 });
        setIsReviewModalOpen(false); 
      } else {
        alert("Failed to submit review.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Error submitting review. Please try again.");
    }
  };

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
    <Box
      sx={{
        maxWidth: 1200,
        mx: "auto",
        p: 4,
        backgroundColor: "#f9f9f9",
        borderRadius: 2,
        boxShadow: 3,
        display: "flex",
        gap: 4,
      }}
    >
      
      <Box
        sx={{
          flex: 1,
        }}
      >
        <Box
          component="img"
          src={`http://localhost:3001${meal.image_path}`}
          alt={meal.title}
          sx={{
            display: "block",
            maxWidth: "100%",
            height: "auto",
            borderRadius: 2,
            boxShadow: 2,
          }}
        />
      </Box>

      
      <Box
        sx={{
          flex: 1.5,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography variant="h5" gutterBottom>
            Meal Information
          </Typography>
          <Typography variant="body1" color="textSecondary" mb={2}>
            {meal.description}
          </Typography>
          <Typography variant="body1" color="textSecondary" mb={2}>
            Price: ${meal.price}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Available Reservations: {meal.availableReservations}
          </Typography>
        </Box>

        
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 4,
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsReservationModalOpen(true)}
            sx={{ flex: 1 }}
          >
            Make a Reservation
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setIsReviewModalOpen(true)}
            sx={{ flex: 1 }}
          >
            Leave a Review
          </Button>
        </Box>
      </Box>

      
      <Modal open={isReservationModalOpen} onClose={() => setIsReservationModalOpen(false)}>
        <Box sx={modalStyles}>
          <Typography variant="h6" gutterBottom>
            Make a Reservation
          </Typography>
          <Box component="form" onSubmit={handleReservationSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Number of Guests"
              name="number_of_guests"
              value={reservationData.number_of_guests}
              onChange={handleReservationChange}
              fullWidth
              required
            />
            <TextField
              label="Your Name"
              name="contact_name"
              value={reservationData.contact_name}
              onChange={handleReservationChange}
              fullWidth
              required
            />
            <TextField
              label="Phone Number"
              name="contact_phonenumber"
              value={reservationData.contact_phonenumber}
              onChange={handleReservationChange}
              fullWidth
              required
            />
            <TextField
              label="Email"
              name="contact_email"
              value={reservationData.contact_email}
              onChange={handleReservationChange}
              fullWidth
              required
            />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
              <Button variant="outlined" onClick={() => setIsReservationModalOpen(false)}>
                Cancel
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>

      
      <Modal open={isReviewModalOpen} onClose={() => setIsReviewModalOpen(false)}>
        <Box sx={modalStyles}>
          <Typography variant="h6" gutterBottom>
            Leave a Review
          </Typography>
          <Box component="form" onSubmit={handleReviewSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Your Name"
              name="name"
              value={reviewData.name}
              onChange={handleReviewChange}
              fullWidth
              required
            />
            <TextField
              label="Review Title"
              name="title"
              value={reviewData.title}
              onChange={handleReviewChange}
              fullWidth
              required
            />
            <TextField
              label="Your Review"
              name="description"
              value={reviewData.description}
              onChange={handleReviewChange}
              multiline
              rows={4}
              fullWidth
              required
            />
            <TextField
              label="Stars"
              name="stars"
              value={reviewData.stars}
              onChange={handleReviewChange}
              type="number"
              inputProps={{ min: 1, max: 5 }}
              fullWidth
              required
            />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
              <Button variant="outlined" onClick={() => setIsReviewModalOpen(false)}>
                Cancel
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

const modalStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "white",
  padding: 4,
  borderRadius: 2,
  boxShadow: 24,
  width: 400,
};

export default MealDetail;
