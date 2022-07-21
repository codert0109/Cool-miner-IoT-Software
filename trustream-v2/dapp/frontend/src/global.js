module.exports = {
    getWindow : () => {
        if (typeof window !== "undefined") {
            // browser code
            return window;
        }
        return {};
    }
};