/* CONFIGURATION **************************************************************/
byte server[] = { 40,122,168,214 }; // azure server => set via Particle Cloud?
int port = 8080;

float temp_epsilon = 0.1;
float humidity_epsilon = 0.1;
float baroTemp_epsilon = 0.1;
float pascals_epsilon = 5;
int soil_moisture_epsilon = 10;
/* END CONFIGURATION **********************************************************/

#include "SparkFun_Photon_Weather_Shield_Library/SparkFun_Photon_Weather_Shield_Library.h"

float humidity = 0;
float temp = 0;
float pascals = 0;
float baroTemp = 0;
int soil_moisture_value = 0;
float humidity_prev = 0;
float temp_prev = 0;
float pascals_prev = 0;
float baroTemp_prev = 0;
int soil_moisture_value_prev = 0;

const size_t id_len = 25;
char id[id_len];

const size_t msg_size = 120;
char msg_str[msg_size];

Weather sensor;
TCPClient client;

int LED = D7;
int soil_moisture = A0;

void setup()
{
    System.deviceID().toCharArray(id, id_len);

    //Initialize the I2C sensors and ping them
    sensor.begin();

    /*You can only receive acurate barrometric readings or acurate altitiude
    readings at a given time, not both at the same time. The following two lines
    tell the sensor what mode to use. You could easily write a function that
    takes a reading in one made and then switches to the other mode to grab that
    reading, resulting in data that contains both acurate altitude and barrometric
    readings. For this example, we will only be using the barometer mode. Be sure
    to only uncomment one line at a time. */
    sensor.setModeBarometer();//Set to Barometer Mode
    //baro.setModeAltimeter();//Set to altimeter Mode

    //These are additional MPL3115A2 functions the MUST be called for the sensor to work.
    sensor.setOversampleRate(7); // Set Oversample rate
    //Call with a rate from 0 to 7. See page 33 for table of ratios.
    //Sets the over sample rate. Datasheet calls for 128 but you can set it
    //from 1 to 128 samples. The higher the oversample rate the greater
    //the time between data samples.

    sensor.enableEventFlags(); //Necessary register calls to enble temp, baro ansd alt


    pinMode(LED, OUTPUT);
    pinMode(soil_moisture, INPUT);
}
//---------------------------------------------------------------
void loop()
{
    //Get readings from all sensors
    getWeather();
    
    if (hasChanged())
    {
        if(client.connect(server, port)) {
            snprintf(msg_str, msg_size, "GET /backend/sensor/incoming?data=%s,%.1f,%.1f,%.1f,%.1f,%i HTTP/1.1", id, temp, humidity, baroTemp, pascals, soil_moisture_value);
            client.println(msg_str);
            client.println("Host: moisturizer.cloudapp.net");
            client.println("Content-Length: 0");
            client.println();

            digitalWrite(LED, HIGH); // sets the LED on
            delay(200);              // waits for 200mS
            digitalWrite(LED, LOW);  // sets the LED off
            
            humidity_prev = humidity;
            temp_prev = temp;
            pascals_prev = pascals;
            baroTemp_prev = baroTemp;
            soil_moisture_value_prev = soil_moisture_value;
        } else {
            digitalWrite(LED, HIGH); // sets the LED on
            delay(200);              // waits for 200mS
            digitalWrite(LED, LOW);  // sets the LED off
            delay(200);              // waits for 200mS
            digitalWrite(LED, HIGH); // sets the LED on
            delay(200);              // waits for 200mS
            digitalWrite(LED, LOW);  // sets the LED off
            delay(200);              // waits for 200mS
        }
        
    }
    delay(1000);
}

bool hasChanged() {
    return abs(humidity_prev - humidity) > humidity_epsilon 
        || abs(temp_prev     - temp)     > temp_epsilon
        || abs(pascals_prev  - pascals)  > pascals_epsilon
        || abs(baroTemp_prev - baroTemp) > baroTemp_epsilon
        || abs(soil_moisture_value_prev - soil_moisture_value) > soil_moisture_epsilon
    ;
}

void getWeather()
{

  // Measure Relative Humidity from the HTU21D or Si7021
  humidity = sensor.getRH();

  // Measure Temperature from the HTU21D or Si7021
  temp = sensor.getTemp();
  // Temperature is measured every time RH is requested.
  // It is faster, therefore, to read it from previous RH
  // measurement with getTemp() instead with readTemp()

  //Measure the Barometer temperature in C from the MPL3115A2
  baroTemp = sensor.readBaroTemp();

  //Measure Pressure from the MPL3115A2
  pascals = sensor.readPressure();

  //If in altitude mode, you can get a reading in feet  with this line:
  //float altf = sensor.readAltitudeFt();
  
  
  soil_moisture_value = analogRead(soil_moisture);
}


