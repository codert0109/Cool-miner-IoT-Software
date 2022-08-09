def script_method(fn, _rcb=None):
    return fn
def script(obj, optimize=True, _frames_up=0, _rcb=None):
    return obj    
import torch.jit
torch.jit.script_method = script_method 
torch.jit.script = script
from multiprocessing import Process, Queue
import os
os.environ['KMP_DUPLICATE_LIB_OK']='True'
#os.environ["CUDA_VISIBLE_DEVICES"]=""


import codecs
import locale
import os

import pytest

from pandas._config.localization import can_set_locale, get_locales, set_locale

from pandas.compat import is_platform_windows

import pandas as pd

print(get_locales)
import torch
import pandas
import cv2
from pandas._config.localization import can_set_locale, get_locales, set_locale
#torch.set_default_tensor_type(torch.FloatTensor)
#print(torch.__version__)

def tkapp_thread(q):
    import tkinter as tk
    from tkapp_thread import Application
    root = tk.Tk()
    #print(root)
    app = Application(root, q, video_source="0")
    app.mainloop()
    
def yolov5_thread(q):
    from option_parser import get_parser
    from yolov5_detect import yolov5_detection
    opt = get_parser()
    yolov5_detection(q, opt)
    
if __name__ == '__main__':

    q = Queue()
    p1 = Process(target = tkapp_thread, args=(q,))
    p2 = Process(target = yolov5_thread, args=(q,))
    p1.start()
    p2.start()
    p1.join()
    p2.join()
