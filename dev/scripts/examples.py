
"""
Examples of using the Dev module for various code generation and editing tasks.
This script demonstrates different ways to use the Dev module's capabilities.
"""

import commune as c
import os
import time

def basic_code_generation():
    """Simple example of generating a utility function"""
    dev = c.module('dev')()
    result = dev.forward(
        "Create a Python function that converts a CSV file to JSON",
        to="./examples/basic"
    )
    return result

def project_generation():
    """Example of generating a small project with multiple files"""
    dev = c.module('dev')()
    result = dev.forward(
        """
        Create a simple Flask web application with:
        1. A homepage that displays a welcome message
        2. An API endpoint that returns the current time
        3. A basic HTML template with CSS styling
        """,
        to="./examples/flask_app"
    )
    return result

def code_editing():
    """Example of editing existing code"""
    # First, let's create some code to edit
    dev = c.module('dev')()
    
    # Create a simple function
    dev.forward(
        "Create a function called 'calculate_average' that takes a list of numbers and returns their average",
        to="./examples/editing/math_utils.py"
    )
    
    # Now edit the function to add error handling
    edit = c.module('dev.tool.edit')()
    result = edit.forward(
        """
        Improve the calculate_average function by:
        1. Adding type hints
        2. Adding error handling for empty lists
        3. Adding docstrings with examples
        4. Adding a check to ensure all items are numbers
        """,
        to="./examples/editing"
    )
    return result

def file_selection():
    """Example of using the select tool to find relevant files"""
    # First, let's create a small project with multiple files
    dev = c.module('dev')()
    
    # Create a simple project
    dev.forward(
        """
        Create a small Python project with:
        1. A user.py file with User class
        2. An auth.py file with login/logout functions
        3. A database.py file with database connection functions
        4. A utils.py file with utility functions
        5. A main.py file that imports and uses the other modules
        """,
        to="./examples/selection"
    )
    
    # Now use select to find files related to authentication
    select = c.module('dev.tool.select')()
    files = c.files("./examples/selection")
    
    auth_files = select.forward(
        options=files,
        query="files related to user authentication and login",
        threshold=5
    )
    
    print(f"Found {len(auth_files)} files related to authentication:")
    for file in auth_files:
        print(f" - {file}")
    
    return auth_files

def function_calling_example():
    """Example of using function calling with @/ prefix"""
    dev = c.module('dev')()
    
    # Create a directory and a file
    os.makedirs("./examples/function_calling", exist_ok=True)
    with open("./examples/function_calling/data.txt", "w") as f:
        f.write("This is some sample data\nWith multiple lines\nFor testing function calling")
    
    # Use function calling to read the file and generate code based on its content
    result = dev.forward(
        "Generate a Python function that processes this data: @/get_text ./examples/function_calling/data.txt",
        to="./examples/function_calling/processor.py"
    )
    return result

def combined_workflow():
    """Example of a complete workflow combining multiple tools"""
    # 1. Generate a project
    dev = c.module('dev')()
    dev.forward(
        """
        Create a simple data processing library with:
        1. A CSV parser
        2. A JSON formatter
        3. A data validator
        4. A simple API to use these components
        """,
        to="./examples/workflow"
    )
    
    # 2. Find files related to validation
    select = c.module('dev.tool.select')()
    files = c.files("./examples/workflow")
    validation_files = select.forward(
        options=files,
        query="files related to data validation",
        threshold=5
    )
    
    # 3. Edit the validation files to add more features
    edit = c.module('dev.tool.edit')()
    edit.forward(
        """
        Enhance the data validation functionality by:
        1. Adding support for custom validation rules
        2. Adding email validation
        3. Adding date format validation
        4. Adding a way to generate validation reports
        """,
        to="./examples/workflow",
        context_files=validation_files
    )
    
    # 4. Generate tests for the enhanced validation
    dev.forward(
        "Create comprehensive unit tests for the data validation functionality",
        to="./examples/workflow/tests"
    )
    
    return {
        "project_files": files,
        "validation_files": validation_files
    }

def run_all_examples():
    """Run all example functions and time their execution"""
    examples = [
        basic_code_generation,
        project_generation,
        code_editing,
        file_selection,
        function_calling_example,
        combined_workflow
    ]
    
    results = {}
    
    for example in examples:
        print(f"\n{'='*50}")
        print(f"Running example: {example.__name__}")
        print(f"{'='*50}")
        
        start_time = time.time()
        try:
            result = example()
            success = True
        except Exception as e:
            result = str(e)
            success = False
        
        elapsed_time = time.time() - start_time
        
        results[example.__name__] = {
            "success": success,
            "time": elapsed_time,
            "result": result
        }
        
        print(f"\nCompleted in {elapsed_time:.2f} seconds")
        print(f"Success: {success}")
        
    return results

if __name__ == "__main__":
    # Create the examples directory if it doesn't exist
    os.makedirs("./examples", exist_ok=True)
    
    # Run a specific example
    # basic_code_generation()
    
    # Or run all examples
    results = run_all_examples()
    
    print("\n\nSummary of all examples:")
    print("-" * 30)
    for name, data in results.items():
        status = "✅" if data["success"] else "❌"
        print(f"{status} {name}: {data['time']:.2f}s")
