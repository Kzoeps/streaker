"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export default function UpdateTimezone() {
    const { user, isLoaded } = useUser();
    useEffect(() => {
        if (isLoaded && user) {
            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            if (user.unsafeMetadata?.timezone !== timezone) {
                user.update({
                    unsafeMetadata: {
                        ...user.unsafeMetadata,
                        timezone,
                    },
                }).then(() => {
                    console.log("timezone updated");
                });
            }
        }
    }, [isLoaded, user]);
    return undefined;
}
