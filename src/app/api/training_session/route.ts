import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient, Prisma } from "@prisma/client";
import { NextResponse } from "next/server";





const prisma = new PrismaClient() 


export async function POST(req: Request) {
    try {
        const user = await currentUser()
        if(!user){
            return NextResponse.json({error: "Usuário não autenticado"})
        }

        const body = await req.json()

        console.log('indo pro prisma')
        await prisma.workout.create({
            data: {
              date: new Date(body.date),
              distance: parseFloat(body.distance) || 0,
              duration: parseInt(body.duration) || 0,
              pace: body.pace ? parseFloat(body.pace) : null,
              calories: parseInt(body.calories) || 0
            }
        })

        console.log('sucesso')
        return NextResponse.json({success: true})

    } catch(error){
        console.error("Erro ao criar a sessão", error)
        return NextResponse.json({error: "Erro interno no servidir"})
    }


}





export async function GET(){
    
        try {
            const workouts = await prisma.workout.findMany({
                orderBy: {
                    date: 'desc'
                }
             })

           

             return NextResponse.json(workouts)
        } catch(error) {
            console.log('erro ao buscar sessões de treino', error)
            return NextResponse.json({error: 'Erro interno no servudor'}, {status: 500})
        }

    
}






 