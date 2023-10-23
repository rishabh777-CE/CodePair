import '@fortawesome/fontawesome-free/css/all.css';
import codemirror from 'codemirror';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/closetag';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/theme/dracula.css';
import 'codemirror/theme/eclipse.css';
import 'codemirror/theme/material-palenight.css';
import React, { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';

const Editor = ({socketRef,roomId,fullScreen,setFullScreen}) => {
  const [theme, setTheme] = React.useState(
    localStorage.getItem('theme') || 'dracula'
  );

  const editorRef = useRef(null);

    
  useEffect(() => {

   async function init() {    if (!editorRef.current) {
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
        }
      );
    } else {
      // Update the theme of the existing editor instance
      editorRef.current.setOption('theme', theme);
    }
    editorRef.current.on('change', (instance, changes) => {
      const { origin } = changes;
      const code = instance.getValue();
      if (origin !== 'setValue') {
          socketRef.current.emit('code-change', {
              roomId,
              code,
          });
      }
  });
    socketRef.current.on('code-change', ({ code }) => {
      editorRef.current.setValue(code);
    });    
   
    socketRef.current.emit('read', ({ roomId ,}));

    socketRef.current.on('write',({code})=>{
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
      <button className="shareButton"

                    onClick={() => { navigator.clipboard.writeText(window.location.origin + `/${roomId}`); toast.success('Room URL has been copied to your clipboard'); }}>

                    <i className='fa-solid fa-share'
                        style={{ color: '#4680A0' }}
                    ></i>

      </button>
      <button className="fullScreenButton"
            onClick={() => {if(fullScreen==false){setFullScreen(true)} else {setFullScreen(false);}}}
            >

<i className='fa-solid fa-expand'
    style={{ color: '#4680A0' }}
></i>

</button>
      <textarea id="realtimeEditor"></textarea>
    </div>
  );
};

export default Editor;