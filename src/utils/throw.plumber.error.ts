function throwPlumberError(detail: string): string {
    throw new Error(`Plumber library error: ${detail}`);
}

export {throwPlumberError};
