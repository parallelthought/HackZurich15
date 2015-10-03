package ch.hackzurich15.resource;

import ch.hackzurich15.client.InfluxDb;
import ch.hackzurich15.model.TSDBData;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.restlet.ext.json.JsonRepresentation;
import org.restlet.representation.Representation;
import org.restlet.resource.Get;
import org.restlet.resource.ServerResource;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;

/**
 * Created by Srikanta on 03-Oct-15.
 */
public class StateResource extends ServerResource {
    @Get
    public String getCurrentState(){
        String jsonData = null;
        InfluxDb influxDb = new InfluxDb();
        ObjectMapper mapper = new ObjectMapper();
        // Get the list of sensors
        String[] sensorList = {"1b0033000a47343138333038","24002d000447343337373738","430039000947343337373738","38003d000b47343138333038"};
        ArrayList<HashMap> sensorDataList = new ArrayList<HashMap>();
        HashMap responseMap = new HashMap();

        // Get the latest state
        for (int i=0; i<sensorList.length; i++){
            // Get the data
            sensorDataList.add(extractDataPoints(influxDb.getData("SELECT * FROM sensor WHERE device_id='"+sensorList[i]+"' limit 1")));
        }
        // Create the HashMap for generation of the JSON string
        responseMap.put("sensors",sensorDataList);
        try {
            jsonData = mapper.writeValueAsString(responseMap);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return jsonData;
    }

    private HashMap extractDataPoints(TSDBData data) {
        HashMap sensorDataMap = new HashMap();
        ArrayList<String> columns = new ArrayList<String>();
        ArrayList<ArrayList<Object>> points = new ArrayList<ArrayList<Object>>();
        Iterator iterator;
        String columnName;
        int columnIndex;

        columns = data.getColumns();
        points = data.getPoints();

        iterator = columns.iterator();
        while(iterator.hasNext()){
            columnName = (String) iterator.next();
            columnIndex = columns.indexOf(columnName);
            sensorDataMap.put(columnName, points.get(0).get(columnIndex));
        }

        return sensorDataMap;
    }
}
