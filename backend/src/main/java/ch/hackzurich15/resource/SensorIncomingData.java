package ch.hackzurich15.resource;

import ch.hackzurich15.client.InfluxDb;
import org.restlet.representation.Representation;
import org.restlet.resource.ServerResource;
import org.restlet.resource.Get;


/**
 * Created by Srikanta on 03-Oct-15.
 */
public class SensorIncomingData extends ServerResource {
    private String sensorData;
    public void doInit() {
        sensorData = (String) getRequestAttributes().get("data");

    }

    @Get
    public Representation processData(){
        InfluxDb influxDb = new InfluxDb();
        String[] data;
        data = sensorData.split(",");
        influxDb.setData(data[0],Float.parseFloat(data[1]),Float.parseFloat(data[2]),Float.parseFloat(data[3])
                ,Float.parseFloat(data[4]),Float.parseFloat(data[5]),Float.parseFloat(data[6]));

        return null;
    }
}
