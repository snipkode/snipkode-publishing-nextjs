import { create } from 'zustand';

interface TestState {
    count: number;
    increment: () => void;
    decrement: () => void;
}

const useTestStore = create<TestState>((set) => ({
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 })),
    decrement: () => set((state) => ({ count: state.count - 1 })),
}));

export default useTestStore;
