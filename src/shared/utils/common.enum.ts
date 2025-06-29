export const StatusEnum = {
    UNASSIGNED: "UNASSIGNED",
    ASSIGNED: "ASSIGNED",
    COMPLETED: "COMPLETED"
} as const;

export type StatusEnum = typeof StatusEnum[keyof typeof StatusEnum];