import '@fortawesome/fontawesome-free/css/all.css';
import codemirror, { Pos } from 'codemirror';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/closetag';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/theme/dracula.css';
import 'codemirror/theme/eclipse.css';
import 'codemirror/theme/material-palenight.css';
import React, { useEffect, useRef,useState } from 'react';

const Post = ({writeCode,socketRef}) => {
  const [theme, setTheme] = React.useState(
    localStorage.getItem('theme') || 'dracula'
  );

  const editorRef = useRef(null);
//   const code=getcodefromdatabase();
  useEffect(() => {

   async function init() {    
    if (!editorRef.current) {
      // Create the editor instance and store it in the ref
      editorRef.current = codemirror.fromTextArea(
        document.getElementById('realtimeEditor'),
        {
          mode: { name: 'javascript' },
          json: true,
          theme: theme,
          lineNumbers: true,
          autoCloseTags: true,
          autoCloseBrackets: true,
          readOnly: true,
        }
      );
    } else {
      // Update the theme of the existing editor instance
      editorRef.current.setOption('theme', theme);
    }
    if(writeCode)
    editorRef.current.setValue(writeCode);

    socketRef.current.on('code-change', ({ code }) => {
      if(code)
      editorRef.current.setValue(code);
    });


    localStorage.setItem('theme', theme);}

    init();
  }, [theme]);

 

  const handleModeToggle = () => {
    setTheme(theme === 'dracula' ? 'eclipse' : 'dracula');
  };

  return (
    <div style={{ position: 'relative' }}>
      <button className="themeButton"
      
      onClick={handleModeToggle}>
      
      <i className={`fas ${theme === 'dracula' ? 'fa-regular fa-sun' : 'fa-regular fa-moon'}`}
         style={{ color: '#4680A0' }}
        ></i>
        
      </button>
      <textarea id="realtimeEditor"></textarea>
    </div>
  );
};

export default Post;