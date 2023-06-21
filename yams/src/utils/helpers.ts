export const trimAll = (data: any) => {
    for (const key in data) {
        if (typeof data[key] === 'string')
        data[key] = data[key]?.trim() ?? '';
    }
    return data;
};