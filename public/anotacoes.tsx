'use client'
import { Button } from "@/components/ui/button"
/*

//   ANATOAÇÕES TAILWIND:

//    1. Rounded-md: borda redondada média.

//    2. Tracking-tight: Diminui o espaçamento entre as letras.

//    3. Text-balance: quebra linhas de forma balanceada (ideais para textos pequenos)

//    4. Text-pretty: quebra linhas de forma balanceada (ideais para textos longos)

//    5. rounded-full: cria bordas totalmente arredondadas

//    6. ring-1: cria uma borda externa sem prejudicar o layout.

//    7. inset-0: ocupa todo o elemento pai. (inset é um atalho que define top, left, right, buttom)

//    8. isolate: cria um contexto separado (não sei usar)

//    9. container: cria um container responsivo com largura máxima. (junto ao mx-auto, o container fica centralizado)



/*




COMPONENTES REUTILIZAVEIS 



  1. Se for utilizar links, import {Link} from "next/link"


  2. MapPin from lucide-react


  3. ESTRUTURA DE UM CARD

     3.1 <Card> from "components/ui"  --- npx shadcn@latest add card
     3.2 <CardHeader> from "components/ui" (cabeçalho do card para pôr o titulo do card) --- npx shadcn@latest add cardheader
     3.3 <CardTitle> from "componentes/ui" --- npx shadcn@latest add cardtitle
     3.4 <CardContent> from "components/ui" --- npx shadcn@latest add CardContent
     3.5 <Label> from "components/ui" --- npx shadcn@latest add label
     3.6 <Input> from "components/ui" --- npx shadcn@latest add input
















 --------------------------------------------------------------
 PROJETO

  ETAPA 1: PRISMA
     
     3- Falta criar o query no neon console(ESTUDAR SQL), e rodar o npx prisma generate


  ETAPA 2: COMPONENTES VISUAIS


  ETAPA 3: MONTANDO UM FORMULÁRIO

    3.1. use react hook form para enviar dados, e zod para validação.

       npm i react-hook-form zod @hookform/resolvers

    3.2. lembrando que hooks só são usados em CLIENT COMPONENTS, então é necessário adicionar "use client"

    3.3. const {register, handleSubmit} = useForm()
       
       useForm irá te retornar um register que será necessário adicionar em todos os inputs,
       desta maneira: <input {...register("nome no campo")}

       useForm também retornará uma função vazia que você criará que é a handleSubmit. Então,
       você criará outra função para passar como prop na:
          
               function usandoHandleSubmit (data: any){
                  lógica da função
               }

       Depois, no form coloque a função no onSubmit.

               <form onSubmit={handleSubmit(usandoHandleSubmit)}




    3.4. usando o zod para validação:

            import z from zod


            const schemaData = z.object({
            dado1: z.string(),
            dado2: z.string()
            
            })
    
        Adicionando o RESOLVER no useForm (resolver é o que liga o zod ao useForm)

            import zodResolver from ''


            const {resolver, handleSubmit} = useForm({
               resolver: ZodResolver(schemaData)
            })


        Tipando no typesScript
        
        
             type TiposSchemaData = z.infer<typeof schemaData>


         Aí basta incluir TiposSchemaData como tipo na função desejada, e passando como generic no
         useForm


            
               function usandoHandleSubmit (data: TiposSchemaData){
                  lógica da função
               }


            const {resolver, handleSubmit} = useForm<TiposSchemaData>({
               resolver: ZodResolver(schemaData)
            })
              






     ETAPA 4: BASE DE DADOS

        4.1- instalei com 'npm i prisma --save-dev'
        4.2- Criei o arquivo schema com npx prisma init
        
 
        4.3- COMANDOS POSTGREE SQL
             - SERIAL: Equivale ao auto increment
             - UUID: Equivale ao auto increment, todavia os números atribuídos não são sequênciais (tendo maior segurança)
             - VARCHAR: Variável para armazenar string de número variável
             - UNIQUE: Garante que o valor da coluna seja único
             - DEFAULT: Define o valor padrão da coluna se vazia, geralmente, tem um acompanhamento informando em seguida o valor padrão
             - TIMESTAMP: Tipo de dado que armazena data e hora.
             - INTEGER: números inteiros sem casas decimais
             - DECIMAL(x, y): números com casas decimais, sendo x definindo o número inteiro, e o y o decimal.
             - TEXT: dado para texto quae que ilimitado.
             - CHECK: É uma validação que só permite entrar dados se for verdadeira (é como um if)
             
             - ADD COLUMN: no alter table, serve para adicionar uma coluna (ADD COLUMN telefone VARCHAR(50))
             - ADD CONSTRAINT: Adiciona uma nova regra (ADD CONSTRAIN email_unique UNIQUE (email))
             - ADD COLUMN telefone TYPE VARCHAR(10): 'TYPE VARCHAR' muda apenas o tipo do dado;

             - WITH: executa primeiro o que está dentro do with, e depois, com o resultado obtido, executa outras querys ( WITH usuarios_ativos AS (
                                                                                                                          SELECT * FROM usuarios WHERE ativo = true
                                                                                                                         )
                                                                                                                          SELECT * FROM usuarios_ativos WHERE idade > 25; )
             WINDOW FUNCTION
             - AVG(): Calcula a média aritmética de um conjunto de valores.
             - OVER(): Transforma uma funcão agregada comum em uma window function, assim, por exempllo, o valor surge em todas as linhas
             - PARTITION BY: Divide um conjunto de dados em partições e aplica a função separadamente em cada função.
             - RANK(): Ordena em um ranking, dando assim uma posição.



             JOIN
             - INNER JOIN: Retorna apenas os registros que tem correspondentes em ambas as tabelas (SELECT colunas
                                                                                                    FROM tabela1
                                                                                                    INNER JOIN tabela2 ON tabela1.coluna = tabela2.coluna;)
             - LEFT JOIN: Retorna todos os dados da tabela a esquerda + os correspondentes da direita (SELECT colunas
                                                                                                        FROM tabela1
                                                                                                        LEFT JOIN tabela2 ON tabela1.coluna = tabela2.coluna;)                                                                                       
             - RIGHT JOIN: Retorna todos os dados da tabela direita + os correspondentes da direita ( SELECT colunas
                                                                                                        FROM tabela1
                                                                                                        RIGHT JOIN tabela2 ON tabela1.coluna = tabela2.coluna;)
              -FULL JOIN: Retorna tdos os registros de ambas as tabelas(SELECT colunas
                                                                        FROM tabela1
                                                                        FULL JOIN tabela2 ON tabela1.coluna = tabela2.coluna;) 
              

            AGREGAÇÕES
             - COUNT(condição): conta o número de linhas.
             - FILTER: Faz um filtro separadamente, tem a função semelhante a um where (FUNÇÃO_AGREGADA(COLUNA) FILTER (WHERE condição))





        


      ETAPA 5: FAZENDO A LIGAÇÃO COM O BANCO DE DADOS

           ETAPA 1: Criação da api

           1.1 - primeiro os dados serão enviados para a função em um único prop através do react-hook-form,
                 então na função será necessário tratar os dados.

                 const handlesubmit(dadosGerais: TipoDefinidoNoZod) {
                    try {
                       const dados = {
                         data1: new Date(dadosGerais.data1),
                         dado2: parseFloat(dadosGerais.dado2),
                         ...
                       }


           1.2- Fazer a requisição fetch, criando a endpoint



                       await fetch('/api/endpoint', {
                        method: 'POST',
                        headers: {'Content-type', 'application-json'},
                        body: JSON.stringify(dadosGerais)
                       })
                    
                    }
                 
                 } catch (error) {
                   console.log(error) 
                 }



                ETAPA 2: ENDPOINT

                2.1 - fazer a conexão com o prisma para se usar prisma.create

               import {PrismaClient} from ''


               const prisma = new PrismaClient()


               export async function POST(req: Request) {
               
                 const user = await currentUser()

                 if(!user){
                  return NextResponse.json({error: 'usuário nao logado'})
                 }

                 const body = await req.json()

                 await prisma.nomeDaTabelaNoPrisma.create({
                   data: {
                     dado1: String(body.dado1),
                     dado2: String(body.dado2),
                     ...
                   
                   }
                 })
                    return NextResponse.json({success: true})

               } catch(error) {
                 return NextResponse.json({error: 'Deu error!'}) 
               }















----------------------------------------------------------------------------------------

TODO O PROCESSO:


ETAPA 1: Pegando as irformações do usuário com react-hook-form:

 - A conexão é feita com useForm
   - import { useForm } from 'react-hook-form'


   - UseForm retorna duas funções: register(que retorna dados do input) e o handleSubmit(retorna a função que será usada para utilizar os valores)


     const {register, handleSubmit} = useForm()



ETAPA 2: Colocar todos os register em um spread em todos os inputs


 <input {...register('nome do input')}>


ETAPA 3: Colocar no onSubmit do form o handleSubmit


 <form onSubmit={handleSubmit(usandoHandle)}




 ETAPA 4: Vazendo a validações dos dados com Zod

  - é necessário usar o z.object para fazer as validações

   import z from 'zod'


   const dataSchema = z.object({
    dado1: z.string(),
    dado2: z.string()
    ...
   })

    
   ETAPA 5: Usar o zodResolver no useForm para pegar a validação


    const {register, handleSubmit} = useForm({
       resolver: zodResolver(dataSchema)
    })



    ETAPA 6: TIPANDO OS DADOS COM Z.INFER


    type TiposSchema = z.infer<typeof dataSchema>

    - basta tipar tudo com TiposSchema


     const {register, handleSubmit} = useForm<TiposSchema>({
       resolver: zodResolver(dataSchema)
     })


     function usandoHandle(dados: TiposSchema){
      ...
     }


     

  ETAPA 7: FAZENDO A API

  - Definindo o bloco try onde tratará os dados (pois no formulário estão sendo passados como strings), bem como fará o fetch para a endpoint

 async const usandoHandle (data: TiposSchema) {
   try {

     const formatedData = {
      dado1: new Date(data.dado1),
      ...
     }

     await fectch('/api/endpoint', {
     method: 'POST',
     headers: {'Content-Type', 'application-json'},
     body: JSON.stringigy()
     })
     
   
   } catch(error){
    console.log(error) 
   }
  
  }



  ETAPA 8: ENDPOINT

  import {PrismaClient} from ''


  const prisma = new PrismaClient()


  export async function POST(req: Request) {
   
    const user = await currentUser()
    if(!user) {
     return NextResponse.json({error: 'usuário não logado'})
    }
+*
     const body = await req.json()

     await prisma.nomeDatabela.create({
      data: {
       dado1: String(body.dado1),
       dado2: String(body.dado2),
       ...
      }
       return NextResponse.json({success: true})
     })
  } catch () {
    return NextResponse.json({error: 'Erro na requisição'}) 
  }







-----------------------------------------------------------------------------------------------------------
PRÓXIMA ETAPA: 

 FAZER TABELA

  ETAPA 1: CRIAR UMA NOVA ENDPOINT GET


          import {PrismaClient} from 'prisma'

          const prisma = new PrismaClient()


          export async function GET() {
           try {
             const workouts = await prima.nomeDaTabela.findMany({
               orderBy: {
                  data: 'desc'
               }
             })
             return NextResponse.json(workouts)
           } catch (error) {
             return NextResponse.json({error: 'deu pau'}) 
           }
          
          }








    ETAPA 2: CRIAR O NOVO COMPONENTE TABELA









    



*/



// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Loader2, RefreshCcw } from "lucide-react"
// import { NextResponse } from "next/server"
// import { useEffect, useState } from "react"
// import { format } from "date-fns";
// import { ptBR } from "date-fns/locale";

// // ETAPA 1: CRIAR INTERFACE

// interface Dados {
//   id: string,
//   date: Date,
//   distance: number,
//   pace: number | null,
//   duration: number,
//   createdAt: Date,
//   updatedAt: Date
// } 



// // ETAPA 2: FUNÇAO

// export default function Workout () {
//    // CRIANDO USESTATES PARA MANIPULAR ESTADOS
//    const [workout, setWorkout] = useState<Dados[]>([])                     // para os dados
//    const [loading, setLoading] = useState(true)                            // para loading
//    const [error, setError] = useState<string | null>(null)                 //para erros








//   //FUNÇÃO PARA REALIZAR A CONSULTA AO BANCO, INDO A ENDPOINT

//   const fetchWorkout = async () =>{
//     try {
//       //Definindo loading como true
//       setLoading(true)
//       const response = await fetch('/api/training_session')

//       if(!response.ok) {
//         throw new Error('erro na consulta')
//       }

//       // ARMAZENANDO O RESULTADO

//       const data = await response.json()
//       setWorkout(data)
//       setError(null)


