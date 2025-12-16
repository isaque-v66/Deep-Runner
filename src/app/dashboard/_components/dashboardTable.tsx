'use client'

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";





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

export default function WorkoutTable() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);





  const fetchWorkouts = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/training_session");
      
      if (!response.ok) {
        throw new Error("Erro ao carregar dados");
      }
  
      

      const data = await response.json();
      setWorkouts(data);
      setError(null);
    } catch (err) {
      setError("Não foi possível carregar os dados");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };














  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este registro?")) {
      return;
    }

    try {
      const response = await fetch(`/api/training_session/delete/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setWorkouts(workouts.filter(workout => workout.id !== id));
      } else {
        throw new Error("Erro ao excluir");
      }
    } catch (err) {
      console.error("Erro ao excluir registro:", err);
      alert("Erro ao excluir registro");
    }
  };









  useEffect(() => {
    fetchWorkouts();
  }, []);












  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours > 0) {
      return `${hours}h ${mins}min`;
    }
    return `${mins} min`;
  };







  const formatDate = (date: Date) => {
    return format(new Date(date), "dd/MM/yyyy HH:mm", { locale: ptBR });
  };






  const calculatePace = (duration: number, distance: number) => {
    if (distance === 0) return null;
    return duration / distance;
  };








  if (loading) {
    return (
      <Card className="w-full">
        <CardContent className="flex justify-center items-center p-8">
          <Loader2 className="h-8 w-8 animate-spin text-red-600" />
          <span className="ml-2">Carregando dados...</span>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full">
        <CardContent className="text-center p-8">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={fetchWorkouts} className="bg-red-600">
            <RefreshCw className="h-4 w-4 mr-2" />
            Tentar novamente
          </Button>
        </CardContent>
      </Card>
    );
  }

















  return (
    //CABEÇALHO
    <div className="container mx-auto p-15 space-y-8">
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl font-bold">Histórico de Corridas</CardTitle>
        <div className="flex gap-2">
          <Button 
            onClick={fetchWorkouts} 
            variant="outline" 
            size="sm"
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Atualizar
          </Button>
          <div className="text-sm text-gray-500">
            Total: {workouts.length} registro{workouts.length !== 1 ? 's' : ''}
          </div>
        </div>
      </CardHeader>




      
      <CardContent>
        {workouts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Nenhum registro encontrado. Adicione sua primeira corrida!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data e Hora</TableHead>
                  <TableHead>Distância (km)</TableHead>
                  <TableHead>Duração</TableHead>
                  <TableHead>Pace (min/km)</TableHead>
                  <TableHead>Calorias</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>



              <TableBody>
                {workouts.map((workout) => {
                  const pace = workout.pace || calculatePace(workout.duration, workout.distance);
                  
                  return (
                    <TableRow key={workout.id}>
                      <TableCell className="font-medium">
                        {formatDate(workout.date)}
                      </TableCell>
                      <TableCell>
                        {workout.distance.toFixed(2)} km
                      </TableCell>
                      <TableCell>
                        {formatDuration(workout.duration)}
                      </TableCell>
                      <TableCell>
                        {pace ? `${pace.toFixed(2)} min/km` : "-"}
                      </TableCell>
                      <TableCell>
                        {workout.calories} cal
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(workout.id)}
                          className="text-red-600 hover:text-red-800 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
    </div>
  );
}