export const arrayToObjectById = <T extends { id: string }>(array: T[]): { [id: string]: T } => {
    return array.reduce((obj, item) => {
        obj[item.id] = item;
        return obj;
    }, {} as { [id: string]: T });
};