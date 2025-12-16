import { UserButton } from "@clerk/nextjs";
import { MapPin } from "lucide-react";
import Link from "next/link";




export default function Navbar() {
    return(
        <header className="flex justify-between px-4 py-6">
              <Link className="flex items-center space-x-1" href="/">
               <MapPin className="h-6 w-6 text-red-600"/>
                  <span className="font-bold text-2xl">
                    Deep Runner
                  </span>
               </Link>


             
                 <nav className="flex items-center">
                    <UserButton />
                 </nav>
              
        </header>
    )
}