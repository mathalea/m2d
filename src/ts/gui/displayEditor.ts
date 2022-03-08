// // Gestion de l'éditeur de code
// import { CodeMirror } from 'codemirror'
// import 'codemirror/lib/codemirror.css'
// import 'codemirror/theme/monokai.css'
// import 'codemirror/mode/javascript/javascript.js'
// import 'codemirror/mode/xml/xml.js'
// import 'codemirror/mode/htmlmixed/htmlmixed.js'
// import 'codemirror/mode/stex/stex.js'
// import 'codemirror/addon/hint/javascript-hint.js'
// import 'codemirror/addon/hint/show-hint.js'
// import 'codemirror/addon/hint/show-hint.css'
// import 'codemirror/addon/edit/closebrackets.js'
// import { initEditor } from './initEditor'
// import { Figure } from '../Figure'
// //

// export function displayEditor (figure: Figure) {
//   const divEditeur = document.createElement('div')
//   const btnRunCode = document.createElement('button')
//   btnRunCode.innerHTML = 'Valider'
//   const body = document.querySelector('body')
//   body.appendChild(divEditeur)
//   body.appendChild(btnRunCode)

//   const myCodeMirror = CodeMirror(divEditeur, {
//     value: '',
//     mode: 'javascript',
//     lineNumbers: true,
//     autofocus: true,
//     theme: 'monokai',
//     autoCloseBrackets: true,
//     showHint: true,
//     extraKeys: { 'Ctrl-Space': 'autocomplete' },
//     matchBrackets: true,
//     lineWrapping: true
//   })

//   // Autocomplétion
//   myCodeMirror.on('inputRead', function onChange (editor, input) {
//     if (input.text[0] === ';' || input.text[0] === ' ') {
//       return
//     }
//     CodeMirror.commands.autocomplete(editor, null, { completeSingle: false })
//   })

//   btnRunCode.addEventListener('click', () => {
//     const interpreter = initEditor(figure)
//     const code = myCodeMirror.getValue()
//     interpreter.run(code)
//   })
// }
