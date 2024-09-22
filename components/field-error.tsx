import { ZodFormState } from "@/utils/form-state-handlers";

export const FieldError = ({
    formState,
    name,
}: {
    formState: ZodFormState;
    name: string;
}) => {
    const error = formState?.fieldErrors?.[name]?.[0];
    if (!error) {
        return undefined;
    }
    return (
        <span className="ml-14 p-0 text-xs font-light text-red-400">
            {error}
        </span>
    );
};
