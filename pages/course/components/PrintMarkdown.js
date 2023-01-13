import React from "react"
import {unified} from "unified";
import parse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeReact from "rehype-react";  

/*
function parses mindset from markdown to be readable react 
*/
export default function PrintMarkdown({ mindset }) { 
    const content = unified()
    .use(parse)
    .use(remarkRehype) 
    .use(rehypeReact, { createElement: React.createElement })
    .processSync(mindset).result; 
  
  return (
    <>{content}</>
  )
}
