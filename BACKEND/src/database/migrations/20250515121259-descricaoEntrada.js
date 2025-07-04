module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('descricaoEntrada', {
         id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        
        descricaoEntrada: {
            type: Sequelize.STRING,
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
     
  

            down: (queryInterface)  => queryInterface.dropTable('descricaoEntrada'),
 
   
     
  
}