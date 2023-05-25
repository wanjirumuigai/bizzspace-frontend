import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import Typography from "@mui/material/Typography";

import { useNavigate } from "react-router-dom";

export default function SpaceCard({ spaces, setSpaces }) {
  // const [spaces, setSpaces] = useState([]);

  const navigate = useNavigate();

  // useEffect(() => {
  //   fetch("/spaces")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setSpaces(data);
  //     });
  // }, []);

  function handleView(id) {
    navigate(`/spaces/${id}`);
  }

  return (
    <>
      {spaces.map((space) => {
        return (
          <Card
            key={space.id}
            sx={{ maxWidth: 345 }}
            className="cardMedia"
            onClick={() => handleView(space.id)}
          >
            <CardMedia
              sx={{ height: 140 }}
              image={space.image_url}
              title={space.name}
              key={space.id}
            />

            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {space.name}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {space.location}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {space.size} square feet
              </Typography>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
}
