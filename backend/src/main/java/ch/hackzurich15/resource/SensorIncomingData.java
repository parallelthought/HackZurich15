package ch.hackzurich15.resource;

import ch.hackzurich15.client.InfluxDb;
import ch.hackzurich15.model.TSDBData;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.restlet.representation.Representation;
import org.restlet.resource.Post;
import org.restlet.resource.ServerResource;
import org.restlet.resource.Get;

import java.util.ArrayList;


/**
 * Created by Srikanta on 03-Oct-15.
 */
public class SensorIncomingData extends ServerResource {
    private String sensorData;
    public void doInit() {
        //sensorData = (String) getRequestAttributes().get("data");
        sensorData = getQuery().getValues("data");
    }

    @Get
    public Representation processData(){
        InfluxDb influxDb = new InfluxDb();
        String[] data;
        String jsonData;
        ArrayList<String> columnArr = new ArrayList<String>();
        ArrayList<Object> objArrNode =  new ArrayList<Object>();
        ArrayList<ArrayList<Object>> sensorDataArr = new ArrayList<ArrayList<Object>>();
        TSDBData tsdbData = new TSDBData();
        ObjectMapper mapper = new ObjectMapper();

        data = sensorData.split(",");

        columnArr.add("device_id");
        columnArr.add("temperature");
        columnArr.add("humidity");
        columnArr.add("barometer");
        columnArr.add("pascals");
        columnArr.add("soil_moisture");

        for(int i=0; i<data.length;i++){
            objArrNode.add(data[i]);
        }
        sensorDataArr.add(objArrNode);
        tsdbData.setName("FuchFarmer");
        tsdbData.setColumns(columnArr);
        tsdbData.setPoints(sensorDataArr);

        try {
            jsonData = mapper.writeValueAsString(tsdbData);
            influxDb.setData(jsonData);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return null;
        }

        return null;
    }
}
