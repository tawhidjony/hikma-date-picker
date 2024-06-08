import { ChangeEvent } from "react";

export interface UiDatePickerProps {
    className?: string;
    selectedStyle?: string;
    todayDateStyle?: string;
    value?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};