import { Table, Column, DataType, PrimaryKey, ForeignKey, AutoIncrement } from 'sequelize-typescript';
import BaseModel from './base';

@Table({
  tableName: 'camera'
})
export class CameraModel extends BaseModel<CameraModel> {
  @PrimaryKey
  @Column({
    type: DataType.INTEGER
  })
  public id!: number;

  @Column({
    allowNull: false,
    type: DataType.STRING(256)
  })
  public coordinates!: string;

  @Column({
    allowNull: false,
    type: DataType.STRING(256)
  })
  public link!: string;
}