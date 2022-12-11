import { Table, Column, DataType, PrimaryKey, ForeignKey, AutoIncrement } from 'sequelize-typescript';
import BaseModel from './base';

@Table({
  tableName: 'key_statuses'
})
export class KeyStatusModel extends BaseModel<KeyStatusModel> {
  @PrimaryKey
  @Column({
    allowNull: false,
    type: DataType.STRING(256)
  })
  public key!: string;

  @Column({
    type: DataType.STRING(256)
  })
  public value!: string;
}