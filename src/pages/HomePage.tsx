import { Container, Typography } from "@mui/material";
import InfoCard from "../components/InfoCard";
import { auxiliares } from "../data/auxiliares";


const HomePage = () => {
  return (
    <Container>
      <Typography variant="h3" fontWeight="bold" align="center" gutterBottom>
        Gestion de turnos de auxiliares
      </Typography>
      <InfoCard
        data={auxiliares.map(aux => ({
          code: aux.codigoInterno,
          name: aux.nombre,
          shift: aux.turno,
          zone: aux.zona || "No asignada",
          moto: aux.moto,
          lock: aux.candado,
          activities: aux.actividades
        }))}
      ></InfoCard>
    </Container>
  );
};

export default HomePage;
