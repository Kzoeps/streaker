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

export const fromErrorToFormState = (error: unknown) => {
    const errorResponse: BaseFormState = {
        status: FormStatusTypes.ERROR,
        message: null,
    };
    if (error instanceof ZodError) {
        errorResponse.message = error.errors[0].message;
        return errorResponse;
    } else if (error instanceof Error) {
        errorResponse.message = error.message;
        return errorResponse;
    } else {
        errorResponse.message = "An error occurred, please try again";
        return errorResponse;
    }
};
