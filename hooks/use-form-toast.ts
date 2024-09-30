import { FormStatusTypes, ZodFormState } from "@/utils/form-state-handlers";
import { useEffect, useRef } from "react";
import { toast } from "./use-toast";

export interface FormToastProps {
    successCallback?: (formState?: ZodFormState) => void;
    errorCallback?: (formState?: ZodFormState) => void;
}
export const useFormToast = (
    formState: ZodFormState,
    callbacks?: FormToastProps
) => {
    const prevTimeStamp = useRef(formState.timeStamp);
    const showToast =
        formState.message &&
        formState.timeStamp !== prevTimeStamp.current &&
        formState.status === FormStatusTypes.ERROR;
    useEffect(() => {
        if (
            callbacks?.successCallback &&
            formState.status === FormStatusTypes.SUCCESS
        ) {
            callbacks.successCallback(formState);
        }
        if (
            callbacks?.errorCallback &&
            formState.status === FormStatusTypes.ERROR
        ) {
            callbacks.errorCallback(formState);
        }
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
    }, [formState, callbacks, showToast]);
};
