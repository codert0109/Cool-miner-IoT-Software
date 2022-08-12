var timerID = setInterval(function() {
    if (document. readyState === 'complete') {
        if (ethereum._state.initialized == true) {
            clearInterval(timerID);
        } else {
            location.href = location.href;
        }
    }
}, 1000);
