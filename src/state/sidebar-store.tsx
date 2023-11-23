import { create } from "zustand";

interface SidebarState {
	isOpen: boolean;
	toggleSidebar: () => void;
	openSidebar: () => void;
	closeSidebar: () => void;
	isHovering: boolean;
	openHovering: () => void;
	closeHovering: () => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
	isOpen: false,
	isHovering: false,
	toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
	openSidebar: () => set({ isOpen: true }),
	closeSidebar: () => set({ isOpen: false }),

	openHovering: () => set({ isHovering: true }),
	closeHovering: () => set({ isHovering: false }),
}));
