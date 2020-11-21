const express = require('express');
const Bill = require('../models/bills');
const Stock = require('../models/stock');
const router = express.Router();

//get list of bills from database
router.get('/bills', function(req, res, next){
	Bill.find({}).then(function(bill){
		res.send(bill);
	});
});

//add new bill to database
router.post('/bills', function(req, res, next){
	var bill = new Bill(req.body);
	var flag=1;
	//Bill.create(req.body).then(function(bill){
	bill.products.forEach(function(item){
		Stock.findOne({name: item.name}).then(function(prod){
			if(item.quantity>prod.quantity){
				res.status(404).send({error: "404 NOT FOUND"})
				flag=0;
			}
		});
	});
	setTimeout(()=>{
		if(flag==1){
			bill.products.forEach(function(item){
				Stock.findOne({name: item.name}).then(function(prod){
					bill.amount += item.quantity * prod.price;
					prod.quantity -= item.quantity;
					prod.save();
				});
			});
			setTimeout(()=>{
				bill.save();
				res.send(bill);
			},500);
		}
	},300);
});

//update a bill in db
router.put('/bills/:id', function(req, res, next){
	Bill.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
		Bill.findOne({_id: req.params.id}).then(function(bill){
			res.send(bill);
		});
	});
});

//delete a bill from db
router.delete('/bills/:id', function(req, res, next){
	Bill.findByIdAndRemove({_id: req.params.id}).then(function(bill){
		res.send(bill);
	});
});

//products

//get list of products from database
router.get('/stock', function(req, res, next){
	Stock.find({}).then(function(stock){
		res.send(stock);
	});
});

//add new product to database
router.post('/stock', function(req, res, next){
	Stock.create(req.body).then(function(stock){
		res.send(stock);
	}).catch(next);
});

//update a product in db
router.put('/stock/:id', function(req, res, next){
	Stock.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
		Stock.findOne({_id: req.params.id}).then(function(stock){
			res.send(stock);
		});
	});
});

//delete a product from db
router.delete('/stock/:id', function(req, res, next){
	Stock.findByIdAndRemove({_id: req.params.id}).then(function(stock){
		res.send(stock);
	});
});


module.exports = router;