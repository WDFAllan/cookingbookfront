import { createGlobalStyle } from 'styled-components';
import DefineRoutes from './routes/Routes';
import { AuthProvider } from './context/AuthContext';

const GlobalStyle = createGlobalStyle`
    *, *::before, *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    html, body, #root {
        height: 100%;
    }

    html {
        scroll-behavior: smooth;
    }

    body {
        font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
        background: #f5f7f5;
        color: #0d1f15;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        line-height: 1.6;
    }

    img {
        display: block;
        max-width: 100%;
    }

    button { font-family: inherit; }
    input, textarea { font-family: inherit; }
`;

function App() {
    return (
        <AuthProvider>
            <GlobalStyle />
            <DefineRoutes />
        </AuthProvider>
    );
}

export default App;
