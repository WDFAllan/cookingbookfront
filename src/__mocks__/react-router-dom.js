// Mock manuel de react-router-dom pour Jest/CRA (react-router-dom v7 est ESM,
// incompatible avec Jest 27 embarqué dans react-scripts 5).
//
// moduleNameMapper dans package.json redirige tous les imports de
// 'react-router-dom' vers ce fichier — dans les tests ET dans les composants
// testés. Les tests importent ces mêmes jest.fn() pour les configurer et vérifier.

const useNavigate = jest.fn();
const useParams = jest.fn().mockReturnValue({});

module.exports = {
    useNavigate,
    useParams,
};
