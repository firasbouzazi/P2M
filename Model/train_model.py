# train_model.py
from init import *
from data_preprocessing import preprocess_data

def train_model(df):
    # Splitting data into train and test sets
    X = df.drop(columns=['Price'])
    y = df['Price']
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Hyperparameter tuning using GridSearchCV
    param_grid = {
        'n_estimators': [10,50,100],
        'max_depth': [3, 5, 7],
        'learning_rate': [0.05, 0.1, 0.2]
    }

    xgb_model = xgb.XGBRegressor()
    grid_search = GridSearchCV(estimator=xgb_model, param_grid=param_grid, cv=5, scoring='neg_mean_squared_error')
    grid_search.fit(X_train, y_train)
    best_params = grid_search.best_params_
    best_score = grid_search.best_score_

    # Testing the model
    best_model = grid_search.best_estimator_
    y_pred = best_model.predict(X_test)
    y_pred_rounded = np.array([round_to_nearest_10000(pred) for pred in y_pred])
    rmse_test = rmse(y_test, y_pred_rounded)

    return best_model, best_params, -best_score, rmse_test
