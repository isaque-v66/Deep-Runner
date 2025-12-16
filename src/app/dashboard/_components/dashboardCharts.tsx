"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Download, 
  TrendingUp, 
  BarChart3,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon 
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useTheme } from "../../context/themeContext";

interface Workout {
  id: string;
  date: Date;
  distance: number;
  duration: number;
  pace: number | null;
  calories: number;
  createdAt: Date;
  updatedAt: Date;
}

type ChartType = "line" | "bar" | "pie";

export default function DashboardCharts() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [chartType, setChartType] = useState<ChartType>("line");
  const [timeRange, setTimeRange] = useState<"7days" | "30days" | "90days" | "all">("30days");
  const {theme} = useTheme()

  const fetchWorkouts = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/training_session");
      
      if (!response.ok) {
        throw new Error("Erro ao carregar dados");
      }

      const data = await response.json();
      setWorkouts(data);
    } catch (err) {
      console.error("Erro ao carregar dados para gráficos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  // Filtra workouts por período
  const getFilteredWorkouts = () => {
    const now = new Date();
    let daysAgo = new Date();
    
    switch (timeRange) {
      case "7days":
        daysAgo.setDate(now.getDate() - 7);
        break;
      case "30days":
        daysAgo.setDate(now.getDate() - 30);
        break;
      case "90days":
        daysAgo.setDate(now.getDate() - 90);
        break;
      case "all":
        return workouts;
    }
    
    return workouts.filter(workout => new Date(workout.date) >= daysAgo);
  };






  // Prepara dados para gráfico de linha (distância x data)
  const getLineChartData = () => {
    const filtered = getFilteredWorkouts();
    
    return filtered
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map(workout => ({
        date: format(new Date(workout.date), "dd/MM", { locale: ptBR }),
        fullDate: format(new Date(workout.date), "dd/MM/yyyy", { locale: ptBR }),
        distance: workout.distance,
        duration: workout.duration,
        calories: workout.calories,
        pace: workout.pace || workout.duration / workout.distance,
      }));
  };





  // Prepara dados para gráfico de barras (calorias x data)
  const getBarChartData = () => {
    const filtered = getFilteredWorkouts();
    
    return filtered
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map(workout => ({
        date: format(new Date(workout.date), "dd/MM", { locale: ptBR }),
        calories: workout.calories,
        distance: workout.distance,
      }));
  };






  // Prepara dados para gráfico de pizza (distribuição de distâncias)
  const getPieChartData = () => {
    const filtered = getFilteredWorkouts();
    
    // Agrupa por faixa de distância
    const distanceRanges = [
      { range: "0-3 km", min: 0, max: 3, count: 0, color: "#0088FE" },
      { range: "3-5 km", min: 3, max: 5, count: 0, color: "#00C49F" },
      { range: "5-10 km", min: 5, max: 10, count: 0, color: "#FFBB28" },
      { range: "10+ km", min: 10, max: Infinity, count: 0, color: "#FF8042" },
    ];

    filtered.forEach(workout => {
      for (const range of distanceRanges) {
        if (workout.distance >= range.min && workout.distance < range.max) {
          range.count++;
          break;
        }
      }
    });

    return distanceRanges.filter(range => range.count > 0);
  };

  // Estatísticas gerais
  const getStats = () => {
    const filtered = getFilteredWorkouts();
    
    if (filtered.length === 0) {
      return {
        totalDistance: 0,
        totalCalories: 0,
        avgDistance: 0,
        avgPace: 0,
        totalWorkouts: 0,
      };
    }

    const totalDistance = filtered.reduce((sum, w) => sum + w.distance, 0);
    const totalCalories = filtered.reduce((sum, w) => sum + w.calories, 0);
    const totalDuration = filtered.reduce((sum, w) => sum + w.duration, 0);
    const avgDistance = totalDistance / filtered.length;
    const avgPace = totalDuration / totalDistance;

    return {
      totalDistance: parseFloat(totalDistance.toFixed(2)),
      totalCalories,
      avgDistance: parseFloat(avgDistance.toFixed(2)),
      avgPace: parseFloat(avgPace.toFixed(2)),
      totalWorkouts: filtered.length,
    };
  };




  // Função para exportar

  const handleExportData = () => {
    const data = getLineChartData();
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `workout-data-${format(new Date(), "yyyy-MM-dd")}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <Card className="w-full">
        <CardContent className="flex justify-center items-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600" />
          <span className="ml-2">Carregando dados para gráficos...</span>
        </CardContent>
      </Card>
    );
  }

  const stats = getStats();
  const filteredWorkouts = getFilteredWorkouts();

  if (filteredWorkouts.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <TrendingUp className="text-red-600" />
            Estatísticas de Corridas
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8 text-gray-500">
          Nenhum dado disponível para o período selecionado.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="container mx-auto p-15 space-y-8">
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <TrendingUp className="text-red-600" />
            Estatísticas de Corridas
          </CardTitle>
          
          <div className="flex flex-wrap gap-2">
            <div className="flex border border-gray-200 rounded-lg overflow-hidden">
              <Button
                variant={chartType === "line" ? "default" : "ghost"}
                size="sm"
                onClick={() => setChartType("line")}
                className="rounded-none"
              >
                <LineChartIcon className="h-4 w-4 mr-2" />
                Linha
              </Button>
              <Button
                variant={chartType === "bar" ? "default" : "ghost"}
                size="sm"
                onClick={() => setChartType("bar")}
                className="rounded-none"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Barras
              </Button>
              <Button
                variant={chartType === "pie" ? "default" : "ghost"}
                size="sm"
                onClick={() => setChartType("pie")}
                className="rounded-none"
              >
                <PieChartIcon className="h-4 w-4 mr-2" />
                Pizza
              </Button>
            </div>

            <div className="flex border border-gray-200 rounded-lg overflow-hidden">
              <Button
                variant={timeRange === "7days" ? "default" : "ghost"}
                size="sm"
                onClick={() => setTimeRange("7days")}
                className="rounded-none"
              >
                7 dias
              </Button>
              <Button
                variant={timeRange === "30days" ? "default" : "ghost"}
                size="sm"
                onClick={() => setTimeRange("30days")}
                className="rounded-none"
              >
                30 dias
              </Button>
              <Button
                variant={timeRange === "90days" ? "default" : "ghost"}
                size="sm"
                onClick={() => setTimeRange("90days")}
                className="rounded-none"
              >
                90 dias
              </Button>
              <Button
                variant={timeRange === "all" ? "default" : "ghost"}
                size="sm"
                onClick={() => setTimeRange("all")}
                className="rounded-none"
              >
                Todos
              </Button>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleExportData}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Cards de estatísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className={`  ${theme === "light" ? "bg-gray-50": "bg-gray-950"} p-4 rounded-lg`}>
            <p className={`text-sm ${theme === "light"? "text-gray-500" : "text-gray-50"} `}>Total de Corridas</p>
            <p className="text-2xl font-bold">{stats.totalWorkouts}</p>
          </div>
          <div className={`  ${theme === "light" ? "bg-gray-50": "bg-gray-950"} p-4 rounded-lg`}>
            <p className={`text-sm ${theme === "light"? "text-gray-500" : "text-gray-50"} `}>Distância Total</p>
            <p className="text-2xl font-bold">{stats.totalDistance} km</p>
          </div>
          <div className={`  ${theme === "light" ? "bg-gray-50": "bg-gray-950"} p-4 rounded-lg`}>
            <p className={`text-sm ${theme === "light"? "text-gray-500" : "text-gray-50"} `}>Calorias Totais</p>
            <p className="text-2xl font-bold">{stats.totalCalories}</p>
          </div>
          <div className={`  ${theme === "light" ? "bg-gray-50": "bg-gray-950"} p-4 rounded-lg`}>
            <p className={`text-sm ${theme === "light"? "text-gray-500" : "text-gray-50"} `}>Pace Médio</p>
            <p className="text-2xl font-bold">{stats.avgPace} min/km</p>
          </div>
        </div>
      </CardHeader>



      {/* Gráfico */}
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "line" ? (
              <LineChart data={getLineChartData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`${value}`, "Valor"]}
                  labelFormatter={(label) => `Data: ${label}`}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="distance" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  name="Distância (km)"
                  dot={{ r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="calories" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  name="Calorias"
                  dot={{ r: 4 }}
                />
              </LineChart>
            ) : chartType === "bar" ? (
              <BarChart data={getBarChartData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`${value}`, "Valor"]}
                  labelFormatter={(label) => `Data: ${label}`}
                />
                <Legend />
                <Bar 
                  dataKey="calories" 
                  fill="#ef4444" 
                  name="Calorias"
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="distance" 
                  fill="#3b82f6" 
                  name="Distância (km)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            ) : (
              <PieChart>
            <Pie
                data={getPieChartData()}
                cx="50%"
                cy="50%"
                label={(props) => {
                // Aqui 'props' é do tipo correto
                const dataEntry = props.payload; // Acessa os dados originais
                return `${dataEntry.range}: ${dataEntry.count}`;
                }}
                labelLine={false}
                outerRadius={120}
                fill="#8884d8"
                dataKey="count"
                nameKey="range"
            >
                {getPieChartData().map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
            </Pie>
            <Tooltip 
                formatter={(value, name, props) => {
                const data = props.payload;
                return [`${value} corridas`, data.range];
                }}
            />
            <Legend />
            </PieChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Informações adicionais */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Resumo do Período</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• {filteredWorkouts.length} corrida(s) registrada(s)</li>
                <li>• Distância média: {stats.avgDistance} km</li>
                <li>• Distância total: {stats.totalDistance} km</li>
                <li>• Calorias queimadas: {stats.totalCalories}</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Dicas de Performance</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Tente aumentar gradualmente a distância</li>
                <li>• Mantenha o pace consistente</li>
                <li>• Hidrate-se bem durante as corridas</li>
                <li>• Descanse entre os treinos</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
    </div>
  );
}