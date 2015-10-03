package ch.hackzurich15.router;

import ch.hackzurich15.resource.RootResource;
import ch.hackzurich15.resource.SensorIncomingData;
import ch.hackzurich15.resource.StateResource;
import org.restlet.Application;
import org.restlet.Restlet;
import org.restlet.routing.Router;

/**
 * Created by Srikanta on 03-Oct-15.
 */
public class BackendRouter extends Application {
    public Restlet createInboundRoot(){
        Router router = new Router(getContext());
        router.attach("/", RootResource.class);
        router.attach("/state", StateResource.class);
        router.attach("/sensor/incoming", SensorIncomingData.class);
        return router;
    }
}
