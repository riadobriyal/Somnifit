import pandas as pd
import os
from ydata_profiling import ProfileReport

# Get current directory path
current_dir = os.path.dirname(os.path.abspath(__file__))
# Create full path to CSV file
csv_path = os.path.join(current_dir, 'final_dataset.csv')

# Read the CSV file
try:
    # Print the current directory and file path for debugging
    print(f"Looking for file at: {csv_path}")
    
    df = pd.read_csv(csv_path)
    print("Dataset loaded successfully")
    print(f"Dataset shape: {df.shape}")
    
    # Generate a report 
    print("Generating profile report...")
    profile = ProfileReport(df, title="Sleep Activity Analysis")
    profile.to_file(output_file="activity.html")
    print("Profile report generated as activity.html")
    
except FileNotFoundError:
    print(f"Error: Could not find {csv_path}")
    print("Make sure the CSV file exists in the correct location")
except Exception as e:
    print(f"An error occurred: {str(e)}")



