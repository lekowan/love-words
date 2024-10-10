import json

def add_audio_to_json(input_json_path, output_json_path):
    # Load the existing JSON data
    with open(input_json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    # Iterate through each entry and add the audio file path
    for key, value in data.items():
        value['audio'] = f"../assets/audio/01-1/{key}.mp3"

    # Save the modified JSON data to a new file
    with open(output_json_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"Updated JSON saved to {output_json_path}")

# Replace 'input.json' and 'output.json' with your file paths
input_json_file = 'shirokuma-cafe-episode-01-part-1.json'
output_json_file = 'shirokuma-cafe-episode-01-part-1-updated.json'
add_audio_to_json(input_json_file, output_json_file)