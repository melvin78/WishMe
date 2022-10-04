import type {CelebsInterface} from "@/interfaces/celeb-info.interface";
import type {EventsInterface} from "@/interfaces/event-info.interface";

export interface BirthdayInfo{
    id: number
    date: number
    month: string
    celeb: Array<CelebsInterface>
    events: Array<EventsInterface>
}