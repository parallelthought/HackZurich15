package ch.hackzurich15.resource;

import org.restlet.representation.Representation;
import org.restlet.resource.Get;
import org.restlet.resource.ServerResource;

/**
 * Created by Srikanta on 03-Oct-15.
 */
public class StateResource extends ServerResource {
    @Get
    public Representation getCurrentState(){

        return null;
    }
}
