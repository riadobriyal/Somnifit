from flask import Flask, request, jsonify
import pickle
import numpy as np

app = Flask(__name__)

sleep_transformer = pickle.load(open('../models/column_transformer_sleep.pkl','rb'))
lin_model = pickle.load(open('../models/lin_reg_sleep.pkl','rb'))

@app.route("/")
def home():
    return "Welcome! Have you been sleeping right?"

@app.route("/sleep_predictor",methods=['POST'])
def sleep_prediction():
    data = request.get_json()

    sleep_duration = float(data.get('sleep_duration'))
    deep_sleep = float(data.get('deep_sleep'))
    awake_others_duration = float(data.get('awake_others_duration'))
    age = float(data.get('age'))
    gender = data.get('gender')
    bed_time_hours = float(data.get('bed_time_hours'))
    wakeup_time_hours = float(data.get('wakeup_time_hours'))

    input_data = np.array([[sleep_duration,deep_sleep,awake_others_duration,age,gender,bed_time_hours,wakeup_time_hours]])
    prediction = lin_model.predict(sleep_transformer.transform(input_data))

    return jsonify({'sleep_efficiency': float(prediction)})


if __name__ == "__main__":
    app.run(debug=True)