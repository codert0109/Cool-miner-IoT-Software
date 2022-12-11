import { Table, Column, DataType, PrimaryKey, ForeignKey, AutoIncrement } from 'sequelize-typescript';
import BaseModel from './base';

@Table({
  tableName: 'P1'
})
export class P1Model extends BaseModel<P1Model> {
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