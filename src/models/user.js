'use strict';
const {
  Model
} = require('sequelize');
const {SALT} = require('../config/configServer');
const bycrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        this.belongsToMany(models.role, {
          through : "user_roles"
        });
    }
  }
  User.init({
    email:
    {
      type:DataTypes.STRING,
      allowNull:false,
      unique:true,
      validate:{
        isEmail : true
      }
    },
    password:{
      type : DataTypes.STRING,
      allowNull:false,
      validate:{
        len: [4, 100]
      }
      
    }
  }, {
    sequelize,
    modelName: 'User',

  });


  User.beforeCreate(async (user)=>{
    const encryptedPassword = bycrypt.hashSync(user.password, SALT);
    user.password = encryptedPassword;
  });
  return User;
};


class abcd{

  func()
  {
    console.log("hello");
  }
}