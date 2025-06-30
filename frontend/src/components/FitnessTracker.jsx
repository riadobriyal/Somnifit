import React, { useState, useEffect } from "react";
import ClickSpark from "./ClickSpark";
import { Link } from "react-router-dom";

function FitnessTracker() {
  const [showTip, setShowTip] = useState(false);
  const [fitnessScore, setFitnessScore] = useState(0);
  const [activityLevel, setActivityLevel] = useState(0);
  const [showDashboard, setShowDashboard] = useState(false);
  const [formData, setFormData] = useState({
    age: '',
    gender: 'Male',
    weight: '',
    height: '',
    bmi: '',
    bmi_class: '',
    workoutDuration: '',
    caloriesBurned: '',
    steps: '',
    heartRate: '',
    workoutIntensity: 'Moderate'
  });
  const [bmiWeight, setBmiWeight] = useState('');
  const [bmiHeight, setBmiHeight] = useState('');
  const [bmiResult, setBmiResult] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActivityLevel((prev) => (prev < 85 ? prev + 0.1 : 0));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const fetchFitness = async () => {
    try {
      setFitnessScore(0);
      
      const res = await fetch('http://localhost:5000/activity_predictor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          age: formData.age,
          gender: formData.gender,
          weight: formData.weight,
          height: parseFloat(formData.height)/100,
          'BMI': formData.bmi,
          'BMI_Case': formData.bmi_class.toLowerCase(),
          workout_duration: formData.workoutDuration,
          calories_burned: formData.caloriesBurned,
          steps: formData.steps,
          heart_rate: formData.heartRate,
          workout_intensity: formData.workoutIntensity
        })
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      setFitnessScore(data['Exercise Recommendation Plan']);
      console.log(fitnessScore)
      setShowDashboard(true);
      
      setTimeout(() => {
        const formElement = document.getElementById('dashboard');
        if (formElement) {
          formElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      
      console.log('Fitness score:', data.fitness_score);
    } catch (error) {
      console.error('Error fetching fitness data:', error);
    }
  };

  const scrollToForm = () => {
    const formElement = document.getElementById('fitness-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  function handleBmiCalculate() {
    if (!bmiWeight || !bmiHeight) return;
    const h = parseFloat(bmiHeight) / 100;
    const w = parseFloat(bmiWeight);
    if (h > 0 && w > 0) {
      const bmiValue = w / (h * h);
      let category = '';
      if (bmiValue < 16) category = 'Severe Thinness';
      else if (bmiValue >= 16 && bmiValue < 17) category = 'Moderate Thinness';
      else if (bmiValue >= 17 && bmiValue < 18.5) category = 'Mild Thinness';
      else if (bmiValue >= 18.5 && bmiValue < 25) category = 'Normal';
      else if (bmiValue >= 25 && bmiValue < 30) category = 'Over Weight';
      else if (bmiValue >= 30 && bmiValue < 35) category = 'Obesity';
      else category = 'Severe Obesity';
      setBmiResult({ value: bmiValue.toFixed(1), category });
      
      setFormData({
        ...formData,
        weight: bmiWeight,
        height: bmiHeight,
        bmi: bmiValue.toFixed(1),
        bmi_class: category
      });
    }
  }

  const exercise_plans = [
    'Introductory Light Activity','Ideal for beginners or individuals with higher body fat percentages. Focuses on gentle cardio like walking, stationary cycling or light swimming (30 minutes, 3–4× per week), combined with basic mobility and stretching. This plan emphasizes building consistency, improving joint flexibility, and kick‑starting metabolism with minimal strain.',
    'Foundational Conditioning','Still beginner‑focused but with slightly increased intensity. Includes moderate walking/jogging intervals (20/10 min mix), simple body‑weight exercises like squats, wall push‑ups, and hip bridges, 3–4× per week. Targets improved muscular endurance and steady-state fat burn, laying a foundation for more complex routines later.',
    'Strength & Moderate Cardio Blend','A balanced plan combining resistance and cardio. Structured around 3 full-body strength sessions per week (e.g., lunges, push-ups, rows using light dumbbells or bands) plus 2 days of moderate cardio (30–40 minutes). Adds core stability drills and dynamic stretches. Builds muscular strength while maintaining cardiovascular gains.',
    'Frequency & Volume Increase','For those with some baseline fitness and moderate BMI/BFP. Training rises to 5–6 days per week: 4 days of split resistance training (upper/lower body alternated) with moderate weights for 3–4 sets of 8–12 reps, plus 1–2 dedicated cardio or HIIT sessions (20–25 minutes). Includes active recovery and mobility work to boost performance and recovery.',
    'Targeted Fat-Loss Emphasis','Designed to optimize fat reduction. Strength workouts continue 4× weekly focusing on compound movements, paired with 3 HIIT sessions (15–20 minutes) or moderate steady-state cardio (45–60 minutes). Nutrition advice typically complements training: calorie deficit, high-quality protein intake, and recovery monitoring to prevent overtraining.',
    'Hypertrophy & Muscle Toning','Aimed at building lean muscle and definition. Resistance training 5 days a week targeting specific muscle groups (e.g., chest/back/arms/legs/core) with moderate‑heavy loads for 3–5 sets of 8–15 reps. Two weekly cardio/conditioning sessions maintain cardiovascular health. Mobility, foam rolling, and flexibility work are built in to enhance performance and reduce injury risk.',
    'Advanced Athletic Conditioning','For individuals with lower BMI/BFP and strong fitness foundations. Highly structured plan featuring 5 resistance sessions (with periodized intensity: heavy, moderate, light days), 2 HIIT/cardio sessions, and supplemental agility/power/core drills. Includes advanced techniques (supersets, plyometrics), recovery strategies (sleep tracking, deload cycles), and goal-specific refinements (e.g., endurance, strength, physique).'
  ]

  return (
    <>
      <div className="min-h-screen w-full flex flex-col bg-gradient-to-b from-orange-400 to-yellow-300">
        <div className="p-6">
          <ClickSpark sparkColor="#fff" sparkSize={10} sparkRadius={15} sparkCount={8} duration={400}>
            <Link
              to="/"
              className="text-3xl font-bold text-black tracking-wide hover:text-orange-300 transition-colors"
            >
              <span className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-lg">
                SomniFit
              </span>
            </Link>
          </ClickSpark>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-4">
          {/* StarField removed */}
          {/* ClickSpark everywhere except where the text is */}
          <div className="relative w-full flex flex-col items-center justify-center min-h-[60vh]">
            {/* Overlay for click spark, covers all except text block, and adds above/below Enhance and Get Started */}
            <ClickSpark sparkColor="#fff" sparkSize={10} sparkRadius={15} sparkCount={8} duration={400}>
              <div className="absolute inset-0 z-0 pointer-events-none">
                {/* Top area above all text */}
                <div className="w-full absolute left-0 top-0 h-[60px] pointer-events-auto" style={{cursor: 'pointer'}} />
                {/* Area above Enhance */}
                <div className="w-full absolute left-0 top-[60px] h-[40px] pointer-events-auto" style={{cursor: 'pointer'}} />
                {/* Area below Enhance, above statement */}
                <div className="w-full absolute left-0 top-[160px] h-[30px] pointer-events-auto" style={{cursor: 'pointer'}} />
                {/* Area below statement, above Get Started */}
                <div className="w-full absolute left-0 top-[220px] h-[40px] pointer-events-auto" style={{cursor: 'pointer'}} />
                {/* Area below Get Started */}
                <div className="w-full absolute left-0 top-[320px] h-[60px] pointer-events-auto" style={{cursor: 'pointer'}} />
                {/* Left and right sides of text block */}
                <div className="absolute top-[60px] bottom-[120px] left-0 w-[10%] pointer-events-auto" style={{cursor: 'pointer'}} />
                <div className="absolute top-[60px] bottom-[120px] right-0 w-[10%] pointer-events-auto" style={{cursor: 'pointer'}} />
              </div>
            </ClickSpark>
            {/* Text block stays above the overlay */}
            <div className="relative z-10 flex flex-col items-center justify-center w-full">
              <h1 className="text-6xl md:text-8xl font-extrabold text-white text-center mb-8 tracking-tight">
                Enhance your fitness
              </h1>
              <p className="text-xl md:text-2xl text-white text-center max-w-2xl">
                Track, analyze, and improve your fitness with our AI-powered insights and personalized recommendations.
              </p>
              <button
                onClick={scrollToForm}
                className="mt-12 px-8 py-4 bg-orange-500 hover:bg-orange-400 text-white font-semibold rounded-lg text-lg transition-colors"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
      <ClickSpark sparkColor="#fff" sparkSize={10} sparkRadius={15} sparkCount={8} duration={400}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full bg-gradient-to-b from-yellow-300 to-orange-400 px-6 md:px-20 py-16">
        {/* Card 1 */}
        <div className="group relative transform hover:-translate-y-2 transition-all duration-300 h-full">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-400 to-yellow-300 rounded-2xl opacity-30 group-hover:opacity-50 blur transition duration-300"></div>
          <div className="relative bg-white/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl overflow-hidden h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 to-yellow-300/10 rounded-2xl"></div>
            <div className="relative h-full flex flex-col">
              <div className="overflow-hidden rounded-lg">
                <img 
                  src="https://cdn.dribbble.com/userupload/42160418/file/original-f46d1dbb1dc9892110a9b9d4916875ed.gif" 
                  className="w-full h-48 object-cover transform group-hover:scale-110 transition-all duration-700"
                  alt="Fitness Tracking Animation"
                />
              </div>
              <h3 className="text-2xl font-bold text-black mb-4 mt-6">Activity Tracking</h3>
              <p className="text-black text-lg flex-1">
                Track your daily activities, workouts, and progress. Our AI-powered system monitors your fitness metrics and provides real-time insights to help you achieve your goals.
              </p>
            </div>
          </div>
        </div>
        {/* Card 2 */}
        <div className="group relative transform hover:-translate-y-2 transition-all duration-300 h-full">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-300 to-orange-400 rounded-2xl opacity-30 group-hover:opacity-50 blur transition duration-300"></div>
          <div className="relative bg-white/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl overflow-hidden h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-300/10 to-orange-400/10 rounded-2xl"></div>
            <div className="relative h-full flex flex-col">
              <div className="overflow-hidden rounded-lg">
                <img 
                  src="https://cdn.dribbble.com/userupload/21210735/file/original-f7ebdf65860bfbfd73e5355d596ccf06.gif" 
                  className="w-full h-48 object-cover transform group-hover:scale-110 transition-all duration-700"
                  alt="Fitness Analytics Animation"
                />
              </div>
              <h3 className="text-2xl font-bold text-black mb-4 mt-6">Smart Analytics</h3>
              <p className="text-black text-lg flex-1">
                Get detailed insights into your workout performance, calorie burn, and progress over time. Our machine learning algorithms help you understand your fitness patterns and optimize your routine.
              </p>
            </div>
          </div>
        </div>
        {/* Card 3 */}
        <div className="group relative transform hover:-translate-y-2 transition-all duration-300 h-full">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-400 to-yellow-300 rounded-2xl opacity-30 group-hover:opacity-50 blur transition duration-300"></div>
          <div className="relative bg-white/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl overflow-hidden h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 to-yellow-300/10 rounded-2xl"></div>
            <div className="relative h-full flex flex-col">
              <div className="overflow-hidden rounded-lg">
                <img 
                  src="https://media.tenor.com/lwADcDkltwIAAAAM/cutetip.gif" 
                  className="w-full h-48 object-cover transform group-hover:scale-110 transition-all duration-700"
                  alt="Workout Tips Animation"
                />
              </div>
              <h3 className="text-2xl font-bold text-black mb-4 mt-6">Personalized Tips</h3>
              <p className="text-black text-lg flex-1">
                Receive customized workout recommendations and tips based on your performance and goals. Our AI learns from your fitness data to provide the most effective guidance for you.
              </p>
            </div>
          </div>
        </div>
        </div>
      </ClickSpark>
      <ClickSpark sparkColor="#fff" sparkSize={10} sparkRadius={15} sparkCount={8} duration={400}>
        <main className="mx-auto py-16 w-full bg-gradient-to-b from-orange-400 to-yellow-300">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-5xl font-bold text-white">
              Calculate your BMI
            </h2>
            <p className="text-lg text-white">
              Discover your body mass index and take the first step towards a healthier you
            </p>
            <form className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-[#FFD580]/20 shadow-xl">
              <h3 className="text-2xl font-semibold text-black mb-6 text-center">BMI Calculator</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                <div>
                  <label className="block text-black text-sm font-medium mb-2">Weight (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={bmiWeight}
                    onChange={e => setBmiWeight(e.target.value)}
                    className="w-full bg-[#D44C2E]/10 border border-[#F7E987]/30 rounded-xl px-4 py-3 text-black focus:ring-2 focus:ring-[#F7E987] focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-black text-sm font-medium mb-2">Height (cm)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={bmiHeight}
                    onChange={e => setBmiHeight(e.target.value)}
                    className="w-full bg-[#D44C2E]/10 border border-[#F7E987]/30 rounded-xl px-4 py-3 text-black focus:ring-2 focus:ring-[#F7E987] focus:border-transparent transition-all"
                  />
                </div>
              </div>
              
              <div className="flex justify-center mb-6">
                <ClickSpark sparkColor="#fff" sparkSize={10} sparkRadius={15} sparkCount={8} duration={400}>
                  <button
                    type="button"
                    onClick={handleBmiCalculate}
                    className="bg-orange-500 text-black font-semibold py-4 px-8 rounded-xl hover:bg-orange-600 transition-all duration-200 shadow-lg"
                  >
                    Calculate BMI
                  </button>
                </ClickSpark>
              </div>

              {bmiResult && (
                <div className="text-center w-full">
                  <div className="text-2xl font-bold text-orange-700 mb-2">Your BMI: {bmiResult.value}</div>
                  <div className="text-lg text-black mb-6">Category: <span className="font-semibold text-orange-500">{bmiResult.category}</span></div>
                  
                  {/* BMI Meter */}
                  <div className="w-full flex flex-col items-center">
                    <div className="relative w-full max-w-2xl h-8 rounded-full overflow-hidden bg-gradient-to-r from-blue-600 via-blue-400 via-green-400 via-yellow-400 to-red-500 shadow-inner">
                      {/* Segments for reference */}
                      <div className="absolute left-0 top-0 h-full" style={{width: '16%', background: 'rgba(37,99,235,0.3)'}}></div>
                      <div className="absolute left-[16%] top-0 h-full" style={{width: '2.5%', background: 'rgba(59,130,246,0.3)'}}></div>
                      <div className="absolute left-[18.5%] top-0 h-full" style={{width: '7%', background: 'rgba(96,165,250,0.3)'}}></div>
                      <div className="absolute left-[25.5%] top-0 h-full" style={{width: '24.5%', background: 'rgba(34,197,94,0.3)'}}></div>
                      <div className="absolute left-[50%] top-0 h-full" style={{width: '20%', background: 'rgba(251,191,36,0.3)'}}></div>
                      <div className="absolute left-[70%] top-0 h-full" style={{width: '17.5%', background: 'rgba(239,68,68,0.3)'}}></div>
                      <div className="absolute left-[87.5%] top-0 h-full" style={{width: '12.5%', background: 'rgba(185,28,28,0.3)'}}></div>
                      {/* Pointer */}
                      {(() => {
                        const bmi = parseFloat(bmiResult.value);
                        let left = 0;
                        if (bmi < 16) left = (bmi / 16) * 16;
                        else if (bmi < 17) left = ((bmi - 16) / 1 * 2.5 + 16);
                        else if (bmi < 18.5) left = ((bmi - 17) / 1.5 * 7 + 18.5);
                        else if (bmi < 25) left = ((bmi - 18.5) / 6.5 * 24.5 + 25.5);
                        else if (bmi < 30) left = ((bmi - 25) / 5 * 20 + 50);
                        else if (bmi < 35) left = ((bmi - 30) / 5 * 17.5 + 70);
                        else left = ((bmi - 35) / 5 * 12.5 + 87.5);
                        if (left > 100) left = 100;
                        return (
                          <div className="absolute top-0" style={{ left: `calc(${left}% - 12px)` }}>
                            <div className="w-6 h-6 bg-orange-500 rounded-full border-4 border-white shadow-lg -mt-3"></div>
                            <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-t-[10px] border-l-transparent border-r-transparent border-t-orange-500 mx-auto -mt-1"></div>
                          </div>
                        );
                      })()}
                    </div>
                    <div className="flex justify-between w-full max-w-2xl text-sm text-black mt-3">
                      <span className="text-blue-800">Severe Thin</span>
                      <span className="text-blue-900">Mod Thin</span>
                      <span className="text-blue-900">Mild Thin</span>
                      <span className="text-green-900">Normal</span>
                      <span className="text-yellow-900">Over Weight</span>
                      <span className="text-red-900">Obese</span>
                      <span className="text-red-900">Sev Obese</span>
                    </div>
                  </div>
                </div>
              )}
            </form>
            <h2 id="fitness-form" className="text-5xl font-bold text-white mt-36">
              Track Your Fitness
            </h2>
            <p className="text-lg text-white">
              Monitor your workout and activity metrics for better health
            </p>
          </div>
          <div className="max-w-4xl mx-auto mb-12">
          </div>
          <form className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-[#FFD580]/20 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-black">Personal Details</h3>
                <div className="space-y-4">
                  {/* Age Input */}
                  <div>
                    <label className="block text-black text-sm font-medium mb-2">Age</label>
                    <input
                      type="number"
                      value={formData.age}
                      onChange={(e) => setFormData({...formData, age: e.target.value})}
                    className="w-full bg-[#D44C2E]/10 border border-[#F7E987]/30 rounded-xl px-4 py-3 text-black focus:ring-2 focus:ring-[#F7E987] focus:border-transparent transition-all"
                    />
                  </div>
                  {/* Gender Buttons */}
                  <div>
                    <label className="block text-black text-sm font-medium mb-3">Gender</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setFormData({...formData, gender: 'Male'})}
                        className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 border-2 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent ${
                          formData.gender === 'Male'
                            ? 'bg-orange-500 text-black border-orange-500 shadow-lg'
                            : 'bg-white text-orange-500 border-orange-400 hover:bg-orange-100'
                        }`}
                      >
                        Male
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({...formData, gender: 'Female'})}
                        className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 border-2 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent ${
                          formData.gender === 'Female'
                            ? 'bg-orange-500 text-black border-orange-500 shadow-lg'
                            : 'bg-white text-orange-500 border-orange-400 hover:bg-orange-100'
                        }`}
                      >
                        Female
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* Body Metrics Section */}
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-black">Body Metrics</h3>
                <div className="space-y-4">
                  {/* Weight */}
                  <div>
                    <label className="block text-black text-sm font-medium mb-2">Weight (kg)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.weight}
                      onChange={(e) => setFormData({...formData, weight: e.target.value})}
                    className="w-full bg-[#D44C2E]/10 border border-[#F7E987]/30 rounded-xl px-4 py-3 text-black focus:ring-2 focus:ring-[#F7E987] focus:border-transparent transition-all"
                    />
                  </div>
                  {/* Height */}
                  <div>
                    <label className="block text-black text-sm font-medium mb-2">Height (cm)</label>
                    <input
                      type="number"
                      value={formData.height}
                      onChange={(e) => setFormData({...formData, height: e.target.value})}
                    className="w-full bg-[#D44C2E]/10 border border-[#F7E987]/30 rounded-xl px-4 py-3 text-black focus:ring-2 focus:ring-[#F7E987] focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>
              {/* Activity Metrics Section */}
              <div className="space-y-6 md:col-span-2">
                <h3 className="text-2xl font-semibold text-center text-black">Weight Class</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    {/* Weight Class */}
                    <div>
                      <label className="block text-black text-sm font-medium mb-2">Weight Class</label>
                      <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-3">
                          {['Severe Thinness', 'Moderate Thinness', 'Mild Thinness'].map((bmi_class) => (
                            <button
                              key={bmi_class}
                              type="button"
                              onClick={() => setFormData({...formData, bmi_class})}
                              className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 border-2 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent ${
                                formData.bmi_class === bmi_class
                                  ? 'bg-orange-500 text-black border-orange-500 shadow-lg'
                                  : 'bg-white text-orange-500 border-orange-400 hover:bg-orange-100'
                              }`}
                            >
                              {bmi_class}
                            </button>
                          ))}
                        </div>
                        <div className="grid grid-cols-1">
                          <button
                            type="button"
                            onClick={() => setFormData({...formData, bmi_class: 'Normal'})}
                            className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 border-2 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent ${
                              formData.bmi_class === 'Normal'
                                ? 'bg-orange-500 text-black border-orange-500 shadow-lg'
                                : 'bg-white text-orange-500 border-orange-400 hover:bg-orange-100'
                            }`}
                          >
                            Normal
                          </button>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          {['Over Weight', 'Obesity', 'Severe Obesity'].map((bmi_class) => (
                            <button
                              key={bmi_class}
                              type="button"
                              onClick={() => setFormData({...formData, bmi_class})}
                              className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 border-2 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent ${
                                formData.bmi_class === bmi_class
                                  ? 'bg-orange-500 text-black border-orange-500 shadow-lg'
                                  : 'bg-white text-orange-500 border-orange-400 hover:bg-orange-100'
                              }`}
                            >
                              {bmi_class}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    {/* Workout Duration */}
                    <div className="mt-11.5">
                    <label className="block text-black text-sm font-medium mb-2">Workout Duration (minutes)</label>
                      <input
                        type="number"
                        value={formData.workoutDuration}
                        onChange={(e) => setFormData({...formData, workoutDuration: e.target.value})}
                    className="w-full bg-[#D44C2E]/10 border border-[#F7E987]/30 rounded-xl px-4 py-3 text-black focus:ring-2 focus:ring-[#F7E987] focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    {/* BMI */}
                    <div>
                    <label className="block text-black text-sm font-medium mb-2">Body Mass Index</label>
                      <input
                        type="number"
                        value={formData.bmi}
                        onChange={(e) => setFormData({...formData, bmi: e.target.value})}
                    className="w-full bg-[#D44C2E]/10 border border-[#F7E987]/30 rounded-xl px-4 py-3 text-black focus:ring-2 focus:ring-[#F7E987] focus:border-transparent transition-all"
                      />
                    </div>
                    {/* Calories Burned */}
                    <div>
                    <label className="block text-black text-sm font-medium mb-2">Calories Burned</label>
                      <input
                        type="number"
                        value={formData.caloriesBurned}
                        onChange={(e) => setFormData({...formData, caloriesBurned: e.target.value})}
                    className="w-full bg-[#D44C2E]/10 border border-[#F7E987]/30 rounded-xl px-4 py-3 text-black focus:ring-2 focus:ring-[#F7E987] focus:border-transparent transition-all"
                      />
                    </div>
                    {/* Steps */}
                    <div>
                    <label className="block text-black text-sm font-medium mb-2">Steps</label>
                      <input
                        type="number"
                        value={formData.steps}
                        onChange={(e) => setFormData({...formData, steps: e.target.value})}
                    className="w-full bg-[#D44C2E]/10 border border-[#F7E987]/30 rounded-xl px-4 py-3 text-black focus:ring-2 focus:ring-[#F7E987] focus:border-transparent transition-all"
                      />
                    </div>
                    {/* Heart Rate */}
                    <div>
                    <label className="block text-black text-sm font-medium mb-2">Average Heart Rate (bpm)</label>
                      <input
                        type="number"
                        value={formData.heartRate}
                        onChange={(e) => setFormData({...formData, heartRate: e.target.value})}
                    className="w-full bg-[#D44C2E]/10 border border-[#F7E987]/30 rounded-xl px-4 py-3 text-black focus:ring-2 focus:ring-[#F7E987] focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <ClickSpark sparkColor="#fff" sparkSize={10} sparkRadius={15} sparkCount={8} duration={400}>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  fetchFitness();
                }}
                className="w-full mt-10 bg-orange-500 hover:bg-orange-400 text-black font-medium py-4 px-8 rounded-xl transition-all duration-200 shadow-lg"
              >
                Track My Fitness
              </button>
            </ClickSpark>
          </form>
        </div>
        </main>
      </ClickSpark>
      {/* Fitness Dashboard */}
      {showDashboard && (
        <ClickSpark sparkColor="#fff" sparkSize={10} sparkRadius={15} sparkCount={8} duration={400}>
          <div className="py-16 w-full bg-gradient-to-b from-yellow-300 to-orange-400">
            <div id="dashboard" className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-black mb-8 text-center">Your Fitness Analytics</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              {/* Left Column - Main Stats */}
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Workout Stats */}
                <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-[#86C1FF]/30">
                  <h3 className="text-lg font-semibold text-black mb-4">Today's Activity</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-black/80 text-sm">Steps</span>
                        <span className="text-black text-sm font-medium">{formData.steps || '0'}</span>
                      </div>
                      <div className="overflow-hidden h-1.5 rounded bg-[#86C1FF]/20">
                        <div className="bg-[#86C1FF] h-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-black/80 text-sm">Calories</span>
                        <span className="text-black text-sm font-medium">{formData.caloriesBurned || '0'} kcal</span>
                      </div>
                      <div className="overflow-hidden h-1.5 rounded bg-[#86C1FF]/20">
                        <div className="bg-[#86C1FF] h-full" style={{ width: '60%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-black/80 text-sm">Heart Rate</span>
                        <span className="text-black text-sm font-medium">{formData.heartRate || '0'} bpm</span>
                      </div>
                      <div className="overflow-hidden h-1.5 rounded bg-[#F59E0B]/20">
                        <div className="bg-[#f50b0b] h-full" style={{ width: '80%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Workout Intensity */}
                <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-[#86C1FF]/30">
                  <h3 className="text-lg font-semibold text-black mb-4">Workout Intensity</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-black/80">{formData.workoutIntensity}</span>
                      <span className="text-[#86C1FF] font-medium">{formData.workoutDuration} min</span>
                    </div>
                    <p className="text-black/60 text-sm">
                      {formData.workoutIntensity === 'Moderate' 
                        ? 'Good pace! Consider increasing intensity for better results.' 
                        : 'Keep up the great work!'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column - Tips and Insights */}
              <div className="space-y-6">
                <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-[#86C1FF]/30">
                  <h3 className="text-lg font-semibold text-black mb-4">Fitness Insights</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-green-400/20 flex items-center justify-center mr-3">
                        <span className="text-green-400">↑</span>
                      </div>
                      <div>
                        <h4 className="text-black font-medium">Progress Update</h4>
                        <p className="text-black/60 text-sm">Activity level increased by 15% this week</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-[#86C1FF]/20 flex items-center justify-center mr-3">
                        <span className="text-[#86C1FF]">i</span>
                      </div>
                      <div>
                        <h4 className="text-black font-medium">Personalized Tip</h4>
                        <p className="text-black/60 text-sm">
                          Based on your heart rate data, consider adding more cardio exercises
                        </p>
                      </div>
                    </div>
                    {showTip && (
                      <div className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-purple-400/20 flex items-center justify-center mr-3">
                          <span className="text-purple-400">★</span>
                        </div>
                        <div>
                          <h4 className="text-black font-medium">Weekly Goal</h4>
                          <p className="text-black/60 text-sm">
                            You're on track to reach your weekly activity target
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Exercise Plan Recommendation */}
            <div className="mt-12 bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-[#86C1FF]/30">
              <h3 className="text-2xl font-bold text-black mb-6 text-center">Your Personalized Exercise Plan</h3>
              <div className="text-center">
                <h4 className="text-xl font-semibold text-orange-600 mb-4">
                  {exercise_plans[(fitnessScore - 1) * 2] || 'Plan Not Available'}
                </h4>
                <p className="text-black text-base leading-relaxed max-w-4xl mx-auto">
                  {exercise_plans[(fitnessScore - 1) * 2 + 1] || 'Description not available for this plan.'}
                </p>
              </div>
            </div>
            </div>
          </div>
        </ClickSpark>
      )}
    </>
  );
}

export default FitnessTracker;