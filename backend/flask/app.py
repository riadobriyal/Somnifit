from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np

app = Flask(__name__)
CORS(app, origins=['https://somnifit-client.onrender.com', 'http://localhost:5173'])

sleep_transformer = pickle.load(open('models/column_transformer_sleep.pkl','rb'))
lin_model = pickle.load(open('models/lin_reg_sleep.pkl','rb'))
activity_transformer=pickle.load(open('models/column_transformer_activity.pkl','rb'))
log_model=pickle.load(open('models/log_reg_activity.pkl','rb'))

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

    return jsonify({'sleep_efficiency': float(prediction[0])})


@app.route("/activity_predictor",methods=['POST'])
def activity_prediction():
    data = request.get_json()
    weight = float(data.get('weight'))
    height = float(data.get('height'))
    BMI = float(data.get('BMI'))
    age = float(data.get('age'))
    gender = data.get('gender')
    BMI_Case = data.get('BMI_Case')

    BMI_Case = 'sever thinness' if BMI_Case == 'severe thinness' else BMI_Case
    BMI_Case = 'obese' if BMI_Case == 'obesity' else BMI_Case
    BMI_Case = 'severe obese' if BMI_Case == 'severe obesity' else BMI_Case

    input_data = np.array([[weight,height,BMI,gender,age,BMI_Case]])
    prediction = log_model.predict(activity_transformer.transform(input_data))

    return jsonify({'Exercise Recommendation Plan': int(prediction)})

if __name__ == "__main__":
    app.run(debug=True,host="0.0.0.0",port=5000)