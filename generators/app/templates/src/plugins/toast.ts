export default (content: string): void => {
    uni.showToast({
        title: content,
        duration: 2000,
        position: 'bottom',
        icon: 'none'
    });
    return;
};
