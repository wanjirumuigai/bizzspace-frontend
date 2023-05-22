import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import {
  Box,
  Button,
  ButtonBase,
  Card,
  CardActions,
  CardContent,
  Grid,
  Paper,
  Rating,
  TextField,
} from "@mui/material";
import { useParams } from "react-router-dom";

export default function ViewOneSpace() {
  const [spaces, setSpaces] = useState([]);
  const [value, setValue] = useState([]);
  const rating_average = value.reduce((a, b) => a + b, 0) / value.length;
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState("");
  const Img = styled("img")({
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  });
  let { id } = useParams();
  useEffect(() => {
    fetch(`/spaces/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSpaces(data.space);
        setValue(data.space.reviews.map((item) => item.rating));
      });
  }, []);

  function handleBooking() {
    console.log(spaces);
  }

  function handleChange(e) {
    setReview(e.target.value);
  }
  function handleSubmit() {
    console.log(review, rating);
    fetch(`/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment: review,
        rating: rating,
        space_id: id,
        user_id: 1,
      }),
    })
      .then((res) => res.json())
      .then((data) => data);
  }

  return (
    <>
      <Paper
        sx={{
          p: 2,
          margin: "auto",
          maxWidth: 800,
          flexGrow: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        }}
      >
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase sx={{ width: 700, height: 350 }}>
              <Img alt="complex" src={spaces.image_url} />
            </ButtonBase>
          </Grid>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                {spaces.name}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {spaces.location}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {spaces.size} square feet
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Kshs. {spaces.lease_cost}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {spaces.is_taken ? (
                  "Not Available"
                ) : (
                  <Button onClick={handleBooking}>Book</Button>
                )}
              </Typography>
            </Grid>
            <Grid item></Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
              Kshs. {spaces.lease_cost}
            </Typography>
          </Grid>
        </Grid>

        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
          }}
        >
          <TextField
            fullWidth
            label="Post a review"
            id="fullWidth"
            onChange={handleChange}
          />
        </Box>
        <Box>
          Rate the property
          <div className="star-rating">
            {[...Array(5)].map((star, index) => {
              index += 1;
              return (
                <button
                  type="button"
                  key={index}
                  className={index <= (hover || rating) ? "on" : "off"}
                  onClick={() => setRating(index)}
                  onMouseEnter={() => setHover(index)}
                  onMouseLeave={() => setHover(rating)}
                >
                  <span className="star">&#9733;</span>
                </button>
              );
            })}
          </div>
        </Box>
        <Box>
          <Button onClick={handleSubmit}>Submit</Button>
        </Box>
        <Card sx={{ minWidth: 150 }}>
          <CardContent>
            <Rating name="read-only" value={rating_average} readOnly />
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Reviews
            </Typography>
            <Typography variant="h5" component="div"></Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {spaces.reviews.map((item) => {
                return <ul> {item.comment} </ul>;
              })}
            </Typography>
          </CardContent>
        </Card>
      </Paper>
    </>
  );
}
