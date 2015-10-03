package ch.hackzurich15.resource;

import org.restlet.resource.Get;
import org.restlet.resource.ServerResource;

/**
 * Created by Srikanta on 03-Oct-15.
 */
public class RootResource extends ServerResource {
    @Get
    public String RootApiEndpoint(){
        return "{\n" +
                "  \"sensors\": [\n" +
                "    {\n" +
                "      \"id\": \"Lilly\",\n" +
                "      \"description\": \"Here there and everywhere!\",\n" +
                "      \"temperature\": 23.4,\n" +
                "      \"humidty\": 36,\n" +
                "      \"barometer\": 1231,\n" +
                "      \"soil_moisture\": 2365,\n" +
                "      \"pascal\": \"326\"\n" +
                "    },\n" +
                "    {\n" +
                "      \"id\": \"Rosemary\",\n" +
                "      \"description\": \"Up, down, funky town!\",\n" +
                "      \"temperature\": 23.4,\n" +
                "      \"humidty\": 36,\n" +
                "      \"barometer\": 1231,\n" +
                "      \"soil_moisture\": 2365,\n" +
                "      \"pascal\": \"326\"\n" +
                "    },\n" +
                "    {\n" +
                "      \"id\": \"Yasmine\",\n" +
                "      \"description\": \"say what, say what\",\n" +
                "      \"temperature\": 23.4,\n" +
                "      \"humidty\": 36,\n" +
                "      \"barometer\": 1231,\n" +
                "      \"soil_moisture\": 2365,\n" +
                "      \"pascal\": \"326\"\n" +
                "    },\n" +
                "    {\n" +
                "      \"id\": \"Jacaranda\",\n" +
                "      \"description\": \"blame it on the boogie\",\n" +
                "      \"temperature\": 23.4,\n" +
                "      \"humidty\": 36,\n" +
                "      \"barometer\": 1231,\n" +
                "      \"soil_moisture\": 2365,\n" +
                "      \"pascal\": \"326\"\n" +
                "    }\n" +
                "  ]\n" +
                "}";
    }
}
