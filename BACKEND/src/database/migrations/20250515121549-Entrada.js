module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Entrada', {
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

        id_descricaoEntrada:{
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'descricaoEntrada',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
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
     
  

            down: (queryInterface)  => queryInterface.dropTable('Entrada'),
 
   
     
  
}