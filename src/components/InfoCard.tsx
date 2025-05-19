// src/components/InfoCard.tsx

import React, { useMemo } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Box,
  Tooltip,
} from "@mui/material";
//import { auxiliares } from "../data/auxiliares";
import { exportToPDF } from "../utils/exportToPDF";
import { ActivityCharts } from "./ActivityCharts";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

interface Auxiliary {
  code: string;
  name: string;
  shift: string;
  zone: string;
  moto: string;
  lock: string;
  activities: {[key: string]: string};
}

interface Props {
  data?: Auxiliary[];
}

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

const InfoCard: React.FC<Props> = ({ data }) => {
  const containerId = "pdf-content";
  const weekRange = getWeekRange();
  const shiftDistribution = useMemo(() => {
    const shiftMap: Record<string, number> = {};
    (data || []).forEach((aux) => {
      shiftMap[aux.shift] = (shiftMap[aux.shift] || 0) + 1;
    });
    return Object.entries(shiftMap).map(([shift, count]) => ({ shift, count }));
  }, [data]);

  const activitiesByZone = useMemo(() => {
    const zoneMap: Record<string, number> = {};
    (data || []).forEach((aux) => {
      zoneMap[aux.zone] = (zoneMap[aux.zone] || 0) + 1;
    });
    return Object.entries(zoneMap).map(([zone, count]) => ({ zone, count }));
  }, [data]);

  const weekDays: string[] = [
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
  
  if (!data || data.length === 0) {
    return (
      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="h6" color="text.secondary">
          No hay datos disponibles para la semana {weekRange}
        </Typography>
      </Box>
    );
  } else {
    return (
      <Card
        sx={{
          margin: "auto",
          mt: 4,
          boxShadow: 3,
          backgroundColor: "#f9fafb",
          borderRadius: 3,
          px: { xs: 1, sm: 2, md: 4 },
        }}
      >
        <CardContent sx={{ justifyItems: "center" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography variant="h5" component="div" gutterBottom>
              Programación semanal {weekRange}
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<PictureAsPdfIcon />}
              onClick={() =>
                exportToPDF(containerId, `Programación semanal ${weekRange}`)
              }
              sx={{ textTransform: "none", fontWeight: 500, marginBottom: 1 }}
            >
              Exportar a PDF
            </Button>
          </Box>
          <div id="pdf-content">
            <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
              <Table size="small" stickyHeader>
                <TableBody>
                  <TableRow>
                    {[
                      Array(5)
                        .fill(null)
                        .map((_, index) => (
                          <TableCell
                            sx={{ backgroundColor: "#f1f5f9", fontWeight: 600 }}
                            align="center"
                            key={`empty-${index}`}
                          ></TableCell>
                        )),
                    ]}
                    {weekDays.map((day, index) => (
                      <TableCell
                        sx={{
                          backgroundColor:
                            new Date().toDateString() ===
                            weekDates[index].toDateString()
                              ? "#dbeafe"
                              : "inherit",
                          fontWeight:
                            new Date().toDateString() ===
                            weekDates[index].toDateString()
                              ? 600
                              : "inherit",
                        }}
                        align="center"
                        key={`day-${index}`}
                      >
                        <strong>{day}</strong>
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell
                      sx={{ backgroundColor: "#f1f5f9", fontWeight: 600 }}
                      align="center"
                    >
                      <strong>Codigo interno</strong>
                    </TableCell>
                    <TableCell
                      sx={{ backgroundColor: "#f1f5f9", fontWeight: 600 }}
                      align="center"
                    >
                      <strong>Nombre auxiliar operativo</strong>
                    </TableCell>
                    <TableCell
                      sx={{ backgroundColor: "#f1f5f9", fontWeight: 600 }}
                      align="center"
                    >
                      <strong>Turno</strong>
                    </TableCell>
                    <TableCell
                      sx={{ backgroundColor: "#f1f5f9", fontWeight: 600 }}
                      align="center"
                    >
                      <strong>Moto</strong>
                    </TableCell>
                    <TableCell
                      sx={{ backgroundColor: "#f1f5f9", fontWeight: 600 }}
                      align="center"
                    >
                      <strong>Candado</strong>
                    </TableCell>
                    {formattedDates.map((day, index) => (
                      <TableCell
                        sx={{ backgroundColor: "#f1f5f9", fontWeight: 600 }}
                        key={`date-${index}`}
                        align="center"
                      >
                        <strong>{day}</strong>
                      </TableCell>
                    ))}
                  </TableRow>
                  {data.map((aux, index) => (
                    <TableRow
                      key={index}
                      sx={{ bgcolor: index % 2 === 0 ? "#ffffff" : "#f3f4f6" }}
                    >
                      <TableCell>{aux.code}</TableCell>
                      <TableCell>{aux.name}</TableCell>
                      <TableCell>{aux.shift}</TableCell>
                      <TableCell>{aux.moto}</TableCell>
                      <TableCell>{aux.lock}</TableCell>
                      {weekDays.map((dia) => (
                        <TableCell key={dia + index}>
                          {aux.activities[dia] ? (
                            <Tooltip title={aux.activities[dia]}>
                              <span>{aux.activities[dia]}</span>
                            </Tooltip>
                          ) : (
                            "-"
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <ActivityCharts
              activitiesByZone={activitiesByZone}
              shiftDistribution={shiftDistribution}
            />
          </div>
        </CardContent>
      </Card>
    );
  }
};

export default InfoCard;
