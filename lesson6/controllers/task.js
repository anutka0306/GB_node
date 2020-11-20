const models = require('../models');

exports.getTasks = (req, res, next) => {
    if (!req.session.userid) {
        res.redirect('/auth/login/')
    } else {
        models.Task.getTasks(req.session.userid).then(([rows, fieldData]) => {
            console.log(rows);
            res.render('tasks', { tasks: rows[0], tasksForMe:rows[1], userid:req.session.userid });
        });

    }
}

exports.createTask = (req, res, next) => {
    models.Task.createTask(req.body).then(([rows, fieldData]) => {
        res.redirect('/task/');
    })
}

exports.updateTaskDescription = (req, res, next) => {
    models.Task.updateTask(req.params.taskId, req.body).then(([rows, fieldData]) => {
        res.redirect('/task/');
    })
}

exports.completeTask = (req, res, next) => {
    models.Task.completeTask(req.params.taskId, req.body).then(([rows, fieldData]) => {
        res.redirect('/task/');
    })
}

exports.assignTask = (req, res, next) => {

}

exports.deleteTask = (req, res, next) => {
    models.Task.deleteTask(req.params.taskId).then(([rows, fieldData]) => {
        res.redirect('/task/');
    })
}
