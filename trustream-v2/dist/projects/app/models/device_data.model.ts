import { Table, Column, DataType, PrimaryKey, ForeignKey, AutoIncrement } from 'sequelize-typescript';
import BaseModel from './base';
import { DeviceModel } from './device.model';

@Table({
  tableName: 'device_data'
})
export class DeviceDataModel extends BaseModel<DeviceDataModel> {
  @PrimaryKey
  @Column({
    type: DataType.STRING(64)
  })
  public id!: string;

  // @ForeignKey(() => DeviceModel)
  @Column({
    allowNull: false,
    type: DataType.STRING(64)
  })
  public address!: string;

  @Column({
    allowNull: true,
    type: DataType.STRING(64)
  })
  public miner!: string;

  @Column({
    allowNull: false
  })
  public timestamp!: number;

  @Column({
    allowNull: false
  })
  public pedestrains!: number;

  @Column({
    allowNull: false
  })
  public cars!: number;

  @Column({
    allowNull: false
  })
  public bus!: number;

  @Column({
    allowNull: false
  })
  public truck!: number;

  @Column({
    allowNull: false
  })
  public total!: number;

  @Column({
    allowNull: false
  })
  public link!: string;
}