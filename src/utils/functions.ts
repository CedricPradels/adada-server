export const prop = <T extends {}, K extends keyof T>(k: K) => (o: T) => o[k];
