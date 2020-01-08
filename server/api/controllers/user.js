const User = require('../models/user')

exports.get_user = (req, res, next) => {
    const id = req.params.userId
    User.findById(id)
        .exec()
        .then(doc => {
            console.log("From Databse", doc);
            if(doc){
                res.status(200).json(doc);
            }else{
                res.status(404).json({message: 'Customer Not Found!'})
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error:err})
        });
}



