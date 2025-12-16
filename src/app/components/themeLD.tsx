"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/themeContext"; // Ajuste o caminho

export default function ThemeLD() {
    const { theme, toggleTheme } = useTheme();

    return(
        <Button 
            className="fixed bottom-4 right-4 rounded-full w-12 h-12 hover:shadow-lg z-50"
            variant="secondary"
            onClick={toggleTheme}
        >
            {theme === "dark" ? (
                <Sun className="h-5 w-5" />
            ) : (
                <Moon className="h-5 w-5" />
            )}
        </Button>
    );
}