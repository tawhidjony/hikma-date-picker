import { ChangeEvent } from "react";

export interface UiDatePckerProps {
    className?: string;
    selectedStyle?: string;
    todayDateStyle?: string;
    value?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};