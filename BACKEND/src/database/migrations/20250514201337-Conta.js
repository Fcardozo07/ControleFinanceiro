


module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Contas', {
         id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        data: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        valorTotal: {
            type: Sequelize.FLOAT,
            allowNull: false,
        },
        
        created_at: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        updated_at: {
            type: Sequelize.DATE,
            allowNull: false,
        },
}),
     
  

            down: (queryInterface)  => queryInterface.dropTable('Contas'),
 
   
     
  
}