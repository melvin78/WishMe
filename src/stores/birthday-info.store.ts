import { defineStore } from 'pinia'
import type {BirthdayInfo} from "@/interfaces/birthday-info.interface";

export const useBirthdayInfoStore = defineStore('birthdayInfoStore', {
    state: () => ({
        /** @type {{ date: number, month: string} */
        birthdayInfo: {} as BirthdayInfo,

    }),
    getters: {
        getBirthdayInfo(state) {
            return state.birthdayInfo
        },

    },
    actions: {

        setBirthdayInfo(birthdayInfo: BirthdayInfo) {
          this.birthdayInfo = birthdayInfo
        },
    },
})
