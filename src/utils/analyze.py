import csv
import json
with open('./public/MergedDataset.csv', 'r') as file:
    reader = csv.DictReader(file)
    rows = list(reader)
    print(f'keys {rows[0].keys()}')
    print(f'secorts {set(item["Subsector"] for item in rows)}')
    print(f'Years {set(item["Year"] for item in rows)}')
    print(f'Countries {set(item["Country"] for item in rows)}')
    print(f'Sector {set(item["Sector"] for item in rows)}')

