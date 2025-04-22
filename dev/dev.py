
import commune as c
import time
import os
import glob
import re
import json
from pathlib import Path
from typing import Dict, List, Union, Optional, Any, Tuple
from .utils import *

print = c.print

class Dev:

    prompt= """
                --GOAL--
                YOU ARE A CODER, YOU ARE MR.ROBOT, YOU ARE TRYING TO BUILD IN A SIMPLE
                LEONARDO DA VINCI WAY, YOU ARE A agent, YOU ARE A GENIUS, YOU ARE A STAR, 
                YOU FINISH ALL OF YOUR REQUESTS WITH UTMOST PRECISION AND SPEED, YOU WILL ALWAYS 
                MAKE SURE THIS WORKS TO MAKE ANYONE CODE. YOU HAVE THE CONTEXT AND INPUTS FOR ASSISTANCE
                YOU HAVE TWO MODES, EDIT AND BUILD FROM SCRATCH
                IF YOU ARE IN EDIT MODE, YOU CAN EDIT WHATEVER YOU WANT AND 
                BY DEFAULT YOU DONT NEED TO WRITE THE FULL REPO AND CAN ONLY ADD SINGLE FILES IF YOU WANT
                IF YOU NEED TO, PLEASE MAKE SURE TO ENSURE THAT THERE IS A README.md AND A SCRIPTS FOLDER
                "YOU CAN RESPOND WITH THE FOLLOWING FORMAT THAT MUST BE WITHIN THE PWD"

                --CONTEXT--
                PWD={pwd}
                CONTEXT={context}
                QUERY={query} # THE QUERY YOU ARE TRYING TO ANSWER

                --TOOLS--
                THE TOOLS ARE ORGANIZED AS <FN::fn_name><parm_name_1>param_value_1</parm_name_1></FN::fn_name>
                YOU CAN USE THE FOLLOWING TOOLS ONLY USE THESE TOOLS
                TOOLS={tools} # YOU MUST CREATE A PLAN OF TOOLS THT WE WILL PARSE ACCORDINGLY TO REPRESENT YOUR PERSPECTIVE 




                """

    def __init__(self, 
                 model: str = 'dev.model.openrouter', 
                 cache_dir: str = '~/.commune/dev_cache',
                 **kwargs):

        self.model = c.module(model)(**kwargs)
        self.cache_dir = abspath(cache_dir)
        self.memory = c.module('dev.tool.select_files')()
        self.tools = c.module('dev.tool')().tool2schema()

        ensure_directory_exists(self.cache_dir)



        
    def forward(self, 
                text: str = '', 
                *extra_text, 
                to: str = './', 
                ctx=None,
                temperature: float = 0.5, 
                max_tokens: int = 1000000, 
                model: Optional[str] = 'anthropic/claude-3.7-sonnet',
                auto_save: bool = False,
                stream: bool = True,
                verbose: bool = True,
                context_files: Optional[List[str]] = None,
                ignore_patterns: List[str] = ['.git', '__pycache__', '*.pyc', '.DS_Store', '.env', 'node_modules', 'venv'],
                include_file_content: bool = True,
                use_cache: bool = True,
                module=None, 
                mod = None,
                mode: str = 'auto', 
                max_age= 10000,
                **kwargs) -> Dict[str, str]:
        module = mod or module
        if module != None:
            to = c.dirpath(module)
        to = abspath(to)
        files = c.files(to)

        prompt =self.prompt.format(
            pwd=to,
            context=str({f: get_text(f) for f in self.memory.forward(options=files, query=text)}),
            query=self.preprocess(' '.join(list(map(str, [text] + list(extra_text))))),
            tools=self.tools
        )

        # Generate the response
        output = self.model.forward(prompt, stream=stream, model=model, max_tokens=max_tokens, temperature=temperature )
        # Process the output
        return self.postprocess(output)


    def preprocess(self, text, threshold=1000):
            new_text = ''
            is_function_running = False
            words = text.split(' ')
            fn_detected = False
            fns = []
            for i, word in enumerate(words):
                prev_word = words[i-1] if i > 0 else ''
                # restrictions can currently only handle one function argument, future support for multiple
                magic_prefix = f'@/'
                if word.startswith(magic_prefix) and not fn_detected:
                    word = word[len(magic_prefix):]
                    if '/' not in word:
                        word = '/' + word
                    fns += [{'fn': word, 'params': [], 'idx': i + 2}]
                    fn_detected=True
                else:
                    if fn_detected:
                        fns[-1]['params'] += [word]
                        fn_detected = False
            c.print(fns)
            for fn in fns:
                print('Running function:', fn)
                result = c.fn(fn['fn'])(*fn['params'])
                fn['result'] = result
                text =' '.join([*words[:fn['idx']],'-->', str(result), *words[fn['idx']:]])
            return text

    def test(self, text='write a function that adds two numbers and a test.js file that i can test it all in one class and have me test it in test.js and a script to run it'):
        """
        Test the Dev module by generating code based on a prompt.
        
        Args:
            text: The prompt text
            
        Returns:
            Dictionary mapping file paths to generated content
        """
        path = '~/.dev/test/add'
        return self.forward(text, to=path, verbose=True)

    def postprocess(self, output):
        """
        Postprocess tool outputs and extract function calls.
        
        This function parses the raw output text and identifies function calls in the format:
        <FN::function_name>param1</FN::function_name> or 
        <FN::function_name><param_name>param_value</param_name></FN::function_name>
        
        Args:
            output (str): The raw output from the model
                
        Returns:
            str: The processed output with extracted function calls
        """
        import re
        
        # Print the output character by character for streaming effect
        text = ''
        for ch in output: 
            print(ch, end='')
            text += ch
        
        # Extract function calls using regex
        function_pattern = r'<FN::([^/]+)>(.*?)</FN::\1>'
        param_pattern = r'<([^>]+)>(.*?)</\1>'
        
        # Find all function calls
        function_calls = []
        for match in re.finditer(function_pattern, text, re.DOTALL):
            fn_name = match.group(1)
            fn_content = match.group(2)
            
            # Parse parameters
            params = {}
            if '<' in fn_content and '>' in fn_content:
                # Complex format with named parameters
                for param_match in re.finditer(param_pattern, fn_content, re.DOTALL):
                    param_name = param_match.group(1)
                    param_value = param_match.group(2)
                    params[param_name.lower()] = param_value.strip()
            else:
                # Simple format with direct parameter
                params["value"] = fn_content.strip()
            
            function_calls.append({
                "function": fn_name.lower(),
                "parameters": params
            })
        
        # You can process the function calls here or return them for further processing
        print("Function calls detected:")
        for call in function_calls:
            print(f"Function: {call['function']}, Parameters: {call['parameters']}")
        # For debugging, you can add:
        if input('Do you want to see the function calls? (y/n): ').strip().lower() == 'y':
            print("Function calls detected:")
            for call in function_calls:
                print(f"Function: {call['function']}, Parameters: {call['parameters']}")
                fn = c.module(call['function'])()
                fn.forward(**call['parameters'])
                

            
        return {
            "calls": function_calls
        }
