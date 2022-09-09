import { Table, Column, DataType, PrimaryKey, ForeignKey, AutoIncrement } from 'sequelize-typescript';
import BaseModel from './base';
import { DeviceModel } from './device.model';

@Table({
  tableName: 'device_data',
  timestamps: false
})

export class DeviceDataModel extends BaseModel<DeviceDataModel> {
  @PrimaryKey
  @Column({
    type: DataType.INTEGER
  })
  public id!: number;

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
  public start_time!: number;

  @Column({
    allowNull: false
  })
  public end_time!: number;

  @Column({
    allowNull: false
  })
  public pedestrians!: number;

  @Column({
    allowNull: false
  })
  public cars!: number;

  @Column({
    allowNull: false
  })
  public buses!: number;

  @Column({
    allowNull: false
  })
  public trucks!: number;

  @Column({
    allowNull: false
  })
  public total!: number;

  @Column({
    allowNull: false
  })
  public link!: string;

  @Column({
    allowNull: false
  })
  public upload_time!: Date;
}