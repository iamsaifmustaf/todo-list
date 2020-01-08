const Event = require('../models/event')
const mongoose = require('mongoose');


exports.add_event = (req, res, next) => {
    const event = new Event({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.userId,
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        date: req.body.date,
    }); 

    Event.findOne({title: event.title})
    .exec()
    .then(result => {
        if(result){
            res.status(400).json({
                message: "Event Already Exists!"
            })
        }else{
            event
            .save()
            .then(result => {
                res.status(201).json({
                message: "Event Added!",
                newEvent: {
                    id: result._id,
                    title: result.userId,
                    title: result.title,
                    description: result.description,
                    status: result.status,
                    date: result.date,
                }
                })
            })

        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
}

exports.delete_event = (req, res, next) => {
    const id = req.params.eventId;
    Event.deleteMany({_id: id})
    .exec()
    .then(result => {
        console.log("Event Deleted!")
        res.status(200).json({
            message: "Event Deleted!"
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
    
}

exports.edit_event = (req, res, next) => {
    const id = req.params.eventId;
    Event.updateOne({_id:id}, {$set: {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        date: req.body.date,
    }})
    .exec()
    .then(result => {
        console.log("Events Updated : " + result.n)
        res.status(200).json({
            message: "Event Updated!"
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    })

}

exports.get_all_events = (req, res, next) => {
    Event.find()
    .select('_id title description status date')
    .exec()
    .then(docs =>{
        const response = {
            count: docs.length,
            events: docs,
        }
        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}