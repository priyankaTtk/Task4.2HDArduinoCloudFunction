#include <WiFiNINA.h>
#include <Firebase_Arduino_WiFiNINA.h>

// WiFi credentials
#define WIFI_SSID "Vivo"
#define WIFI_PASSWORD "abcdefgh"

// Firebase project configuration
#define FIREBASE_HOST "traffic-1ed25-default-rtdb.asia-southeast1.firebasedatabase.app"
#define FIREBASE_AUTH "AIzaSyBuz0Ku1uDT-7_Xz7h_lYmywtSORiwRhIs"

// LED pin configuration
#define RED_LED_PIN 2
#define YELLOW_LED_PIN 3
#define GREEN_LED_PIN 4

// Initialize Firebase Data object
FirebaseData firebaseData;

void setup() {
  Serial.begin(115200);
  
  // Initialize LED pins
  pinMode(RED_LED_PIN, OUTPUT);
  pinMode(YELLOW_LED_PIN, OUTPUT);
  pinMode(GREEN_LED_PIN, OUTPUT);
  
  // Turn off all LEDs initially
  digitalWrite(RED_LED_PIN, LOW);
  digitalWrite(YELLOW_LED_PIN, LOW);
  digitalWrite(GREEN_LED_PIN, LOW);

  // Connect to WiFi
  Serial.print("Connecting to WiFi");
  int status = WL_IDLE_STATUS;
  while (status != WL_CONNECTED) {
    status = WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());

  // Initialize Firebase
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH, WIFI_SSID, WIFI_PASSWORD);
  Firebase.reconnectWiFi(true);
}

void loop() {
  // Check and update Red Light
  if (Firebase.getString(firebaseData, "/redLightStatus")) {
    updateLight(RED_LED_PIN, firebaseData.stringData().toInt());
  }

  // Check and update Yellow Light
  if (Firebase.getString(firebaseData, "/yellowLightStatus")) {
    updateLight(YELLOW_LED_PIN, firebaseData.stringData().toInt());
  }

  // Check and update Green Light
  if (Firebase.getString(firebaseData, "/greenLightStatus")) {
    updateLight(GREEN_LED_PIN, firebaseData.stringData().toInt());
  }

  delay(100); // Short delay to prevent excessive Firebase requests
}

void updateLight(int pin, int status) {
  digitalWrite(pin, status == 1 ? HIGH : LOW);
}
