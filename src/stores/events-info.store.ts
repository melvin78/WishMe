import { defineStore } from 'pinia'
import type {BirthdayInfo} from "@/interfaces/birthday-info.interface";
import type {BirthdayDetailsInterface} from "@/interfaces/birthday-details.interface";


export const useEventsInfoStore = defineStore('eventsInfo', {
    state: () => ({
        /** @type {{ date: number, month: string} */
        events: {} ,

    }),
    getters: {
        getEvents(state) {
            return state.events;
        },

    },
    actions: {

       async setEvents(birthdayDetails: BirthdayDetailsInterface) {
           await fetch(`${import.meta.env.VITE_BASE_URL}/birthday-info/${birthdayDetails.date}/${birthdayDetails.month}`)
               .then((response) => response.json())
               .then((data) => this.events = data.data);
        },
    },
})
