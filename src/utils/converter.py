import csv
import json

def csv_to_json(csv_file, json_file):
    # Read the CSV file
    with open(csv_file, 'r') as file:
        reader = csv.DictReader(file)
        rows = list(reader)

    # Write the JSON file
    with open(json_file, 'w') as file:
        json.dump(rows, file, indent=4)

# Usage example
csv_to_json('./public/MergedDataset.csv', 'data.json')