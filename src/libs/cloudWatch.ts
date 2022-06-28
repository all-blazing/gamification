import type {
    ScheduledEvent,
    Handler,
} from "aws-lambda";

export type ScheduleEventHandler = Handler<ScheduledEvent<any>, any>;