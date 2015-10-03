package ch.hackzurich15.resource;

import org.restlet.resource.Get;
import org.restlet.resource.ServerResource;

/**
 * Created by Srikanta on 03-Oct-15.
 */
public class RootResource extends ServerResource {
    @Get
    public String RootApiEndpoint(){
        return "Moisturizer Backend API v0.0.1";
    }
}
