import { defineStore } from 'pinia'
import type {BirthdayInfo} from "@/interfaces/birthday-info.interface";
import type {BirthdayDetailsInterface} from "@/interfaces/birthday-details.interface";

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

        async setBirthdayInfo(birthdayInfo: BirthdayDetailsInterface) {
            await fetch(`${import.meta.env.VITE_BASE_URL}/birthday-info/${birthdayInfo.date}/${birthdayInfo.month}`)
                .then((response) => response.json())
                .then((data) => {
                    this.birthdayInfo = data.data
                });
        },
    },
})
