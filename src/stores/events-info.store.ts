import { defineStore } from 'pinia'
import type {Events} from "@/interfaces/event-info.interface";
import type {BirthdayInfo} from "@/interfaces/birthday-info.interface";


export const useEventsInfoStore = defineStore('eventsInfo', {
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

       async setEvents(birthdayInfo: BirthdayInfo) {
           await fetch(`${import.meta.env.VITE_BASE_URL}/birthday-info/${birthdayInfo.date}/${birthdayInfo.month}`)
               .then((response) => response.json())
               .then((data) => console.log(data));
        },
    },
})
