const mysql2 = require('mysql2');

const options = require('../config');

const pool = mysql2.createPool(options);

module.exports = class Users {

    static selectAll(){
        pool.getConnection((err, connection) =>{
            if(err){
                console.log(err);
            }else{
                connection.query('select * from users',(err, res)=>{
                    console.log(res);
                });
                connection.release();
            }
        })
    }

    static selectByParam(param, value){
        pool.getConnection((err, connection) =>{
            if(err){
                console.log(err);
            }else{
                connection.query('select * from users where ?? = ?', [param, value], (err, res)=>{
                    console.log(res);
                });
               connection.release();
            }
        })
    }

  static insertUser(email, name, password){
        pool.getConnection((err, connection) =>{
            if(err){
                console.log(err);
            }else{
                connection.query('insert into users set `email`= ?, `name` = ?, `password` = ?', [email, name, password], (err, res) =>{
                    console.log(res);
                });
                connection.release();
            }
        })
  }

  static updateUserByParam(email, name, password, param, value){
        pool.getConnection((err, connection) =>{
            if(err){
                console.log(err);
            }else{
                connection.query('update users set email = ?, name = ?, password = ? where ?? = ?',[email, name, password, param, value], (err, res) =>{
                    console.log(res);
                });
                connection.release();
            }
        })
  }

  static deleteUserByParam(param, value){
        pool.getConnection((err, connection) =>{
            if(err){
                console.log(err);
            }else{
                connection.query('delete from users where ?? = ?',[param, value], (err, res)=>{
                    console.log(res);
                });
                connection.release();
            }
        })
  }

}

