import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Link from "next/link";
import { useTheme } from "../context/themeContext";


export default function Hero() {

    const {theme} = useTheme()


    return(
      <div className={`${theme === "light" ? "bg-white": "bg-black"}`}>
        <div className="relative isolate px-6 pt-14 lg:px-8">
            <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                <div className="hidden sm:mb-8 sm:flex sm:justify-center">

                    <div className={`relative rounded-full px-3 py-1 text-sm/6 ${theme === "light" ? "text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20": "text-white ring-gray-50 hover:ring-gray-50"}`}>
                       Anuncie testes.
                       <a href="#" className="font-semibold text-red-600">
                         <span aria-hidden="true" className="absolute inset-0"/>
                         <span aria-hidden="true">&rarr;</span>
                       </a>
                    </div>
                </div>

             <div className="text-center">
                <h1 className={`text-5xl font-semibold tracking-tight text-balance ${theme === "light" ? " text-gray-900" : "text-gray-50"} sm:text-7xl`}>
                    Registre suas corridas
                </h1>
                 <p className={`mt-8 text-lg font-medium text-pretty ${theme === "light" ? "text-gray-500" : "text-gray-400"}  sm:text-xl/8`}>
                    No Deep Runner, você cria seu diário de treinos digital: registre distância, tempo, percurso e como se sentiu. Visualize seu progresso, conquiste medalhas virtuais e inspire-se com outros corredores.
                </p>

                <div className="mt-10 flex items-center justify-center gap-x-6">

                    <SignedOut>
                        <SignInButton>
                             <div className='flex gap-2'>
                                <a
                                    href="#"
                                    className="rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Crie sua conta
                                </a>
                                <a href="#" className='rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>Entrar</a>
                                </div>
                        </SignInButton>
                    </SignedOut>

                      <SignedIn>
                     <Link 
                        href="/dashboard"
                        className="rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                        Dashboard
                     </Link>
                    </SignedIn>



                </div>


             </div>
            </div>
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                >
                <div
                    style={{
                    clipPath:
                        'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                    className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75"
                />
          </div>

        </div>

      </div>  
    )
}