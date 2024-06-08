import { FC } from "react"
import { UiInputProps } from "./type"
import { cn } from "../cn"


const UiInput: FC<UiInputProps> = (props) => {
    return (
        <input className={cn("border rounded h-10 px-2 py-1", props?.className)} {...props} />
    )
}

export default UiInput