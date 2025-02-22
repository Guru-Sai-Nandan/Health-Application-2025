from flask import Flask, jsonify, request
from flask_cors import CORS
import csv
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import PolynomialFeatures
from sklearn.pipeline import make_pipeline

app = Flask(__name__)
CORS(app)

# Load calorie prediction data
cal = pd.read_csv('calories.csv')
exc = pd.read_csv('exercise.csv')
cal_data = pd.concat([exc, cal['Calories']], axis=1)

cal_data.replace({"Gender": {'male': 0, 'female': 1}}, inplace=True)
X = cal_data.drop(columns=['User_ID', 'Calories'], axis=1)
Y = cal_data['Calories']
X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.2, random_state=2)

# Train Polynomial Regression model
degree = 3
model = make_pipeline(PolynomialFeatures(degree), LinearRegression())
model.fit(X_train, Y_train)

def predict_calories(gen, age, hei, wei, dur, hr, bt):
    data = {'Gender': [gen], 'Age': [age], 'Height': [hei], 'Weight': [wei],
            'Duration': [dur], 'Heart_Rate': [hr], 'Body_Temp': [bt]}
    df = pd.DataFrame(data)
    return max(model.predict(df)[0], 0)

@app.route('/predict_calories', methods=['POST'])
def predict_calories_api():
    try:
        content = request.get_json()
        result = predict_calories(
            content['Gender'], content['Age'], content['Height'], content['Weight'],
            content['Duration'], content['Heart_Rate'], content['Body_Temp']
        )
        return jsonify({"calories": round(result)})
    except Exception as e:
        return jsonify({"error": str(e)})

# Load disease-food restriction data
disease_foods = {}

def load_disease_data():
    global disease_foods
    with open("disease_foods_avoid_200.csv", newline='', encoding='utf-8') as csvfile:
        reader = csv.reader(csvfile)
        next(reader)  # Skip header
        for row in reader:
            disease = row[0].strip()
            foods = [food.strip() for food in row[1].split(',')]
            disease_foods[disease] = foods

@app.route("/diseases", methods=["GET"])
def get_diseases():
    return jsonify({"diseases": list(disease_foods.keys())})

@app.route("/foods-to-avoid", methods=["GET"])
def get_foods_to_avoid():
    disease = request.args.get("disease", "").strip()
    foods = disease_foods.get(disease, [])
    return jsonify({"foods_to_avoid": foods if foods else ["No data available for this disease."]})

if __name__ == "__main__":
    load_disease_data()
    app.run(debug=True)
