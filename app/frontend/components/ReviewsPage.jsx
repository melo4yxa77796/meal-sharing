
/*import React, { useState } from "react";
import { TextField, Button, Typography, Box, Modal } from "@mui/material";
import "./ReviewsPage.css";

const ReviewsPage = ({ mealId }) => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [stars, setStars] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const createdDate = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewData = {
      name,
      title,
      description,
      meal_id: mealId,
      stars,
      created_date: createdDate,
    };

    try {
      const response = await fetch("http://localhost:3001/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });

      if (response.ok) {
        alert("Review submitted successfully!");
        setName("");
        setTitle("");
        setDescription("");
        setStars(5);
        setIsModalOpen(false);
      } else {
        alert("Failed to submit review");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Error submitting review");
    }
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="reviews-page">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <Button
          variant="contained"
          onClick={handleOpenModal}
          sx={{
            backgroundColor: "#8cc7b4",
            color: "white",
            fontSize: "16px",
            padding: "10px 20px",
            border: "1px solid black",
            "&:hover": {
              backgroundColor: "#f6ded8",
              color: "black",
              border: "1px solid black",
            },
          }}
        >
          Leave a Review
        </Button>
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
            padding: "30px",
            borderRadius: "10px",
            width: "400px",
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              textAlign: "center",

              color: "black",
            }}
          >
            Leave a Review
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <TextField
              label="Your Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <TextField
              label="Review Title"
              variant="outlined"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <TextField
              label="Your Review"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <TextField
              label="Stars"
              variant="outlined"
              fullWidth
              value={stars}
              onChange={(e) => setStars(e.target.value)}
              type="number"
              inputProps={{ min: 1, max: 5 }}
              required
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <Button
                variant="contained"
                type="submit"
                sx={{
                  backgroundColor: "#8cc7b4",
                  color: "white",

                  "&:hover": {
                    backgroundColor: "#f6ded8",
                    color: "black",
                  },
                }}
              >
                Submit
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleCloseModal}
                sx={{
                  backgroundColor: "#f6ded8",
                  color: "black",
                  border: "none",
                  "&:hover": {
                    backgroundColor: "#8cc7b4",
                    color: "black",
                  },
                }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default ReviewsPage;*/
import React, { useState } from "react";
import { TextField, Button, Typography, Box, Modal } from "@mui/material";
import "./ReviewsPage.css";

const ReviewsPage = ({ mealId }) => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [stars, setStars] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const createdDate = new Date().toISOString().split("T")[0];

  // URL вашего бэкенда
  const apiUrl = "https://meal-sharing-9cn2.onrender.com";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewData = {
      name,
      title,
      description,
      meal_id: mealId,
      stars,
      created_date: createdDate,
    };

    try {
      const response = await fetch(`${apiUrl}/api/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });

      if (response.ok) {
        alert("Review submitted successfully!");
        setName("");
        setTitle("");
        setDescription("");
        setStars(5);
        setIsModalOpen(false);
      } else {
        alert("Failed to submit review");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Error submitting review");
    }
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="reviews-page">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <Button
          variant="contained"
          onClick={handleOpenModal}
          sx={{
            backgroundColor: "#8cc7b4",
            color: "white",
            fontSize: "16px",
            padding: "10px 20px",
            border: "1px solid black",
            "&:hover": {
              backgroundColor: "#f6ded8",
              color: "black",
              border: "1px solid black",
            },
          }}
        >
          Leave a Review
        </Button>
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
            padding: "30px",
            borderRadius: "10px",
            width: "400px",
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              textAlign: "center",
              color: "black",
            }}
          >
            Leave a Review
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <TextField
              label="Your Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <TextField
              label="Review Title"
              variant="outlined"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <TextField
              label="Your Review"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <TextField
              label="Stars"
              variant="outlined"
              fullWidth
              value={stars}
              onChange={(e) => setStars(e.target.value)}
              type="number"
              inputProps={{ min: 1, max: 5 }}
              required
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <Button
                variant="contained"
                type="submit"
                sx={{
                  backgroundColor: "#8cc7b4",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#f6ded8",
                    color: "black",
                  },
                }}
              >
                Submit
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleCloseModal}
                sx={{
                  backgroundColor: "#f6ded8",
                  color: "black",
                  border: "none",
                  "&:hover": {
                    backgroundColor: "#8cc7b4",
                    color: "black",
                  },
                }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default ReviewsPage;

