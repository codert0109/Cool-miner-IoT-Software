#sim
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

#detect

from multiprocessing import Process, Queue, Value
import argparse
import os
import sys
from pathlib import Path

import torch
import torch.backends.cudnn as cudnn


FILE = Path(__file__).resolve()
ROOT = FILE.parents[0]  # YOLOv5 root directory
if str(ROOT) not in sys.path:
    sys.path.append(str(ROOT))  # add ROOT to PATH
ROOT = Path(os.path.relpath(ROOT, Path.cwd()))  # relative

from models.common import DetectMultiBackend
from utils.datasets import IMG_FORMATS, VID_FORMATS, LoadImages, LoadStreams
from utils.general import (LOGGER, check_file, check_img_size, check_imshow, check_requirements, colorstr, cv2,
                           increment_path, non_max_suppression, print_args, scale_coords, strip_optimizer, xyxy2xywh)
from utils.plots import Annotator, colors, save_one_box
from utils.torch_utils import select_device, time_sync


#Import librairies

from ctypes.wintypes import HHOOK
from dataclasses import dataclass
import tkinter as tk
from turtle import bgcolor
# from matplotlib.font_manager import _Weight
# from tkinter import ttk
from ttkbootstrap import Style 
from tkinter import ttk 

#flask dependencies
import os
# from app import app
from flask_cors import CORS
from flask import Flask
import json
from flask import request, jsonify

import re
from unittest import result
from PIL import Image, ImageTk
import mysql.connector
import pandas as pd
from datetime import datetime
import csv
import tkinter.font as font
import subprocess
import psutil
import torch
import glob
import schedule
import webbrowser
import threading
from pathlib import Path
import os
import datetime
import webbrowser  
import socket
import random
import requests
import socket
import sys
import time
import pymysql
import pip
import importlib
import wmi
import struct

#detect 
import argparse
from pathlib import Path
from subprocess import check_output

#yolo
import platform
from copy import deepcopy
from pathlib import Path
#experimental
import math

#common
import json
import math
import platform
import warnings
from collections import OrderedDict, namedtuple
from copy import copy
from pathlib import Path


#export
import argparse
import json
import platform
import warnings
#import pyarmor
from pathlib import Path


class Account:
    def __init__(self, privKey: string):
        ethAccount = eth_account.Account.from_key(privKey)
        self.ethAddress = ethAccount.address
        self.privKey = privKey

    def generate_message(self, pedestrians, cars, bus, truck, total, city, region, postalcode, country, continent, coordinates):
        #GOTO
        msg = Message(self.ethAddress, pedestrians, cars, bus, truck, total, city, region, postalcode, country, continent, coordinates)
        data = DataFrame(msg, self.privKey)

        # Verify signature
        # message = encode_defunct(text=json.dumps(msg, default=vars, separators=(',', ':')))
        # signature =  base64.b64decode(data.signature)
        # recovered = w3.eth.account.recover_message(message, signature=signature.hex())
        # assert(recovered == self.ethAddress)

        return data
        
class Message:
    def __init__(self, address: string, pedestrians: int, cars: int, bus: int, truck: int, total: int, city: string, region: string, postalcode: string,
    country: string, continent: string, coordinates: string): 
      self.pedestrians = pedestrians
      self.cars = cars
      self.bus = bus
      self.truck = truck
      self.total = self.pedestrians + self.cars + self.bus + self.truck
      self.city = city
      self.region = region
      self.postalcode = postalcode
      self.country = country
      self.continent = continent
      self.coordinates = coordinates
      self.timestamp = int(time.time())

class Signature:
    def __init__(self, message: Message, privKey: bytes):
        msg = json.dumps(message, default=vars, separators=(',', ':'))
        # print("Minified message: ", msg)

        pk = privKey
        msg = encode_defunct(text=msg)
        signed_message = w3.eth.account.sign_message(msg, private_key=pk)

        self.hex = base64.b64encode(signed_message.signature).decode("utf-8")

class DataFrame:
    def __init__(self, message: Message, privKey : bytes):
        self.message = message
        self.signature = Signature(message, privKey).hex

def connect_to_broker():
    def on_connect(client, userdata, flags, rc):
        if rc == 0:
            print("Connected to MQTT Broker!")
        else:
            print("Failed to connect, return code: %d\n", rc)
    #GOTO
    client = mqtt_client.Client()
    global wallettest
#    if os.getenv(False):
#        client.username_pw_set(wallettest['wallet'], '111111111111111233112')
    client.on_connect = on_connect
    client.connect('50.19.195.195', int(1883))
    return client

def publish(client, account : Account, topic : string, pedestrians: int, cars: int, bus: int, truck: int, total: int, city: string, region: string, postalcode: string,
    country: string, continent: string, coordinates: string):
    # Construct the message
    #GOTO
    #heartRate = int(round(random.uniform(50, 150),0))
    data = account.generate_message(pedestrians, cars, bus, truck, total, city, region, postalcode, country, continent, coordinates)
    serializedData = json.dumps(data, default=vars)

    # Publish to MQTT
    result = client.publish(topic, serializedData)

    # Check the result and print
    status = result[0]
    if status == 0:
        print(f"Sent {serializedData} to topic {topic}")
    else:
        print(f"Failed to send {serializedData} to topic {topic}")

