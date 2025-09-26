import { create } from 'zustand';

export const useAuthStore = create((set) => ({
	user: JSON.parse(localStorage.getItem('user')) || null,
	updateUserStorage: (user) => {
		set({ user: user });
		localStorage.setItem('user', JSON.stringify(user));
	},
	logout: () => {
		set({ user: null });
		localStorage.removeItem('user');
	},
}));
