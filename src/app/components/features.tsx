import {BarChart2, Calendar, Clock, Flame} from 'lucide-react'
import { useTheme } from '../context/themeContext'

  


export default function Features(){

  const { theme } = useTheme()

    return(

        <section id="features" className={`w-full py-12 md:py-24 lg:py-32 ${theme === "light" ? "bg-white": "bg-black"}`}>
          <div className="px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Recursos Principais</h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-start">
             <div className="flex flex-col items-center space-y-2 border-gray-800 p-4">
              <Calendar className="h-8 w-8 text-red-600" />
               <h3 className='text-cl font-bold'>Registro Detalhado</h3>
               <p className='text-sm text-gray-500 text-center'>Registre data, hora, distância e diação de cada treino</p>
             </div>

             <div className='flex flex-col items-center space-y-2 border-gray-800 p-4'>
              <Clock className='h-8 w-8 text-red-600' />
              <h3 className='text-xl font-bold'>Ritmo Médio</h3>
              <p className='text-sm text-gray-500 text-center'>Acompanhe seu ritmo por quilôemtro em cada corrida</p>
             </div>


             <div className='flex flex-col items-center space-y-2 border-gray-800 p-4' >
              <Flame className='h-8 w-8 text-red-600' />
              <h3 className='text-xl font-bold'>Calorias Médias</h3>
              <p className='text-sm text-gray-500 text-center'>Estime as calorias perdidas</p>
             
             </div>

             <div className='flex flex-col items-center space-y-2 border-gray-800 p-4' >
              <BarChart2 className='h-8 w-8 text-red-600' />
              <h3 className='text-xl font-bold'>Análise de evolução</h3>
              <p className='text-sm text-gray-500 text-center'>Visualize graficaente se processo ao longo do tempo</p>
             
          
             </div>

            </div>
            
          </div>
        </section>
    )
}