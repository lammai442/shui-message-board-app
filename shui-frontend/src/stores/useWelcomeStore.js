import { create } from 'zustand';

export const useWelcomeStore = create((set) => ({
	showWelcome: false,
	welcomeOverlay: () => {
		set({ user: user });
	},
}));
