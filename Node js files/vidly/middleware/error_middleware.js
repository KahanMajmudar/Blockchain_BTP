module.exports.error = function(err, req, res, next){
    res.status(500).send('Server side failure!!');
}