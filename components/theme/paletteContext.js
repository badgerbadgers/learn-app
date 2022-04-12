//  const [theme, setTheme] = useState(themes.light);

//   const changeTheme = (theme) => {
//     setTheme(theme);
//   };

//   useEffect(() => {
//     switch (theme) {
//       case themes.light:
//       default:
//         document.body.classList.remove("white-content");
//         break;
//       case themes.dark:
//         document.body.classList.add("white-content");
//         break;

//     }
//   }, [theme]);

//   return (
//     <ThemeContext.Provider
//       value={
//         { theme: theme, changeTheme: changeTheme }
//       }
//     >

//       {props.children}

//     </ThemeContext.Provider>
//   );
// }
