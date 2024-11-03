import { Card, CardContent, CardMedia, Grid2, Typography } from "@mui/material"
import { Link } from "react-router-dom"

export const PokemonCard = ({ card }) => {

  const cardStyle = {
    boxShadow: 'none', // Remove shadow
    border: 'none',    // Remove border
  };
  

  return (
    <Grid2 justifyContent="center" xs={12} sm={6} md={4}>
      <Link style={{ textDecoration: 'none' }} to={`/pokemon/${card.id}`} >
      <Card style={cardStyle} className="cardPokemon">
        <CardMedia
          component="img"
          height="auto"
          image={card.images?.small}
          alt={card.name}
          className="card-media"
        />
        <CardContent>
          <Typography variant="h5">{card.name}</Typography>
          <Typography variant="body2">{card.set.name}</Typography>
        </CardContent>
      </Card>
     </Link>
    </Grid2>

  )
}
