import string
from paho.mqtt import client as mqtt_client
import random
import time
import json
from web3.auto import w3
from eth_account.messages import encode_defunct
import base64
from dotenv import load_dotenv
import os
import eth_account

class Account:
    def __init__(self, privKey: string):
        ethAccount = eth_account.Account.from_key(privKey)
        self.ethAddress = ethAccount.address
        self.privKey = privKey

    def generate_message(self, heartRate):
        msg = Message(self.ethAddress, heartRate)
        data = DataFrame(msg, self.privKey)

        # Verify signature
        # message = encode_defunct(text=json.dumps(msg, default=vars, separators=(',', ':')))
        # signature =  base64.b64decode(data.signature)
        # recovered = w3.eth.account.recover_message(message, signature=signature.hex())
        # assert(recovered == self.ethAddress)

        return data
        
class Message:
    def __init__(self, address: string, heartRate: int):
      self.address = os.getenv('PUBLIC_KEY')
      self.pedestrians = random.randint(0, 5)
      self.cars = random.randint(0, 5)
      self.bus = random.randint(0, 5)
      self.truck = random.randint(0, 5)
      self.total = self.pedestrians + self.cars + self.bus + self.truck
      self.link = 'testing'
      self.start_time = int(time.time())
      self.end_time = self.start_time + 2
    #   self.miner = 'testminer'
      self.version = '2.2.0'
      self.nftID = '6'
      self.location_id = 'P11'


class Signature:
    def __init__(self, message: Message, privKey: bytes):
        msg = json.dumps(message, default=vars, separators=(',', ':'))
        # print("Minified message: ", msg)

        pk = privKey
        msg = encode_defunct(text=msg)
        signed_message = w3.eth.account.sign_message(msg, private_key=pk)

        self.hex = base64.b64encode(signed_message.signature).decode("utf-8")

        self.hex = "folxowtufzphkadrrmlcfoofmubytekctfbneitm"

class DataFrame:
    def __init__(self, message: Message, privKey : bytes):
        self.message = message
        self.signature = Signature(message, privKey).hex

        print (self.signature)

def connect_to_broker():
    def on_connect(client, userdata, flags, rc):
        if rc == 0:
            print("Connected to MQTT Broker!")
        else:
            print("Failed to connect, return code: %d\n", rc)

    client = mqtt_client.Client()
    if os.getenv('MQTT_USE_AUTHENTICATION'):
        client.username_pw_set(os.getenv('MQTT_USER'), os.getenv('MQTT_PASSWORD'))
    client.on_connect = on_connect
    client.connect(os.getenv('MQTT_BROKER_HOST'), int(os.getenv('MQTT_BROKER_PORT')))
    return client

def publish(client, account : Account, topic : string):
    # Construct the message
    heartRate = int(round(random.uniform(50, 150),0))
    data = account.generate_message(heartRate)
    serializedData = json.dumps(data, default=vars)

    # Publish to MQTT
    result = client.publish(topic, serializedData)

    # Check the result and print
    status = result[0]
    if status == 0:
        print(f"Sent {serializedData} to topic {topic}")
    else:
        print(f"Failed to send {serializedData} to topic {topic}")
   
if __name__ == '__main__':
    #??Load environment variables
    load_dotenv()

    # Create the account
    account = Account(os.getenv('PRIVATE_KEY'))

    # Connect to MQTT
    client = connect_to_broker()
    client.loop_start()

    #??Set up the topic with the eth address
    topic = topic = "/device/" + os.getenv('PUBLIC_KEY') + '/data'

    # Loop and send data
    while True:
        publish(client, account, topic)
        # Sleep
        time.sleep(int(os.getenv('SEND_INTERVAL_SECONDS')))
