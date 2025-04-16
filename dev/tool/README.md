
# Dev Tools

This directory contains various tools for code generation, editing, and manipulation.

## Available Tools

### Edit Tool
A tool for editing existing code with AI assistance.

### Select Tool
A tool for selecting relevant files based on a query.

### Summarize Tool
A tool for summarizing text content with customizable options for length and style.

### Insert Tool
A non-AI utility for inserting text between specified anchor points in files.

## Insert Tool Usage

The Insert tool provides a simple way to insert or replace content between specified anchor points in files.

### Basic Usage

```python
from dev.tool.insert import Insert

# Initialize the tool
insert_tool = Insert()

# Insert content between anchors
result = insert_tool.forward(
    file_path="path/to/your/file.py",
    new_content="Your new content goes here",
    start_anchor="# BEGIN CUSTOM CODE",
    end_anchor="# END CUSTOM CODE",
    verbose=True
)

# Check the result
if result["success"]:
    print(f"Successfully inserted content into {result['file_path']}")
else:
    print(f"Failed: {result['message']}")
```

### Multiple Insertions

```python
# Perform multiple insertions in a single file
result = insert_tool.insert_multiple(
    file_path="path/to/your/file.py",
    insertions=[
        {
            "start_anchor": "# BEGIN IMPORTS",
            "end_anchor": "# END IMPORTS",
            "content": "import os\nimport sys\nimport json"
        },
        {
            "start_anchor": "# BEGIN FUNCTIONS",
            "end_anchor": "# END FUNCTIONS",
            "content": "def process_data():\n    return {'success': True}"
        }
    ],
    verbose=True
)
```

## Summarize Tool Usage

The Summarize tool provides AI-powered text summarization with various options.

### Basic Usage

```python
from dev.tool.summarize import Summarize

# Initialize the tool
summarize_tool = Summarize()

# Summarize a text
summary = summarize_tool.forward(
    text="Your long text goes here...",
    max_length=200,  # Maximum length in words
    style="concise",  # Options: concise, detailed, bullet, technical, simple
    focus="key findings",  # Optional focus area
    verbose=True
)

print(summary)
```

### Summarize a File

```python
# Summarize the content of a file
file_summary = summarize_tool.summarize_file(
    file_path="path/to/document.txt",
    max_length=300,
    style="bullet",
    verbose=True
)

print(file_summary)
```

### Meta-Summarization

```python
# Summarize multiple texts and create a meta-summary
texts = [
    "First long document...",
    "Second long document...",
    "Third long document..."
]

meta_summary = summarize_tool.meta_summarize(
    texts=texts,
    max_length=400,
    style="detailed",
    focus="common themes",
    verbose=True
)

print(meta_summary)
```

## Use Cases

- Adding imports to Python files
- Inserting configuration blocks in JSON/YAML files
- Updating specific sections of code while preserving the rest
- Adding documentation to specific parts of files
- Implementing hooks in template files
- Summarizing documentation, papers, or long text content
- Creating concise versions of multiple related documents
- Extracting key points from technical documents
