import { defineStore } from 'pinia'
import type {BreathingDaysInterface} from "@/interfaces/breathing-days.interface";

export const useBreathingDaysStore = defineStore('breathingDays', {
    state: () => ({
        breathingDays: {} as BreathingDaysInterface,

    }),
    getters: {
        getBreathingDays(state) {
            return state.breathingDays
        },
    },
    actions: {

         setBreathingDays(breathingDays: BreathingDaysInterface) {

             this.breathingDays = breathingDays
        },
    },
})
