import { ButtonHTMLAttributes } from "react";

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement>{
    size?: "small" | "default" | "big";
    color?: "default" | "danger" | "gray";
    filled?: boolean;
};