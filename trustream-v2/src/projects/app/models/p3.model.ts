import { Table, Column, DataType, PrimaryKey, ForeignKey, AutoIncrement } from 'sequelize-typescript';
import BaseModel from './base';

@Table({
  tableName: 'P3'
})
export class P3Model extends BaseModel<P3Model> {
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