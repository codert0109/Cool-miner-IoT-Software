exports.getStakingParameters = (req, res) => {
    const days = 86400;
    const secs = 1;

    res.json({
        status : 'OK',
        data :  {
            level   : ['Bronze', 'Silver', 'Gold', 'Platinum', 'All Star'],
            amount  : [500, 1000, 1500, 2000, 2500],
            // period  : [45 * days, 90 * days, 180 * days, 360 * days],        // to deploy to main server
            // period_label : ['45 days', '90 days', '180 days', '360 days'],
            period  : [45 * secs, 90 * secs, 180 * secs, 360 * secs],           // to deploy to test server
            period_label : ['45s', '90s', '180s', '360s'],
            multiplier:    [[11000, 11500, 12500, 14000],
                            [12000, 13000, 14000, 15500],
                            [13500, 14500, 15500, 17000],
                            [15000, 16000, 17000, 18500],
                            [16500, 17500, 18500, 20000]]
        }
    })
}