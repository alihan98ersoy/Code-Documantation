// You can use the React library to create TSX components
import React from "react";
import csharpCode from "@site/static/code/example_code.json";

export type ExampleCode = {
    language_id: number;
    language_name: string;
    code: string;
} 

export function GetExampleLanguageCode() {
    const exampleCode = csharpCode as ExampleCode[];
    return exampleCode;
}

