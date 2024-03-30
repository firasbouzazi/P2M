# data_preprocessing.py
import pandas as pd
import re
from sklearn.preprocessing import LabelEncoder
from init import *

label_encoder_dict = {}  # Initialize an empty dictionary to store encoded classes

def preprocess_data(file_path):
    df = pd.read_csv(file_path)
    # Data cleaning and preprocessing
    df = df[df['Price'] != 'Price on request']
    df.dropna(subset=['Price'], inplace=True)
    df['Price'] = df['Price'].apply(lambda x: int(''.join(re.findall(r'\d+', x))))
    df['Price'] = df['Price'].astype(int)
    df[['Num_Bedrooms', 'Surface']] = df['Description'].str.extract(r'(\d+)\s+bedrooms,\s*(\d+)\s+m²')
    df[['Area', 'City']] = df['Lieu'].apply(split_lieu).apply(pd.Series)
    df = df.drop(['Unnamed: 0','Name', 'Description', 'Long_Description', 'Date', 'Terrace', 'Garage', 'Climatiseur','Area','City'], axis=1)

    # Handling missing values
    nan_counts = df.isna().sum()
    df = df.dropna()

    global label_encoder_dict
    label_encoder = LabelEncoder()

    # Encode 'Type' and 'Lieu' columns and store classes in the dictionary
    df['Lieu'] = label_encoder.fit_transform(df['Lieu'])
    df['Type'] = label_encoder.fit_transform(df['Type'])
    label_encoder_dict['Type'] = label_encoder.classes_
    label_encoder_dict['Lieu'] = label_encoder.classes_

    # Outlier removal
    Q1 = df['Price'].quantile(0.25)
    Q3 = df['Price'].quantile(0.75)
    IQR = Q3 - Q1
    lower_bound = Q1 - 1.5 * IQR
    upper_bound = Q3 + 1.5 * IQR
    df = df[(df['Price'] >= lower_bound) & (df['Price'] <= upper_bound)]

    # Feature engineering
    df['Num_Bedrooms'] = df['Num_Bedrooms'].astype(int)
    df['Surface'] = df['Surface'].astype(int)
    grouped = df.groupby(['Type', 'Lieu']).agg({'Price': 'sum', 'Surface': 'sum'}).reset_index()
    grouped['Avg_Price_Per_Surface'] = grouped['Price'] / grouped['Surface']
    df = pd.merge(df, grouped[['Type', 'Lieu', 'Avg_Price_Per_Surface']], on=['Type', 'Lieu'], how='left')

    return df
