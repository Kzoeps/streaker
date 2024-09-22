import { ZodError } from "zod";

export enum FormStatusTypes {
    SUCCESS = "SUCCESS",
    ERROR = "ERROR",
    NA = "NA",
}
export interface BaseFormState {
    status: FormStatusTypes;
    message: string | null;
}

export interface ZodFormState extends BaseFormState {
    fieldErrors?: Record<string, string[] | undefined>;
    timeStamp: number;
}

export const fromErrorToFormState = (error: unknown) => {
    if (error instanceof ZodError) {
        return {
            status: FormStatusTypes.ERROR,
            message: "",
            fieldErrors: error.flatten().fieldErrors,
            timeStamp: Date.now(),
        };
    } else if (error instanceof Error) {
        return {
            status: FormStatusTypes.ERROR,
            message: error.message,
            timeStamp: Date.now(),
        };
    } else {
        return {
            status: FormStatusTypes.ERROR,
            message: "An error occurred",
            timeStamp: Date.now(),
        };
    }
};
