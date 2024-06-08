import React from "react";

export interface UiDatePickerProps {
    className?: string;
    selectedStyle?: string;
    todayDateStyle?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};