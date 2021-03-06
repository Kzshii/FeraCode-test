export const loadState = (key: string): object | undefined => {
  try {
    const serializedState = localStorage.getItem(key);
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};

export const saveState = (key: string, state: object) => {
  try {
    const serializedState = state ? JSON.stringify(state) : '';
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.warn(`Error saving Redux state: ${error}`);
  }
};