//     } catch(error) {
//       setError('houve um erro na requisição')
//       console.log(error)
//     } finally {
//       setLoading(false)
//     }
//   } 








//   // Função para deletar

//     const handleDelete = async (id: string) => {
//       if(!confirm('Você realmente deseja excluir esse dado?')){
//         return
//       }

//       try {
//         const response = await fetch('/api/endpoint',{
//           method: 'DELETE'
//         })

//         if(response.ok) {
//           setWorkout(workout.filter(e => e.id !== id))
//         } else {
//           throw new Error('Erro ao excluir')
//         }


//       } catch(e){
//         setError('Erro ao excluir')
//         console.log(e)
//       }
//     }
      



//     useEffect(()=>{
//       fetchWorkout()
//     }, [])


//     const formatedDate = (date: Date) => {
//       return format(new Date(date), 'dd/MM/yyyy', {locale: ptBR})
//     }
     
   
//     if(loading) {
//       return(
//         <Card className="">
//           <CardContent>
//              <Loader2 />
//              <span>Carregando</span> 
//           </CardContent>
//         </Card>
//       )
//     }




//     return(
//       <Card>
//         <CardHeader>
//           <CardTitle>
//             <div>
//               <Button onClick={fetchWorkout}>
//                 Atualizar
//               </Button>
//               <RefreshCcw />
//             </div>
//           </CardTitle>
//         </CardHeader>




