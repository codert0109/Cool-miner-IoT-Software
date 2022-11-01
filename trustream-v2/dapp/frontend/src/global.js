module.exports = {
    getWindow : () => {
        if (typeof window !== "undefined") {
            // browser code
            return window;
        }
        return {};
    },
    isBrave : async () => {
        return (navigator.brave && await navigator.brave.isBrave() || false)
    }
};