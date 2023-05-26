import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useParams, useNavigate } from "react-router-dom";
import ConfirmBox from "./ConfirmBox";
import { purple } from "@mui/material/colors";
import CloseIcon from "@mui/icons-material/Close";

import {
  Box,
  Button,
  ButtonBase,
  ButtonGroup,
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
  const rating_average = Math.round(
    value.reduce((a, b) => a + b, 0) / value.length
  );
  const [rating, setRating] = useState(0);

  const [comments, setComments] = useState([]);
  const [review, setReview] = useState("");

  const [open, setOpen] = useState(false);
  const [deleteData, setDeleteData] = useState({});
  const navigate = useNavigate();
  const url = "https://bizzspace-api.onrender.com/";

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
    fetch(`${url}/spaces/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",

        Authorization: `Bearer ${user.jwt}`,
      },
    }).then((res) => {
      if (!res.ok) {
        navigate("/login");
      } else {
        res.json().then((data) => {
          setSpaces(data);
          setValue(data.reviews.map((item) => item.rating));
          setComments(data.reviews.map((item) => item.comment));
        });
      }
    });
  }, [spaces.is_taken, rating]);

  function handleBooking() {
    fetch(`${url}/spaces/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${user.jwt}`,
      },
      body: JSON.stringify({ is_taken: true, leased_by_id: user.user.id }),
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
    fetch(`${url}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${user.jwt}`,
      },
      body: JSON.stringify({
        comment: review,
        rating: rating,
        space_id: id,
        user_id: user.user.id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setComments([...comments, data.comment]);
        setRating([...rating, data.rating]);
        // window.location.reload(false);
      });
  }

  function openDelete(data) {
    setOpen(true);
    setDeleteData(data);
  }
  function deleteSpace() {
    fetch(`${url}/spaces/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${user.jwt}`,
      },
    })
      .then((res) => res.json())
      .then(() => navigate("/"));
  }

  console.log(spaces.user_id, user.user.id);

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
          <CloseIcon className="close-icon" />
        </Button>
        <Grid container spacing={2} sx={{ justifyContent: "center" }}>
          <Grid item>
            <ButtonBase sx={{ width: 700, height: 350 }}>
              <Img alt="complex" src={spaces.image_url} sx={{}} />
            </ButtonBase>
          </Grid>
        </Grid>
        <Grid item xs={12} sm container sx={{ justifyContent: "center" }}>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography
                gutterBottom
                variant="subtitle1"
                component="div"
                sx={{ fontSize: "1.75rem" }}
              >
                {spaces.location}
              </Typography>
              <Typography
                variant="body2"
                gutterBottom
                sx={{
                  lineHeight: "1.25",
                  fontSize: "1.75rem",
                  fontWeight: "300",
                }}
              >
                {spaces.name}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  lineHeight: "1.25",
                  fontSize: "1.75rem",
                  fontWeight: "300",
                }}
              >
                {new Intl.NumberFormat().format(spaces.size)} sq. ft
              </Typography>
              <ColorButton
                variant="contained"
                sx={{ cursor: "none", margin: "10px auto" }}
              >
                Ksh. {new Intl.NumberFormat().format(spaces.lease_cost)}
              </ColorButton>

              <ButtonGroup
                sx={{ display: "flex", justifyContent: "center", gap: " 20px" }}
              >
                {spaces.is_taken ? (
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleBooking}
                    id="booking"
                    disabled
                    sx={{ width: "200px", fontWeight: 600, fontSize: "20px" }}
                  >
                    Not Available
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleBooking}
                    id="booking"
                    sx={{ width: "200px", fontWeight: 600, fontSize: "25px" }}
                  >
                    Book
                  </Button>
                )}
                {user.user.id === spaces.user_id ? (
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={openDelete}
                    sx={{ width: "200px", fontWeight: 600, fontSize: "20px" }}
                  >
                    Delete Listing
                  </Button>
                ) : null}
              </ButtonGroup>
            </Grid>
          </Grid>
        </Grid>
        <hr style={{ width: "85%", margin: "15px auto 10px" }} />
        <Box
          sx={{
            width: 600,
            maxWidth: "100%",
            margin: "30px auto",
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
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: "20px" }}
          >
            Rate the Property
          </Typography>
          {/* <hr style={{"width": "35%", margin: "0 auto"}}/> */}
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            onChange={handleRating}
            sx={{ justifyContent: "center" }}
            required
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
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{ width: "200px", fontWeight: 600, fontSize: "20px" }}
          >
            Post Review
          </Button>
        </Box>
        <hr style={{ width: "85%", margin: "30px auto 0" }} />
        <Card sx={{ minWidth: 150 }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 25 }}
              color="text.secondary"
              gutterBottom
            >
              User Reviews
            </Typography>
            <Typography variant="h5" component="div"></Typography>
            <Typography
              sx={{ mb: 1.5 }}
              color="text.secondary"
              backgroundColor="lightgrey"
            >
              {comments.map((item) => {
                return <p key={item.id}> {item} </p>;
              })}
            </Typography>
            <Rating name="read-only" value={rating_average} readOnly />
            <Typography
              sx={{ fontSize: 15 }}
              color="text.secondary"
              gutterBottom
            >
              Average Rating: {rating_average ? rating_average : 0}*
            </Typography>
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
