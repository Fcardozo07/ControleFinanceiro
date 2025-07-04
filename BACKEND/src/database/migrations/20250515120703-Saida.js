module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('saida', {
         id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        
        id_conta: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'contas',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },

        id_descricaoSaida:{
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'descricaoSaida',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        pago: {
            type: Sequelize.BOOLEAN,
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
     
  

            down: (queryInterface)  => queryInterface.dropTable('saida'),
 
   
     
  
}