def detect(
            weights=ROOT / 'yolov5s.pt',  # model.pt path(s)
            source=ROOT / 'data/images',  # file/dir/URL/glob, 0 for webcam
            data=ROOT / 'data/coco128.yaml',  # dataset.yaml path
            imgsz=(640, 640),  # inference size (height, width)
            conf_thres=0.25,  # confidence threshold
            iou_thres=0.45,  # NMS IOU threshold
            max_det=1000,  # maximum detections per image
            device='',  # cuda device, i.e. 0 or 0,1,2,3 or cpu
            view_img=False,  # show results
            save_txt=True,  # save results to *.txt
            save_conf=False,  # save confidences in --save-txt labels
            save_crop=False,  # save cropped prediction boxes
            nosave=True,  # do not save images/videos
            classes=[0, 2, 5, 7],  # filter by class: --class 0, or --class 0 2 3
            agnostic_nms=False,  # class-agnostic NMS
            augment=False,  # augmented inference
            visualize=False,  # visualize features
            update=False,  # update all models
            project=ROOT / 'runs/detect',  # save results to project/name
            name='exp',  # save results to project/name
            exist_ok=False,  # existing project/name ok, do not increment
            line_thickness=3,  # bounding box thickness (pixels)
            hide_labels=False,  # hide labels
            hide_conf=False,  # hide confidences
            half=False,  # use FP16 half-precision inference
            dnn=False,  # use OpenCV DNN for ONNX inference
):

    @torch.no_grad()


    def run(
            weights, source, data, imgsz, conf_thres, iou_thres, max_det, device,
            view_img, save_txt, save_conf, save_crop,
            nosave, classes, agnostic_nms,  augment,  visualize,
            update,  project, name, exist_ok, line_thickness, hide_labels, hide_conf,
            half, dnn,
    ):
        source = str(source)
        save_img = not nosave and not source.endswith('.txt')  # save inference images
        is_file = Path(source).suffix[1:] in (IMG_FORMATS + VID_FORMATS)
        is_url = source.lower().startswith(('rtsp://', 'rtmp://', 'http://', 'https://'))
        webcam = source.isnumeric() or source.endswith('.txt') or (is_url and not is_file)
        if is_url and is_file:
            source = check_file(source)  # download

        # Directories
        save_dir = increment_path(Path(project) / name, exist_ok=exist_ok)  # increment run
        (save_dir / 'labels' if save_txt else save_dir).mkdir(parents=True, exist_ok=True)  # make dir

        # Load model
        device = select_device(device)
        model = DetectMultiBackend(weights, device=device, dnn=dnn, data=data, fp16=half)
        stride, names, pt = model.stride, model.names, model.pt
        imgsz = check_img_size(imgsz, s=stride)  # check image size

        # Dataloader
        if webcam:
            #view_img = check_imshow()
            cudnn.benchmark = True  # set True to speed up constant image size inference
            dataset = LoadStreams(source, img_size=imgsz, stride=stride, auto=pt)
            bs = len(dataset)  # batch_size
        else:
            dataset = LoadImages(source, img_size=imgsz, stride=stride, auto=pt)
            bs = 1  # batch_size
        vid_path, vid_writer = [None] * bs, [None] * bs

        # Run inference
        model.warmup(imgsz=(1 if pt else bs, 3, *imgsz))  # warmup
        dt, seen = [0.0, 0.0, 0.0], 0
        for path, im, im0s, vid_cap, s in dataset:
            t1 = time_sync()
            im = torch.from_numpy(im).to(device)
            im = im.half() if model.fp16 else im.float()  # uint8 to fp16/32
            im /= 255  # 0 - 255 to 0.0 - 1.0
            if len(im.shape) == 3:
                im = im[None]  # expand for batch dim
            t2 = time_sync()
            dt[0] += t2 - t1

            # Inference
            visualize = increment_path(save_dir / Path(path).stem, mkdir=True) if visualize else False
            pred = model(im, augment=augment, visualize=visualize)
            t3 = time_sync()
            dt[1] += t3 - t2
 
            # NMS
            pred = non_max_suppression(pred, conf_thres, iou_thres, classes, agnostic_nms, max_det=max_det)
            dt[2] += time_sync() - t3

            # Second-stage classifier (optional)
            # pred = utils.general.apply_classifier(pred, classifier_model, im, im0s)

            # Process predictions
            for i, det in enumerate(pred):  # per image
                seen += 1
                if webcam:  # batch_size >= 1
                    p, im0, frame = path[i], im0s[i].copy(), dataset.count
                    s += f'{i}: '
                else:
                    p, im0, frame = path, im0s.copy(), getattr(dataset, 'frame', 0)

                p = Path(p)  # to Path
                save_path = str(save_dir / p.name)  # im.jpg
                txt_path = str(save_dir / 'labels' / p.stem) + ('' if dataset.mode == 'image' else f'_{frame}')  # im.txt
                s += '%gx%g ' % im.shape[2:]  # print string
                gn = torch.tensor(im0.shape)[[1, 0, 1, 0]]  # normalization gain whwh
                imc = im0.copy() if save_crop else im0  # for save_crop
                annotator = Annotator(im0, line_width=line_thickness, example=str(names))
                if len(det):
                    # Rescale boxes from img_size to im0 size
                    det[:, :4] = scale_coords(im.shape[2:], det[:, :4], im0.shape).round()

                    # Print results
                    for c in det[:, -1].unique():
                        n = (det[:, -1] == c).sum()  # detections per class
                        s += f"{n} {names[int(c)]}{'s' * (n > 1)}, "  # add to string

                    # Write results
                    for *xyxy, conf, cls in reversed(det):
                        if save_txt:  # Write to file
                            xywh = (xyxy2xywh(torch.tensor(xyxy).view(1, 4)) / gn).view(-1).tolist()  # normalized xywh
                            line = (cls, *xywh, conf) if save_conf else (cls, *xywh)  # label format
                            with open(txt_path + '.txt', 'a') as f:
                                f.write(('%g ' * len(line)).rstrip() % line + '\n')

                        if save_img or save_crop or view_img:  # Add bbox to image
                            c = int(cls)  # integer class
                            label = None if hide_labels else (names[c] if hide_conf else f'{names[c]} {conf:.2f}')
                            annotator.box_label(xyxy, label, color=colors(c, True))
                            if save_crop:
                                save_one_box(xyxy, imc, file=save_dir / 'crops' / names[c] / f'{p.stem}.jpg', BGR=True)

                # Stream results
                im0 = annotator.result()
                if view_img:
                    cv2.imshow(str(p), im0)
                    cv2.waitKey(1)  # 1 millisecond

                # Save results (image with detections)
                if save_img:
                    if dataset.mode == 'image':
                        cv2.imwrite(save_path, im0)
                    else:  # 'video' or 'stream'
                        if vid_path[i] != save_path:  # new video
                            vid_path[i] = save_path
                            if isinstance(vid_writer[i], cv2.VideoWriter):
                                vid_writer[i].release()  # release previous video writer
                            if vid_cap:  # video
                                fps = vid_cap.get(cv2.CAP_PROP_FPS)
                                w = int(vid_cap.get(cv2.CAP_PROP_FRAME_WIDTH))
                                h = int(vid_cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
                            else:  # stream
                                fps, w, h = 30, im0.shape[1], im0.shape[0]
                            save_path = str(Path(save_path).with_suffix('.mp4'))  # force *.mp4 suffix on results videos
                            vid_writer[i] = cv2.VideoWriter(save_path, cv2.VideoWriter_fourcc(*'mp4v'), fps, (w, h))
                        vid_writer[i].write(im0)

            # Print time (inference-only)
            LOGGER.info(f'{s}Done. ({t3 - t2:.3f}s)')

        # Print results
        t = tuple(x / seen * 1E3 for x in dt)  # speeds per image
        LOGGER.info(f'Speed: %.1fms pre-process, %.1fms inference, %.1fms NMS per image at shape {(1, 3, *imgsz)}' % t)
        if save_txt or save_img:
            s = f"\n{len(list(save_dir.glob('labels/*.txt')))} labels saved to {save_dir / 'labels'}" if save_txt else ''
            LOGGER.info(f"Results saved to {colorstr('bold', save_dir)}{s}")
        if update:
            strip_optimizer(weights)  # update model (to fix SourceChangeWarning)

        check_requirements(exclude=('tensorboard', 'thop'))
        run(**vars(opt))

    check_requirements(exclude=('tensorboard', 'thop'))
    run(
        weights, source, data, imgsz, conf_thres, iou_thres, max_det, device,
        view_img, save_txt, save_conf, save_crop, nosave, classes, agnostic_nms,
        augment,  visualize, update, project, name, exist_ok, line_thickness, 
        hide_labels, hide_conf, half, dnn
        )

#initialize our code
style = Style('flatly')
root = style.master 

#Resize the window

root.geometry("470x210")
root.resizable(False,False)


#Change the application logo and title
logo = Image.open('logo.png')
logo = ImageTk.PhotoImage(logo)
root.iconphoto(False, logo)
root.title("BETA V2.0")
root.configure(background="#F7F9F9")

global frame1
frame1 = tk.Frame(root,bg="black",width=470,height=150)
frame1.config(bg='black')
# frame1.place(relx=0.00, rely=0.08)
#Insertion
def insertion():

    mode = 0o666
    #flags
    flags = os.O_RDWR | os.O_CREAT
    
    path = 'runs/detect/exp/labels/countingfiles/4hours' 
    my_files = glob.glob('runs/detect/exp/labels/countingfiles/4hours/*.txt')

    if my_files :

        #get the recent file
        max_file = max(my_files, key=os.path.getctime)
        file_time = os.path.getmtime(max_file)

        file_time = datetime.datetime.fromtimestamp(file_time)

        sys_time = datetime.datetime.now()
        
        diff = sys_time - file_time
        diff = diff.total_seconds()

        #if the lastest file has been update less than 4hours
        if diff < 14400 :
            
            #open and read the file
            directory = os.open(max_file, flags, mode)
            file = os.read(directory,os.path.getsize(directory))
            file = file.decode("utf-8")
            #insert the file in the cloud database
            email_value.get()
            querry = 'insert into data (data, secret_key, email) values ( "' + file + '" , " ' + str(key) + '", " ' + str(email_value.get()) + '" ) ;'
            cursor.execute(querry)
            db.commit()

        """else :

            on est sense tuer le process
            faire update de la datase

            on annule notre position
            puis on recupere le nouveau
            on refait le process

            
            process.terminate()
            query = ("select * from links")
            cursor.execute(query)
            
            frame = pd.DataFrame(cursor.fetchall())
            frame.columns = (['id', 'link', 'used'])


            #remove the cursor from the link
            used = frame._get_value(index, 2, takeable = True)
            used = used - 1
            querry = 'update links set used = ' + str(used) + ' where id = ' + str(link_id) + ' ;'
            cursor.execute(querry)
            db.commit()
            
            #open a new link
            open_link(frame) """
            
        
#Count every hour
def hour():
    path = 'runs/detect/exp/labels/countingfiles/regular/'
    text_files = [f for f in os.listdir(path) if f.endswith('.txt')]
    dico = {}

    try:
        for filename in text_files:
            f = open(path+filename, 'r')
            for line in f.readlines():
                data = line.rstrip().split(":")
                if data[0] in dico.keys():
                    dico[data[0]]= dico[data[0]]+int(data[1])
                else:
                    dico[data[0]]=int(data[1])
                del data[0:2]
            f.close()


    except FileNotFoundError as e:
        print(f"Error:{ e.strerror}")
    
    try:
 
        for file in text_files :
            os.remove(path + file)
    except OSError as e:
        print(f"Error:{ e.strerror}")

    c1=str(random.randint(0,9))
    c2=str(random.randint(0,9))
    c3=str(random.randint(0,9))
    c4=str(random.randint(0,9))

    name='counter4hours'+c1+c2+c3+c4+'.txt'

    newpath = r'runs/detect/exp/labels/countingfiles/4hours/' 
    if not os.path.exists(newpath):
        os.makedirs(newpath)

    output= open(newpath+name, 'w')
    total = 0
    
    for (key,value) in dico.items() :
    
        output.write(key + ":" + str(value) + '\n')
    output.close()



def objectname (key):
    '''This function returns the name of the detected object following the key '''

    convertedkey=(int (key))

    if (convertedkey == 0) :
        return "pedestrians"
    elif (convertedkey == 2) :
        return "cars"
    elif (convertedkey == 5) :
        return "bus"
    else:
        return "truck"

    
#count every minute 
def count():
    path = 'runs/detect/exp/labels/'
    text_files = [f for f in os.listdir(path) if f.endswith('.txt')]
    classes = []

    try:
        for filename in text_files:
            f = open(path+filename, 'r')
            for line in f.readlines():
                data = line.rstrip().split()
                classes.append(data[0])
            f.close()

    except FileNotFoundError as e:
        print(f"Error:{ e.strerror}")

    uniques = sorted(set(classes)) # Labels de classes uniques

    dico = {} # dictionnaire classe : nombre d'occurrences

    for c in uniques:
        dico[c] = classes.count(c)
    total = 0

    try:
        for file in text_files :
            os.remove(path + file)
    except OSError as e:
        print(f"Error:{ e.strerror}")

    c1=str(random.randint(0,9))
    c2=str(random.randint(0,9))
    c3=str(random.randint(0,9))
    c4=str(random.randint(0,9))

    name='counter'+c1+c2+c3+c4+'.txt'

    newpath = r'runs/detect/exp/labels/countingfiles/regular/' 
    if not os.path.exists(newpath):
        os.makedirs(newpath)
    output= open(newpath+name, 'w')


    for (key,value) in dico.items() :
        total+=int (value)
        output.write(objectname(key) + ":" + str(value) + '\n')

    output.write("Total:" + str(total))
    output.close()




def display_count():

    wait_cmd.place_forget()
    frame1.place(relx=0.00, rely=0.08)

    if btnState == False:

        running_msg.config(bg ='black', fg = '#F7F9F9')
    else:
        running_msg.config(bg ='black', fg ='#F7F9F9')
    running_msg.place(relx=0.34, rely=0.1)

    my_files = glob.glob('runs/detect/exp/labels/*.txt') #runs/detect/exp/labels/countingfiles/regular/*.txt

    if my_files :

        #get the recent file
        max_file = max(my_files, key=os.path.getctime)
            
        #open and read the file

        file1 = open(max_file, 'r')
        count = 0

        result = ""
        while True:
            count += 1
        
            # Get next line from file
            line = file1.readline()

            # if line is empty
            # end of file is reached
            if not line:
                break
            if result == "":
                result = line.strip()
            else:

                result = result + "   " + line.strip()
        
        file1.close()

        display_list.append(result)
        
        list_size = len(display_list)

        result_msg1.config(bg="black", text= str(display_list[list_size-1]), fg = '#F7F9F9')
        result_msg1.place(relx=0.1, rely=0.25)
        
        if len(display_list) == 2:
            result_msg2.config(bg="black",text= str(display_list[list_size-2]), fg ='#F7F9F9')
            result_msg2.place(relx=0.1, rely=0.39)

        if len(display_list) >= 3 :

            result_msg2.config(bg="black", text= str(display_list[list_size-2]), fg ='#F7F9F9')
            result_msg3.config(bg="black", text= str(display_list[list_size-3]),fg ='#F7F9F9')

            result_msg2.place(relx=0.1, rely=0.39)
            result_msg3.place(relx=0.1, rely=0.53)

def metric():

    process_name = "beta"
    pid = None

    for proc in psutil.process_iter():
        if process_name in proc.name():
          pid = proc.pid
    #40404
    memory = round(psutil.Process(pid).memory_percent(),3)
    cpu = psutil.Process(pid).cpu_percent(interval=1)
    gpu = round(torch.cuda.memory_allocated(0)/1024**3,3)

    memory_msg.config(text="RAM : " + str(memory) + " %")
    cpu_msg.config(text="CPU : " + str(cpu) + " %")
    gpu_msg.config(text="GPU : " + str(gpu) + " %")
    
    memory_msg.place(relx=0.1, rely=0.70)
    cpu_msg.place(relx=0.47, rely=0.70)
    gpu_msg.place(relx=0.8, rely=0.70)


#Get data and coordinate

def send_data():
    
    my_files = glob.glob('runs/detect/exp/labels/countingfiles/regular/*.txt')

    global address 
    address = ""
    global pedestrians
    pedestrains =""
    global cars
    cars = ""
    global bus 
    bus = ""
    global truck
    truck = ""
    global total 
    total = ""
    global city 
    city = ""
    global region
    region = ""
    global postalcode
    postalcode = ""
    global country
    country = "" 
    global continent
    continent =""
    global coordinates
    coordinates = ""
    global timestamp
    timestamp = "" 

    
    if my_files :

        #get the recent file
        max_file = max(my_files, key=os.path.getctime)
            
        #open and read the file

        file1 = open(max_file, 'r')
        count = 0
        result = ""

        while True:
            count += 1
            # Get next line from file
            line = file1.readline()
        
            # if line is empty
            # end of file is reached
            if not line:
                break
            else :
                result = line.strip()
                if result[0] == 'p':
                    pedestrians = result
                if result[0] == 'c':
                    cars = result
                if result[0] == 't':
                    truck = result
                if result[0] == 'b':
                    bus = result
                if result[0] == 'T':
                    total = result
        
        city = location['city'] 
        region = location['region']
        postalcode = location['postal']
        country = location['country']
        coordinates = location['loc']
        timestamp = time.time()
        address = sign_list[0]['wallet']
        #GOTO
        #you can add the script to send
        load_dotenv()

        # Create the account
        
        #account = Account(os.getenv('PRIVATE_KEY'))
        #account = Account(wallettest['wallet'][:32])
        account = Account('0x1111111111111111111111111111111111111111111111111111111111111111')
        # Connect to MQTT
        client = connect_to_broker()
        client.loop_start()

        # Set up the topic with the eth address
        topic = topic = "/device/" + account.ethAddress + '/data'

        # Loop and send data
        while True:
            publish(client, account, topic, pedestrians, cars, bus, truck, total, city, region, postalcode, country, continent, coordinates)
            # Sleep
            time.sleep(int(1))
            #time.sleep(int(os.getenv('SEND_INTERVAL_SECONDS')))
            file1.close()

def detect_thread(link):
    from option_parser import get_parser
    from detect import run
    opt = get_parser(link)
    run(**vars(opt))

#Open link
def open_link(file):

    #disable exit button, just allow stop button to close the app
    root.protocol("WM_DELETE_WINDOW", disable_event)

    close_btn.place_forget()
    start_btn.place_forget()
    connect_label.place_forget()
    connect_label2.place_forget()
    dark_btn.place_forget()
    dark_label.place_forget()
    page4_img.place_forget()
    page3_img.place_forget()

    
    if btnState == False:
        wait_run.config(bg ='#F7F9F9')
    else:
        wait_run.config(bg ='black', fg ='#F7F9F9')

    wait_run.place(relx=0.37, rely=0.2)

    #Schedules
    
    schedule.every(60).seconds.do(count)
    schedule.every(5).seconds.do(display_count)
    schedule.every(3700).seconds.do(insertion)
    schedule.every().hour.do(hour)
    schedule.every(5).seconds.do(metric)
    schedule.every(60).seconds.do(send_data)
    
  
    for i in range(0, (len(file))):
        
        #connect to database
        db = pymysql.connect(
            host='elumicate-db.c8hczoahlwk5.us-east-1.rds.amazonaws.com',
            user='admin', 
            password = "test2022",
            db='elumicate_db',
        )

        cursor = db.cursor()
        query = ("select * from links")
        cursor.execute(query)
        frame = pd.DataFrame(cursor.fetchall())
        
        frame.columns = (['id', 'link', 'used', 'actif'])
        frame = frame.sort_values(by=['used'], ascending=True)
        
        #take the lowest used link
        global link
        link = frame._get_value(0, 1, takeable = True)

        #inject the link in yoloV5 command line

        command2 = "python Detect.py --source " + link + " --classes 0 2 5 7 --save-txt --nosave --exist-ok"
        
        # def detect_thread(link):
        #      from option_parser import get_parser
        #      from detect import run
        #      opt = get_parser(link)
        #      run(**vars(opt))

        global process  

        try :    
            global process
            process = Process(target = detect_thread, args=(link,))
            process.start()
            #process.terminate()
            process.join()
            # process = subprocess.Popen(command2)
        except:

            run_errmsg.place(relx=0.32, rely=0.32)
            
            close_btn.place(relx=0.56, rely=0.62, width=70,height=30)

            break

        if process :

            #get the link id
            link_id = frame._get_value(0, 0, takeable = True)
            used = frame._get_value(0, 2, takeable = True)
            used = int(used) + 1

            #update the database
            querry = 'update links set used = ' + str(used) + ' where id = ' + str(link_id) + ' ;'
            cursor.execute(querry)
            db.commit()

            wait_run.place_forget()
        
            close_btn.place_forget()

            wait_cmd.place(relx=0.37, rely=0.2)

            stpbtn_thread = threading.Thread(target=create_stopbtn)
            stpbtn_thread.daemon = True
            stpbtn_thread.start() 

            while 1 :
                schedule.run_pending()  
            
            break

       

def create_stopbtn():
    global stop_btn
    stop_btn = ttk.Button(root,command= threading.Thread(target =lambda:stop(process)).start, text="STOP", bootstyle="danger")
    stop_btn.place(relx=0.43, rely=0.80, width=70,height=30)


#close the application
def fclose_btn():

    os.system('tasklist | find /i "beta.exe" && taskkill /im "beta2.exe" /F || echo process "beta.exe" not running')
    root.destroy()
    sys.exit()

#close the process and the app
def stop(process):

    stop_btn.place_forget()
    running_msg.place_forget()
    
    if btnState == False:  
        exit_msg.config(bg ='black', fg = '#F7F9F9' )
    else:
        exit_msg.config(bg ='black', fg ='#F7F9F9')
    exit_msg.place(relx=0.37, rely=0.1)

    #terminate the process and close the app
    process_name = "python.exe"

    for proc in psutil.process_iter():
        if process_name in proc.name():
            psutil.Process(proc.pid).terminate()

    os.system('tasklist | find /i "beta.exe" && taskkill /im "beta.exe" /F || echo process "beta.exe" not running')
    process.terminate()
    sys.exit()
    

def start():

    db = pymysql.connect(
            host='elumicate-db.c8hczoahlwk5.us-east-1.rds.amazonaws.com',
            user='admin', 
            password = "test2022",
            db='elumicate_db',
        )

    cursor = db.cursor()
    query = ("select * from links")
    cursor.execute(query)

    global frame
    frame = pd.DataFrame(cursor.fetchall())

    run_thread = threading.Thread(target=open_link(frame))
    run_thread.daemon = True
    run_thread.start() 

def disable_event():
   pass


def validate():

    connect_btn.place_forget()
    mining_entry.place_forget()
    login_msg1.place_forget()
    login_msg2.place_forget()
    cheked.place_forget()
    close_btn.place_forget()
    id_error1.place_forget()
    id_error2.place_forget()
    id_error3.place_forget()
    page1_img.place_forget()


    waitSign_msg.place(relx=0.38, rely=0.22)
    waitSign_msg2.place(relx=0.32, rely=0.32)
    page2_img.place(relx=0.08, rely=0.17)
    close_btn.place(relx=0.57, rely=0.62, width=70,height=30)

    size = 0
    while size == 0 :
        size = len(sign_list)


    if len(sign_list) != 0 :

        #verify if the remember button is cheked or not
        if agreement.get() == '1' :
            file = Path("setup.txt")
            if file.exists():
                pass
            else :
                with open('setup.txt', 'w',encoding='utf-8') as f:
                    f.write(str(mining_value.get()))
                    f.write("\n")
                    f.write(str(sign_list[0]['signature']))
                    
        else :
            file = Path("setup.txt")
            if file.exists():
                os.remove('setup.txt')

        #destroy the login page

        page2_img.place_forget()
        close_btn.place_forget()
        waitSign_msg.place_forget()
        waitSign_msg2.place_forget()
            

        page3_img.place(relx=0.08, rely=0.17)
        page4_img.place(relx=0.45, rely=0.04)

        connect_label.place(relx=0.50, rely=0.46)
        connect_label2.place(relx=0.5092, rely=0.55)
        start_btn.place(relx=0.50, rely=0.72, width=70,height=30)
        close_btn.place(relx=0.67, rely=0.72, width=70,height=30)

def submit():
     
    #Open the Dapp web page 
    
    ab = re.compile(r"^[A-Za-z][A-Za-z0-9_]{3,8}$", re.UNICODE)

    if ab.match(mining_value.get().strip()) :
        

        url = 'miner.elumicate.com'
        webbrowser.open_new(url)

        sign_thread = threading.Thread(target=validate)
        sign_thread.daemon = True
        sign_thread.start() 

        #display des wait for signature message

    else:
        login_msg1.place_forget()
        login_msg2.place_forget()
        id_error1.place(relx=0.47, rely=0.06)
        id_error2.place(relx=0.41, rely=0.15)
        id_error3.place(relx=0.36, rely=0.24)
        

def metamask(exist):

    root.protocol("WM_DELETE_WINDOW", disable_event)
    
    page1_img.place(relx=0.08, rely=0.17)
    login_msg1.place(relx=0.46, rely=0.13)
    login_msg2.place(relx=0.42, rely=0.24)

    if exist == 1 :
        mining_entry.place(relx=0.45, rely=0.35)
        mining_entry.insert(0, setup_file[0])
    else :
        mining_entry.place(relx=0.45, rely=0.35)


    close_btn.place(relx=0.70, rely=0.55, width=70,height=30)
    connect_btn.place(relx=0.54, rely=0.55,width=70,height=30)
    cheked.place(relx=0.60, rely=0.75)


# setting switch state:
def switch():

    global btnState

    if btnState:

        root.config(bg="#F7F9F9")
        page1_img.config(image=img_pg1, bg ='#F7F9F9')
        page2_img.config(image=img_pg2, bg ='#F7F9F9')
        page3_img.config(image=img_pg3, bg ='#F7F9F9')
        page4_img.config(image=img_pg4, bg ='#F7F9F9')

        cheked.config(background='#F7F9F9', fg='black', font="calibri 10")
        login_msg1.config(fg='black' , font=("Proxima nova",13,"bold"),bg='#F7F9F9')
        login_msg2.config(fg='black' , font=("Proxima nova",8),background='#F7F9F9')
        waitSign_msg.config(fg='black' , font=("Proxima nova",11),bg='#F7F9F9')
        waitSign_msg2.config(fg='black' , font=("Proxima nova",8),bg='#F7F9F9')
        run_errmsg.config(fg='black' , font=("Proxima nova",10),background='#F7F9F9')
        connect_label.config(fg = 'black', bg='#F7F9F9' , font=("Proxima nova",11,"bold"))
        connect_label2.config(fg = 'black', bg='#F7F9F9' , font=("Proxima nova",9))
        dark_label.config(fg ='black', bg='#F7F9F9', text = 'Dark mode')
        id_error1.config(fg='red' , font=("Proxima nova",10),bg='#F7F9F9')
        id_error2.config(fg='red' , font=("Proxima nova",10),bg='#F7F9F9')
        id_error3.config(fg='red' , font=("Proxima nova",10),bg='#F7F9F9')
        dark_btn.config(image=offImg, bg="#F7F9F9", activebackground="#F7F9F9")
        memory_msg.config(bg ='black', fg = '#F7F9F9')
        cpu_msg.config(bg ='black', fg = '#F7F9F9')
        gpu_msg.config(bg ='black', fg = '#F7F9F9')
        result_msg1.config(bg="black",fg ='#F7F9F9')
        result_msg2.config(bg="black",fg ='#F7F9F9')
        result_msg3.config(bg="black",fg ='#F7F9F9')
        wait_cmd.config(bg='#F7F9F9')
        btnState = False
    else:
        root.config(bg="black")
        page1_img.config(image=img_pg1D, bg='black')
        page2_img.config(image=img_pg2D, bg='black')
        page3_img.config(image=img_pg3D, bg='black')
        page4_img.config(image=img_pg4D, bg='black')
        dark_label.config(fg ='#F7F9F9', bg='black', text='Light mode')
        dark_btn.config(image=onImg, bg="black", activebackground="black")

        cheked.config(bg='black', fg = '#F7F9F9')
        connect_label.config(fg = '#F7F9F9', font=("Proxima nova",11,"bold"),background='black')
        connect_label2.config(fg = '#F7F9F9', font=("Proxima nova",9),background='black')
        login_msg1.config(fg='#F7F9F9' , font=("Proxima nova",13,"bold"),background='black')
        login_msg2.config(fg='#F7F9F9' , font=("Proxima nova",8),background='black')
        waitSign_msg.config(fg='#F7F9F9' , font=("Proxima nova",11,"bold"),background='black')
        waitSign_msg2.config(fg='#F7F9F9' , font=("Proxima nova",8),background='black')
        run_errmsg.config(fg='#F7F9F9' , font=("Proxima nova",10),background='black')
        id_error1.config(fg='#F7F9F9' , font=("Proxima nova",10),background='black')
        id_error2.config(fg='#F7F9F9' , font=("Proxima nova",10),background='black')
        id_error3.config(fg='#F7F9F9' , font=("Proxima nova",10),background='black')
        memory_msg.config(bg ='black', fg = '#F7F9F9')
        cpu_msg.config(bg ='black', fg = '#F7F9F9')
        gpu_msg.config(bg ='black', fg = '#F7F9F9')
        result_msg1.config(bg="black",fg ='#F7F9F9')
        result_msg2.config(bg="black",fg ='#F7F9F9')
        result_msg3.config(bg="black",fg ='#F7F9F9')
        wait_cmd.config(bg='black')
        btnState = True
        

#declaration of globals values
#global input keys
global dark_agree
dark_agree = tk.StringVar()
dark_agree.set('0')

global mining_value
mining_value = tk.StringVar()

global agreement
agreement = tk.StringVar()
agreement.set('0')

#glabal switch state

btnState = False

#global entries
global mining_entry
mining_entry = ttk.Entry(root, textvariable = mining_value, font=('calibre',10,'normal'), width=30)


onImg = Image.open('switch-off.jpg')
resized_image= onImg.resize((30,40))
onImg = ImageTk.PhotoImage(resized_image)

offImg = Image.open('switch-on.jpg')
resized_image= offImg.resize((30,40))
offImg = ImageTk.PhotoImage(resized_image)

#global buttons 

dark_btn = tk.Button(root, text = 'Dark Mode', command= switch, borderwidth=0)
dark_btn.config(image = offImg,bg="#F7F9F9", activebackground="#F7F9F9")
dark_btn.place(relx = 0.015, rely=0.77)

global connect_btn
connect_btn = ttk.Button(root, command= lambda:submit() , text="Connect", style='success.TButton')

global start_btn
start_btn = ttk.Button(root, command = threading.Thread(target =lambda:start(), daemon=True).start, text="Start", style='success.TButton',)



global close_btn
close_btn = ttk.Button(root, command= lambda:fclose_btn(), text="Close",bootstyle="danger")

global cheked
cheked = tk.Checkbutton(root, text = 'Remember me', variable = agreement, onvalue = 1 , offvalue = 0, )
cheked.config(bg = '#F7F9F9')
         

#global labels

global dark_label
dark_label = tk.Label(root, text='Dark mode', font=("Proxima nova",10))
dark_label.config(bg='#F7F9F9', fg = 'black',borderwidth=0)
dark_label.place(relx = 0.08, rely=0.83)

global id_error1
id_error1 = tk.Label(root, text='Your machine name is not incorrect', font=("Proxima nova",10))
id_error1.config(fg='red',bg='#F7F9F9')
global id_error2
id_error2 = tk.Label(root, text='4 to 8 characters, at least 1 number and letter', font=("Proxima nova",10))
id_error2.config(fg='red',bg='#F7F9F9')
global id_error3
id_error3 = tk.Label(root, text='NO spaces or caps , no special character except _', font=("Proxima nova",10))
id_error3.config(fg='red',bg='#F7F9F9')

global login_msg1
login_msg1 = tk.Label(root, text="Please name your machine", fg = 'black', font=("Proxima nova",13,"bold"))
login_msg1.config(bg='#F7F9F9')

login_msg2 = tk.Label(root, text="Name your device to recognize it easily in the dApp", fg = 'black', font=("Proxima nova",8))
login_msg2.config(bg='#F7F9F9')

global connect_label
connect_label = tk.Label(root,text="Connection secured",font=("Proxima nova",11,'bold'),fg ='black')
connect_label.config(bg='#F7F9F9')

global connect_label2
connect_label2 = tk.Label(root,text="You can now start mining!",font=("Proxima nova",9),fg ='black')
connect_label2.config(bg='#F7F9F9')

global run_errmsg
run_errmsg = tk.Label(root, text='An error occured please restart BETA ...', bg="#EDF0EF", font=("Proxima nova",10), fg = 'black')
 
global waitSign_msg
waitSign_msg = tk.Label(root,text="Waiting for Metamask authentication ",font=("Proxima nova",11,"bold"),fg ='black')
waitSign_msg.config(bg='#F7F9F9')

waitSign_msg2 = tk.Label(root,text="please sign in to Metamask to verify and secure your connection",font=("Proxima nova",8),fg ='black')
waitSign_msg2.config(bg='#F7F9F9')

global wait_cmd
wait_cmd = tk.Label(root,text="Terminal is loading...",font=("Proxima nova",10),fg ='black')
wait_cmd.config(bg='#F7F9F9')

global init_msg
init_msg = ttk.Label(root, text='Please wait for the application to initialize...')

global error_msg
error_msg = tk.Label(root, text='The system is under maintenance, please try again later')

global running_msg
running_msg = tk.Label(root, text='The software is running ...',font=("Proxima nova",10))

global exit_msg
exit_msg = tk.Label(root, text='The application is closing ...',font=("Proxima nova",10), fg = 'black')

global wait_run
wait_run = tk.Label(root, text='Please wait ...', bg="#EDF0EF", font=("Proxima nova",10), fg = 'black')

global result_msg1
result_msg1 = tk.Label(frame1, text='',font="calibri 9")
result_msg1.config(bg="black")

global result_msg2
result_msg2 = tk.Label(frame1, text= '', font="calibri 9")
result_msg2.config(bg="black",fg ='#F7F9F9')

global result_msg3
result_msg3 = tk.Label(frame1, text= '',font="calibri 9")
result_msg3.config(bg="black", fg ='#F7F9F9')


global memory_msg
memory_msg = tk.Label(frame1, text="", font="calibri 11")
memory_msg.config(bg='black', fg='#F7F9F9')
global cpu_msg
cpu_msg = tk.Label(frame1, text="", font="calibri 11")
cpu_msg.config(bg='black', fg='#F7F9F9')
global gpu_msg
gpu_msg = tk.Label(frame1, text="",  font="calibri 11")
gpu_msg.config(bg='black', fg='#F7F9F9')


#global images declarations
global img_pg1 
img_pg1 = Image.open('fox.jpg')
resized_image= img_pg1.resize((110,100))
img_pg1 = ImageTk.PhotoImage(resized_image)

global img_pg1D
img_pg1D = Image.open('fox_D.jpg')
resized_image= img_pg1D.resize((110,100))
img_pg1D = ImageTk.PhotoImage(resized_image)

global page1_img
page1_img = tk.Label(image=img_pg1)
page1_img.config( bg = '#F7F9F9')

global img_pg2 
img_pg2 = Image.open('Dapp.jpg')
resized_image= img_pg2.resize((110,100))
img_pg2 = ImageTk.PhotoImage(resized_image)

global img_pg2D
img_pg2D = Image.open('Dapp_D.jpg')
resized_image= img_pg2D.resize((110,100))
img_pg2D = ImageTk.PhotoImage(resized_image)

global page2_img
page2_img = tk.Label(image=img_pg2)
page2_img.config( bg = '#F7F9F9')

global img_pg3 
img_pg3 = Image.open('check-circle.jpg')
resized_image= img_pg3.resize((100,100))
img_pg3 = ImageTk.PhotoImage(resized_image)

global img_pg3D
img_pg3D = Image.open('check-circleD.jpg')
resized_image= img_pg3D.resize((100,100))
img_pg3D = ImageTk.PhotoImage(resized_image)

global page3_img
page3_img = tk.Label(image=img_pg3)
page3_img.config( bg = '#F7F9F9')


global img_pg4 
img_pg4 = Image.open('metamask.jpg')
resized_image= img_pg4.resize((200,80))
img_pg4 = ImageTk.PhotoImage(resized_image)

global img_pg4D
img_pg4D = Image.open('metamask_D.jpg')
resized_image= img_pg4D.resize((200,80))
img_pg4D = ImageTk.PhotoImage(resized_image)

global page4_img
page4_img = tk.Label(image=img_pg4)
page4_img.config( bg = '#F7F9F9')

#vector containing the sigature and the wallet address
global sign_list
sign_list = []

global setup_file
setup_file = []

#global list for display cars count
global display_list
display_list = []


#get the location 

global location
endpoint = 'https://ipinfo.io/json'
response = requests.get(endpoint, verify = True)
location = response.json()  


#define and run  flask server
app = Flask(__name__)
CORS(app)

@app.route("/set_signature", methods=["POST"])
def cors_post():  
    try :
        data = request.json
        print(data)
        if len(sign_list) == 0:
            sign_list.append(data)
            global wallettest
            wallettest = sign_list[0]
            #DELETE FOR TESTING
            #wallettest['wallet'] = ''
            print(wallettest['wallet'])

        return jsonify({"miningID": mining_value.get().strip()}), 200

    except :
        return jsonify({"message": "connection failed"}), 400


def flask_main():
    port = int(os.environ.get("PORT", 4321))
    app.run(host='localhost', port=port, debug=False)

flask_thread = threading.Thread(target=flask_main)
flask_thread.daemon = True
flask_thread.start() 


#verify if a setup.txt exist
file = Path("setup.txt")

if file.exists():
    setup = open('setup.txt')
    setup_file = setup.readlines()
    cheked.select()
    setup.close()

    #to modify
    #before opening metamask function verify if the present wallet address
    #is similar to the one in the setup.txt

    metamask(1)

else :
    metamask(0)
# run = Value("i", 1)
# def worker(run):
#     while True:
#         if run.value:
#             process = Process(target = detect_thread, args=(link,))
#             process.start()
#             process.terminate()
#             process.join()

# prevlink = 0
# while True:
#     global link
#     if link != prevLink:
#         run.value = not run.value
#         time.sleep(2)
#         run.value = not run.value
#         prevLink = link


root.mainloop()
