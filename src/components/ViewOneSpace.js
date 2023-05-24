import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useParams, useNavigate } from "react-router-dom";
import ConfirmBox from "./ConfirmBox";
import { purple } from "@mui/material/colors";

import {
  Box,
  Button,
  ButtonBase,
  Card,
  CardContent,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Rating,
  TextField,
} from "@mui/material";

export default function ViewOneSpace({ user }) {
  const [spaces, setSpaces] = useState([]);
  const [value, setValue] = useState([]);
  const rating_average = value.reduce((a, b) => a + b, 0) / value.length;
  const [rating, setRating] = useState(0);

  const [comments, setComments] = useState([]);
  const [review, setReview] = useState("");

  const [open, setOpen] = useState(false);
  const [deleteData, setDeleteData] = useState({});
  const navigate = useNavigate();

  const Img = styled("img")({
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  });
  let { id } = useParams();
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    "&:hover": {
      backgroundColor: purple[700],
    },
  }));


  useEffect(() => {
    fetch(`/spaces/${id}`, {
      method: "GET",
      headers: {
        "Content-Type" : "application/json",
        Accept: "application/json",
        // Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        Authorization: `Bearer ${user.jwt}`,
      }
    })
      .then((res) => {
        if (!res.ok) {
          navigate("/login")
        }
        else {
          res.json().then((data) => {
            setSpaces(data);
            setValue(data.reviews.map((item) => item.rating));
            setComments(data.reviews.map((item) => item.comment));
          });
        }
      })
  }, [spaces.is_taken]);

  // useEffect(() => {
  //   fetch(`/spaces/${id}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setSpaces(data);
  //       setValue(data.reviews.map((item) => item.rating));
  //       setComments(data.reviews.map((item) => item.comment));
  //     });
  // }, [spaces.is_taken]);

  function handleBooking() {
    fetch(`/spaces/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ is_taken: true, leased_by_id: 2 }),
    })
      .then((res) => res.json())
      .then((data) => setSpaces(data));
  }

  function handleChange(e) {
    setReview(e.target.value);
  }
  function handleRating(e) {
    setRating(e.target.value);
  }
  function handleSubmit() {
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
      .then((data) => {
        setComments([...comments, data.comment]);
        setRating([...rating, data.rating]);
        window.location.reload(false);
      });
  }

  function openDelete(data) {
    setOpen(true);
    setDeleteData(data);
  }
  function deleteSpace() {
    fetch(`/spaces/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => console.log(spaces));
    navigate("/");
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
        <Button size="small" onClick={() => navigate("/")}>
          CLOSE
        </Button>
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
              <ColorButton variant="contained">
                Ksh. {spaces.lease_cost}.00
              </ColorButton>

              <Typography variant="body2" color="text.secondary">
                {/* <Button className="add" onClick={handleBooking} id="booking">
                  {spaces.is_taken ? "Not Available" : "Book"}
                </Button> */}
              </Typography>
              <br />
              {spaces.is_taken ? (
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleBooking}
                  id="booking"
                  disabled
                >
                  Not Available
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleBooking}
                  id="booking"
                >
                  Book
                </Button>
              )}

              <Button variant="outlined" color="error" onClick={openDelete}>
                Delete Listing
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item></Grid>

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
          <Button variant="contained" onClick={handleSubmit}>
            Post Review
          </Button>
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
              {comments.map((item) => {
                return <p> {item} </p>;
              })}
            </Typography>
            <Rating name="read-only" value={rating_average} readOnly />
          </CardContent>
        </Card>
      </Paper>
      <ConfirmBox
        open={open}
        closeDialog={() => setOpen(false)}
        deleteFunction={deleteSpace}
        title={spaces.name}
      />
    </>
  );
}
