"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { Activity, Plus } from "lucide-react";
import { useForm, FormState } from "react-hook-form";
import z from "zod";



const dataSchema = z.object({
        date: z.string().min(1, "É necessário incluir uma data").refine((val)=> !isNaN(Date.parse(val)), {message: 'Data inválida'}),
        distance: z.string().min(1, "Inclua uma distância").refine((val)=> !isNaN(parseFloat(val)) && parseFloat(val) > 0, {message: 'A distância precisa ser um valor positivo'}),
        duration: z.string().min(1, "É necessário incluir uma duração").refine((val)=> !isNaN(parseInt(val)) && parseInt(val) > 0, {message: 'Duração deve ser um número positivo'}),
        pace: z.string(),
        calories: z.string().min(1, "Digite as calorias perdidas").refine((val)=> !isNaN(parseInt(val)) && parseInt(val) > 0, {message: 'Calorias devem ser um número positivo'})
    })


 type DataSchema = z.infer<typeof dataSchema>



export default function DashboardForm() {


    

    const { register, handleSubmit, formState: {errors} } = useForm<DataSchema>({
        resolver: zodResolver(dataSchema)
    })

   

    async function useHandleSubmit (data: DataSchema) {

        try{
            const formatedData = {
                date: new Date(data.date),
                distance: parseFloat(data.distance),
                duration: parseInt(data.duration, 10),
                pace: data.pace ? parseFloat(data.pace) : null,
                calory: parseInt(data.calories, 10)
            }

            await fetch('/api/training_session', {
                method:"POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(formatedData)
            })
        console.log('fetch feito')
      

        } catch(error){
            console.log(error)
        }

        
    }

    return(
        <div className="container mx-auto p-15 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold flex items-center gap-2">
                        <Activity className="text-red-600" />
                           Dashboard de corridas
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit(useHandleSubmit)}>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6" >
                        <div className="space-y-4 mt-4">
                            <Label>Data e Hora</Label>
                            <Input {...register("date")} type="datetime-local"/>   
                            {errors.date && (<p className='text-sm text-red-600'>{errors.date.message}</p>)}                      
                        </div>       

                        <div className="space-y-4 mt-4">
                            <Label>Distância (Km)</Label>
                            <Input {...register("distance")} type="number" step='0.01'/>     
                            {errors.distance && (<p className="text-sm text-red-600">{errors.distance.message}</p>)}                    
                        </div>    

                        <div className="space-y-4 mt-4">
                            <Label>Duração (min)</Label>
                            <Input {...register("duration")} type="number"/>    
                            {errors.duration && (<p className="text-sm text-red-600">{errors.duration.message}</p>)}                     
                        </div>        


                        <div className="space-y-4 mt-4">
                            <Label>Pace (min/Km)</Label>
                            <Input {...register("pace")} type="number" step="0.1"/>                         
                        </div>     

                        <div className="space-y-4 mt-4">
                            <Label>Calorias queimadas</Label>
                            <Input {...register("calories")} type="number"/>
                            {errors.calories && (<p className="text-sm text-red-600">{errors.calories.message}</p>)}                         
                        </div>   
                        </div>

                        <div className="space-x-4 mt-6">
                          <Button className='bg-red-600'>
                             <Plus/> Adicionar Corrida
                            </Button>    
                        </div>    
                    </form>



                </CardContent>
            </Card>

        </div>
    )
}