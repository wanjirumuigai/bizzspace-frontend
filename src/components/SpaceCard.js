import React from "react";
import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import Typography from "@mui/material/Typography";

import { useNavigate } from "react-router-dom";

export default function SpaceCard({ spaces, setSpaces }) {
  const navigate = useNavigate();

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
