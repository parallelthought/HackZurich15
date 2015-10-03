package ch.hackzurich15.model;

/**
 * Created by Srikanta on 03-Oct-15.
 */
public class SensorMessage {
    private String id;
    private String state;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }
}