//       <CardContent>
//         {workout.length === 0 ? (
//           <div>
//           Registro não encontrao
//          </div>) : (
//                     <div>
//                       <Table>
//                         <TableHeader>
//                           <TableRow >
//                             <TableHead>Data e hora</TableHead>
//                             <TableHead>Distância</TableHead>
//                             <TableHead>Calorias</TableHead>
//                           </TableRow>
//                         </TableHeader>



//                         <TableBody>
//                           {workout.map(worko => {
//                             return(
//                               <TableRow key={worko.id}>
//                                 <TableCell>{formatedDate(worko.date)}</TableCell>
//                                 <TableCell>{worko.distance}</TableCell>
//                               </TableRow>
//                             )
//                           })}
//                         </TableBody>
//                       </Table>
//                     </div>
//          )
        
//       }

//       </CardContent>


//       </Card>
      
//     )

// } 









/* 
------------------------------------------------------------------------------------------------------------------------------
CRIANDO O DELETE




ETAPA 1: CRIANDO FUNCTION PARA DELETAR

  

  1.1: No componente. 
       No botão enviamos o id <Button onClick={() => handleDelete(workout.id)} >

  1.2: handleDelete vai fazer o fetch



  1.3: FUNÇÃO PARA DELETAR NO BANCO (FAZENDO A REQUISIÇÃO) E ATUALIZAR O ESTADO

    const handleDelete = (id: string) => {
      if(!confirm("Tem certeza que deseja excluir esse registro?")) return 

      try {
       const response = await fetch('/api/response/[id]', {
        method: 'DELETE'
       })

       if(response.ok) {
        setWorkout(workout.filter(w => w.id !== id))
       }

      } catch (e){
        throw new Error('Deu ruim') 
      }
    }




    1.4: ENDPOINT DELETE

         no src/api/training_session/delete/[id]


         const prisma = new PrismaClient()



         export async function DELETE(req: NextRequest, {params}: {params: Promise<{id: string}>}){

            try {
              const {id} = await params

              const workout = await prisma.workout.findUnique({
                where: {id}
              })

              if(!workout) {
               return NextResponse.json({error: 'Registro não existe'})
              }

              await prisma.workout.delete({
               where:{id}
              })
            
              return NextResponse.json({sucess: true})
            }
         
         }












*/