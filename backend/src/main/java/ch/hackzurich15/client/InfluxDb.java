package ch.hackzurich15.client;

import org.influxdb.InfluxDB;
import org.influxdb.InfluxDBFactory;
import org.influxdb.dto.Point;

/**
 * Created by Srikanta on 03-Oct-15.
 */
public class InfluxDb {
    private InfluxDB influxDB;
    private String dbName;
    public InfluxDb(){
        influxDB = InfluxDBFactory.connect("104.208.28.0:8086", "moisturizer", "moisturizer");
        dbName = "moisturizer";
    }
    public boolean getData(){

        return true;
    }

    public boolean setData(String device_id, float temp, float humidity, float barometer, float soil_moisture, float latitude, float longitude){
        Point point = Point.measurement("sensor")
                .tag("device_id", device_id)
                .field("temperature", temp)
                .field("humidity", humidity)
                .field("barometer", barometer)
                .field("soil_moisture", soil_moisture)
                .field("latitude", latitude)
                .field("longitude", longitude)
                .build();
        try {
            this.influxDB.write(dbName,"default",point);
        }catch (Exception e){
            return false;
        }
        return true;
    }
}
