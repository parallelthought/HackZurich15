package ch.hackzurich15.client;

import ch.hackzurich15.model.TSDBData;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.influxdb.InfluxDB;
import org.influxdb.InfluxDBFactory;
import org.influxdb.dto.Point;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.restlet.Client;
import org.restlet.data.ChallengeScheme;
import org.restlet.data.MediaType;
import org.restlet.data.Protocol;
import org.restlet.representation.Representation;
import org.restlet.resource.ClientResource;

import java.io.IOException;
import java.util.concurrent.TimeUnit;

/**
 * Created by Srikanta on 03-Oct-15.
 */
public class InfluxDb {
    public TSDBData getData(String query){
        JSONArray resultArray;
        JSONObject resultObj;
        TSDBData dataObj = null;
        Representation output;
        ObjectMapper mapper = new ObjectMapper();
        ClientResource cr = new ClientResource("");
        cr.addQueryParameter("q",query);
        cr.addQueryParameter("u","dbadmin");
        cr.addQueryParameter("p","changeit");
        cr.get(MediaType.APPLICATION_JSON);
        output = cr.getResponseEntity();

        try {
            resultArray = new JSONArray(output.getText());
            if(!resultArray.isNull(0)){
                resultObj = new JSONObject();
                resultObj = (JSONObject) resultArray.get(0);
                dataObj = mapper.readValue(resultObj.toString(),TSDBData.class);
            }
        } catch (JSONException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return dataObj;
    }

    public boolean setData(String data){

        data = "["+data+"]";
        Representation output;
        System.out.println(data);

        Client client = new Client(Protocol.HTTP);
        ClientResource cr = new ClientResource("http://40.122.168.214:8086/db/sensor/series");
        cr.setChallengeResponse(ChallengeScheme.HTTP_BASIC, "dbadmin", "changeit");

        cr.post(data);
        output = cr.getResponseEntity();

        return true;
    }
}
