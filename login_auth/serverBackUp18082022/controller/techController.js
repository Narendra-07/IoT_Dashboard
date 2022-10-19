const mongoose = require('mongoose');
const Customer=require('../model/techModel')
const user = require('../model/user.model');


module.exports.register= (req, res, next) => {
    var techcustomers = new Customer();
    let date_ob = new Date();
    techcustomers.company_id = req.body.company_id;
    techcustomers.company_name = req.body.company_name;
    techcustomers.address = req.body.address;
    techcustomers.createdBy = req.body.createdBy;
    techcustomers.createdDate = date_ob;

    techcustomers.save((err, doc) => {
        if (!err)          
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate company id found.']);
            else
                return next(err);
        }
    });
}

exports.list_all_customer = (req, res) => {     
    Customer.find({}, (err,customers) => {
      if (err) {
        console.log("error!!!!!!!!!!", err)
        res.send(err);
      }
      res.json(customers);
    
    }
    );
  };
