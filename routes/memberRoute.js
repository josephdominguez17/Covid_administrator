const express = require('express');
const router = express.Router();

const MemberRoute = require('../models/memberModel');


//get routes
router.get('/', (req, res)=> {
    MemberRoute.find({})
        .then(members => {
            res.render('index', {members : members});
        })
        .catch(err=> {
            req.flash('error_msg', 'ERROR: '+err)
            res.redirect('/');
        })

});



router.get('/member/new', (req,res)=> {
    res.render('new');
});

router.get('/member/new1', (req,res)=> {
    res.render('new1');
});


router.get('/member/search', (req,res)=> {
    res.render('search', {member:""});
});


router.get('/member', (req,res)=> {
    let searchQuery = {nameAppointment : req.query.nameAppointment};

    MemberRoute.findOne(searchQuery)
        .then(member => {
            res.render('search', {member:member});
        })
        .catch(err => {
            req.flash('error_msg', 'ERROR: '+err)
            res.redirect('/');
        });

});

router.get('/edit/:id', (req, res)=> {

    let searchQuery = {_id : req.params.id};
    MemberRoute.findOne(searchQuery)
        .then(member => {
            res.render('edit', {member:member});
        })
        .catch(err => {
            req.flash('error_msg', 'ERROR: '+err)
            res.redirect('/');
        });

});


//post routes
router.post('/member/new', (req,res)=> {
    let newMember = {
        nameAppointment : req.body.nameAppointment,
        ageAppointment : req.body.ageAppointment,
        numberAppointment : req.body.numberAppointment,
        timeAppointment : req.body.timeAppointment,
        clinicAppointment : req.body.clinicAppointment,

    };

    MemberRoute.create(newMember)
        .then(member => {
            req.flash('success_msg', 'Patient data added to database successfully.')
            res.redirect('/');
        })
        .catch(err => {
            req.flash('error_msg', 'ERROR: '+err)
            res.redirect('/');
        });
});


//put routes

router.put('/edit/:id', (req, res)=> {
    let searchQuery = {_id : req.params.id};

    MemberRoute.updateOne(searchQuery, {$set: {
            nameAppointment : req.body.nameAppointment,
            ageAppointment : req.body.ageAppointment,
            numberAppointment : req.body.numberAppointment,
            timeAppointment : req.body.timeAppointment,
            clinicAppointment : req.body.clinicAppointment,
        }})
        .then(member => {
            req.flash('success_msg', 'Patient data updated successfully.')
            res.redirect('/');
        })
        .catch(err => {
            req.flash('error_msg', 'ERROR: '+err)
            res.redirect('/');
        });
});


//delete routes
router.delete('/delete/:id', (req, res)=> {
    let searchQuery = {_id : req.params.id};

    MemberRoute.deleteOne(searchQuery)
        .then(member=>{
            req.flash('success_msg', 'Patient deleted successfully.')
            res.redirect('/');
        })
        .catch(err => {
            req.flash('error_msg', 'ERROR: '+err)
            res.redirect('/');
        });
});

//delete routes
module.exports = router;