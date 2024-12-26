import { DataTypes } from "sequelize";



const contactSchema = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  
  institution: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  
  message: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  
};

export default contactSchema;
