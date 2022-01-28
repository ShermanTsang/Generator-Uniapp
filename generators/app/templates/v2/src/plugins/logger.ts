export default (target: any, name?: string): void => {
    if (process.env.NODE_ENV !== 'development') {
        return;
    }
    const groupName = `[ log ] ${name || ''}`;
    const consoleMethod = Array.isArray(target) ? 'table' : 'log';
    console.group(groupName);
    console[consoleMethod](target);
    console.groupEnd();
    console.log('\n');
};
