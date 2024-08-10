import json


def convert_single_to_double_quotes(file_path):
    """
    This function reads a JSON Lines file with single-quoted strings,
    converts the single quotes to double quotes, and writes the modified
    JSON Lines file back to disk.

    Parameters:
    file_path (str): The path to the JSON Lines file to be processed.

    Returns:
    None
    """
    file_extension = file_path.split('.')[-1]
    assert file_extension == 'jsonl', f"Invalid file extension: {file_extension}"
    try:
        with open(file_path, 'r') as file:
            lines = file.readlines()

        with open(file_path, 'w') as file:
            for line in lines:
                json_obj = eval(line.replace("'", '"'))
                json_str = json.dumps(json_obj)
                file.write(json_str + '\n')
    except FileNotFoundError:
        raise FileNotFoundError(f"File not found: {file_path}")
    return f"Conversion successful. Modified JSON Lines file saved as {file_path}"
