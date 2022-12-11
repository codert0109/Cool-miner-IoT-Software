import { Table, Column, DataType, PrimaryKey, ForeignKey, AutoIncrement } from 'sequelize-typescript';
import BaseModel from './base';

@Table({
  tableName: 'P2'
})
export class P2Model extends BaseModel<P2Model> {
  @PrimaryKey
  @Column({
    type: DataType.INTEGER
  })
  public id!: number;

  @Column({
    type: DataType.INTEGER
  })
  public nft_id!: number;

  @Column({
    type: DataType.INTEGER
  })
  public timestamp!: number;
}