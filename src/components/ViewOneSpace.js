import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import {
  Alert,
  Box,
  Button,
  ButtonBase,
  Card,
  CardActions,
  CardContent,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Rating,
  TextField,
} from "@mui/material";
import { useParams } from "react-router-dom";

export default function ViewOneSpace() {
  const [spaces, setSpaces] = useState([]);
  const [value, setValue] = useState([]);
  const rating_average = value.reduce((a, b) => a + b, 0) / value.length;
  const [rating, setRating] = useState(0);

  const [comment, setComments] = useState([]);
  const [review, setReview] = useState("");
  const [classname, updateClass] = useState(false);
  const spaceBookedClass = classname ? "booked" : "";
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
        setComments(data.space.reviews.map((item) => item.comment));
      });
  }, []);

  function handleBooking() {
    updateClass((current) => !current);
    console.log(classname);
    if (classname == false) {
      document.querySelector("#booking").disabled = true;
      document.querySelector("#booking").className = "booked";
    }
    fetch(`/spaces/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ is_taken: true, leased_by_id: 2 }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

  function handleChange(e) {
    setReview(e.target.value);
  }
  function handleRating(e) {
    setRating(e.target.value);
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
      .then((data) => setComments(...comment, data));
  }

  function handleDelete() {
    alert("are you sure?");
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
        <Button size="small">DELETE</Button>
        <Button size="small">CLOSE</Button>
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
              <Typography
                variant="body2"
                color="text.secondary"
                className={spaceBookedClass}
              >
                {/* <Button className="add" onClick={handleBooking} id="booking">
                  {spaces.is_taken ? "Not Available" : "Book"}
                </Button> */}
              </Typography>

              <Button
                variant="contained"
                color="success"
                onClick={handleBooking}
                id="booking"
              >
                {spaces.is_taken ? "Not Available" : "Book"}
              </Button>
              <Button variant="outlined" color="error" onClick={handleDelete}>
                Delete Listing
              </Button>
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
            required
            fullWidth
            label="Post a review"
            id="fullWidth"
            onChange={handleChange}
          />
        </Box>
        <Box>
          <Typography variant="body2" color="text.secondary">
            Rate the Property
          </Typography>

          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            onChange={handleRating}
          >
            <FormControlLabel
              value="1"
              control={<Radio size="small" />}
              label="1"
            />
            <FormControlLabel
              value="2"
              control={<Radio size="small" />}
              label="2"
            />
            <FormControlLabel
              value="3"
              control={<Radio size="small" />}
              label="3"
            />
            <FormControlLabel
              value="4"
              control={<Radio size="small" />}
              label="4"
            />
            <FormControlLabel
              value="5"
              control={<Radio size="small" />}
              label="5"
            />
          </RadioGroup>
        </Box>
        <Box>
          <Button onClick={handleSubmit}>Submit</Button>
        </Box>
        <Card sx={{ minWidth: 150 }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Reviews
            </Typography>
            <Typography variant="h5" component="div"></Typography>
            <Typography
              sx={{ mb: 1.5 }}
              color="text.secondary"
              backgroundColor="lightgrey"
            >
              {comment.map((item) => {
                return <p> {item} </p>;
              })}
            </Typography>
            <Rating name="read-only" value={rating_average} readOnly />
          </CardContent>
        </Card>
      </Paper>
    </>
  );
}
