export const getArgs = (args: string[]) => {
    const res: Record<string, any>= {};
    const [, , ...rest] = args;
    rest.forEach((value, index, array) => {
        if (value.startsWith('-')) {
            if (index === array.length - 1) {
                res[value.substring(1)] = true;
            } else if (!array[index + 1].startsWith('-')) {
                res[value.substring(1)] = array[index + 1];
            } else {
                res[value.substring(1)] = true;
            }
        }
    })
    return res;
}