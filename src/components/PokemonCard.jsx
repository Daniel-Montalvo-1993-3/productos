import { Card, CardContent, CardMedia, Grid2, Typography } from "@mui/material"
import { Link } from "react-router-dom"

export const PokemonCard = ({ card }) => {


  return (
    <Grid2 justifyContent="center" xs={12} sm={6} md={4}>
      <Link to={`/pokemon/${card.name}`} >
      <Card className="cardPokemon">
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
