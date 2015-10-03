package ch.hackzurich15.model;

/**
 * Created by Srikanta on 03-Oct-15.
 */
public class CurrentState {
    private String id;
    private String state;
    private Position position;

    private class Position{
        private String latidude;
        private String longitude;
    }

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

    public Position getPosition() {
        return position;
    }

    public void setPosition(Position position) {
        this.position = position;
    }
}
