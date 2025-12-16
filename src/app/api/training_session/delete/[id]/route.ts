import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";



const prisma = new PrismaClient()



export async function DELETE(req: NextRequest, {params}: {params: Promise<{id: string}>}) {

    try {
        const {id} = await params

        const user = await currentUser()

        if(!user) {
            return NextResponse.json({error: "O usuário não está logado"}, {status: 401})
        }

        //Verificar se o registro existe
        const workout = await prisma.workout.findUnique({
            where: {id}
        })


        if(!workout) {
            return NextResponse.json({error: "Registro inexistente"}, {status: 404})
        }


        await prisma.workout.delete({
            where: {id}
        })

        return NextResponse.json({success: true, message: "Registro deletado com sucesso", deletedId: id}, {status: 200})






    } catch(error){
        console.error("Erro ao deletar registro:", error);
    
    // Erro específico para registro não encontrado
    if (error instanceof Error && error.message.includes("Record to delete does not exist")) {
      return NextResponse.json(
        { error: "Registro não encontrado" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: "Erro interno no servidor" },
      { status: 500 }
    );
    }
}