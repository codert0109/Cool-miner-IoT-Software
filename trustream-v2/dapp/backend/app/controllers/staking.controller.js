exports.getStakingParameters = (req, res) => {
    res.json({
        status : 'OK',
        data :  {
            level: ['Bronze', 'Silver', 'Gold', 'Platinum', 'All Star'],
            amount: [500, 1000, 1500, 2000, 2500],
            period: ['45 Days', '90 Days', '180 Days', '360 Days'],
            multiplier:    [[11000, 11500, 12500, 14000],
                            [12000, 13000, 14000, 15500],
                            [13500, 14500, 15500, 17000],
                            [15000, 16000, 17000, 18500],
                            [16500, 17500, 18500, 20000]]
        }
    })
}