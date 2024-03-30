# init.py
import pandas as pd
import numpy as np
import re
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.metrics import mean_squared_error
from sklearn.preprocessing import LabelEncoder
import xgboost as xgb
import joblib

def split_lieu(lieu):
    parts = lieu.split(' in ')
    if len(parts) == 2:
        return parts[0], parts[1]
    else:
        return parts[0], parts[0]

def rmse(y_true, y_pred):
    return np.sqrt(mean_squared_error(y_true, y_pred))

def round_to_nearest_10000(x):
    return round(x / 10000) * 10000
