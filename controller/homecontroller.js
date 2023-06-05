const TodoLists = require('../models/todo_list');
//function for redirecting to main home page
module.exports.home =  function(req,res){
    //fetchiong using mongoose
    TodoLists.find().then((todo)=>{//using promise
                    return res.render('homepage',{
                        title: 'home',
                        todolist: todo})
                    })
                    .catch((err)=>{console.error(err);});                
}
//function for new date
function DateValue(dueDate){
    let months = ['jan','feb','mar','Apr','May','june','july','aug','sept','oct','nov','dec'] // static value for implementing monthe value


    newdate = '';
    let monapp = '';
    // checking months 
    if(dueDate[1] == '01'){
        monapp=months[0];
    }
    else if(dueDate[1] == '02'){
        monapp=months[1];
    }else if(dueDate[1] == '03'){
        monapp=months[2];
    }else if(dueDate[1] == '04'){
        monapp=months[3];
    }else if(dueDate[1] == '04'){
        monapp=months[3];
    }else if(dueDate[1] == '05'){
        monapp=months[4];
    }else if(dueDate[1] == '06'){
        monapp=months[5];
    }else if(dueDate[1] == '07'){
        monapp=months[6];
    }else if(dueDate[1] == '08'){
        monapp=months[7];
    }else if(dueDate[1] == '09'){
        monapp=months[8];
    }else if(dueDate[1] == '10'){
        monapp=months[9];
    }else if(dueDate[1] == '11'){
        monapp=months[10];
    }else if(dueDate[1] == '12'){
        monapp=months[11];
    }
    newdate = dueDate[2]+'-'+monapp+'-'+dueDate[0] // displaying date in dd-mm-yyyy formate
    return newdate;
}

// function for creating todo list
module.exports.createTodo = function(req,res){
    dueDate = req.body.dateValue.split('-');// splitting date and taking month value
    let newdate = '';
    newdate = DateValue(dueDate); 
    TodoLists.create({ //creating new todo and storing into db
        desc:req.body.desc,
        category:req.body.category,
        dueDate:req.body.newdate
    }).then(()=>{return res.redirect('/')})
      .catch((err)=>{console.log('oops error occoured while creating todo list : ',err)}); 
}

//function for deleting todo list
module.exports.deleteTodo = function(req,res){
    sp = req.query.id;//getting the id from ui
    newsp = sp.split(',');
    for(let i=0;i<newsp.length;i++){
        TodoLists.findByIdAndDelete(newsp[i]).then((newsp)=>{console.log(newsp)})
                                              .catch((err)=>{console.log('oops error occoured while deleting todo list field : ',err)});
    }
    return res.redirect('/');
}

// function for fetching data for edit page
module.exports.EditPage = function(req,res){ // here we are fetching the data whic need to be edited
    console.log('Edited',req.query)
    TodoLists.findById(req.query.id).then((todoLists)=>{
                                        return res.render('editPage',{
                                            title: 'Edit Page',
                                            todolist:todoLists
                                        })
                                    })
                                    .catch((err)=>{console.log('oops error occoured while editing todo list field : ',err)});
}
// function for updatind tada after the todo is being edited
module.exports.editDetails = function(req,res){
    dueDate =req.body.dueDate.split('-'); // splitting date and taking month value
    let newdate='';
    newdate = DateValue(dueDate);     
     TodoLists.updateOne({_id:req.query.id},{$set:{desc:req.body.desc,category:req.body.category,dueDate:newdate}}).then(()=>{return res.redirect('/')})
      .catch((err)=>{console.log(console.log('oops error occoured while updating todo list field : ',err))});  
}
