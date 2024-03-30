# evaluate_model.py
from init import *

def save_model(model, file_path):
    joblib.dump(model, file_path)
    print("Model saved as", file_path)

def evaluate_model(best_params, best_score, rmse_test):
    print("Best Parameters:", best_params)
    print("Best MSE Score:", best_score)
    print("RMSE on Test Set:", rmse_test)
