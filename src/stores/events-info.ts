import { defineStore } from 'pinia'
import type {Events} from "@/interfaces/event-info.interface";

export const useBirthdayInfo = defineStore('birthdayInfo', {
    state: () => ({
        /** @type {{ date: number, month: string} */
        events: [] as Events[],

    }),
    getters: {
        getEvents(state) {

            return state.events;
        },

    },
    actions: {

        setEvents(events: Events) {
            this.events.push(events)
        },
    },
})
