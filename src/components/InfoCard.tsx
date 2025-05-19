// src/components/InfoCard.tsx

import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { auxiliares } from "../data/auxiliares";

const getWeekRange = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const monday = new Date(today);
  monday.setDate(today.getDate() - ((dayOfWeek + 6) % 7));

  const saturday = new Date(monday);
  saturday.setDate(monday.getDate() + 5);

  const formatOptions: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
  };
  const formatter = new Intl.DateTimeFormat("es-ES", formatOptions);

  const start = formatter.format(monday);
  const end = formatter.format(saturday);

  return `${start} al ${end} del ${saturday.getFullYear()}`;
};

const getWeekDates = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const monday = new Date(today);
  monday.setDate(today.getDate() - ((dayOfWeek + 6) % 7));

  const dates: Date[] = [];
  for (let i = 0; i < 6; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    dates.push(d);
  }
  return dates;
};

const InfoCard: React.FC = () => {
  const weekRange = getWeekRange();
  const weekDays: (keyof (typeof auxiliares)[0]["actividades"])[] = [
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
  ];
  const weekDates = getWeekDates();

  const formattedDates = weekDates.map((date) =>
    date.toLocaleDateString("es-ES", { day: "2-digit", month: "short" })
  );

  return (
    <Card sx={{ margin: "auto", mt: 4, boxShadow: 3 }}>
      <CardContent sx={{ justifyItems: "center" }}>
        <Typography variant="h5" component="div" gutterBottom>
          Programación semanal {weekRange}
        </Typography>

        <TableContainer component={Paper}>
          <Table size="small">
            <TableBody>
              <TableRow>
                {[
                  Array(5)
                    .fill(null)
                    .map((_, index) => (
                      <TableCell key={`empty-${index}`}></TableCell>
                    )),
                ]}
                {weekDays.map((day, index) => (
                  <TableCell key={`day-${index}`} align="center">
                    <strong>{day}</strong>
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong>Codigo interno</strong>
                </TableCell>
                <TableCell>
                  <strong>Nombre auxiliar operativo</strong>
                </TableCell>
                <TableCell>
                  <strong>Turno</strong>
                </TableCell>
                <TableCell>
                  <strong>Moto</strong>
                </TableCell>
                <TableCell>
                  <strong>Candado</strong>
                </TableCell>
                {formattedDates.map((day, index) => (
                  <TableCell key={`date-${index}`} align="center">
                    <strong>{day}</strong>
                  </TableCell>
                ))}
              </TableRow>
              {auxiliares.map((aux, index) => (
                <TableRow key={index}>
                  <TableCell>{aux.codigoInterno}</TableCell>
                  <TableCell>{aux.nombre}</TableCell>
                  <TableCell>{aux.turno}</TableCell>
                  <TableCell>{aux.moto}</TableCell>
                  <TableCell>{aux.candado}</TableCell>
                  {weekDays.map((dia) => (
                    <TableCell key={dia}>
                      {aux.actividades[dia] || "-"}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default InfoCard;
