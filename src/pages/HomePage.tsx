import { Container, Typography } from "@mui/material";
import InfoCard from "../components/InfoCard";


const HomePage = () => {
  return (
    <Container>
      <Typography variant="h3" fontWeight="bold">
        Gestion de turnos de auxiliares
      </Typography>
      <InfoCard></InfoCard>
    </Container>
  );
};

export default HomePage;
