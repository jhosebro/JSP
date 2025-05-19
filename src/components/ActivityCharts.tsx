import { Box, Card, CardContent, Typography, useTheme } from "@mui/material";
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ZoneActivity {
  zone: string;
  count: number;
}

interface ShiftDistribution {
  shift: string;
  count: number;
}

interface Props {
  activitiesByZone: ZoneActivity[];
  shiftDistribution: ShiftDistribution[];
}

export const ActivityCharts: React.FC<Props> = ({
  activitiesByZone,
  shiftDistribution,
}) => {
  const theme = useTheme();
  const COLORS = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
    theme.palette.info.main,
    theme.palette.error.main,
  ];
  return (
    <Card elevation={3} sx={{ borderRadius: 4, p: 2, marginTop: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Estadistica de Actividades
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Distribucion por Zona
        </Typography>
        <Box sx={{ width: "100%", height: 250, mb: 2 }}>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={activitiesByZone}>
              <XAxis
                dataKey="zone"
                tick={{
                  fill: theme.palette.text.primary,
                  fontSize: 14,
                  fontFamily: theme.typography.fontFamily,
                }}
              />
              <YAxis
                tick={{
                  fill: theme.palette.text.primary,
                  fontSize: 14,
                  fontFamily: theme.typography.fontFamily,
                }}
              />
              <Tooltip
                contentStyle={{ fontFamily: theme.typography.fontFamily }}
                formatter={(value: number) => [value, "Personal asignado"]}
              />
              <Legend
                wrapperStyle={{ fontFamily: theme.typography.fontFamily }}
                formatter={() => "Personal asignado"}
              />
              <Bar dataKey="count" fill={theme.palette.primary.main} />
            </BarChart>
          </ResponsiveContainer>
        </Box>

        <Typography variant="subtitle1" gutterBottom>
          Auxiliares por turno
        </Typography>
        <Box sx={{ width: "100%", height: 250, mb: 2 }}>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={shiftDistribution}
                dataKey="count"
                nameKey="shift"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={{
                  fill: theme.palette.text.primary,
                  fontFamily: theme.typography.fontFamily,
                }}
              >
                {shiftDistribution.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip contentStyle={{ fontFamily: theme.typography.fontFamily }}/>
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};
