
import commune as c
import json
import os
from typing import List, Dict, Union, Optional, Any
import importlib
import inspect

print = c.print

class Toolbox:
    """
    A toolbox that provides access to various tools and can intelligently select
    the most appropriate tool based on a query.
    
    This module helps organize and access tools within the dev.tool namespace,
    with the ability to automatically select the most relevant tool for a given task.
    """
    def __init__(model='dev.model.openrouter'):
        self.model = c.module(model)
    def tools(self) -> List[str]:
        """
        List all available tools in the dev.tool namespace.
        
        Returns:
            List[str]: List of tool names.
        """
        tools =  c.mods(search='dev.tool')
        # ignore the toolbox 
        tools = [tool for tool in tools if  'toolbox' not in tool]
        return tools


    def tool2code(self) -> str:
        tool2schema = {
            tool: c.schema(tool)
            for tool in self.tools()
        }
    
    def tool2schema(self) -> Dict[str, str]:
        """
        Map each tool to its schema.
        
        Returns:
            Dict[str, str]: Dictionary mapping tool names to their schemas.
        """
        tool2schema = {tool: c.schema(tool) for tool in self.tools()}
        return tool2schema


    def forward(
        self, 
        query: str = 'i want to edit a file', 
        *extra_query,
        tools: Optional[List[str]] = None, 
        **kwargs
    ) -> Dict[str, Any]:
        """
        Forward the query to the appropriate tool based on the provided query.
        
        Args:
            query (str): The query to be processed.
            tools (List[str], optional): List of specific tools to consider. If None, all tools are considered.
            **kwargs: Additional arguments to pass to the selected tool.
        
        Returns:
            Dict[str, Any]: The result from the selected tool.
        """
        
        # Forward the query to the selected tool
        query = " ".join([query] + list(extra_query))

        selector = c.mod('dev.tool.select')()
        module =  selector.forward(query=query, options=self.tool2schema(), n=1, **kwargs)[0]['name']

        # now find the fn 

        schema = c.schema(module)
        # get the function name from the module
        fn_name = selector.forward(query=query, options=schema, n=1, **kwargs)[0]['name']



        fn_schema = c.schema(getattr(module, fn_name))
        # get the function signature
        sig = str(inspect.signature(getattr(module, fn_name))) 
        # get the parameters

        prompt = str({
            "query": query,
            "schema": fn_schema,
            "signature": sig,
            'task': 'output a params dictionary for the function based on the query',
            'format': f"<{fn_name}(params)>\nPARAMS DICT\n</{fn_name}(params)> # end of params",
        })'
        
        output =  self.model.forward(prompt, **kwargs)

        # parse the output
        output = json.loads(output.split(f"<{fn_name}(params)>")[1].split(f"</{fn_name}(params)>")[0])

        


