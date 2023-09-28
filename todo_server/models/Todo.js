const Todo = function (sequelize, DataTypes) {
  const model = sequelize.define(
    "todo",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoincrement: true,
      },
      title: {
        type: DataTypes.STRING(100),
      },
      done: {
        type: DataTypes.TINYINT(1),
        defaultValue: 0,
      },
    },
    {
      tableName: "todo",
      freezeTableName: true,
      timestamps: false,
    }
  );
  return model;
};

module.exports = Todo;
