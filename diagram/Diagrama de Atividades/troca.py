import os
import sys
from pathlib import Path

def rename_mermaid_files(directory="."):
    """
    Renames all files with .mermaid extension to .md in the specified directory
    
    Args:
        directory (str): The directory to process. Defaults to current directory.
    
    Returns:
        tuple: (success_count, error_count, list of errors)
    """
    success_count = 0
    error_count = 0
    errors = []
    
    try:
        # Convert to absolute path
        directory = Path(directory).resolve()
        
        # Check if directory exists
        if not directory.is_dir():
            raise NotADirectoryError(f"'{directory}' is not a valid directory")
            
        # Find all .mermaid files
        mermaid_files = list(directory.glob("*.mermaid"))
        
        if not mermaid_files:
            print("No .mermaid files found in the directory.")
            return success_count, error_count, errors
            
        print(f"Found {len(mermaid_files)} .mermaid files")
        
        # Process each file
        for old_path in mermaid_files:
            try:
                new_path = old_path.with_suffix('.md')
                
                # Check if destination file already exists
                if new_path.exists():
                    raise FileExistsError(f"Cannot rename '{old_path}' - '{new_path}' already exists")
                
                # Rename the file
                old_path.rename(new_path)
                print(f"Renamed: {old_path.name} -> {new_path.name}")
                success_count += 1
                
            except Exception as e:
                error_count += 1
                errors.append(f"Error processing {old_path}: {str(e)}")
                
    except Exception as e:
        error_count += 1
        errors.append(f"General error: {str(e)}")
        
    # Print summary
    print(f"\nSummary:")
    print(f"Successfully renamed: {success_count} files")
    if errors:
        print(f"Errors encountered: {error_count}")
        print("\nError details:")
        for error in errors:
            print(f"- {error}")
            
    return success_count, error_count, errors

if __name__ == "__main__":
    # Get directory from command line argument or use current directory
    directory = sys.argv[1] if len(sys.argv) > 1 else "."
    rename_mermaid_files(directory)