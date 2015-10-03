package ch.hackzurich15.model;

/**
 * Created by Srikanta on 03-Oct-15.
 */
public class CurrentState {
    private String id;
    private String name;
    private String description;
    private Float humidity;
    private Float barometer;
    private Float soil_moisture;
    private Position position;

    private class Position{
        private String latitude;
        private String longitude;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Float getHumidity() {
        return humidity;
    }

    public void setHumidity(Float humidity) {
        this.humidity = humidity;
    }

    public Float getBarometer() {
        return barometer;
    }

    public void setBarometer(Float barometer) {
        this.barometer = barometer;
    }

    public Float getSoil_moisture() {
        return soil_moisture;
    }

    public void setSoil_moisture(Float soil_moisture) {
        this.soil_moisture = soil_moisture;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Position getPosition() {
        return position;
    }

    public void setPosition(Position position) {
        this.position = position;
    }
}
