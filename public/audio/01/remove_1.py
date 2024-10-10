import os

def remove_prefix_from_files(directory, prefix="1_"):
    """Remove a specific prefix from all files in the given directory and its subdirectories."""
    for root, _, files in os.walk(directory):
        for file in files:
            if file.startswith(prefix):
                # Build full file paths
                old_file_path = os.path.join(root, file)
                new_file_name = file[len(prefix):]  # Remove the prefix
                new_file_path = os.path.join(root, new_file_name)
                
                # Rename the file
                os.rename(old_file_path, new_file_path)
                print(f"Renamed: {old_file_path} -> {new_file_path}")

# Example usage
directory = '.'  # Replace with your directory path
remove_prefix_from_files(directory)
