import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../database";

export interface ItemMenuAttributes {
    id?: number
    nome: string
    descricao: string
    preco: number
    categoria: 'entrada' | 'comida' | 'bebida' | 'sobremesa'
    imagem?: string
    data_criacao: Date | string
    data_atualizacao?: Date | string
}

interface ItemMenuCreationAttributes extends Optional<ItemMenuAttributes, 'id'>{}

export class ItemMenu extends Model<ItemMenuAttributes, ItemMenuCreationAttributes> implements ItemMenuAttributes {
    public id!: number;
    public nome!: string;
    public descricao!: string;
    public preco!: number;
    public categoria!: 'entrada' | 'comida' | 'bebida' | 'sobremesa';
    public imagem!: string;
    public data_criacao!: Date;
    public data_atualizacao!: Date;
}

ItemMenu.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
            descricao: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
            preco: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
            categoria: {
            type: DataTypes.ENUM('entrada', 'comida', 'bebida', 'sobremesa'),
            allowNull: false,
        },
            imagem: {
            type: DataTypes.STRING,
            allowNull: true,
        },
            data_criacao: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
            data_atualizacao: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        tableName: 'itens_menu',
        timestamps: false,
    }
);
  
export default ItemMenu;