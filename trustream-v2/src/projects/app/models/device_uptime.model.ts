import { Table, Column, DataType, PrimaryKey, ForeignKey, AutoIncrement } from 'sequelize-typescript';
import BaseModel from './base';

@Table({
    tableName: 'device_uptimes'
})
export class DeviceUptimeModel extends BaseModel<DeviceUptimeModel> {
    @Column({
        allowNull: false,
        type: DataType.STRING(64)
    })
    public address!: string;

    @Column({
        allowNull: false
    })
    public uptime!: number;
}