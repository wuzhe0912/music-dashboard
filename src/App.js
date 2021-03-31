// import NavBar from 'components/NavBar';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from 'constant/GlobalStyle';
import { theme } from 'constant/Theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {/* <Router></Router> */}
    </ThemeProvider>
  );
}

export default App;
