# main.py
from data_preprocessing import preprocess_data
from train_model import train_model
from evaluate_model import evaluate_model, save_model

if __name__ == "__main__":
    # Preprocess data
    df = preprocess_data("moubawab.csv")
    
    # Train model
    best_model, best_params, best_score, rmse_test = train_model(df)
    
    # Evaluate model
    evaluate_model(best_params, best_score, rmse_test)
    
    # Save model
    save_model(best_model, "xgboost_model.pkl")
