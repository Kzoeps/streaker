import { FormStatusTypes, ZodFormState } from "@/utils/form-state-handlers";
import { useEffect, useRef } from "react";
import { toast } from "./use-toast";

export const useFormToast = (formState: ZodFormState) => {
    const prevTimeStamp = useRef(formState.timeStamp);
    const showToast =
        formState.message &&
        formState.timeStamp !== prevTimeStamp.current &&
        formState.status === FormStatusTypes.ERROR;
    useEffect(() => {
        console.log(formState);
        if (showToast) {
            toast({
                title: formState.message as string,
                variant:
                    formState.status === FormStatusTypes.ERROR
                        ? "destructive"
                        : "default",
            });
            prevTimeStamp.current = formState.timeStamp;
        }
    }, [formState.message, formState.status, formState.timeStamp, showToast]);
};
