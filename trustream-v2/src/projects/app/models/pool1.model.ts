import { Table, Column, DataType, PrimaryKey, ForeignKey, AutoIncrement } from 'sequelize-typescript';
import BaseModel from './base';

@Table({
  tableName: 'pool1'
})
export class Pool1Model extends BaseModel<Pool1Model> {
  @PrimaryKey
  @Column({
    type: DataType.INTEGER
  })
  public id!: number;

  @Column({
    allowNull: false,
    type: DataType.INTEGER
  })
  public camera_id!: number;

  @Column({
    allowNull: true,
    type: DataType.STRING(64)
  })
  public status!: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(64)
  })
  public used!: string;
}