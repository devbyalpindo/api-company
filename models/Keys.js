module.exports = (sequelize, DataTypes) => {
  const Keys = sequelize.define(
    "Keys",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      keys: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      uses: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      limit: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        field: "created_at",
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        field: "updated_at",
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: "keys",
      timestamps: true,
    }
  );

  return Keys;
};
