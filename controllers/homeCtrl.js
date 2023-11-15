const get = (req, res) => {
    res.status(200);
    res.send('Hello Express!!');
};

// monitoring
const health = (req, res) => {
    res.status(200);
    res.json({ status: 'Up' });
};

module.exports = {
    get,
    health,
};
