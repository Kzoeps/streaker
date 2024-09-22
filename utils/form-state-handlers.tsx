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
}

export const fromErrorToFormState = (error: unknown) => {
    const errorResponse: ZodFormState = {
        status: FormStatusTypes.ERROR,
        message: null,
    };
    if (error instanceof ZodError) {
        return {
            ...errorResponse,
            message: "",
            fieldErrors: error.flatten().fieldErrors,
        };
    } else if (error instanceof Error) {
        return {
            ...errorResponse,
            message: error.message,
        };
    } else {
        return {
            ...errorResponse,
            message: "An error occurred",
        };
    }
};
