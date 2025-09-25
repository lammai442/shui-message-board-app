import { create } from 'zustand';

export const useMessageStore = create((set) => ({
	visible: false,
	message: '',
	success: true,
	onClose: null,
	showMsg: (msg, success = true, onClose = null) =>
		set({ visible: true, message: msg, success, onClose }),
	hideMsg: () =>
		set((state) => {
			// Om det skickas med en onClose så körs den funktionen
			if (state.onClose) state.onClose();
			return { visible: false, message: '', onClose: null };
		}),
}));
