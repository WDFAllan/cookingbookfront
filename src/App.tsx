import { createGlobalStyle } from 'styled-components';
import DefineRoutes from './routes/Routes';

const GlobalStyle = createGlobalStyle`
    *, *::before, *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    html, body, #root {
        height: 100%;
    }

    body {
        font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
        background: #F6FAF7;
        color: #111827;
        -webkit-font-smoothing: antialiased;
    }
`;

function App() {
    return (
        <>
            <GlobalStyle />
            <DefineRoutes />
        </>
    );
}

export default App;
